import { site } from '../config.mjs';
import { shellPage, formField } from '../shell.mjs';
import { icon } from '../components.mjs';

const formHtml = `
<form class="shell-form" id="cotizacion-form">
  <div class="shell-form-grid">
    ${formField({ name: 'empresa', label: 'Empresa / nombre', placeholder: 'Ej. Café local, feria, oficina' })}
    ${formField({ name: 'email', label: 'Email', type: 'email', placeholder: 'hola@…' })}
    ${formField({ name: 'telefono', label: 'Teléfono', type: 'tel', required: false })}
    ${formField({
      name: 'tipo',
      label: 'Tipo de cotización',
      type: 'select',
      options: [
        { value: 'mayorista', label: 'Mayorista / revendedor' },
        { value: 'evento', label: 'Evento / catering' },
        { value: 'empresa', label: 'Empresa / wellness' },
        { value: 'otro', label: 'Otro' },
      ],
    })}
    ${formField({ name: 'cantidad', label: 'Cantidad estimada (litros / botellas)', placeholder: 'Ej. 20 botellas / semana' })}
    ${formField({
      name: 'detalle',
      label: 'Detalle',
      type: 'textarea',
      placeholder: 'Frecuencia, comuna de entrega, fecha…',
    })}
  </div>
  <p class="shell-form-note">Generamos un PDF premium con el logo SanaVida (Api2Pdf). Luego puedes avisar a Paola por WhatsApp con el enlace incluido.</p>
  <div class="hero-actions">
    <button class="btn btn-cta" type="submit" id="cotizacion-submit">Generar cotización PDF</button>
    <a class="btn btn-ghost" href="https://wa.me/${site.whatsapp}?text=${encodeURIComponent('Hola SanaVida, quiero una cotización de kéfir')}" target="_blank" rel="noopener">WhatsApp directo</a>
  </div>
  <p class="shell-form-status" id="cotizacion-status" hidden role="status"></p>
  <div class="shell-pdf-preview" id="cotizacion-preview" hidden>
    <p class="eyebrow">Tu cotización</p>
    <h3 class="h3" id="cotizacion-id">Cotización SanaVida</h3>
    <p class="lead">PDF listo para descargar o enviar. Incluye logo, datos del cliente y condiciones.</p>
    <div class="hero-actions">
      <a class="btn btn-cta" id="cotizacion-download" href="#" target="_blank" rel="noopener">Abrir PDF</a>
      <a class="btn btn-wa" id="cotizacion-wa" href="#" target="_blank" rel="noopener">${icon('wa')}<span>Avisar a Paola</span></a>
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
      detalle: fd.get('detalle') || ''
    };
    submitBtn.disabled = true;
    setStatus('Generando PDF con Api2Pdf…');
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
      setStatus('PDF generado. Ábrelo o avisa a Paola.');
      preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err) {
      setStatus(err.message || 'No se pudo generar el PDF. Prueba WhatsApp directo.', true);
    } finally {
      submitBtn.disabled = false;
    }
  });
})();
</script>`;

export default shellPage({
  slug: 'cotizacion',
  nav: 'Cotización',
  tag: 'B2B',
  title: `Cotización de kéfir artesanal | ${site.name}`,
  description: `Solicita una cotización PDF de kéfir SanaVida para empresas, eventos o venta mayorista en la ${site.regionShort}.`,
  eyebrow: 'Cotizaciones',
  h1: `Cotiza kéfir con PDF <em>premium</em>`,
  lead: 'Completa el formulario y descarga una cotización con logo SanaVida, sellos del producto y condiciones. Luego avisa a Paola por WhatsApp con un clic.',
  hideCta: true,
  blocks: [
    {
      id: 'formulario',
      eyebrow: 'Solicitud',
      title: 'Datos para cotizar',
      html: formHtml,
    },
  ],
});
