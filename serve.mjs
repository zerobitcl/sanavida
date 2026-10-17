import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { loadEnv } from './src/env.mjs';
import { htmlToPdf } from './src/api2pdf.mjs';
import { buildQuoteHtml, summarizeQuoteForWa, waDigits } from './src/quote-template.mjs';
import { site } from './src/config.mjs';

loadEnv();

const ROOT = 'dist';
const PORT = Number(process.env.PORT) || 4321;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.js': 'application/javascript; charset=utf-8',
  '.webm': 'video/webm',
};

const json = (res, status, body) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(JSON.stringify(body));
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });

async function handleCotizacion(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'Método no permitido' });

  let input;
  try {
    input = JSON.parse(await readBody(req));
  } catch {
    return json(res, 400, { ok: false, error: 'JSON inválido' });
  }

  const empresa = String(input.empresa || '').trim();
  const email = String(input.email || '').trim();
  if (!empresa || !email) {
    return json(res, 400, { ok: false, error: 'Nombre/empresa y email son obligatorios' });
  }

  const payload = {
    empresa,
    email,
    telefono: String(input.telefono || '').trim(),
    tipo: String(input.tipo || '').trim(),
    cantidad: String(input.cantidad || '').trim(),
    detalle: String(input.detalle || '').trim(),
    unitPrice: process.env.QUOTE_UNIT_PRICE || null,
  };

  try {
    const { id, html } = buildQuoteHtml(payload);
    const pdf = await htmlToPdf({
      html,
      fileName: `Cotizacion-${id}-SanaVida.pdf`,
      apiKey: process.env.API2PDF_API_KEY,
    });
    const waText = summarizeQuoteForWa({ id, input: payload, fileUrl: pdf.FileUrl });
    const to = waDigits(payload.telefono, site.whatsapp);
    return json(res, 200, {
      ok: true,
      id,
      fileUrl: pdf.FileUrl,
      waUrl: `https://wa.me/${to}?text=${encodeURIComponent(waText)}`,
    });
  } catch (err) {
    console.error('cotizacion:', err.message);
    return json(res, 502, { ok: false, error: err.message || 'No se pudo generar el PDF' });
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/api/cotizacion') return handleCotizacion(req, res);

  let path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join(ROOT, path);
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { 'Content-Type': types['.html'] });
    res.end(await readFile(join(ROOT, '404.html')).catch(() => 'Not found'));
  }
}).listen(PORT, () => {
  const key = process.env.API2PDF_API_KEY ? 'sí' : 'NO';
  console.log(`→ http://localhost:${PORT}  (Api2Pdf: ${key})`);
});
