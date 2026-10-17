import { site } from '../config.mjs';
import { shellPage, formField } from '../shell.mjs';
import { icon } from '../components.mjs';

// Herramienta INTERNA para Paola: genera PDF de pedidos grandes y lo manda al cliente.
const formHtml = `
<form class="shell-form" id="cotizacion-form">
  <div class="shell-form-grid">
    ${formField({ name: 'empresa', label: 'Nombre del cliente / empresa', placeholder: 'Ej. Café Local, feria, oficina' })}
    ${formField({ name: 'email', label: 'Email del cliente', type: 'email', placeholder: 'cliente@…' })}
    ${formField({ name: 'telefono', label: 'WhatsApp del cliente', type: 'tel', placeholder: '569… (para enviarle el PDF)' })}
    ${formField({
      name: 'tipo',
      label: 'Tipo de pedido',
      type: 'select',
      options: [
        { value: 'mayorista', label: 'Mayorista / revendedor' },
        { value: 'evento', label: 'Evento / catering' },
        { value: 'empresa', label: 'Empresa / wellness' },
        { value: 'otro', label: 'Otro' },
      ],
    })}
    ${formField({ name: 'cantidad', label: 'Cantidad (botellas 1 L)', placeholder: 'Ej. 24' })}
    ${formField({
      name: 'detalle',
      label: 'Notas (entrega, frecuencia, descuento…)',
      type: 'textarea',
      required: false,
      placeholder: 'Comuna, día de entrega, condiciones especiales…',
    })}
  </div>
  <p class="shell-form-note">Uso interno: rellena los datos del cliente, genera el PDF con logo y precio ($8.000), y envíaselo por WhatsApp.</p>
  <div class="hero-actions">
    <button class="btn btn-cta" type="submit" id="cotizacion-submit">Generar PDF</button>
    <a class="btn btn-ghost" href="/dashboard/">Volver al panel</a>
  </div>
  <p class="shell-form-status" id="cotizacion-status" hidden role="status"></p>
  <div class="shell-pdf-preview" id="cotizacion-preview" hidden>
    <p class="eyebrow">Listo</p>
    <h3 class="h3" id="cotizacion-id">Cotización SanaVida</h3>
    <p class="lead">Abre el PDF o envíaselo al cliente por WhatsApp.</p>
    <div class="hero-actions">
      <a class="btn btn-cta" id="cotizacion-download" href="#" target="_blank" rel="noopener">Abrir PDF</a>
      <a class="btn btn-wa" id="cotizacion-wa" href="#" target="_blank" rel="noopener">${icon('wa')}<span>Enviar al cliente</span></a>
    </div>
  </div>
</form>
<script>
(function () {
  var form = document.getElementById('cotizacion-form');
  var statusEl = document.getElementById('cotizacion-status');
  var preview = document.getElementById('cotizacion-preview');
  var submitBtn = document.getElementById('cotizacion-submit');
  if (!form) return;

  function setStatus(msg, isError) {
    statusEl.hidden = !msg;
    statusEl.textContent = msg || '';
    statusEl.classList.toggle('is-error', !!isError);
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    var payload = {
      empresa: fd.get('empresa') || '',
      email: fd.get('email') || '',
      telefono: fd.get('telefono') || '',
      tipo: fd.get('tipo') || '',
      cantidad: fd.get('cantidad') || '',
      detalle: fd.get('detalle') || '',
      interno: true
    };
    submitBtn.disabled = true;
    setStatus('Generando PDF…');
    preview.hidden = true;
    try {
      var res = await fetch('/api/cotizacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      var data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Error al generar PDF');
      document.getElementById('cotizacion-id').textContent = 'Cotización ' + data.id;
      document.getElementById('cotizacion-download').href = data.fileUrl;
      document.getElementById('cotizacion-wa').href = data.waUrl;
      preview.hidden = false;
      setStatus('PDF listo. Ábrelo o envíalo al cliente.');
      preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err) {
      setStatus(err.message || 'No se pudo generar el PDF.', true);
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
</script>`;

export default {
  ...shellPage({
    slug: 'cotizacion',
    nav: 'Cotización',
    tag: 'Interno',
    title: `Cotizador interno · ${site.name}`,
    description: 'Herramienta interna para generar cotizaciones PDF de pedidos grandes.',
    eyebrow: 'Solo Paola',
    h1: `Cotizador para pedidos <em>grandes</em>`,
    lead: 'Arma una cotización con logo y precio, descárgala y envíasela al cliente por WhatsApp. Los pedidos chicos siguen por el formulario público o WhatsApp.',
    hideCta: true,
    hideCtaBand: true,
    noindex: true,
    blocks: [
      {
        id: 'formulario',
        eyebrow: 'Nueva cotización',
        title: 'Datos del cliente',
        html: formHtml,
      },
    ],
  }),
  noindex: true,
};
