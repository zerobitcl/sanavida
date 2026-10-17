import { loadEnv } from '../src/env.mjs';
import { htmlToPdf } from '../src/api2pdf.mjs';
import { buildQuoteHtml } from '../src/quote-template.mjs';

loadEnv();

const { id, html } = buildQuoteHtml({
  empresa: 'Café Demo Ovalle',
  email: 'demo@sanavida.cl',
  telefono: '+56 9 0000 0000',
  tipo: 'mayorista',
  cantidad: '24 botellas / semana',
  detalle: 'Entrega jueves · Sector Atenas',
  unitPrice: process.env.QUOTE_UNIT_PRICE || null,
});

const pdf = await htmlToPdf({
  html,
  fileName: `Cotizacion-${id}-test.pdf`,
  apiKey: process.env.API2PDF_API_KEY,
});

console.log('✓', id);
console.log(pdf.FileUrl);
