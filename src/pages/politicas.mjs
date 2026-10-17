import { site } from '../config.mjs';
import { shellPage } from '../shell.mjs';

export default shellPage({
  slug: 'politicas',
  nav: 'Políticas',
  tag: 'Legal',
  title: `Políticas y condiciones | ${site.name}`,
  description: `Términos de uso, privacidad, entregas y condiciones de ${site.name} (${site.legal.company}).`,
  eyebrow: 'Legal',
  h1: `Políticas y <em>condiciones</em>`,
  lead: `${site.legal.company} (RUT ${site.legal.rut}) · ${site.legal.address}, ${site.legal.city}, Chile.`,
  hideCta: true,
  hideCtaBand: true,
  blocks: [
    {
      id: 'terminos',
      eyebrow: '01',
      title: 'Términos y condiciones',
      html: `<div class="shell-legal prose">
        <p>El sitio y los pedidos de ${site.name} son operados por <strong>${site.legal.company}</strong> (RUT ${site.legal.rut}), con domicilio en ${site.legal.address}, ${site.legal.city}, ${site.legal.region}, Chile.</p>
        <p>Al solicitar un pedido aceptas la disponibilidad del producto, el precio informado y la coordinación de entrega o retiro según tu comuna. Los pedidos se confirman por WhatsApp u otro canal acordado.</p>
        <p>La jurisdicción aplicable es la de los tribunales de ${site.legal.city}, Chile.</p>
      </div>`,
    },
    {
      id: 'privacidad',
      eyebrow: '02',
      title: 'Política de privacidad',
      html: `<div class="shell-legal prose">
        <p>Usamos tus datos (nombre, teléfono, email, comuna y notas de pedido) solo para gestionar pedidos, cotizaciones, entregas y atención al cliente.</p>
        <p>No vendemos tu información. Puedes pedir acceso, corrección o eliminación escribiéndonos por WhatsApp.</p>
      </div>`,
    },
    {
      id: 'entregas',
      eyebrow: '03',
      title: 'Política de entregas',
      html: `<div class="shell-legal prose">
        <p>En ${site.city} hay puntos de retiro gratis y domicilio con cargo informado al confirmar. En el resto de la ${site.regionShort} coordinamos rutas consolidadas según demanda.</p>
        <p>El kéfir es un producto refrigerado: conviene recibirlo y guardarlo entre 4° y 8°C de inmediato.</p>
      </div>`,
    },
    {
      id: 'reembolsos',
      eyebrow: '04',
      title: 'Cambios, devoluciones y reembolsos',
      html: `<div class="shell-legal prose">
        <p>Si el producto llega en mal estado o con un problema de calidad atribuible a nosotros, contáctanos el mismo día por WhatsApp con una foto y resolvemos el caso.</p>
        <p class="small">Resolución sanitaria SEREMI: N.º ${site.legal.seremi.resolution} · ${site.legal.seremi.date} · ${site.legal.seremi.authority}.</p>
      </div>`,
    },
  ],
});
