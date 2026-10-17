import { site } from '../config.mjs';
import { shellPage, formField } from '../shell.mjs';
import { icon } from '../components.mjs';

// El submit real (API → aviso a Paola) llega en la fase dinámica.
// Mientras tanto el form arma un mensaje de WhatsApp con los campos.
const formHtml = `
<form class="shell-form" id="pedido-form" action="${`https://wa.me/${site.whatsapp}`}" method="get" target="_blank" rel="noopener">
  <input type="hidden" name="text" id="pedido-wa-text" value="">
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
  <p class="shell-form-note">Al enviar se abre WhatsApp con tu pedido armado para que Paola lo reciba. Más adelante: aviso automático + panel en el dashboard.</p>
  <button class="btn btn-cta" type="submit">${icon('wa')}<span>Enviar pedido a Paola</span></button>
</form>
<script>
(function () {
  var form = document.getElementById('pedido-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fd = new FormData(form);
    var lines = [
      'Hola SanaVida / Paola, quiero hacer un pedido:',
      '• Nombre: ' + (fd.get('nombre') || ''),
      '• Teléfono: ' + (fd.get('telefono') || ''),
      '• Comuna: ' + (fd.get('comuna') || ''),
      '• Cantidad: ' + (fd.get('cantidad') || '') + ' botella(s)',
      '• Entrega: ' + (fd.get('entrega') || ''),
      '• Notas: ' + (fd.get('notas') || '—')
    ];
    window.open('https://wa.me/${site.whatsapp}?text=' + encodeURIComponent(lines.join('\\n')), '_blank', 'noopener');
  });
})();
</script>`;

export default shellPage({
  slug: 'pedido',
  nav: 'Pedir',
  tag: 'Pedido',
  title: `Pedir kéfir artesanal | ${site.name}`,
  description: `Formulario de pedido de kéfir SanaVida. Coordinamos entrega en ${site.city} y toda la ${site.regionShort}. Aviso directo a Paola.`,
  eyebrow: 'Pedidos',
  h1: `Haz tu pedido y <em>Paola</em> te responde`,
  lead: `Completa el formulario. Por ahora el aviso llega por WhatsApp; en la siguiente fase el mismo dato alimenta el dashboard de pedidos, pagos y entregas.`,
  stubNote: 'Formulario listo. Falta API + notificación estructurada a Paola + sync con dashboard.',
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
        <li><strong>Paola confirma</strong><span>Disponibilidad, día y costo si aplica.</span></li>
        <li><strong>Preparamos y entregamos</strong><span>Kéfir fresco, refrigerado al llegar.</span></li>
      </ol>`,
    },
  ],
});
