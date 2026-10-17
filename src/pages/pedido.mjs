import { site } from '../config.mjs';
import { shellPage, formField } from '../shell.mjs';
import { icon } from '../components.mjs';

const formHtml = `
<form class="shell-form" id="pedido-form">
  <div class="shell-form-grid">
    ${formField({ name: 'nombre', label: 'Tu nombre', placeholder: 'Ej. Camila' })}
    ${formField({ name: 'telefono', label: 'WhatsApp / teléfono', type: 'tel', placeholder: '+56 9 …' })}
    ${formField({
      name: 'comuna',
      label: 'Comuna',
      type: 'select',
      options: site.cities,
    })}
    ${formField({
      name: 'cantidad',
      label: 'Cantidad (botellas 1L)',
      type: 'select',
      options: ['1', '2', '3', '4', '5+'],
    })}
    ${formField({
      name: 'entrega',
      label: 'Tipo de entrega',
      type: 'select',
      options: [
        { value: 'punto', label: 'Punto de retiro gratis (Ovalle)' },
        { value: 'domicilio', label: 'Domicilio' },
        { value: 'ruta', label: 'Ruta consolidada (fuera de Ovalle)' },
      ],
    })}
    ${formField({
      name: 'notas',
      label: 'Notas (opcional)',
      type: 'textarea',
      required: false,
      placeholder: 'Dirección, horario preferido, primera vez…',
    })}
  </div>
  <p class="shell-form-note">Al enviar se guarda tu pedido y se abre WhatsApp para confirmarlo.</p>
  <p class="shell-form-status" id="pedido-status" hidden role="status"></p>
  <button class="btn btn-cta" type="submit" id="pedido-submit">${icon('wa')}<span>Enviar pedido</span></button>
</form>
<script>
(function () {
  var form = document.getElementById('pedido-form');
  var statusEl = document.getElementById('pedido-status');
  var submitBtn = document.getElementById('pedido-submit');
  if (!form) return;
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    var payload = {
      nombre: fd.get('nombre') || '',
      telefono: fd.get('telefono') || '',
      comuna: fd.get('comuna') || '',
      cantidad: fd.get('cantidad') || '',
      entrega: fd.get('entrega') || '',
      notas: fd.get('notas') || ''
    };
    submitBtn.disabled = true;
    statusEl.hidden = false;
    statusEl.classList.remove('is-error');
    statusEl.textContent = 'Guardando pedido…';
    try {
      var res = await fetch('/api/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      var data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'No se pudo guardar');
      statusEl.textContent = data.isReturning
        ? ('Pedido N.º ' + data.orderNumber + ' registrado. Abriendo WhatsApp…')
        : 'Pedido registrado. Abriendo WhatsApp…';
      if (data.waUrl) window.open(data.waUrl, '_blank', 'noopener');
    } catch (err) {
      statusEl.classList.add('is-error');
      statusEl.textContent = err.message || 'Error al guardar. Intenta de nuevo.';
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
</script>`;

export default shellPage({
  slug: 'pedido',
  nav: 'Pedir',
  tag: 'Pedido',
  title: `Pedir kéfir natural | ${site.name}`,
  description: `Formulario de pedido de kéfir SanaVida. Coordinamos entrega en ${site.city} y toda la ${site.regionShort}.`,
  eyebrow: 'Pedidos',
  h1: `Haz tu pedido y te <em>confirmamos</em>`,
  lead: `Completa el formulario y te respondemos por WhatsApp para coordinar cantidad, día y entrega en la ${site.regionShort}.`,
  hideCta: true,
  actions: `<a class="btn btn-ghost" href="/pedido-kefir-iv-region/">Cómo funcionan las entregas</a>
    <a class="btn btn-ghost" href="/catalogo/">Ver catálogo</a>`,
  blocks: [
    {
      id: 'formulario',
      eyebrow: 'Formulario',
      title: 'Datos del pedido',
      html: formHtml,
    },
    {
      id: 'flujo',
      eyebrow: 'Flujo',
      title: 'Qué pasa después',
      html: `<ol class="shell-steps">
        <li><strong>Tú envías el pedido</strong><span>Con comuna, cantidad y tipo de entrega.</span></li>
        <li><strong>Te confirmamos</strong><span>Disponibilidad, día y costo si aplica.</span></li>
        <li><strong>Preparamos y entregamos</strong><span>Kéfir fresco, refrigerado al llegar.</span></li>
      </ol>`,
    },
  ],
});
