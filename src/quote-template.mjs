import { readFileSync, existsSync } from 'node:fs';
import { site, clp } from './config.mjs';

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const TIPO_LABEL = {
  mayorista: 'Mayorista / revendedor',
  evento: 'Evento / catering',
  empresa: 'Empresa / wellness',
  otro: 'Otro',
};

function logoDataUri() {
  const path = 'public/img/brand/logo-480.png';
  if (!existsSync(path)) return '';
  const b64 = readFileSync(path).toString('base64');
  return `data:image/png;base64,${b64}`;
}

function parseQty(raw) {
  const n = parseInt(String(raw || '').replace(/[^\d]/g, ''), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function quoteId() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const r = Math.floor(1000 + Math.random() * 9000);
  return `SV-${y}${m}${day}-${r}`;
}

/**
 * HTML premium A4 para Api2Pdf. Logo embebido en base64 (no depende de URL pública).
 */
export function buildQuoteHtml(input) {
  const id = quoteId();
  const today = new Date().toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const logo = logoDataUri();
  const tipo = TIPO_LABEL[input.tipo] || input.tipo || '—';
  const qty = parseQty(input.cantidad);
  const unitPrice = input.unitPrice != null && input.unitPrice !== '' ? Number(input.unitPrice) : null;
  const hasPrice = Number.isFinite(unitPrice) && unitPrice > 0;
  const lineQty = qty || 1;
  const subtotal = hasPrice ? unitPrice * lineQty : null;
  const qtyLabel = input.cantidad?.trim() || (qty ? `${qty} botella(s)` : 'Por definir');

  const priceCell = hasPrice ? clp(unitPrice) : 'Por confirmar';
  const totalCell = hasPrice ? clp(subtotal) : 'Por confirmar';

  return { id, html: `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>Cotización ${esc(id)} · ${esc(site.name)}</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body {
    margin: 0; padding: 0;
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    color: #2a1030; font-size: 11.5px; line-height: 1.45;
    background: #fffcf8;
  }
  .page { padding: 28px 32px 36px; min-height: 100vh; position: relative; }
  .page::before {
    content: ''; position: absolute; inset: 0 0 auto 0; height: 8px;
    background: linear-gradient(90deg, #4a2574, #d81b60 55%, #f59e0b);
  }
  .top {
    display: flex; justify-content: space-between; align-items: flex-start;
    gap: 24px; padding-top: 12px; margin-bottom: 28px;
  }
  .brand img { height: 64px; width: auto; display: block; }
  .brand .tag {
    margin-top: 6px; font-size: 9px; letter-spacing: .14em; text-transform: uppercase;
    color: #6b5670; font-weight: 600;
  }
  .meta { text-align: right; }
  .meta .doc {
    font-size: 22px; font-weight: 700; letter-spacing: .04em; color: #4a2574;
    margin: 0 0 4px;
  }
  .meta .id { font-size: 13px; font-weight: 600; color: #d81b60; margin: 0 0 8px; }
  .meta p { margin: 0; color: #6b5670; font-size: 10.5px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 22px; }
  .card {
    background: #fff; border: 1px solid #e7d8e6; border-radius: 14px; padding: 14px 16px;
  }
  .card h2 {
    margin: 0 0 8px; font-size: 9px; letter-spacing: .14em; text-transform: uppercase;
    color: #4a2574; font-weight: 700;
  }
  .card p { margin: 0 0 4px; }
  .card strong { color: #2a1030; }
  .muted { color: #6b5670; }
  .intro {
    margin: 0 0 18px; padding: 14px 16px; border-radius: 14px;
    background: linear-gradient(135deg, #faf3f8, #eef7fd); border: 1px solid #e7d8e6;
  }
  .intro strong { color: #4a2574; }
  table {
    width: 100%; border-collapse: collapse; margin: 0 0 18px;
    background: #fff; border-radius: 14px; overflow: hidden;
  }
  thead th {
    background: #4a2574; color: #fff; text-align: left; font-size: 9px;
    letter-spacing: .1em; text-transform: uppercase; padding: 10px 12px; font-weight: 600;
  }
  tbody td { padding: 12px; border-bottom: 1px solid #e7d8e6; vertical-align: top; }
  tbody tr:last-child td { border-bottom: none; }
  .num { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .item-name { font-weight: 700; color: #4a2574; margin: 0 0 2px; }
  .item-sub { margin: 0; color: #6b5670; font-size: 10.5px; }
  .totals {
    margin-left: auto; width: 260px; background: #fff;
    border: 1px solid #e7d8e6; border-radius: 14px; overflow: hidden; margin-bottom: 22px;
  }
  .totals div {
    display: flex; justify-content: space-between; padding: 8px 14px;
    border-bottom: 1px solid #e7d8e6; font-size: 11px;
  }
  .totals div:last-child {
    border: none; background: #4a2574; color: #fff; font-weight: 700; font-size: 13px; padding: 12px 14px;
  }
  .notes h2, .terms h2 {
    margin: 0 0 8px; font-size: 9px; letter-spacing: .14em; text-transform: uppercase;
    color: #4a2574; font-weight: 700;
  }
  .notes, .terms { margin-bottom: 16px; }
  .notes p, .terms li { color: #3d2a42; margin: 0 0 6px; }
  .terms ul { margin: 0; padding-left: 16px; }
  .terms li { margin-bottom: 4px; font-size: 10.5px; color: #6b5670; }
  .seal {
    display: flex; gap: 8px; flex-wrap: wrap; margin: 14px 0 18px;
  }
  .seal span {
    font-size: 9px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase;
    padding: 5px 10px; border-radius: 999px; background: #eef7fd; color: #00897b; border: 1px solid #c5e4df;
  }
  .sign {
    display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 28px;
  }
  .sign .line {
    border-top: 1px solid #e7d8e6; padding-top: 8px; margin-top: 36px;
    font-size: 10px; color: #6b5670;
  }
  .foot {
    margin-top: 28px; padding-top: 12px; border-top: 1px solid #e7d8e6;
    font-size: 9.5px; color: #6b5670; display: flex; justify-content: space-between; gap: 16px;
  }
  .accent { color: #d81b60; font-weight: 700; }
</style>
</head>
<body>
  <div class="page">
    <header class="top">
      <div class="brand">
        ${logo ? `<img src="${logo}" alt="${esc(site.name)}" width="180" height="120">` : `<div style="font-size:28px;font-weight:700;color:#4a2574">${esc(site.brandDisplay)}</div>`}
        <div class="tag">${esc(site.tagline)}</div>
      </div>
      <div class="meta">
        <p class="doc">COTIZACIÓN</p>
        <p class="id">${esc(id)}</p>
        <p>Fecha: ${esc(today)}</p>
        <p>Válida por 15 días</p>
        <p>${esc(site.city)}, ${esc(site.regionShort)}</p>
      </div>
    </header>

    <div class="grid-2">
      <div class="card">
        <h2>Cliente</h2>
        <p><strong>${esc(input.empresa || '—')}</strong></p>
        <p class="muted">${esc(input.email || '—')}</p>
        ${input.telefono ? `<p class="muted">${esc(input.telefono)}</p>` : ''}
        <p class="muted">Tipo: ${esc(tipo)}</p>
      </div>
      <div class="card">
        <h2>Emisor</h2>
        <p><strong>${esc(site.name)}</strong></p>
        <p class="muted">${esc(site.legal.company)}</p>
        <p class="muted">RUT ${esc(site.legal.rut)}</p>
        <p class="muted">${esc(site.legal.address)}, ${esc(site.legal.city)}</p>
        <p class="muted">WhatsApp +${esc(site.whatsapp)}</p>
      </div>
    </div>

    <p class="intro">
      Gracias por tu interés en el <strong>kéfir natural SanaVida</strong>: cultivo vivo, sin pasteurizar,
      100% natural. Esta cotización resume tu solicitud para que Paola la confirme y coordine entrega en la ${esc(site.regionShort)}.
    </p>

    <div class="seal">
      ${site.product.seals.slice(0, 4).map((s) => `<span>${esc(s.label)}</span>`).join('')}
    </div>

    <table>
      <thead>
        <tr>
          <th>Descripción</th>
          <th class="num">Cantidad</th>
          <th class="num">P. unitario</th>
          <th class="num">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p class="item-name">${esc(site.product.shortName)}</p>
            <p class="item-sub">${esc(site.product.size)} · ${esc(site.product.flavor)} · Botella · Búlgaros vivos</p>
          </td>
          <td class="num">${esc(qtyLabel)}</td>
          <td class="num">${esc(priceCell)}</td>
          <td class="num"><strong>${esc(hasPrice ? clp(unitPrice * lineQty) : totalCell)}</strong></td>
        </tr>
        ${
          input.detalle
            ? `<tr><td colspan="4"><p class="item-sub"><strong>Detalle del cliente:</strong> ${esc(input.detalle)}</p></td></tr>`
            : ''
        }
      </tbody>
    </table>

    <div class="totals">
      <div><span class="muted">Subtotal</span><span>${esc(totalCell)}</span></div>
      <div><span class="muted">Despacho</span><span>Según comuna / ruta</span></div>
      <div><span>Total estimado</span><span>${esc(totalCell)}</span></div>
    </div>

    ${
      !hasPrice
        ? `<div class="notes"><h2>Precios</h2><p>Los valores unitarios se confirman según <span class="accent">volumen y frecuencia</span>. Paola te responderá con el monto final y la fecha de entrega.</p></div>`
        : `<div class="notes"><h2>Nota</h2><p>Precios de referencia en CLP. Despacho y consolidación de ruta se cotizan aparte según comuna.</p></div>`
    }

    <div class="terms">
      <h2>Condiciones</h2>
      <ul>
        <li>Producto refrigerado: mantener entre 4° y 8°C. Consumir preferentemente en 7–10 días.</li>
        <li>Entregas en ${esc(site.city)} (puntos gratis / domicilio) y rutas consolidadas en la ${esc(site.regionShort)}.</li>
        <li>Cotización referencial · validez 15 días · sujeta a disponibilidad de elaboración natural.</li>
        <li>Res. Exenta SEREMI N.º ${esc(site.legal.seremi.resolution)} · ${esc(site.legal.seremi.authority)}.</li>
      </ul>
    </div>

    <div class="sign">
      <div><div class="line">Firma / aceptación cliente</div></div>
      <div><div class="line">${esc(site.maker.name)} · ${esc(site.maker.role)}</div></div>
    </div>

    <div class="foot">
      <span>${esc(site.instagramHandle)} · ${esc(site.claims.slogan)}</span>
      <span>${esc(site.legal.company)} · ${esc(site.legal.rut)}</span>
    </div>
  </div>
</body>
</html>` };
}

/** Mensaje que Paola le manda al cliente con el PDF. */
export function summarizeQuoteForWa({ id, input, fileUrl }) {
  const nombre = input.empresa || 'hola';
  return [
    `Hola ${nombre}, te envío la cotización ${id} de SanaVida (kéfir natural).`,
    input.cantidad ? `• Cantidad: ${input.cantidad}` : '',
    fileUrl ? `• PDF: ${fileUrl}` : '',
    'Cualquier duda, me escribes por aquí 😊',
  ]
    .filter(Boolean)
    .join('\n');
}

/** Normaliza teléfono a dígitos internacionales (Chile: asume 9XXXXXXXX → 569…). */
export function waDigits(raw, fallback = site.whatsapp) {
  let d = String(raw || '').replace(/\D+/g, '');
  if (!d) return String(fallback || '').replace(/\D+/g, '');
  if (d.length === 9 && d.startsWith('9')) d = `56${d}`;
  if (d.length === 8) d = `569${d}`;
  return d;
}
