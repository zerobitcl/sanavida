import { site } from '../config.mjs';
import { shellPage } from '../shell.mjs';
import { icon } from '../components.mjs';

const kpis = [
  { label: 'Pedidos hoy', value: '—' },
  { label: 'Por confirmar', value: '—' },
  { label: 'En ruta', value: '—' },
  { label: 'Pagos pendientes', value: '—' },
];

const rows = [
  { id: 'SV-0001', cliente: 'Ejemplo', comuna: 'Ovalle', estado: 'Pendiente', pago: 'Por pagar', entrega: 'Punto Atenas' },
  { id: 'SV-0002', cliente: 'Ejemplo', comuna: 'La Serena', estado: 'Confirmado', pago: 'Transferido', entrega: 'Ruta jueves' },
  { id: 'SV-0003', cliente: 'Ejemplo', comuna: 'Coquimbo', estado: 'Entregado', pago: 'Pagado', entrega: 'Completado' },
];

const dashHtml = `
<div class="dash">
  <div class="dash-tools hero-actions" style="margin-bottom:1.5rem">
    <a class="btn btn-cta" href="/cotizacion/">Abrir cotizador PDF</a>
    <a class="btn btn-ghost" href="/pedido/">Ver pedidos públicos</a>
  </div>
  <div class="dash-kpis">
    ${kpis.map((k) => `<div class="dash-kpi"><span>${k.label}</span><strong>${k.value}</strong></div>`).join('')}
  </div>
  <div class="dash-panels">
    <section class="dash-panel" aria-labelledby="dash-pedidos">
      <h3 id="dash-pedidos">Pedidos (vista previa)</h3>
      <div class="dash-table-wrap">
        <table class="dash-table">
          <thead><tr><th>ID</th><th>Cliente</th><th>Comuna</th><th>Estado</th><th>Pago</th><th>Entrega</th></tr></thead>
          <tbody>
            ${rows.map((r) => `<tr><td>${r.id}</td><td>${r.cliente}</td><td>${r.comuna}</td><td><span class="dash-pill">${r.estado}</span></td><td>${r.pago}</td><td>${r.entrega}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>
    <section class="dash-panel" aria-labelledby="dash-ops">
      <h3 id="dash-ops">Cómo usarlo</h3>
      <ul class="shell-steps">
        <li><strong>Pedidos chicos</strong><span>Llegan por WhatsApp o el formulario /pedido.</span></li>
        <li><strong>Pedidos grandes</strong><span>Tú abres el cotizador, generas el PDF y se lo mandas al cliente.</span></li>
        <li><strong>Entregas</strong><span>Puntos Ovalle + rutas ${site.regionShort}.</span></li>
      </ul>
      <p class="shell-muted">Esta zona es interna (no aparece en el menú ni en Google). Guarda el enlace: <code>/dashboard/</code></p>
    </section>
  </div>
</div>`;

export default {
  ...shellPage({
    slug: 'dashboard',
    nav: 'Dashboard',
    tag: 'Ops',
    title: `Panel · ${site.name}`,
    description: 'Panel interno de pedidos, pagos, entregas y cotizaciones SanaVida.',
    eyebrow: 'Interno',
    h1: `Pedidos, pagos y <em>cotizaciones</em>`,
    lead: 'Cotizador PDF, pedidos y entregas.',
    hideCta: true,
    hideCtaBand: true,
    noindex: true,
    actions: `<a class="btn btn-cta" href="/cotizacion/">${icon('arrow')}<span>Ir al cotizador</span></a>`,
    blocks: [
      {
        id: 'panel',
        eyebrow: 'Panel',
        title: 'Resumen',
        html: dashHtml,
      },
    ],
  }),
  noindex: true,
};
