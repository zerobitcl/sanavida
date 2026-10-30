import { site } from '../config.mjs';
import { shellPage } from '../shell.mjs';
import { icon } from '../components.mjs';
import { opsGateHtml } from '../ops-gate.mjs';

const dashInner = `
<div class="dash" id="dash-root">
  <div class="dash-tools hero-actions" style="margin-bottom:1.5rem">
    <a class="btn btn-cta" href="/cotizacion/">Cotizador PDF</a>
    <button class="btn btn-ghost" type="button" id="dash-refresh">Actualizar</button>
  </div>
  <p class="shell-form-status" id="dash-status" hidden role="status"></p>
  <div class="dash-kpis" id="dash-kpis">
    <div class="dash-kpi"><span>Pedidos hoy</span><strong>—</strong></div>
    <div class="dash-kpi"><span>Pendientes</span><strong>—</strong></div>
    <div class="dash-kpi"><span>Cotizaciones</span><strong>—</strong></div>
    <div class="dash-kpi"><span>Clientes</span><strong>—</strong></div>
  </div>
  <div class="dash-panels">
    <section class="dash-panel" aria-labelledby="dash-pedidos">
      <h3 id="dash-pedidos">Historial de pedidos</h3>
      <div class="dash-table-wrap">
        <table class="dash-table">
          <thead><tr><th>Fecha</th><th>Cliente</th><th>Teléfono</th><th>Comuna</th><th>Cant.</th><th>Estado</th></tr></thead>
          <tbody id="dash-orders"><tr><td colspan="6">Cargando…</td></tr></tbody>
        </table>
      </div>
    </section>
    <section class="dash-panel" aria-labelledby="dash-quotes">
      <h3 id="dash-quotes">Historial de PDF</h3>
      <div class="dash-table-wrap">
        <table class="dash-table">
          <thead><tr><th>Fecha</th><th>Cliente</th><th>Código</th><th>N.º</th><th>PDF</th></tr></thead>
          <tbody id="dash-quotes-body"><tr><td colspan="5">Cargando…</td></tr></tbody>
        </table>
      </div>
    </section>
    <section class="dash-panel" aria-labelledby="dash-clients" style="grid-column:1/-1">
      <h3 id="dash-clients">Clientes (por teléfono)</h3>
      <div class="dash-table-wrap">
        <table class="dash-table">
          <thead><tr><th>Nombre</th><th>Teléfono</th><th>Pedidos</th><th>Cotizaciones</th><th>Última actividad</th></tr></thead>
          <tbody id="dash-clients-body"><tr><td colspan="5">Cargando…</td></tr></tbody>
        </table>
      </div>
    </section>
  </div>
</div>
<script>
(function () {
  var STATUS_LABELS = {
    nuevo: 'Nuevo',
    confirmado: 'Confirmado',
    preparando: 'Preparando',
    en_camino: 'En camino',
    entregado: 'Pedido entregado',
    cancelado: 'Cancelado'
  };
  var STATUS_ORDER = ['nuevo','confirmado','preparando','en_camino','entregado','cancelado'];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function fmt(dt) {
    if (!dt) return '—';
    try {
      var d = new Date(String(dt).replace(' ', 'T'));
      return d.toLocaleString('es-CL', { dateStyle: 'short', timeStyle: 'short' });
    } catch (e) { return esc(dt); }
  }
  function ordLabel(n) {
    n = Number(n) || 1;
    if (n === 1) return '1º';
    return n + 'º';
  }
  function statusSelect(orderId, current) {
    var cur = STATUS_ORDER.indexOf(current) >= 0 ? current : 'nuevo';
    var opts = STATUS_ORDER.map(function (s) {
      return '<option value="' + s + '"' + (s === cur ? ' selected' : '') + '>' + esc(STATUS_LABELS[s] || s) + '</option>';
    }).join('');
    return '<select class="dash-status" data-order-id="' + esc(orderId) + '" aria-label="Estado del pedido">' + opts + '</select>';
  }

  async function setStatus(orderId, status, selectEl) {
    var statusEl = document.getElementById('dash-status');
    statusEl.hidden = false;
    statusEl.classList.remove('is-error');
    statusEl.textContent = 'Guardando estado…';
    try {
      var res = await fetch('/api/dashboard', {
        method: 'POST',
        headers: window.svOpsHeaders(),
        body: JSON.stringify({ action: 'set_status', orderId: Number(orderId), status: status })
      });
      var data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'No se pudo guardar');
      if (selectEl) selectEl.setAttribute('data-prev', status);
      statusEl.textContent = 'Estado actualizado.';
      setTimeout(function () { statusEl.hidden = true; }, 1200);
      load();
    } catch (err) {
      statusEl.classList.add('is-error');
      statusEl.textContent = err.message || 'Error al guardar estado.';
      if (selectEl && selectEl.getAttribute('data-prev')) selectEl.value = selectEl.getAttribute('data-prev');
    }
  }

  async function load() {
    var status = document.getElementById('dash-status');
    status.hidden = false;
    status.classList.remove('is-error');
    status.textContent = 'Actualizando…';
    try {
      var res = await fetch('/api/dashboard', {
        cache: 'no-store',
        headers: { 'X-Ops-Pin': window.svOpsPin ? window.svOpsPin() : '' }
      });
      var data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error((data.error || 'Error al cargar') + (data.detail ? ' — ' + data.detail : ''));
      }
      var k = data.kpis || {};
      document.getElementById('dash-kpis').innerHTML =
        '<div class="dash-kpi"><span>Pedidos hoy</span><strong>' + (k.orders_today || 0) + '</strong></div>' +
        '<div class="dash-kpi"><span>Pendientes</span><strong>' + (k.orders_open != null ? k.orders_open : (k.orders || 0)) + '</strong></div>' +
        '<div class="dash-kpi"><span>Cotizaciones</span><strong>' + (k.quotes || 0) + '</strong></div>' +
        '<div class="dash-kpi"><span>Clientes</span><strong>' + (k.clients || 0) + '</strong></div>';

      var orders = data.orders || [];
      document.getElementById('dash-orders').innerHTML = orders.length
        ? orders.map(function (o) {
            var badge = o.order_number > 1
              ? ' <span class="dash-pill">' + ordLabel(o.order_number) + ' pedido</span>'
              : '';
            return '<tr><td>' + fmt(o.created_at) + '</td><td>' + esc(o.name) + badge + '</td><td>' + esc(o.phone) + '</td><td>' + esc(o.comuna) + '</td><td>' + esc(o.cantidad) + '</td><td>' + statusSelect(o.id, o.status || 'nuevo') + '</td></tr>';
          }).join('')
        : '<tr><td colspan="6">Aún no hay pedidos guardados.</td></tr>';

      document.querySelectorAll('.dash-status').forEach(function (sel) {
        sel.setAttribute('data-prev', sel.value);
        sel.addEventListener('change', function () {
          setStatus(sel.getAttribute('data-order-id'), sel.value, sel);
        });
      });

      var quotes = data.quotes || [];
      document.getElementById('dash-quotes-body').innerHTML = quotes.length
        ? quotes.map(function (q) {
            var badge = q.quote_number > 1
              ? ' <span class="dash-pill">' + ordLabel(q.quote_number) + ' cotización</span>'
              : '';
            var pdf = q.pdf_url
              ? '<a href="' + esc(q.pdf_url) + '" target="_blank" rel="noopener">Abrir</a>'
              : '—';
            return '<tr><td>' + fmt(q.created_at) + '</td><td>' + esc(q.empresa) + badge + '</td><td>' + esc(q.quote_code) + '</td><td>' + esc(q.quote_number) + '</td><td>' + pdf + '</td></tr>';
          }).join('')
        : '<tr><td colspan="5">Aún no hay cotizaciones PDF.</td></tr>';

      var clients = data.clients || [];
      document.getElementById('dash-clients-body').innerHTML = clients.length
        ? clients.map(function (c) {
            return '<tr><td>' + esc(c.name || '—') + '</td><td>' + esc(c.phone) + '</td><td>' + esc(c.orders_count) + '</td><td>' + esc(c.quotes_count) + '</td><td>' + fmt(c.last_seen_at) + '</td></tr>';
          }).join('')
        : '<tr><td colspan="5">Aún no hay clientes.</td></tr>';

      status.textContent = 'Actualizado.';
      setTimeout(function () { status.hidden = true; }, 1500);
    } catch (err) {
      status.classList.add('is-error');
      status.textContent = err.message || 'No se pudo cargar el panel.';
      document.getElementById('dash-orders').innerHTML = '<tr><td colspan="6">Error al cargar.</td></tr>';
      document.getElementById('dash-quotes-body').innerHTML = '<tr><td colspan="5">Error al cargar.</td></tr>';
      document.getElementById('dash-clients-body').innerHTML = '<tr><td colspan="5">Error al cargar.</td></tr>';
    }
  }

  function boot() {
    var btn = document.getElementById('dash-refresh');
    if (btn) btn.addEventListener('click', load);
    load();
  }

  if (document.getElementById('ops-app') && !document.getElementById('ops-app').hidden) boot();
  else document.addEventListener('sv-ops-ready', boot, { once: true });
})();
</script>`;

const dashHtml = opsGateHtml(dashInner);

export default {
  ...shellPage({
    slug: 'dashboard',
    nav: 'Dashboard',
    tag: 'Ops',
    title: `Panel · ${site.name}`,
    description: 'Panel de pedidos, clientes y cotizaciones SanaVida.',
    eyebrow: site.name,
    h1: `Pedidos, clientes y <em>cotizaciones</em>`,
    hideCta: true,
    hideCtaBand: true,
    noindex: true,
    actions: `<a class="btn btn-cta" href="/cotizacion/">${icon('arrow')}<span>Cotizador PDF</span></a>`,
    blocks: [
      {
        id: 'panel',
        title: 'Historial',
        html: dashHtml,
      },
    ],
  }),
  noindex: true,
};
