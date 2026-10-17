import { site, clp, abs } from '../config.mjs';
import { jarArt, delivery, faq, faqSchema, ctaBand, related, icon, trustBar, science, startPlan, orderSteps, testimonialsBlock, processBlock, berryBlock, makerBlock, productSchema, healthNote } from '../components.mjs';
import { symptomsBlock, gutBrainBlock, realVsSuperBlock, pitchBenefits } from '../pitch.mjs';

const faqs = [
  { q: `¿Dónde comprar kéfir en la ${site.regionShort}?`, a: `SanaVida elabora kéfir artesanal en ${site.city} y reparte en toda la ${site.region}. En ${site.city} hay puntos fijos gratis cada semana (Atenas y Villa El Ingenio, Plaza de Armas, Santa Isabel salida sur) y delivery por ${clp(site.deliveryFee)}. En La Serena, Coquimbo y otras comunas coordinamos entregas cuando se juntan pedidos. Todo por WhatsApp o <a href="/pedido/">formulario de pedido</a>.` },
  { q: '¿El kéfir puede ayudar con hinchazón, gases o pesadez?', a: 'Muchas personas lo usan justamente para eso: el cultivo vivo aporta bacterias buenas que pueden reequilibrar la digestión. Empieza con cucharadas. <a href="/kefir-beneficios-digestion/">Lee la guía de digestión</a>.' },
  { q: '¿Sirve si soy intolerante a la lactosa?', a: 'Aunque viene de la leche, la fermentación reduce buena parte de la lactosa. Por eso muchas personas con intolerancia leve lo toman sin problema. Si tu intolerancia es severa, parte con muy poca cantidad y consulta a tu médico.' },
  { q: '¿Qué diferencia hay con el kéfir del supermercado?', a: 'Las opciones industriales suelen pasar por procesos para durar meses en góndola, lo que debilita o elimina el cultivo vivo. El nuestro no se pasteuriza: llega fresco, con búlgaros vivos activos.' },
  { q: '¿El kéfir SanaVida es pasteurizado?', a: 'No. No se pasteuriza después de fermentar, por eso las bacterias y levaduras del cultivo llegan vivas. Esa es la diferencia principal con los yogures y kéfires industriales.' },
  { q: '¿Es normal que me dé gases al principio?', a: 'Sí, es una adaptación habitual. Por eso recomendamos empezar con 1 o 2 cucharadas al día y subir gradualmente. <a href="/como-tomar-kefir/">Ver plan de inicio</a>.' },
  { q: '¿Llegan a La Serena o Coquimbo?', a: `Sí, coordinamos entregas en La Serena, Coquimbo y otras comunas de la ${site.region} cuando hay pedidos suficientes para armar una ruta. <a href="/pedido-kefir-iv-region/">Te explicamos cómo funciona</a>.` },
];

export default {
  slug: '',
  nav: 'Inicio',
  tag: 'Inicio',
  title: `Kéfir artesanal vivo: digestión, ánimo y energía | SanaVida`,
  description: `Kéfir real, 100% artesanal y sin pasteurizar. Ayuda a desinflamar, mejorar digestión, ánimo y descanso. Hecho en ${site.city}, con envío en la ${site.regionShort}.`,
  render(pages) {
    const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Hecho a mano en ${site.city} · ${site.regionShort}</p>
      <h1 class="display">Kéfir artesanal: bacterias buenas para <em>sentirte bien</em>.</h1>
      <p class="lead">Literalmente, kéfir significa “sentirse bien”. Cultivo vivo que reprograma tu digestión, alivia hinchazón y gases, y mejora la comunicación entre tu intestino y tu cerebro — sueño, ánimo y energía. 100% natural, listo en botella, con envío a domicilio.</p>
      <div class="hero-actions">
        <a class="btn btn-wa" href="/pedido/">${icon('wa')}<span>Pedir hoy</span></a>
        <a class="btn btn-ghost" href="/catalogo/">Ver catálogo ${icon('arrow')}</a>
      </div>
      <ul class="hero-proof" aria-label="Por qué SanaVida">
        <li><strong>Vivo</strong><span>sin pasteurizar</span></li>
        <li><strong>Real</strong><span>no de góndola</span></li>
        <li><strong>${site.regionShort}</strong><span>con domicilio</span></li>
      </ul>
    </div>
    <div class="hero-art">
      <div class="blob"></div>
      <img class="hero-cloud" src="/img/brand/nube-1.png" width="560" height="305" alt="" decoding="async" fetchpriority="low">
      ${jarArt()}
      <span class="chip chip-a">Búlgaros vivos ✦</span>
      <span class="chip chip-b">Listo en botella</span>
    </div>
  </div>
  <img class="hero-clouds" src="/img/brand/nube-2.png" width="900" height="175" alt="" decoding="async" fetchpriority="low">
</section>

<section class="marquee" aria-hidden="true"><div class="marquee-track">
  ${Array(2)
    .fill(
      `<span>Kéfir real</span><span>✦</span><span>Sentirse bien</span><span>✦</span><span>Búlgaros vivos</span><span>✦</span><span>Desinflama</span><span>✦</span><span>Intestino–cerebro</span><span>✦</span><span>${site.regionShort}</span><span>✦</span>`,
    )
    .join('')}
</div></section>
${trustBar()}

<section class="section">
  <div class="wrap">
    <div class="split">
      <div>
        <p class="eyebrow">Por qué tomarlo</p>
        <h2 class="h2">Bajar de peso, mejor ánimo y dormir mejor: el poder de las <em>bacterias buenas</em></h2>
      </div>
      <p class="lead">Alimentan tu sistema digestivo, te ayudan a absorber mejor la energía de las comidas y fortalecen tus defensas. Un alimento vivo — no un postre con etiqueta “saludable”.</p>
    </div>
    <div class="cards-4">
      ${pitchBenefits
        .map(
          (b) => `<article class="card"><h3>${b.t}</h3><p>${b.d}</p></article>`,
        )
        .join('')}
    </div>
    <p class="center"><a class="link" href="/kefir-beneficios-digestion/">Conoce los beneficios para la digestión ${icon('arrow')}</a></p>
  </div>
</section>

${symptomsBlock()}
${gutBrainBlock()}
${realVsSuperBlock()}
${processBlock()}
${berryBlock()}
${science()}
${startPlan()}
${makerBlock()}
${testimonialsBlock()}
${orderSteps()}
${delivery()}
<section class="section" style="padding-top:0"><div class="wrap narrow">${healthNote()}</div></section>
${related('', pages)}
${faq(faqs, 'Preguntas frecuentes sobre nuestro kéfir')}
${ctaBand(
  'Prueba kéfir 100% natural y artesanal',
  'Haz tu pedido hoy con envío a domicilio en la IV Región. Cultivo vivo, sin pasar por la góndola.',
)}`;
    return {
      body,
      schema: [
        { '@type': 'WebSite', '@id': abs('/#web'), url: abs('/'), name: site.name, inLanguage: site.lang },
        faqSchema(faqs),
        productSchema(),
      ].filter(Boolean),
    };
  },
};
