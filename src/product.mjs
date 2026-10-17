// Landing de producto (CRO Ads + SEO local). HTML/CSS puro; tabs con radio CSS (cero JS).
import { site, waLink, abs, clp, fmtUfc, pagePath } from './config.mjs';
import {
  esc, btnWa, icon, breadcrumbs, breadcrumbSchema, faq, faqSchema, delivery, ctaBand, related, hasMedia,
} from './components.mjs';

const checkSvg = `<svg class="check" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M8.2 14.4 3.8 10l1.4-1.4 3 3 6.6-6.6L16.2 6z"/></svg>`;

const sealSvg = {
  lactosa: `<svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="24" cy="24" r="18"/><path d="M16 18c2-4 6-6 8-6s6 2 8 6c-2 1-4 2-8 2s-6-1-8-2z"/><path d="M18 28h12M20 32h8"/><path d="M10 10l28 28"/></svg>`,
  azucar: `<svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="24" cy="24" r="18"/><path d="M18 30h12l-2-10H20z"/><path d="M20 20c1-3 3-5 4-5s3 2 4 5"/><path d="M10 10l28 28"/></svg>`,
  gluten: `<svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="24" cy="24" r="18"/><path d="M24 12v18"/><path d="M24 18c-4 2-7 5-7 9M24 18c4 2 7 5 7 9"/><path d="M24 24c-3 1-5 3-5 6M24 24c3 1 5 3 5 6"/><path d="M10 10l28 28"/></svg>`,
  bulgaros: `<svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="24" cy="24" r="18"/><ellipse cx="20" cy="22" rx="5" ry="7"/><ellipse cx="28" cy="26" rx="6" ry="8"/><circle cx="18" cy="18" r="1.5" fill="currentColor" stroke="none"/><circle cx="30" cy="22" r="1.5" fill="currentColor" stroke="none"/></svg>`,
  inmune: `<svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="24" cy="24" r="18"/><path d="M24 14l8 4v6c0 6-4 10-8 12-4-2-8-6-8-12v-6z"/><path d="M24 22v8M20 26h8"/></svg>`,
  probioticos: `<svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="24" cy="24" r="18"/><path d="M18 28c2 4 6 6 6 6s4-2 6-6c-2-1-4-2-6-2s-4 1-6 2z"/><path d="M20 18c1-2 2-3 4-3s3 1 4 3"/><circle cx="34" cy="34" r="6" fill="var(--milk)"/><path d="M31.5 34l2 2 3.5-3.5" stroke-width="2"/></svg>`,
};

const benefitSvg = {
  animo: `<svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="16"/><path d="M17 28c2 3 5 5 7 5s5-2 7-5"/><circle cx="18" cy="21" r="1.8" fill="currentColor" stroke="none"/><circle cx="30" cy="21" r="1.8" fill="currentColor" stroke="none"/></svg>`,
  mente: `<svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 28c-3-2-4-6-2-9 1-2 3-3 5-3 1-3 4-5 7-5s6 2 7 5c2 0 4 1 5 3 2 3 1 7-2 9"/><path d="M20 30v4h8v-4"/><path d="M22 22h4M24 20v4"/></svg>`,
  stress: `<svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 28c4-8 10-12 14-12s10 4 14 12"/><path d="M16 28h16"/><circle cx="24" cy="18" r="3"/></svg>`,
  inmune: `<svg viewBox="0 0 48 48" width="36" height="36" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="M24 10l10 5v8c0 8-5 13-10 15-5-2-10-7-10-15v-8z"/></svg>`,
};

export const productHero = () => {
  const { product, lab, legal, claims, media } = site;
  const video = hasMedia(media.processVideo)
    ? `<video class="prod-video" autoplay muted loop playsinline preload="none"${hasMedia(media.processPoster) ? ` poster="${media.processPoster}"` : ''} width="720" height="900" aria-label="Del frasco de búlgaros a la botella de kéfir SanaVida"><source src="${media.processVideo}" type="video/webm"></video>`
    : `<div class="prod-video-ph" aria-hidden="true"><span class="prod-video-ph-sun"></span><span class="prod-video-ph-cap">Del frasco a tu botella</span></div>`;

  return `
<section class="prod-hero">
  <div class="wrap prod-hero-grid">
    <div class="prod-hero-copy">
      <p class="trust-badge">${checkSvg} Certificado por Lab. ${esc(lab.name)} · Res. Sanitaria SEREMI Coquimbo N.º ${esc(legal.seremi.resolution)}</p>
      <h1 class="display">kéfir natural y Yoghurt de Pajaritos Sanavida en ${site.city} – <em>100% Búlgaros Vivos</em> (1 Litro)</h1>
      <p class="lead">${esc(claims.slogan)}. fermentado de forma natural con nódulos de kéfir reales: Sin lactosa, sin azúcar añadida y con <strong>40 millones de UFC/g</strong> de probióticos naturales certificados por ${esc(lab.displayName)}.</p>
      <ul class="prod-bullets">
        <li>${checkSvg}<span>Solo 2 ingredientes: <strong>Leche entera y búlgaros vivos</strong>.</span></li>
        <li>${checkSvg}<span>Listo para tomar en botella de <strong>1L</strong> (olvídate de cuidar los búlgaros en casa).</span></li>
        <li>${checkSvg}<span>Libre de lactosa, libre de gluten y sin azúcares añadidos.</span></li>
      </ul>
      <div class="hero-actions">
        ${btnWa('Pedir botella 1L por WhatsApp', 'Hola SanaVida, quiero pedir Yoghurt de Pajaritos / kéfir natural en botella de 1 Litro', 'btn-cta')}
        <a class="btn btn-ghost" href="#nutricion">Ver lab y nutrición ${icon('arrow')}</a>
      </div>
      <ul class="seal-row" aria-label="Sellos del producto">
        ${product.seals.map((s) => `<li class="seal seal-${s.tone}">${sealSvg[s.id] || ''}<span>${esc(s.label)}</span></li>`).join('')}
      </ul>
    </div>
    <div class="prod-hero-media">${video}</div>
  </div>
</section>`;
};

export const bodyFlow = () => `
<section class="section body-flow" id="como-funciona" aria-labelledby="flow-title">
  <div class="wrap">
    <p class="eyebrow">Cómo actúa</p>
    <h2 id="flow-title" class="h2">Del Nódulo Vivo a tu Bienestar: Así Funciona Nuestro <em>kéfir natural</em></h2>
    <ol class="flow-4">
      <li>
        <span class="flow-n" aria-hidden="true">01</span>
        <h3>Kéfir Real</h3>
        <p>Bebida fermentada obtenida directamente a partir de nódulos (granos) de kéfir vivos, no de polvos liofilizados.</p>
      </li>
      <li>
        <span class="flow-n" aria-hidden="true">02</span>
        <h3>Microbiota Activa</h3>
        <p>Comunidad diversa de bacterias ácido lácticas (<strong>40M UFC/g</strong>) y levaduras beneficiosas (<strong>5,6M UFC/g</strong>).</p>
      </li>
      <li>
        <span class="flow-n" aria-hidden="true">03</span>
        <h3>Compuestos Bioactivos</h3>
        <p>Durante la fermentación natural se producen vitaminas, ácidos orgánicos y péptidos naturales.</p>
      </li>
      <li>
        <span class="flow-n" aria-hidden="true">04</span>
        <h3>Comunicación Intestino-Cerebro</h3>
        <p>Los compuestos bioactivos y la microbiota interactúan con tu intestino enviando señales a tu cerebro y sistema inmune.</p>
      </li>
    </ol>
  </div>
</section>`;

export const gutBrain = () => `
<section class="section gut-brain" id="eje-intestino-cerebro" aria-labelledby="gut-title">
  <div class="wrap">
    <p class="eyebrow">Ciencia accesible</p>
    <h2 id="gut-title" class="h2">El Eje Intestino-Cerebro: Tu <em>Segundo Cerebro</em> en Equilibrio</h2>
    <p class="lead">El intestino y el cerebro están en comunicación constante a través de señales químicas, nerviosas y hormonales.</p>
    <div class="axis" role="img" aria-label="Diagrama del eje intestino-cerebro: intestino, señales y cerebro">
      <div class="axis-node">
        <div class="axis-ico" aria-hidden="true">🦠</div>
        <h3>Intestino</h3>
        <p>Microbiota intestinal y salud digestiva</p>
      </div>
      <div class="axis-bridge" aria-hidden="true">
        <span class="axis-arrow">↔</span>
        <ul>
          <li>Neurotransmisores</li>
          <li>Hormonas</li>
          <li>Nervio vago</li>
          <li>Citocinas</li>
        </ul>
        <strong>Señales</strong>
      </div>
      <div class="axis-node">
        <div class="axis-ico" aria-hidden="true">🧠</div>
        <h3>Cerebro</h3>
        <p>Estado de ánimo, cognición y comportamiento</p>
      </div>
    </div>
    <div class="benefit-grid">
      <article class="benefit-card">${benefitSvg.animo}<h3>Mejor estado de ánimo</h3><p>La microbiota participa en vías que influyen en cómo te sientes día a día.</p></article>
      <article class="benefit-card">${benefitSvg.mente}<h3>Mayor claridad mental</h3><p>Un intestino en equilibrio apoya la cognición y la concentración.</p></article>
      <article class="benefit-card">${benefitSvg.stress}<h3>Menor estrés y ansiedad</h3><p>Las señales del eje pueden modular la respuesta al estrés cotidiano.</p></article>
      <article class="benefit-card">${benefitSvg.inmune}<h3>Salud intestinal e inmune</h3><p>Gran parte del sistema inmune vive en el intestino: cuidarlo es cuidarte.</p></article>
    </div>
  </div>
</section>`;

const microRows = () => {
  const m = site.lab.perGram;
  return [
    { ...m.lacticAcidBacteria, highlight: true },
    m.yeasts,
    m.enterobacteria,
    m.molds,
    { ...m.listeria, safe: true },
  ];
};

export const labNutrition = () => {
  const n = site.nutrition;
  return `
<section class="section lab-nutri" id="nutricion" aria-labelledby="lab-title">
  <div class="wrap">
    <p class="eyebrow">Respaldo Analab</p>
    <h2 id="lab-title" class="h2">Pureza Comprobada: Información Nutricional y Microbiológica <em>Certificada</em></h2>
    <p class="lead">Datos por gramo y por porción, certificados por ${esc(site.lab.displayName)}. Botella de ${site.product.size}: ${n.servingsPerPackage} porciones de ${site.product.servingMl}&nbsp;ml.</p>

    <div class="tabs">
      <input type="radio" name="labtabs" id="tab-micro" checked>
      <input type="radio" name="labtabs" id="tab-nutri">
      <div class="tab-labels" role="tablist" aria-label="Datos de laboratorio">
        <label for="tab-micro" role="tab">Microbiología certificada</label>
        <label for="tab-nutri" role="tab">Información nutricional</label>
      </div>

      <div class="tab-panels">
        <div class="tab-panel tab-micro" role="tabpanel">
          <p class="panel-note">${esc(site.lab.displayName)} · por gramo de producto</p>
          <table class="data-table micro-table">
            <caption class="sr-only">Recuento microbiológico por gramo</caption>
            <thead><tr><th scope="col">Parámetro</th><th scope="col">Resultado</th></tr></thead>
            <tbody>
              ${microRows().map((r) => `<tr class="${r.highlight ? 'is-hot' : ''}${r.safe ? ' is-safe' : ''}"><th scope="row">${esc(r.label)}</th><td>${r.highlight ? `<span class="ufc-badge">${fmtUfc(r.value)} ${esc(r.unit)}</span>` : `${esc(String(r.value))}${r.unit ? ` ${esc(r.unit)}` : ''}`}${r.safe ? ' <span class="safe-tag">Inocuidad</span>' : ''}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
        <div class="tab-panel tab-nutri" role="tabpanel">
          <p class="panel-note">Tamaño de porción: ${esc(n.servingSize)} · Porciones por envase: ${n.servingsPerPackage} (Botella ${site.product.size})</p>
          <div class="table-scroll">
            <table class="data-table nutri-table">
              <caption class="sr-only">Información nutricional por 100 ml y por porción</caption>
              <thead><tr><th scope="col">Parámetro</th><th scope="col">100 ml</th><th scope="col">1 porción (${site.product.servingMl} ml)</th></tr></thead>
              <tbody>
                ${n.rows.map((r) => `<tr><th scope="row">${esc(r.param)}${r.unit ? ` <span class="u">(${esc(r.unit)})</span>` : ''}${r.note ? `<small class="row-note">${esc(r.note)}</small>` : ''}</th><td>${esc(String(r.per100))}</td><td>${esc(String(r.perServing))}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="desk-split" aria-hidden="false">
      <div>
        <h3 class="h3-plain">Microbiología certificada</h3>
        <p class="panel-note">${esc(site.lab.displayName)} · por gramo</p>
        <table class="data-table micro-table">
          <thead><tr><th scope="col">Parámetro</th><th scope="col">Resultado</th></tr></thead>
          <tbody>
            ${microRows().map((r) => `<tr class="${r.highlight ? 'is-hot' : ''}${r.safe ? ' is-safe' : ''}"><th scope="row">${esc(r.label)}</th><td>${r.highlight ? `<span class="ufc-badge">${fmtUfc(r.value)} ${esc(r.unit)}</span>` : `${esc(String(r.value))}${r.unit ? ` ${esc(r.unit)}` : ''}`}${r.safe ? ' <span class="safe-tag">Inocuidad</span>' : ''}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div>
        <h3 class="h3-plain">Información nutricional</h3>
        <p class="panel-note">${esc(n.servingSize)} · ${n.servingsPerPackage} porciones / botella</p>
        <div class="table-scroll">
          <table class="data-table nutri-table">
            <thead><tr><th scope="col">Parámetro</th><th scope="col">100 ml</th><th scope="col">1 porción</th></tr></thead>
            <tbody>
              ${n.rows.map((r) => `<tr><th scope="row">${esc(r.param)}${r.unit ? ` <span class="u">(${esc(r.unit)})</span>` : ''}${r.note ? `<small class="row-note">${esc(r.note)}</small>` : ''}</th><td>${esc(String(r.per100))}</td><td>${esc(String(r.perServing))}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</section>`;
};

export const howToEnjoy = () => `
<section class="section enjoy" id="como-disfrutar" aria-labelledby="enjoy-title">
  <div class="wrap">
    <p class="eyebrow">Modo de uso</p>
    <h2 id="enjoy-title" class="h2">Cómo Disfrutar tu Kéfir Sanavida cada <em>Mañana</em></h2>
    <p class="lead">${esc(site.product.conservation)}</p>
    <div class="enjoy-grid">
      <article class="enjoy-card">
        <div class="enjoy-ph enjoy-ph-a" aria-hidden="true"></div>
        <h3>Directo del vaso</h3>
        <p>Agita la botella (conservada entre 4° y 8°C) y sirve <strong>200 ml</strong> puros. Una porción, sin adornos.</p>
      </article>
      <article class="enjoy-card">
        <div class="enjoy-ph enjoy-ph-b" aria-hidden="true"></div>
        <h3>Batidos antioxidantes</h3>
        <p>Licúalo con frutillas y arándanos frescos para un desayuno cremoso, con el cultivo vivo de la fermentación.</p>
      </article>
      <article class="enjoy-card">
        <div class="enjoy-ph enjoy-ph-c" aria-hidden="true"></div>
        <h3>Bowl de desayuno</h3>
        <p>Úsalo como base con fruta picada, semillas o frutos secos, sin pesadez estomacal. 100% sin lactosa.</p>
      </article>
    </div>
    <p class="center"><a class="link" href="/recetas-con-kefir/">Más recetas con kéfir ${icon('arrow')}</a></p>
  </div>
</section>`;

export const legalTrust = () => {
  const { legal, lab, product } = site;
  return `
<section class="section legal-trust" id="trazabilidad" aria-labelledby="legal-title">
  <div class="wrap legal-box">
    <p class="eyebrow">E-E-A-T local</p>
    <h2 id="legal-title" class="h2">Trazabilidad y respaldo sanitario</h2>
    <p>Elaborado y envasado en origen por <strong>${esc(legal.company)}</strong> (RUT ${esc(legal.rut)}), ${esc(legal.address)}, ${esc(legal.city)}, ${esc(legal.country)}. Planta autorizada por <strong>${esc(legal.seremi.authority)}</strong> — Resolución Exenta N.º <strong>${esc(legal.seremi.resolution)}</strong> (${esc(legal.seremi.date)}) · Código de validación oficial: <strong>${esc(legal.seremi.validationCode)}</strong> en <a href="${legal.seremi.validationUrl}" rel="noopener" target="_blank">seremienlinea.minsal.cl</a>.</p>
    <ul class="legal-pills">
      <li>Lab. ${esc(lab.displayName)}</li>
      <li>${esc(product.size)} · ${product.servings} porciones</li>
      <li>${product.ingredients.map(esc).join(' + ')}</li>
      <li>${site.pillars.join(' · ')}</li>
    </ul>
  </div>
</section>`;
};

export const productSchemaFull = () => {
  const p = site.product;
  const n = site.nutrition;
  const energy = n.rows.find((r) => r.param === 'Energía');
  const protein = n.rows.find((r) => r.param === 'Proteínas');
  const fat = n.rows.find((r) => r.param === 'Materia grasa');
  const carbs = n.rows.find((r) => r.param === 'Hidratos de carbono disponibles');
  const sugar = n.rows.find((r) => r.param === 'Azúcares totales');
  const sodium = n.rows.find((r) => r.param === 'Sodio');

  const schema = {
    '@type': 'Product',
    '@id': abs('/kefir-en-botella/#producto'),
    name: p.name,
    description: `${site.claims.slogan}. ${site.claims.science}`,
    image: abs('/img/og.png'),
    brand: { '@type': 'Brand', name: site.name },
    sku: 'SANAVIDA-KEFIR-1L',
    size: p.size,
    material: p.ingredients.join(', '),
    category: 'Kéfir / Yoghurt de pajaritos',
    nutrition: {
      '@type': 'NutritionInformation',
      servingSize: `${p.servingMl} ml`,
      calories: `${energy.perServing} kcal`,
      proteinContent: `${protein.perServing} g`,
      fatContent: `${fat.perServing} g`,
      carbohydrateContent: `${carbs.perServing} g`,
      sugarContent: `${sugar.perServing} g`,
      sodiumContent: `${sodium.perServing} mg`,
    },
    manufacturer: {
      '@type': 'Organization',
      name: site.legal.company,
      taxID: site.legal.rut,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.legal.address,
        addressLocality: site.legal.city,
        addressRegion: site.legal.region,
        addressCountry: 'CL',
      },
    },
  };

  if (p.price) {
    schema.offers = {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'CLP',
      availability: 'https://schema.org/InStock',
      url: abs('/kefir-en-botella/'),
      areaServed: site.region,
      seller: { '@id': abs('/#negocio') },
    };
  }

  return schema;
};

export const productFaqs = () => [
  {
    q: '¿Por qué no tiene lactosa si se hace con leche entera?',
    a: 'Durante la fermentación, las bacterias ácido-lácticas transforman la lactosa de la leche. El resultado es un kéfir sin lactosa detectable, certificado en laboratorio, manteniendo el resto de nutrientes de la leche.',
  },
  {
    q: '¿Es realmente yogurt de pajaritos / búlgaros vivos?',
    a: `Sí. Se elabora con nódulos de kéfir (pajaritos/búlgaros) vivos, no con cultivos liofilizados. ${site.lab.displayName} certifica 40 millones de UFC/g de bacterias ácido-lácticas y 5,6 millones de UFC/g de levaduras por gramo de producto.`,
  },
  {
    q: '¿Cómo se conserva la botella de 1L?',
    a: 'Mantener refrigerada entre 4° y 8°C. Agitar antes de consumir. Una botella tiene 5 porciones de 200 ml (1 vaso).',
  },
  {
    q: '¿Está autorizado sanitariamente?',
    a: `Sí. Elaborado y envasado por ${site.legal.company} en Ovalle, con Resolución Exenta N.º ${site.legal.seremi.resolution} de la ${site.legal.seremi.authority} (${site.legal.seremi.date}). Código de validación: ${site.legal.seremi.validationCode}.`,
  },
  {
    q: '¿Cómo pido en Ovalle o la IV Región?',
    a: `Por WhatsApp. En ${site.city} hay puntos de entrega semanales gratis y delivery por ${clp(site.deliveryFee)}. Para La Serena, Coquimbo y otras comunas armamos rutas consolidadas. <a href="/pedido-kefir-iv-region/">Ver entregas</a>.`,
  },
];

export function renderProductPage(pages) {
  const crumbs = [
    { name: 'Inicio', href: '/' },
    { name: 'Kéfir en botella', href: pagePath('kefir-en-botella') },
  ];
  const faqs = productFaqs();

  const body = `
<div class="wrap crumbs-wrap">${breadcrumbs(crumbs)}</div>
${productHero()}
${bodyFlow()}
${gutBrain()}
${labNutrition()}
${howToEnjoy()}
${legalTrust()}
${delivery()}
${faq(faqs, 'Preguntas frecuentes sobre el kéfir SanaVida')}
${related('kefir-en-botella', pages)}
${ctaBand('Tu botella de 1L con búlgaros vivos, esta semana', `Pídela por WhatsApp y coordinamos la entrega en la ${site.regionShort}.`)}
`;

  const schema = [
    breadcrumbSchema(crumbs),
    productSchemaFull(),
    faqSchema(faqs),
  ];

  return { body, schema, ogType: 'product' };
}
