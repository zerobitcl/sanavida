// Recompresor PNG sin dependencias (zlib nativo). System.Drawing guarda PNG sin filtros y con
// deflate rápido; re-filtrar por fila + deflate 9 recorta ~30-50% sin pérdida de calidad.
// Sólo soporta lo que genera brand-assets.ps1: 8 bits, RGBA/RGB, sin entrelazado.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { inflateSync, deflateSync, crc32 } from 'node:zlib';

const SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

function decode(buf) {
  let pos = 8, ihdr, idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos), type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') ihdr = data;
    if (type === 'IDAT') idat.push(data);
    pos += 12 + len;
  }
  const w = ihdr.readUInt32BE(0), h = ihdr.readUInt32BE(4), depth = ihdr[8], ct = ihdr[9], inter = ihdr[12];
  if (depth !== 8 || inter !== 0 || (ct !== 6 && ct !== 2)) return null;
  const bpp = ct === 6 ? 4 : 3, stride = w * bpp;
  const raw = inflateSync(Buffer.concat(idat));
  const px = Buffer.alloc(stride * h);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], row = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const o = y * stride;
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? px[o + x - bpp] : 0, b = y ? px[o - stride + x] : 0, c = y && x >= bpp ? px[o - stride + x - bpp] : 0;
      let v = row[x];
      if (f === 1) v += a; else if (f === 2) v += b; else if (f === 3) v += (a + b) >> 1;
      else if (f === 4) { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      px[o + x] = v & 255;
    }
  }
  return { w, h, bpp, px };
}

function encode({ w, h, bpp, px }) {
  // Si no hay transparencia real, RGB ahorra un 25% de datos crudos.
  if (bpp === 4 && px.every((v, i) => i % 4 !== 3 || v === 255)) {
    const rgb = Buffer.alloc(w * h * 3);
    for (let i = 0, j = 0; i < px.length; i += 4, j += 3) px.copy(rgb, j, i, i + 3);
    return encode({ w, h, bpp: 3, px: rgb });
  }
  const stride = w * bpp, out = Buffer.alloc((stride + 1) * h), cand = Buffer.alloc(stride);
  for (let y = 0; y < h; y++) {
    const o = y * stride;
    let best = Infinity, bestF = 0, bestRow = null;
    for (let f = 0; f < 5; f++) {
      let sum = 0;
      for (let x = 0; x < stride; x++) {
        const a = x >= bpp ? px[o + x - bpp] : 0, b = y ? px[o - stride + x] : 0, c = y && x >= bpp ? px[o - stride + x - bpp] : 0;
        let pred = 0;
        if (f === 1) pred = a; else if (f === 2) pred = b; else if (f === 3) pred = (a + b) >> 1;
        else if (f === 4) { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); pred = pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
        const v = (px[o + x] - pred) & 255;
        cand[x] = v; sum += v < 128 ? v : 256 - v;
      }
      if (sum < best) { best = sum; bestF = f; bestRow = Buffer.from(cand); }
    }
    out[y * (stride + 1)] = bestF;
    bestRow.copy(out, y * (stride + 1) + 1);
  }
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td) >>> 0);
    return Buffer.concat([len, td, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = bpp === 4 ? 6 : 2;
  return Buffer.concat([SIG, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(out, { level: 9, memLevel: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

// Arte plano (logo, íconos, nubes): pocos colores base + bordes antialias que sólo varían en alfa.
// Se mapea cada píxel al color base más cercano y el alfa a 16 niveles => paleta indexada
// (PNG tipo 3), ~3-4x más liviano que RGBA y visualmente idéntico a tamaño de pantalla.
function encodeFlat({ w, h, bpp, px }, maxBase = 15) {
  if (bpp !== 4) return null;
  const freq = new Map();
  for (let i = 0; i < px.length; i += 4) {
    if (px[i + 3] < 200) continue;
    const k = ((px[i] >> 3) << 10) | ((px[i + 1] >> 3) << 5) | (px[i + 2] >> 3);
    freq.set(k, (freq.get(k) || 0) + 1);
  }
  const base = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, maxBase)
    .map(([k]) => [((k >> 10) & 31) * 8 + 4, ((k >> 5) & 31) * 8 + 4, (k & 31) * 8 + 4]);
  if (!base.length) return null;
  const palette = [[0, 0, 0, 0]], index = new Map([['0', 0]]);
  const idx = Buffer.alloc(w * h);
  for (let p = 0, i = 0; p < w * h; p++, i += 4) {
    const a = Math.round(px[i + 3] / 17) * 17;
    if (a === 0) continue;
    let bi = 0, bd = Infinity;
    for (let j = 0; j < base.length; j++) {
      const d = (px[i] - base[j][0]) ** 2 + (px[i + 1] - base[j][1]) ** 2 + (px[i + 2] - base[j][2]) ** 2;
      if (d < bd) { bd = d; bi = j; }
    }
    const key = `${bi}:${a}`;
    if (!index.has(key)) { index.set(key, palette.length); palette.push([...base[bi], a]); }
    idx[p] = index.get(key);
  }
  if (palette.length > 256) return null;
  const raw = Buffer.alloc((w + 1) * h);
  for (let y = 0; y < h; y++) idx.copy(raw, y * (w + 1) + 1, y * w, (y + 1) * w);
  const chunk = (type, data) => {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
    const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
    const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td) >>> 0);
    return Buffer.concat([len, td, crc]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 3;
  return Buffer.concat([
    SIG, chunk('IHDR', ihdr),
    chunk('PLTE', Buffer.from(palette.flatMap((c) => c.slice(0, 3)))),
    chunk('tRNS', Buffer.from(palette.map((c) => c[3]))),
    chunk('IDAT', deflateSync(raw, { level: 9, memLevel: 9 })), chunk('IEND', Buffer.alloc(0)),
  ]);
}

const flat = process.argv.includes('--flat');
const files = process.argv.slice(2).filter((a) => !a.startsWith('--')).flatMap((p) => (p.endsWith('.png') ? [p] : readdirSync(p).filter((f) => f.endsWith('.png')).map((f) => join(p, f))));
for (const file of files) {
  const before = readFileSync(file);
  const img = decode(before);
  if (!img) { console.log(`- ${file}: formato no soportado, se deja igual`); continue; }
  const after = (flat && encodeFlat(img)) || encode(img);
  if (after.length < before.length) writeFileSync(file, after);
  console.log(`✓ ${file}: ${(before.length / 1024).toFixed(1)} → ${(Math.min(after.length, before.length) / 1024).toFixed(1)} KB`);
}
