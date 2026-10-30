import { site } from './config.mjs';

/** Gate compartido para cotizador + dashboard. Misma clave en ambos. */
export function opsGateHtml(innerHtml) {
  return `
<div class="ops-gate" id="ops-gate">
  <form class="ops-gate-card" id="ops-gate-form" autocomplete="off">
    <p class="eyebrow">Acceso interno</p>
    <h2 class="h3">Clave de Paola</h2>
    <p class="lead" style="margin-bottom:1.25rem">Misma clave del cotizador y del panel.</p>
    <label class="field" for="ops-pin"><span>Clave</span>
      <input id="ops-pin" name="pin" type="password" inputmode="numeric" maxlength="8" pattern="[0-9]*" required placeholder="••••" autocomplete="current-password">
    </label>
    <p class="shell-form-status is-error" id="ops-gate-err" hidden role="alert"></p>
    <div class="hero-actions" style="margin-top:1.25rem">
      <button class="btn btn-cta" type="submit">Entrar</button>
    </div>
  </form>
</div>
<div id="ops-app" hidden>${innerHtml}</div>
<script>
(function () {
  var PIN = ${JSON.stringify(site.opsPin)};
  var KEY = 'sv_ops_ok';
  var gate = document.getElementById('ops-gate');
  var app = document.getElementById('ops-app');
  var form = document.getElementById('ops-gate-form');
  var err = document.getElementById('ops-gate-err');
  var input = document.getElementById('ops-pin');

  function unlock() {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    if (gate) gate.hidden = true;
    if (app) app.hidden = false;
    document.dispatchEvent(new CustomEvent('sv-ops-ready'));
  }

  function locked() {
    try { return sessionStorage.getItem(KEY) === '1'; } catch (e) { return false; }
  }

  window.svOpsPin = function () { return PIN; };
  window.svOpsHeaders = function (extra) {
    var h = Object.assign({ 'Content-Type': 'application/json', 'X-Ops-Pin': PIN }, extra || {});
    return h;
  };

  if (locked()) {
    unlock();
  } else if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = String((input && input.value) || '').trim();
      if (v === PIN) {
        err.hidden = true;
        unlock();
      } else {
        err.hidden = false;
        err.textContent = 'Clave incorrecta.';
        if (input) { input.value = ''; input.focus(); }
      }
    });
    if (input) setTimeout(function () { input.focus(); }, 50);
  }
})();
</script>`;
}
