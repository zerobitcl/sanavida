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
  lead: `Texto legal en borrador estructural. Aquí van términos, privacidad, entregas y reembolsos. La razón social es ${site.legal.company} (RUT ${site.legal.rut}).`,
  stubNote: 'Esqueleto legal. Reemplazar cada bloque con el texto definitivo aprobado.',
  hideCta: true,
  hideCtaBand: true,
  blocks: [
    {
      id: 'terminos',
      eyebrow: '01',
      title: 'Términos y condiciones',
      lead: 'Uso del sitio, pedidos, precios, disponibilidad y aceptación del pedido.',
      html: `<div class="shell-legal prose">
        <p><em>Placeholder.</em> Incluir: identificación del prestador, objeto del servicio, proceso de compra/pedido, limitaciones de responsabilidad y jurisdicción (${site.legal.city}, Chile).</p>
      </div>`,
    },
    {
      id: 'privacidad',
      eyebrow: '02',
      title: 'Política de privacidad',
      lead: 'Qué datos pedimos, para qué, con quién se comparten y por cuánto tiempo.',
      html: `<div class="shell-legal prose">
        <p><em>Placeholder.</em> Datos del formulario de pedido/cotización, WhatsApp, cookies técnicas y derechos ARCO / Ley 19.628.</p>
      </div>`,
    },
    {
      id: 'entregas',
      eyebrow: '03',
      title: 'Política de entregas',
      lead: `Puntos gratis en ${site.city}, delivery local y rutas consolidadas en la ${site.regionShort}.`,
      html: `<div class="shell-legal prose">
        <p><em>Placeholder.</em> Plazos, zonas, costos, refrigeración y qué pasa si no hay nadie en el domicilio.</p>
      </div>`,
    },
    {
      id: 'reembolsos',
      eyebrow: '04',
      title: 'Cambios, devoluciones y reembolsos',
      lead: 'Producto vivo: reglas claras de frescura y calidad.',
      html: `<div class="shell-legal prose">
        <p><em>Placeholder.</em> Criterios de calidad, plazos de reclamo y canal de contacto (WhatsApp / email).</p>
        <p class="small">Resolución sanitaria SEREMI: N.º ${site.legal.seremi.resolution} · ${site.legal.seremi.date} · ${site.legal.seremi.authority}.</p>
      </div>`,
    },
  ],
});
