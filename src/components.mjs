import { existsSync } from 'node:fs';
import { site, waLink, clp, abs } from './config.mjs';
import { testimonials } from './testimonials.mjs';

export const hasMedia = (path) => Boolean(path) && existsSync(`public${path}`);

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const logoMark = (size = 44) => `
<svg class="logo-mark" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">
  <circle cx="32" cy="32" r="32" fill="#D6B7D6"/>
  <path d="M27 12h10v3.5c0 1.6.9 3 2.2 3.8C42 21 44 24 44 27.5V48a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V27.5c0-3.5 2-6.5 4.8-8.2 1.3-.8 2.2-2.2 2.2-3.8V12z" fill="none" stroke="#fff" stroke-width="2.2" stroke-linejoin="round"/>
  <path d="M26 12h12" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M32 41.5s-5.5-3.3-5.5-7a3 3 0 0 1 5.5-1.7 3 3 0 0 1 5.5 1.7c0 3.7-5.5 7-5.5 7z" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
</svg>`;

// width/height explícitos reservan el espacio del logo: sin CLS aunque la imagen llegue tarde.
export const brandLogo = (height = 56, large = false) => {
  if (!site.logo) return logoMark(height);
  const { src, large: big, w, h } = site.logo;
  const width = Math.round((height * w) / h);
  return `<img class="logo-img" src="${large ? big : src}" width="${width}" height="${height}" alt="${site.name}" decoding="async">`;
};

const picto = (file, alt = '') => `<img class="picto" src="/img/brand/${file}" width="56" height="56" alt="${alt}" loading="lazy" decoding="async">`;
// Mismo trazo que los pictogramas de marca (círculo teal + glifo), para no mezclar estilos.
const pictoNoHeat = `<svg class="picto" viewBox="0 0 112 112" width="56" height="56" aria-hidden="true" fill="none" stroke="#1F8BA2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="56" cy="56" r="49" stroke-width="7"/>
  <path d="M50 30a6 6 0 0 1 12 0v31a12 12 0 1 1-12 0z" stroke-width="6"/>
  <circle cx="56" cy="71" r="5" fill="#1F8BA2" stroke="none"/>
  <path d="M22 22l68 68" stroke-width="7"/>
</svg>`;

const icons = {
  wa: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>',
  pin: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6"/></svg>',
};
export const icon = (k) => icons[k];

export const btnWa = (label = 'Pedir por WhatsApp', msg, cls = '') =>
  `<a class="btn btn-wa ${cls}" href="${waLink(msg)}" target="_blank" rel="noopener">${icon('wa')}<span>${esc(label)}</span></a>`;

// Ilustración inline en lugar de foto: 0 requests extra y LCP basado en texto.
// Cuando existan fotos reales del producto, reemplazar por <img> AVIF/WebP con width/height.
export const jarArt = () => `
<svg class="jar-art" viewBox="0 0 320 380" role="img" aria-label="Botella de yogurt de kéfir artesanal SanaVida">
  <defs>
    <linearGradient id="milk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFDF9"/><stop offset="1" stop-color="#F1E8E0"/></linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity=".4"/></linearGradient>
  </defs>
  <ellipse cx="160" cy="356" rx="110" ry="13" fill="#2A1030" opacity=".08"/>
  <rect x="124" y="16" width="72" height="30" rx="7" fill="#6B2A83"/>
  <rect x="124" y="38" width="72" height="7" fill="#2A1030" opacity=".2"/>
  <path d="M130 46h60v30c0 10 6 18 14 24 18 14 30 30 30 52v172c0 13-11 24-24 24H110c-13 0-24-11-24-24V152c0-22 12-38 30-52 8-6 14-14 14-24V46z" fill="url(#milk)"/>
  <g fill="#fff" opacity=".9"><circle cx="130" cy="290" r="3"/><circle cx="196" cy="300" r="2.5"/><circle cx="170" cy="318" r="2"/><circle cx="118" cy="320" r="2"/><circle cx="208" cy="276" r="3"/></g>
  <path d="M130 46h60v30c0 10 6 18 14 24 18 14 30 30 30 52v172c0 13-11 24-24 24H110c-13 0-24-11-24-24V152c0-22 12-38 30-52 8-6 14-14 14-24V46z" fill="url(#glass)" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>
  <rect x="112" y="168" width="96" height="92" rx="46" fill="#E6007E"/>
  <path d="M160 230s-13-8-13-16.5a6.8 6.8 0 0 1 13-3.4 6.8 6.8 0 0 1 13 3.4c0 8.5-13 16.5-13 16.5z" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/>
  <text x="160" y="288" text-anchor="middle" font-family="Fredoka, Trebuchet MS, sans-serif" font-size="16" font-weight="700" letter-spacing="2" fill="#6B2A83">SANA VIDA</text>
</svg>`;

export const breadcrumbs = (items) => `
<nav class="crumbs" aria-label="Migas de pan"><ol>
  ${items.map((it, i) => (i < items.length - 1 ? `<li><a href="${it.href}">${esc(it.name)}</a></li>` : `<li aria-current="page">${esc(it.name)}</li>`)).join('')}
</ol></nav>`;

export const breadcrumbSchema = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.href) })),
});

// <details> nativo: accesible, indexable y sin JS. El mismo array alimenta el FAQPage schema
// para que el contenido visible y el estructurado nunca diverjan (requisito de Google).
export const faq = (items, title = 'Preguntas frecuentes') => `
<section class="section faq" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <h2 id="faq-title" class="h2">${esc(title)}</h2>
    <div class="faq-list">
      ${items.map((f) => `<details><summary>${esc(f.q)}</summary><div class="faq-a"><p>${f.a}</p></div></details>`).join('')}
    </div>
  </div>
</section>`;

export const faqSchema = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
  })),
});

export const delivery = () => `
<section class="section delivery" id="entregas" aria-labelledby="entregas-title">
  <div class="wrap">
    <div class="delivery-grid">
      <div>
        <p class="eyebrow">${icon('pin')} Entregas en la ${site.regionShort}</p>
        <h2 id="entregas-title" class="h2">Hecho en ${site.city}. Disponible en <em>toda la región</em>.</h2>
        <p class="lead">Puntos fijos gratis cada semana en ${site.city}. Si estás en La Serena, Coquimbo u otra comuna de la ${site.region}, escríbenos: juntamos pedidos y coordinamos la entrega.</p>
        ${btnWa('Coordinar mi entrega', `Hola SanaVida, quiero coordinar una entrega de kéfir en la ${site.regionShort}`)}
        <p class="delivery-more"><a class="link" href="/pedido-kefir-iv-region/">Ver cómo pedir en la ${site.regionShort} ${icon('arrow')}</a></p>
      </div>
      <ol class="points">
        ${site.deliveryPoints.map((p, i) => `<li><span class="num">0${i + 1}</span><div><strong>${esc(p.name)}</strong><small>${esc(p.note)}</small></div></li>`).join('')}
        <li class="point-alt"><span class="num">+</span><div><strong>Delivery en ${site.city} y resto de la ${site.regionShort}</strong><small>${site.city}: ${clp(site.deliveryFee)} · Otras comunas: según ruta consolidada</small></div></li>
      </ol>
    </div>
  </div>
</section>`;

export const ctaBand = (
  title = '¿Listo para probar un kéfir real?',
  text = `100% natural y artesanal. Haz tu pedido hoy con envío a domicilio en la ${site.regionShort}.`,
) => `
<section class="cta-band">
  <div class="wrap cta-inner">
    <div>
      <h2 class="h2">${esc(title)}</h2>
      <p>${esc(text)}</p>
    </div>
    ${btnWa('Hacer mi pedido')}
  </div>
</section>`;

// Máximo 4 tarjetas: con 9+ landings mostrar todas diluye el CTA y satura el scroll.
const RELATED_PRIORITY = [
  'catalogo',
  'pedido',
  'kefir-en-botella',
  'pedido-kefir-iv-region',
  'como-tomar-kefir',
  'bacterias-del-kefir',
  'recetas-con-kefir',
  'blog',
  'kefir-beneficios-digestion',
  'yogurt-de-pajaritos',
  'probioticos-naturales',
  'kefir-intolerancia-lactosa',
  'kefir-vs-yogurt',
  'bulgaros-de-kefir',
  'cotizacion',
];

export const related = (current, pages) => {
  const bySlug = Object.fromEntries(pages.map((p) => [p.slug, p]));
  const list = RELATED_PRIORITY.filter((s) => s !== current && bySlug[s])
    .map((s) => bySlug[s])
    .slice(0, 4);
  return `
<section class="section related" aria-labelledby="rel-title">
  <div class="wrap">
    <h2 id="rel-title" class="h3">Sigue aprendiendo sobre kéfir</h2>
    <div class="rel-grid">
      ${list.map((p) => `<a class="rel-card" href="/${p.slug}/"><span class="tag">${esc(p.tag)}</span><strong>${esc(p.nav)}</strong><span class="more">Leer guía ${icon('arrow')}</span></a>`).join('')}
    </div>
  </div>
</section>`;
};

export const trustBar = () => `
<section class="trust" aria-label="Garantías SanaVida">
  <div class="wrap trust-grid">
    <div>${picto('ico-bulgaros.png')}<p><strong>Cultivo 100% real</strong><span>Búlgaros vivos, no polvos liofilizados</span></p></div>
    <div>${pictoNoHeat}<p><strong>Sin pasteurizar</strong><span>El cultivo llega activo</span></p></div>
    <div>${picto('ico-azucar.png')}<p><strong>Sin azúcar añadida</strong><span>Solo leche y búlgaros</span></p></div>
    <div>${picto('ico-gluten.png')}<p><strong>Naturalmente sin gluten</strong><span>Sin cereales ni espesantes</span></p></div>
  </div>
</section>`;

// La pauta de cucharadas viene de la experiencia real de clientes: partir con un vaso entero
// es la causa nº1 de malestar inicial y abandono. Por eso se muestra antes del CTA.
export const startPlan = () => `
<section class="section plan" id="plan-inicio" aria-labelledby="plan-title">
  <div class="wrap">
    <div class="plan-head">
      <p class="eyebrow">Plan de inicio</p>
      <h2 id="plan-title" class="h2">Empieza con <em>cucharadas</em>, no con un vaso</h2>
      <p class="lead">Si nunca has tomado kéfir, tu intestino necesita adaptarse. Los primeros días es normal sentir algo de gases. Sube la dosis a medida que tu cuerpo lo tolera.</p>
    </div>
    <ol class="plan-steps">
      <li><span class="plan-when">Días 1–3</span><strong>1 a 2 cucharadas</strong><p>Una vez al día, idealmente con el desayuno.</p></li>
      <li><span class="plan-when">Días 4–7</span><strong>3 a 4 cucharadas</strong><p>Si te sentiste bien, aumenta de a poco.</p></li>
      <li><span class="plan-when">Semana 2</span><strong>Medio vaso</strong><p>Unos 100 ml. Puedes repartirlo en dos tomas.</p></li>
      <li><span class="plan-when">Semana 3 en adelante</span><strong>Un vaso entero</strong><p>200 a 250 ml diarios. La constancia es lo que más importa.</p></li>
    </ol>
    <p class="plan-note">¿Te cayó pesado? Vuelve a la dosis anterior unos días y sigue subiendo más lento.</p>
  </div>
</section>`;

export const science = (current = '') => `
<section class="section science" aria-labelledby="science-title">
  <div class="wrap science-grid">
    <div>
      <p class="eyebrow">Lo que sí podemos afirmar</p>
      <h2 id="science-title" class="h2">${esc(site.claims.short)}</h2>
      <blockquote class="claim">${esc(site.claims.science)}</blockquote>
      <p class="lead">Preferimos hablar con precisión. Recuento certificado por ${esc(site.lab.displayName)}. ${site.lab.strainsIdentified ? 'Nuestro análisis de laboratorio identificó las cepas presentes en el producto.' : 'La identificación de cepas específicas es el siguiente paso con el laboratorio; mientras tanto publicamos los UFC/g que sí están certificados.'}</p>
      ${current === 'bacterias-del-kefir' ? '' : `<a class="link" href="/bacterias-del-kefir/">Qué contiene el kéfir, explicado ${icon('arrow')}</a>`}
    </div>
    <ul class="science-list">
      <li><strong>Bacterias ácido-lácticas</strong><span>Transforman la lactosa en ácido láctico: de ahí el sabor ácido.</span></li>
      <li><strong>Levaduras</strong><span>Aportan el toque levemente efervescente.</span></li>
      <li><strong>Kefirán</strong><span>Polisacárido propio de los búlgaros que da cuerpo al kéfir.</span></li>
    </ul>
  </div>
</section>`;

export const testimonialsBlock = () =>
  testimonials.length
    ? `
<section class="section testimonials" aria-labelledby="test-title">
  <div class="wrap">
    <p class="eyebrow">Experiencias reales</p>
    <h2 id="test-title" class="h2">Lo que cuentan quienes ya lo toman</h2>
    <div class="test-grid">
      ${testimonials.map((t) => `<figure class="test-card">${t.tag ? `<span class="tag">${esc(t.tag)}</span>` : ''}<blockquote>“${esc(t.text)}”</blockquote><figcaption><strong>${esc(t.name)}</strong>${t.place ? ` · ${esc(t.place)}` : ''}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>`
    : '';

export const orderSteps = () => `
<section class="section order" aria-labelledby="order-title">
  <div class="wrap">
    <p class="eyebrow">Pedir es simple</p>
    <h2 id="order-title" class="h2">Tu kéfir en 3 pasos</h2>
    <ol class="order-steps">
      <li><span>1</span><strong>Escríbenos por WhatsApp</strong><p>Cuéntanos tu comuna y cuánto quieres.</p></li>
      <li><span>2</span><strong>Elige punto o domicilio</strong><p>Retiro gratis en ${site.city} o entrega coordinada en la ${site.regionShort}.</p></li>
      <li><span>3</span><strong>Recíbelo fresco</strong><p>Te avisamos cuando esté listo. Refrigéralo apenas llegue.</p></li>
    </ol>
    <div class="center">${btnWa('Empezar mi pedido')}</div>
  </div>
</section>`;

// CTA dentro del artículo: el lector que llega por Google decide a mitad de lectura,
// no al final. Va después de la 2ª sección para no interrumpir la respuesta principal.
export const midCta = (text = '¿Quieres probarlo? Te asesoramos con la dosis de inicio.', msg) => `
<aside class="mid-cta" aria-label="Pedir kéfir">
  <p>${esc(text)}</p>
  ${btnWa('Hablar por WhatsApp', msg, 'btn-sm')}
</aside>`;

const processSteps = [
  ['Búlgaros vivos', 'Nódulos reales en frasco, no fermentos liofilizados ni polvos industriales.'],
  ['Fermentación', 'Los búlgaros transforman la leche a temperatura ambiente, el tiempo justo.'],
  ['Filtrado', 'Se cuelan a mano para separar los búlgaros del kéfir listo.'],
  ['Envasado', 'El yogurt de kéfir va directo a la botella, listo para tomar.'],
];

// Loop muted + playsinline: única combinación que permite autoplay en iOS. preload="none" +
// poster evita descargar el video antes de que sea visible y protege el LCP.
export const processBlock = () => {
  const { processVideo, processPoster } = site.media;
  const video = hasMedia(processVideo)
    ? `<video class="process-video" autoplay muted loop playsinline preload="none"${hasMedia(processPoster) ? ` poster="${processPoster}"` : ''} width="720" height="900" aria-label="Pao filtrando búlgaros de kéfir y llenando la botella"><source src="${processVideo}" type="video/webm"></video>`
    : '';
  return `
<section class="section process-real" id="proceso" aria-labelledby="proceso-title">
  <div class="wrap ${video ? 'process-grid' : ''}">
    <div>
      <p class="eyebrow">Trazabilidad artesanal</p>
      <h2 id="proceso-title" class="h2">Del frasco a tu botella: fermentación real con <em>nódulos de kéfir</em></h2>
      <p class="lead">${esc(site.maker.name)} trabaja con búlgaros vivos, no con cultivos en polvo. Este es el recorrido completo de cada botella.</p>
      <ol class="flow">${processSteps.map(([t, d], i) => `<li><span>0${i + 1}</span><div><strong>${t}</strong><p>${d}</p></div></li>`).join('')}</ol>
    </div>
    ${video ? `<div class="process-media">${video}</div>` : ''}
  </div>
</section>`;
};

// El freno nº2 del tráfico frío es "el kéfir natural es difícil de tomar": se muestra el uso
// apetitoso junto al CTA, no en una página aparte.
export const berryBlock = () => {
  const img = hasMedia(site.media.berries)
    ? `<img src="${site.media.berries}" width="640" height="640" loading="lazy" decoding="async" alt="Batido de kéfir SanaVida con frutillas y arándanos">`
    : `<div class="berry-art" aria-hidden="true"><span class="b b1"></span><span class="b b2"></span><span class="b b3"></span><span class="b b4"></span><span class="glass"></span></div>`;
  return `
<section class="section berries" aria-labelledby="berries-title">
  <div class="wrap berries-grid">
    <div class="berries-media">${img}</div>
    <div>
      <p class="eyebrow">Cómo tomarlo</p>
      <h2 id="berries-title" class="h2">Directo de la botella, en batido o con <em>frutillas y arándanos</em></h2>
      <p class="lead">¿Te preocupa la acidez? Mézclalo con fruta natural: el dulzor de las frutillas y los arándanos equilibra el sabor y lo vuelve parte de tu desayuno diario.</p>
      <ul class="ticks">
        <li>Batido: 1 vaso de kéfir + un puñado de frutillas y arándanos</li>
        <li>Bowl: kéfir con avena, fruta picada y un hilo de miel</li>
        <li>Solo y bien frío, directo de la botella</li>
      </ul>
      <div class="hero-actions">${btnWa('Pedir mi botella', 'Hola SanaVida, quiero pedir yogurt de kéfir en botella')}<a class="btn btn-ghost" href="/recetas-con-kefir/">Ver recetas ${icon('arrow')}</a></div>
    </div>
  </div>
</section>`;
};

export const makerBlock = () => `
<section class="section maker" aria-labelledby="maker-title">
  <div class="wrap maker-grid">
    ${hasMedia(site.media.maker) ? `<img class="maker-photo" src="${site.media.maker}" width="480" height="600" loading="lazy" decoding="async" alt="${esc(site.maker.name)}, ${esc(site.maker.role)}">` : `<div class="maker-mono" aria-hidden="true">${esc(site.maker.name.charAt(0))}</div>`}
    <div>
      <p class="eyebrow">Quién está detrás</p>
      <h2 id="maker-title" class="h2">Hecho por ${esc(site.maker.name)}, en ${site.city}</h2>
      <p class="lead">SanaVida no es una fábrica. Es ${esc(site.maker.name)} cuidando los búlgaros todos los días, fermentando por tandas y envasando cada botella a mano. Tú no tienes que cuidar ningún cultivo en casa: recibes el kéfir listo para tomar.</p>
    </div>
  </div>
</section>`;

export const productSchema = () => {
  // Schema completo (con nutrition) vive en product.mjs; aquí el fallback liviano para home.
  const p = site.product;
  if (!p.price) return null;
  return {
    '@type': 'Product',
    name: p.name,
    description: `${site.claims.short}. ${site.claims.science}`,
    image: abs('/img/og.png'),
    brand: { '@type': 'Brand', name: site.name },
    size: p.size,
    offers: {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'CLP',
      availability: 'https://schema.org/InStock',
      areaServed: site.region,
      seller: { '@id': abs('/#negocio') },
    },
  };
};

export const healthNote = () =>
  `<aside class="note" role="note"><strong>Importante:</strong> el kéfir es un alimento, no un medicamento. La información de esta página es educativa y no reemplaza la evaluación de un profesional de salud. Si tienes una condición diagnosticada, estás embarazada o eres inmunosuprimido/a, consulta antes de incorporarlo.</aside>`;
