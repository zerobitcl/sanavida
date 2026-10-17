import { site } from '../config.mjs';
import { shellPage } from '../shell.mjs';

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
  <div class="dash-kpis">
    ${kpis.map((k) => `<div class="dash-kpi"><span>${k.label}</span><strong>${k.value}</strong></div>`).join('')}
  </div>
  <div class="dash-panels">
    <section class="dash-panel" aria-labelledby="dash-pedidos">
      <h3 id="dash-pedidos">Pedidos</h3>
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
      <h3 id="dash-ops">Operación</h3>
      <ul class="shell-steps">
        <li><strong>Pedidos</strong><span>Entrada desde /pedido y WhatsApp.</span></li>
        <li><strong>Pagos</strong><span>Transferencia / efectivo · conciliación manual primero.</span></li>
        <li><strong>Entregas</strong><span>Puntos Ovalle + rutas ${site.regionShort}.</span></li>
      </ul>
      <p class="shell-muted">Auth, base de datos y roles (Paola / admin) se conectan en la fase dinámica. Esta URL irá <code>noindex</code>.</p>
    </section>
  </div>
</div>`;

export default {
  ...shellPage({
    slug: 'dashboard',
    nav: 'Dashboard',
    tag: 'Ops',
    title: `Dashboard · ${site.name}`,
    description: 'Panel interno de pedidos, pagos y entregas SanaVida.',
    eyebrow: 'Interno',
    h1: `Pedidos, pagos y <em>entregas</em>`,
    lead: 'Vista operativa para Paola. Datos de ejemplo; sin login todavía.',
    stubNote: 'UI shell. Requiere auth, API y persistencia. No publicar en sitemap.',
    hideCta: true,
    hideCtaBand: true,
    noindex: true,
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
