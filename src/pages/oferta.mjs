import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { site, clp, abs, pagePath } from '../config.mjs';

// Landing de conversión (ads): HTML autónomo basado en SanaVida_Landing_V10.
// No usa el layout del sitio para no mezclar nav/FAB con el embudo de packs.
const __dir = dirname(fileURLToPath(import.meta.url));
// Strip BOM: si el CSS empieza con U+FEFF, `:root` no matchea y todas las var() fallan.
const styles = readFileSync(join(__dir, '../oferta-styles.css'), 'utf8').replace(/^\uFEFF/, '');

const packs = {
  1: { qty: 1, price: 7500, save: 0, label: '1 litro' },
  2: { qty: 2, price: 12990, save: 2010, label: '2 litros' },
  3: { qty: 3, price: 17990, save: 4510, label: '3 litros' },
};

const gallery = [
  { src: '/img/oferta/carrusel-1.jpg', thumb: '/img/oferta/thumb-1.jpg', label: '1', alt: 'Kéfir SanaVida — foto 1' },
  { src: '/img/oferta/carrusel-2.jpg', thumb: '/img/oferta/thumb-2.jpg', label: '2', alt: 'Kéfir SanaVida — foto 2' },
  { src: '/img/oferta/carrusel-3.jpg', thumb: '/img/oferta/thumb-3.jpg', label: '3', alt: 'Kéfir SanaVida — foto 3' },
  { src: '/img/oferta/carrusel-4.jpg', thumb: '/img/oferta/thumb-4.jpg', label: '4', alt: 'Kéfir SanaVida — foto 4' },
  { src: '/img/oferta/carrusel-5.jpg', thumb: '/img/oferta/thumb-5.jpg', label: '5', alt: 'Kéfir SanaVida — foto 5' },
  { src: '/img/oferta/carrusel-6.jpg', thumb: '/img/oferta/thumb-6.jpg', label: '6', alt: 'Kéfir SanaVida — foto 6' },
];

const reviews = [
  {
    name: 'Carol',
    role: 'Cliente · Salud intestinal',
    text: 'Es verdad, tenía siempre molestias digestivas con ciertos alimentos y desde que lo tomo mejoré muchísimo mi salud intestinal.',
    photo: '/img/oferta/review-carol.jpg?v=2',
  },
  {
    name: 'Camila',
    role: 'Cliente · Antojos y rutina',
    text: 'Empecé mi déficit calórico hace unas semanas y con el kéfir sin azúcar ya no sufro de antojos ni ansiedad en este proceso.',
    photo: '/img/oferta/review-camila.jpg?v=2',
  },
  {
    name: 'Valentina',
    role: 'Cliente · Bienestar cotidiano',
    text: 'Yo voy tomando kéfir casi un año y de pronto ya no siento esa ansiedad ni ese bajón... más bien me siento tranquila.',
    photo: '/img/oferta/review-vale.jpg?v=2',
  },
];

const faqs = [
  {
    q: '¿Qué es el kéfir de pajaritos?',
    a: 'Es un alimento fermentado tradicional elaborado con leche y cultivos de kéfir, conocidos como pajaritos o búlgaros.',
  },
  {
    q: '¿Cuánto cuesta y qué incluye cada pack?',
    a: `1 litro ${clp(packs[1].price)}; 2 litros ${clp(packs[2].price)}; 3 litros ${clp(packs[3].price)}. El despacho de ${clp(site.deliveryFee)} está considerado como tarifa de referencia, sujeto a cobertura.`,
  },
  {
    q: '¿Cómo puedo consumirlo?',
    a: 'Puedes disfrutarlo solo o acompañarlo con fruta, avena o batidos. Empieza con porciones pequeñas si es nuevo en tu alimentación.',
  },
  {
    q: '¿Cómo se conserva y cuánto dura?',
    a: 'Es un alimento fresco que requiere cadena de frío. Las instrucciones exactas de refrigeración y fecha de duración deben figurar en la etiqueta oficial del producto.',
  },
  {
    q: '¿Hacen entregas a domicilio?',
    a: `El reparto de referencia cuesta ${clp(site.deliveryFee)}. La disponibilidad según comuna y la fecha de entrega deben confirmarse con SanaVida.`,
  },
  {
    q: '¿Por qué elegir el kéfir artesanal de SanaVida?',
    a: 'SanaVida se elabora con cultivos vivos de kéfir mediante fermentación artesanal. Antes de comparar, revisa los ingredientes y la presencia de cultivos vivos en cada producto: no todos los kéfires comerciales son iguales.',
  },
  {
    q: '¿Cómo confirmo mi pedido?',
    a: 'Selecciona tu pack, completa el formulario y continúa por WhatsApp. SanaVida confirmará disponibilidad, zona y condiciones de entrega.',
  },
];

function esc(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export default {
  slug: 'oferta',
  nav: 'Oferta',
  tag: 'Oferta',
  title: 'SanaVida | Kéfir artesanal natural — packs 1, 2 o 3 litros',
  description:
    'Kéfir artesanal SanaVida. Elige tu pack de 1, 2 o 3 litros y solicita tu pedido. Natural, sin azúcar añadida. Paga al recibir.',
  standalone: true,
  render() {
    const url = abs(pagePath('oferta'));
    const waNumber = site.whatsapp && !String(site.whatsapp).includes('00000000') ? site.whatsapp : '';
    const seremi = site.legal.seremi;

    const thumbs = gallery
      .map(
        (g, i) => `<button type="button" class="thumb${i === 0 ? ' active' : ''}" data-slide="${i}" aria-label="Ver foto ${esc(g.label)}">
  <img src="${g.thumb}" alt="" width="160" height="94" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async">
</button>`,
      )
      .join('');

    const reviewSlides = reviews
      .map(
        (r, i) => `<article class="reviewslide">
  <div class="reviewphoto photo${i + 1}">
    <img class="review-bg" src="${r.photo}" alt="" width="480" height="480" loading="lazy" decoding="async">
  </div>
  <div class="reviewcontent">
    <div class="reviewhead">
      <div class="reviewperson"><strong>${esc(r.name)}</strong><span>${esc(r.role)}</span></div>
      <div class="stars">★★★★★</div>
    </div>
    <p>“${esc(r.text)}”</p>
  </div>
</article>`,
      )
      .join('');

    const faqHtml = faqs
      .map((f) => `<details><summary>${esc(f.q)}</summary><p>${f.a}</p></details>`)
      .join('');

    const cityOptions = site.cities.map((c) => `<option value="${esc(c)}">${esc(c)}</option>`).join('');

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Product',
          name: site.product.name,
          description: site.claims.short,
          image: abs('/img/oferta/carrusel-1.jpg'),
          brand: { '@type': 'Brand', name: site.name },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'CLP',
            lowPrice: packs[1].price,
            highPrice: packs[3].price,
            offerCount: 3,
            availability: 'https://schema.org/InStock',
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
          })),
        },
      ],
    };

    const html = `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#4a2574">
<title>${esc(this.title)}</title>
<meta name="description" content="${esc(this.description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:locale" content="${site.locale}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(this.title)}">
<meta property="og:description" content="${esc(this.description)}">
<meta property="og:image" content="${abs('/img/oferta/carrusel-1.jpg')}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/img/brand/favicon-64.png" type="image/png" sizes="64x64">
<link rel="apple-touch-icon" href="/img/brand/apple-touch-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400..700&family=Nunito:wght@400..800&display=swap">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
<style>${styles}</style>
</head>
<body>
<div class="topbar">ELABORACIÓN ARTESANAL EN ${site.city.toUpperCase()} · KÉFIR NATURAL</div>
<header class="sitehead">
  <div class="wrap headinner">
    <a class="logo" href="/" aria-label="SanaVida, inicio">Sana<b>Vida</b></a>
    <a href="#pedido" class="headlink">Hacer mi pedido ↗</a>
  </div>
</header>

<main>
<section class="wrap hero">
  <div class="gallery">
    <div class="picture" id="mainPicture">
      <span class="mark">NATURAL · ARTESANAL</span>
      <img class="hero-shot" id="heroShot" src="${gallery[0].src}" alt="${esc(gallery[0].alt)}" width="720" height="550" fetchpriority="high" decoding="async">
    </div>
    <div class="thumbs" aria-label="Galería de fotografías">${thumbs}</div>
  </div>

  <div class="hero-copy">
    <span class="eyebrow">KÉFIR DE PAJARITOS · 1 LITRO</span>
    <h1>Mejora tu salud intestinal con kéfir natural y artesanal</h1>
    <p class="lede">Ayuda a mejorar tu digestión, reducir la hinchazón y mantener el equilibrio de tu intestino con el poder de los probióticos naturales.</p>
    <a href="#resenas" class="ratinglink" aria-label="Ver reseñas">
      <div class="rating">
        <div class="rating-seal">✓</div>
        <div class="rating-text">
          <div class="rating-main">
            <span class="stars">★★★★★</span>
            <span class="rating-score">4.9</span>
            <span class="rating-count">376 reseñas</span>
          </div>
          <div class="rating-sub">Opiniones y experiencias compartidas por la comunidad</div>
        </div>
      </div>
    </a>
    <div class="offerhead"><strong>Elige tu pack y ahorra</strong><span>Botellas de 1 litro</span></div>
    <div id="topPacks">
      <label class="pack"><input type="radio" name="topPack" value="1"><span class="pack-main"><strong>1 litro</strong><small>Para probar SanaVida</small></span><span class="pack-price">${clp(packs[1].price)}</span></label>
      <label class="pack"><input type="radio" name="topPack" value="2" checked><span class="pack-main"><strong>2 litros <span class="pack-badge">POPULAR</span></strong><small>Ahorras ${clp(packs[2].save)}</small></span><span class="pack-price"><del>${clp(packs[1].price * 2)}</del>${clp(packs[2].price)}</span></label>
      <label class="pack"><input type="radio" name="topPack" value="3"><span class="pack-main"><strong>3 litros <span class="pack-badge">MAYOR AHORRO</span></strong><small>Ahorras ${clp(packs[3].save)}</small></span><span class="pack-price"><del>${clp(packs[1].price * 3)}</del>${clp(packs[3].price)}</span></label>
    </div>
    <a href="#pedido" class="cta hero-cta" style="background:#d81b60;color:#fff">QUIERO PEDIR MI KÉFIR <span aria-hidden="true">→</span></a>
    <div class="checkout-trust" aria-label="Información del pedido">
      <span><i aria-hidden="true">✓</i> Paga al recibir</span>
      <span class="trust-divider" aria-hidden="true"></span>
      <span><i aria-hidden="true">✓</i> Confirmación por WhatsApp</span>
    </div>
  </div>
</section>

<div class="trustline">
  <div class="wrap trustitems">
    <div class="trustitem"><span class="ico">🌿</span>Kéfir natural y artesanal</div>
    <div class="trustitem"><span class="ico">💚</span>Probióticos para tu intestino</div>
    <div class="trustitem"><span class="ico">🚚</span>Envío a domicilio</div>
    <div class="trustitem"><span class="ico">🛡️</span>Resolución sanitaria</div>
  </div>
</div>

<section class="section wrap" id="beneficios">
  <div class="sectionhead">
    <span class="eyebrow">BIENESTAR DIGESTIVO</span>
    <h2>Una mejor digestión puede cambiar cómo te sientes cada día</h2>
    <p>El kéfir contiene microorganismos naturales de la fermentación que pueden contribuir al equilibrio de tu microbiota intestinal.</p>
  </div>
  <div class="benefits">
    <article class="benefit">
      <div class="scene"><img src="/img/oferta/benefit-hinchazon.jpg" alt="Menos hinchazón y molestias digestivas" width="480" height="300" loading="lazy" decoding="async"></div>
      <div class="body"><h3>Menos hinchazón y molestias digestivas</h3><p>Cuida tu equilibrio intestinal y favorece una digestión más cómoda.</p></div>
    </article>
    <article class="benefit">
      <div class="scene"><img src="/img/oferta/benefit-intestinal.jpg" alt="Mejora tu salud intestinal" width="480" height="300" loading="lazy" decoding="async"></div>
      <div class="body"><h3>Mejora tu salud intestinal</h3><p>Incorpora microorganismos vivos del kéfir para complementar el cuidado de tu microbiota.</p></div>
    </article>
    <article class="benefit">
      <div class="scene"><img src="/img/oferta/benefit-bienestar.jpg" alt="Cuida tu bienestar desde adentro" width="480" height="300" loading="lazy" decoding="async"></div>
      <div class="body"><h3>Cuida tu bienestar desde adentro</h3><p>Tu intestino y tu cerebro están conectados. Una alimentación saludable es parte de cómo te sientes.</p></div>
    </article>
    <article class="benefit">
      <div class="scene"><img src="/img/oferta/benefit-diadia.jpg" alt="Siéntete mejor en tu día a día" width="480" height="300" loading="lazy" decoding="async"></div>
      <div class="body"><h3>Siéntete mejor en tu día a día</h3><p>Una alimentación equilibrada y una buena salud digestiva favorecen tu bienestar cotidiano.</p></div>
    </article>
  </div>
</section>

<section class="section contrast">
  <div class="wrap">
    <div class="sectionhead">
      <span class="eyebrow">ELIGE CON CONFIANZA</span>
      <h2>No todos los kéfires son iguales. Descubre qué hace especial a SanaVida.</h2>
      <p>Elaborado artesanalmente con pajaritos de kéfir, mediante un proceso de fermentación natural que conserva los microorganismos propios del cultivo.</p>
    </div>
    <div class="comparison">
      <div class="compare featured">
        <h3>🌿 SanaVida</h3>
        <ul>
          <li><span>✓</span> Kéfir natural, sin azúcar añadida</li>
          <li><span>✓</span> Elaborado con cultivos vivos de kéfir</li>
          <li><span>✓</span> Sin aditivos</li>
          <li><span>✓</span> Sin tratamiento térmico posterior a la fermentación</li>
        </ul>
      </div>
      <div class="compare">
        <h3>🛒 Otras alternativas comerciales</h3>
        <ul>
          <li><span>•</span> Algunas contienen azúcar añadida</li>
          <li><span>•</span> Algunas utilizan formulaciones con cultivos diferentes</li>
          <li><span>•</span> Algunas incorporan espesantes, saborizantes o estabilizantes</li>
          <li><span>•</span> Algunos tratamientos térmicos reducen microorganismos vivos</li>
        </ul>
      </div>
    </div>
    <div style="text-align:center;margin-top:22px"><a href="#pedido" class="secondarycta">Quiero probar SanaVida →</a></div>
  </div>
</section>

<section class="section wrap">
  <div class="story">
    <div class="storyphoto">
      <img src="/img/oferta/paola-kefir.jpg" alt="Paola con kéfir artesanal SanaVida" width="560" height="700" loading="lazy" decoding="async">
      <div class="story-caption">Bienestar que<br>se siente<small>Kéfir SanaVida en tu rutina</small></div>
    </div>
    <div class="storytext">
      <span class="eyebrow">TU SALUD INTESTINAL IMPORTA</span>
      <h2>Tu bienestar comienza con una buena salud intestinal</h2>
      <p>Cuando tu digestión no funciona como debería, la hinchazón, los gases y la pesadez pueden afectar cómo te sientes durante el día.</p>
      <p>El kéfir natural es una forma de incorporar microorganismos vivos a tu alimentación y complementar el cuidado de tu microbiota intestinal.</p>
      <a href="#pedido" class="secondarycta">Elegir mi pack →</a>
    </div>
  </div>
</section>

<section class="section reviews" id="resenas">
  <div class="wrap">
    <div class="sectionhead">
      <span class="eyebrow">VOCES DE LA COMUNIDAD</span>
      <h2>Conoce las experiencias de quienes ya toman kéfir</h2>
    </div>
    <div class="reviewcarousel">
      <button type="button" class="reviewarrow reviewarrow-left" id="reviewPrev" aria-label="Ver reseña anterior">‹</button>
      <div class="reviewtrack" id="reviewTrack">${reviewSlides}</div>
      <button type="button" class="reviewarrow reviewarrow-right" id="reviewNext" aria-label="Ver siguiente reseña">›</button>
    </div>
    <div class="reviewdots" id="reviewDots">
      <button class="active" aria-label="Ir a reseña 1"></button>
      <button aria-label="Ir a reseña 2"></button>
      <button aria-label="Ir a reseña 3"></button>
    </div>
  </div>
</section>

<section class="section wrap">
  <div class="credential">
    <img class="maker-face" src="/img/oferta/pao-web.jpg" alt="${esc(site.maker.name)}" width="88" height="88" loading="lazy" decoding="async">
    <div class="credential-body">
      <h3>Elaboración con resolución sanitaria</h3>
      <p>En SanaVida nos preocupamos de elaborar un producto bajo las condiciones sanitarias autorizadas (Res. Exenta N.º ${esc(seremi.resolution)}, ${esc(seremi.authority)}), para que puedas comprar con mayor confianza. Elaborado por ${esc(site.maker.name)} en ${site.city}.</p>
      <aside class="seremi-badge" aria-label="Resolución sanitaria SEREMI">
        <img class="seremi-logo" src="/img/oferta/seremi-logo.png" alt="Logo SEREMI de Salud Región de Coquimbo" width="120" height="56" loading="lazy" decoding="async">
        <div class="seremi-meta">
          <strong>Res. Exenta N.º ${esc(seremi.resolution)}</strong>
          <span>${esc(seremi.authority)}</span>
          <span>Código trámite: ${esc(seremi.resolution)}</span>
          <span>Código validación: ${esc(seremi.validationCode)}</span>
          <a href="${esc(seremi.validationUrl)}" target="_blank" rel="noopener noreferrer">Abrir verificador oficial ↗</a>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section wrap faq">
  <div class="sectionhead">
    <span class="eyebrow">RESPONDEMOS TUS DUDAS</span>
    <h2>Preguntas frecuentes</h2>
  </div>
  ${faqHtml}
</section>

<section class="ordersection" id="pedido">
  <div class="wrap ordergrid">
    <div class="orderintro">
      <span class="eyebrow">PIDE EN POCOS PASOS</span>
      <h2>Empieza a cuidar tu salud intestinal hoy</h2>
      <p>Elige tu pack, completa tus datos y recibe tu kéfir artesanal a domicilio. Pagas al recibir.</p>
    </div>
    <div class="formcard">
      <h3>Solicita tu pedido</h3>
      <p class="sub">Botellas de 1 litro · Kéfir natural artesanal · Solicitas hoy y coordinas el pago al recibir</p>
      <div class="field">
        <label for="formPack">Pack elegido</label>
        <select id="formPack">
          <option value="1">1 litro — ${clp(packs[1].price)}</option>
          <option value="2" selected>2 litros — ${clp(packs[2].price)}</option>
          <option value="3">3 litros — ${clp(packs[3].price)}</option>
        </select>
      </div>
      <div class="summaryrow"><span>Productos</span><strong id="subtotal">${clp(packs[2].price)}</strong></div>
      <div class="summaryrow"><span>Reparto de referencia</span><strong>${clp(site.deliveryFee)}</strong></div>
      <div id="saveMsg" class="saving">🎉 ¡Ahorras ${clp(packs[2].save)} con este pack!</div>
      <div class="summaryrow total"><span>Total estimado</span><strong id="formTotal">${clp(packs[2].price + site.deliveryFee)}</strong></div>
      <div class="paylater"><div class="icon">$</div><div><strong>Paga al recibir</strong></div></div>
      <form id="orderForm">
        <div class="formgrid">
          <div class="field"><label for="customerName">Nombre completo *</label><input id="customerName" name="name" required autocomplete="name" placeholder="Tu nombre"></div>
          <div class="field"><label for="customerPhone">WhatsApp *</label><input id="customerPhone" name="phone" type="tel" inputmode="tel" required autocomplete="tel" placeholder="+56 9 1234 5678"></div>
          <div class="field"><label for="customerCity">Comuna *</label><select id="customerCity" name="city" required><option value="">Selecciona…</option>${cityOptions}</select></div>
          <div class="field"><label for="customerAddress">Dirección *</label><input id="customerAddress" name="address" required autocomplete="street-address" placeholder="Calle y número"></div>
          <div class="field wide"><label for="customerNotes">Indicaciones de entrega (opcional)</label><textarea id="customerNotes" placeholder="Edificio, referencia, horario..."></textarea></div>
        </div>
        <label class="privacy"><input id="privacyCheck" type="checkbox" required> Autorizo el uso de mis datos exclusivamente para gestionar mi solicitud de pedido. <a href="/politicas/">Ver políticas</a>.</label>
        <button class="cta" type="submit" style="background:#d81b60;color:#fff;border:0">CONFIRMAR Y CONTINUAR A WHATSAPP →</button>
        <p class="fine">No se realiza ningún pago en esta página.</p>
        <div id="formStatus" role="status" class="status" hidden></div>
      </form>
    </div>
  </div>
</section>
</main>

<footer class="footer">
  <div class="wrap">
    <a class="logo" href="/">Sana<b>Vida</b></a>
    Kéfir natural artesanal · ${site.city}, Chile<br><br>
    ${esc(site.legal.company)} · RUT ${esc(site.legal.rut)} · Res. Exenta N.º ${esc(seremi.resolution)}
    · <a href="/">Sitio principal</a> · <a href="/politicas/">Políticas</a>
  </div>
</footer>

<div class="mobilebuy" id="stickyBuy"><a href="#pedido" style="background:#d81b60;color:#fff"><span>QUIERO PEDIR MI KÉFIR</span><span id="stickyPrice">Desde ${clp(packs[1].price)} →</span></a></div>

<script>
const offers={1:{qty:1,price:7500,save:0},2:{qty:2,price:12990,save:2010},3:{qty:3,price:17990,save:4510}};
const deliveryFee=${site.deliveryFee};
const waNumber=${JSON.stringify(waNumber)};
const gallery=${JSON.stringify(gallery.map((g) => ({ src: g.src, alt: g.alt })))};
const clp=v=>'$'+v.toLocaleString('es-CL');
let selection='2';
const $=id=>document.getElementById(id);
function render(){
  const o=offers[selection];
  document.querySelectorAll('input[name="topPack"]').forEach(x=>x.checked=x.value===selection);
  $('formPack').value=selection;
  $('subtotal').textContent=clp(o.price);
  $('formTotal').textContent=clp(o.price+deliveryFee);
  $('saveMsg').hidden=!o.save;
  $('saveMsg').textContent=o.save?'🎉 ¡Ahorras '+clp(o.save)+' con este pack!':'';
  $('stickyPrice').textContent=clp(o.price)+' + reparto →';
}
document.querySelectorAll('input[name="topPack"]').forEach(x=>x.addEventListener('change',()=>{selection=x.value;render()}));
$('formPack').addEventListener('change',e=>{selection=e.target.value;render()});
render();

document.querySelectorAll('[data-slide]').forEach(el=>el.addEventListener('click',()=>{
  document.querySelectorAll('[data-slide]').forEach(y=>y.classList.remove('active'));
  el.classList.add('active');
  const scene=gallery[Number(el.dataset.slide)];
  const shot=$('heroShot');
  shot.src=scene.src;
  shot.alt=scene.alt;
}));

const reviewTrack=$('reviewTrack');
const reviewDots=[...document.querySelectorAll('#reviewDots button')];
function updateReviewDots(){
  if(!reviewTrack) return;
  const card=reviewTrack.querySelector('.reviewslide');
  if(!card) return;
  const step=card.getBoundingClientRect().width+18;
  const index=Math.round(reviewTrack.scrollLeft/step);
  reviewDots.forEach((dot,i)=>dot.classList.toggle('active',i===index));
}
if(reviewTrack){
  const card=reviewTrack.querySelector('.reviewslide');
  const step=()=>card.getBoundingClientRect().width+18;
  $('reviewPrev').addEventListener('click',()=>reviewTrack.scrollBy({left:-step(),behavior:'smooth'}));
  $('reviewNext').addEventListener('click',()=>reviewTrack.scrollBy({left:step(),behavior:'smooth'}));
  reviewDots.forEach((dot,i)=>dot.addEventListener('click',()=>reviewTrack.scrollTo({left:step()*i,behavior:'smooth'})));
  reviewTrack.addEventListener('scroll',()=>window.requestAnimationFrame(updateReviewDots));
  updateReviewDots();
}

const stickyBuy=$('stickyBuy');
const pedido=$('pedido');
if(stickyBuy&&pedido&&'IntersectionObserver' in window){
  new IntersectionObserver(([entry])=>{
    stickyBuy.classList.toggle('is-hidden',entry.isIntersecting);
  },{threshold:0.12}).observe(pedido);
}

$('orderForm').addEventListener('submit',e=>{
  e.preventDefault();
  if(!e.target.reportValidity()) return;
  const name=$('customerName').value.trim();
  const phone=$('customerPhone').value.trim();
  const city=$('customerCity').value.trim();
  const address=$('customerAddress').value.trim();
  const notes=$('customerNotes').value.trim();
  const o=offers[selection];
  const message='Hola, soy '+name+'. Quiero solicitar '+o.qty+' litro(s) de kéfir SanaVida.\\nPack: '+clp(o.price)+'\\nAhorro: '+clp(o.save)+'\\nReparto de referencia: '+clp(deliveryFee)+'\\nTotal estimado: '+clp(o.price+deliveryFee)+'\\nWhatsApp: '+phone+'\\nComuna: '+city+'\\nDirección: '+address+(notes?'\\nIndicaciones: '+notes:'')+'\\n¿Podemos coordinar mi pedido?';
  const status=$('formStatus');
  status.hidden=false;
  if(waNumber){
    window.open('https://wa.me/'+waNumber+'?text='+encodeURIComponent(message),'_blank','noopener');
    status.textContent='Se abrió WhatsApp para coordinar tu pedido.';
  }else{
    status.textContent='Modo demostración: falta configurar el WhatsApp oficial. Copiamos un resumen al portapapeles.';
    if(navigator.clipboard&&window.isSecureContext){
      navigator.clipboard.writeText(message).catch(()=>{});
    }
  }
});
</script>
</body>
</html>`;

    return { html };
  },
};
