import { landing } from '../landing.mjs';
import { site, clp } from '../config.mjs';

const cityList = site.cities.join(', ');

export default landing({
  slug: 'pedido-kefir-iv-region',
  nav: `Pedido kéfir ${site.regionShort}`,
  tag: 'Entregas',
  title: `Pedir kéfir en la ${site.regionShort}: Ovalle, La Serena y Coquimbo`,
  description: `Cómo pedir kéfir artesanal en la ${site.region}. Puntos gratis en Ovalle y entregas consolidadas a La Serena, Coquimbo y más comunas. WhatsApp.`,
  eyebrow: `Cobertura ${site.regionShort}`,
  h1: `Cómo pedir kéfir en la ${site.regionShort}: <em>Ovalle</em> y el resto de la región`,
  lead: `Elaboramos en ${site.city} y repartimos en toda la ${site.region}. En Ovalle hay puntos fijos semanales. En La Serena, Coquimbo y otras comunas juntamos pedidos y armamos la ruta.`,
  cta: 'Quiero pedir kéfir',
  ctaMsg: `Hola SanaVida, quiero pedir kéfir en la ${site.regionShort}. Estoy en:`,
  keyFacts: [
    `Base de elaboración: ${site.city}.`,
    'Puntos de retiro gratis cada semana en Ovalle.',
    `Delivery en Ovalle por ${clp(site.deliveryFee)}.`,
    'Resto de la región: entregas consolidadas por WhatsApp.',
  ],
  showDelivery: false,
  sections: [
    {
      id: 'como-pedir',
      title: 'Cómo hacer tu pedido',
      html: `<ol class="steps-list">
<li>Escríbenos por <strong>WhatsApp</strong> e indícanos tu comuna y si prefieres punto de retiro o domicilio.</li>
<li>Te confirmamos disponibilidad, fecha y (si aplica) costo de traslado.</li>
<li>Preparamos el kéfir fresco y te avisamos cuando esté listo para entregar.</li>
</ol>
<p>No hay carrito online a propósito: así coordinamos cantidades reales y llegas a recibir un producto vivo, no uno que lleva días en tránsito.</p>`,
    },
    {
      id: 'ovalle',
      title: `Entregas en ${site.city}`,
      html: `<p>En ${site.city} el ritmo es semanal y predecible:</p>
<ul>${site.deliveryPoints.map((p) => `<li><strong>${p.name}</strong> — ${p.note}</li>`).join('')}</ul>
<p>Si prefieres domicilio dentro de ${site.city}, el adicional es de <strong>${clp(site.deliveryFee)}</strong>.</p>`,
    },
    {
      id: 'region',
      title: `La Serena, Coquimbo y resto de la ${site.regionShort}`,
      html: `<p>Si estás fuera de ${site.city}, igual puedes pedir. El modelo es de <strong>ruta consolidada</strong>: cuando se juntan pedidos suficientes hacia una zona (por ejemplo La Serena–Coquimbo), coordinamos día y punto de entrega.</p>
<p>Comunas que ya atendemos o podemos incluir:</p>
<ul>${site.cities.map((c) => `<li>${c}</li>`).join('')}</ul>
<p>Mientras más pedidos haya en tu zona, más frecuente se vuelve la ruta. Tú ayudas a construirla.</p>`,
    },
    {
      id: 'que-recibes',
      title: 'Qué recibes',
      html: `<ul>
<li>Kéfir de leche <strong>artesanal</strong>, sin pasteurizar después de fermentar.</li>
<li>Sin azúcar añadida ni conservantes.</li>
<li>Entrega fresca, pensada para consumir en la semana.</li>
</ul>
<p>Si es tu primera vez, lee <a href="/como-tomar-kefir/">cómo empezar a tomar kéfir</a> antes del primer sorbo.</p>`,
    },
  ],
  howTo: {
    name: `Cómo pedir kéfir en la ${site.region}`,
    steps: [
      'Escribe por WhatsApp indicando tu comuna y preferencia de entrega.',
      'Confirma fecha, punto o domicilio y forma de pago.',
      'Recibe el kéfir fresco en la fecha acordada.',
    ],
  },
  faqs: [
    { q: '¿Cuánto demora una entrega a La Serena o Coquimbo?', a: 'Depende de cuántos pedidos se junten esa semana. Apenas haya ruta confirmada te avisamos por WhatsApp con día y lugar.' },
    { q: '¿Hay costo extra fuera de Ovalle?', a: 'En Ovalle el domicilio suma $1.000. En otras comunas el costo (si aplica) se informa al coordinar, según distancia y cantidad de pedidos de la ruta.' },
    { q: '¿Puedo retirar en Ovalle aunque viva en otra comuna?', a: 'Sí. Muchas personas que pasan por Ovalle retiran en Plaza de Armas o Santa Isabel salida sur, sin costo de delivery.' },
    { q: `¿Atienden todo ${cityList}?`, a: `Esas son las comunas de la ${site.region} donde podemos armar entregas. Si tu comuna no aparece, escríbenos igual: a veces se suma a una ruta cercana.` },
  ],
  ctaTitle: `Pide tu kéfir en la ${site.regionShort}`,
  ctaText: 'Cuéntanos tu comuna por WhatsApp y armamos la entrega.',
});
