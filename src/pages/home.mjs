import { site, clp, abs } from '../config.mjs';
import { btnWa, jarArt, delivery, faq, faqSchema, ctaBand, related, icon, trustBar, science, startPlan, orderSteps, testimonialsBlock, processBlock, berryBlock, makerBlock, productSchema } from '../components.mjs';

const faqs = [
  { q: `¿Dónde comprar kéfir en la ${site.regionShort}?`, a: `SanaVida elabora kéfir artesanal en ${site.city} y reparte en toda la ${site.region}. En ${site.city} hay puntos fijos gratis cada semana (Atenas y Villa El Ingenio, Plaza de Armas, Santa Isabel salida sur) y delivery por ${clp(site.deliveryFee)}. En La Serena, Coquimbo y otras comunas coordinamos entregas cuando se juntan pedidos. Todo por WhatsApp.` },
  { q: '¿El kéfir SanaVida es pasteurizado?', a: 'No. Nuestro kéfir no se pasteuriza después de fermentar, por eso las bacterias y levaduras del cultivo llegan vivas a tu cuerpo. Esa es la diferencia principal con los yogures industriales.' },
  { q: '¿Qué es el yogurt de pajaritos?', a: 'Es el nombre popular que se le da en Chile al kéfir de leche. Los "pajaritos" son los gránulos blancos (búlgaros o nódulos de kéfir) que fermentan la leche. <a href="/yogurt-de-pajaritos/">Aquí te lo explicamos en detalle</a>.' },
  { q: '¿Es normal que me dé gases al principio?', a: 'Sí, es una adaptación habitual si nunca has tomado kéfir. Por eso recomendamos empezar con 1 o 2 cucharadas al día y subir gradualmente hasta un vaso en unas tres semanas. <a href="/como-tomar-kefir/">Ver plan de inicio</a>.' },
  { q: '¿Cuánto dura el kéfir en el refrigerador?', a: 'Refrigerado entre 4° y 8°C y con la botella cerrada se mantiene en buen estado alrededor de 7 a 10 días. Con el tiempo se vuelve más ácido: es normal y no significa que esté malo.' },
  { q: '¿Llegan a La Serena o Coquimbo?', a: `Sí, coordinamos entregas en La Serena, Coquimbo y otras comunas de la ${site.region} cuando hay pedidos suficientes para armar una ruta. <a href="/pedido-kefir-iv-region/">Te explicamos cómo funciona</a>.` },
];

export default {
  slug: '',
  nav: 'Inicio',
  tag: 'Inicio',
  title: `Kéfir artesanal y yogurt de búlgaros en botella | SanaVida`,
  description: `Yogurt de kéfir fermentado con búlgaros vivos, listo para tomar en botella. Sin pasteurizar, hecho en ${site.city}. Entregas en toda la ${site.regionShort}.`,
  render(pages) {
    const body = `
<section class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Hecho a mano en ${site.city} · ${site.regionShort}</p>
      <h1 class="display">Kéfir artesanal y yogurt de búlgaros, <em>vivo</em> y listo en botella.</h1>
      <p class="lead">El yogurt de pajaritos de toda la vida, fermentado con búlgaros reales y sin pasteurizar. Te llega listo para tomar: no tienes que cuidar ningún cultivo en casa. Desde ${site.city} a toda la ${site.regionShort}.</p>
      <div class="hero-actions">
        ${btnWa('Pedir por WhatsApp')}
        <a class="btn btn-ghost" href="/pedido-kefir-iv-region/">Ver entregas ${icon('arrow')}</a>
      </div>
      <ul class="hero-proof" aria-label="Por qué SanaVida">
        <li><strong>100%</strong><span>cultivo vivo</span></li>
        <li><strong>Listo</strong><span>para tomar</span></li>
        <li><strong>${site.regionShort}</strong><span>cobertura</span></li>
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
  ${Array(2).fill(`<span>Kéfir de leche</span><span>✦</span><span>Yogurt de pajaritos</span><span>✦</span><span>Búlgaros vivos</span><span>✦</span><span>${site.regionShort}</span><span>✦</span><span>Sin químicos</span><span>✦</span>`).join('')}
</div></section>
${trustBar()}

<section class="section">
  <div class="wrap">
    <div class="split">
      <div>
        <p class="eyebrow">Por qué elegirlo</p>
        <h2 class="h2">Un alimento vivo, no un postre con etiqueta "saludable"</h2>
      </div>
      <p class="lead">En el supermercado es fácil confundirse: muchos lácteos se venden como saludables, pero pasan por procesos que eliminan buena parte de sus microorganismos. Nuestro kéfir respeta los tiempos de la fermentación natural, así que llega a tu mesa con su cultivo activo.</p>
    </div>
    <div class="cards-4">
      <article class="card"><span class="card-ico">🌿</span><h3>Digestión más liviana</h3><p>La fermentación predigiere buena parte de la lactosa, y sus cultivos vivos apoyan el equilibrio de tu flora intestinal.</p></article>
      <article class="card"><span class="card-ico">🦠</span><h3>Microbiota diversa</h3><p>Los búlgaros combinan bacterias ácido-lácticas y levaduras: más variedad que un yogur con cultivos iniciadores.</p></article>
      <article class="card"><span class="card-ico">🛡️</span><h3>Defensas en forma</h3><p>Gran parte del sistema inmune vive en el intestino. Cuidarlo es cuidarte por dentro.</p></article>
      <article class="card"><span class="card-ico">🥛</span><h3>Proteína y calcio</h3><p>Conserva el valor nutricional de la leche: proteínas, calcio y vitaminas del grupo B.</p></article>
    </div>
    <p class="center"><a class="link" href="/kefir-beneficios-digestion/">Conoce los beneficios del kéfir para la digestión ${icon('arrow')}</a></p>
  </div>
</section>

${processBlock()}
${berryBlock()}
${science()}
${startPlan()}
${makerBlock()}
${testimonialsBlock()}
${orderSteps()}
${delivery()}
${related('', pages)}
${faq(faqs, 'Preguntas frecuentes sobre nuestro kéfir')}
${ctaBand()}`;
    return { body, schema: [{ '@type': 'WebSite', '@id': abs('/#web'), url: abs('/'), name: site.name, inLanguage: site.lang }, faqSchema(faqs), productSchema()].filter(Boolean) };
  },
};
