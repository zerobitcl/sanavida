import { site, waLink, abs, pagePath } from './config.mjs';
import { esc, brandLogo, icon } from './components.mjs';

const orgSchema = {
  '@type': ['LocalBusiness', 'FoodEstablishment'],
  '@id': abs('/#negocio'),
  name: site.name,
  legalName: site.legal.company,
  taxID: site.legal.rut,
  alternateName: ['SanaVida', 'SANAVIDA', 'Kéfir Sanavida', 'Yoghurt de Pajaritos SanaVida'],
  url: abs('/'),
  logo: abs(site.logo.large),
  image: abs('/img/og.png'),
  description: `${site.claims.slogan}. ${site.claims.short}. ${site.claims.science} Elaborado en ${site.city}, con entregas en toda la ${site.region}.`,
  telephone: `+${site.whatsapp}`,
  priceRange: '$',
  servesCuisine: 'Lácteos fermentados',
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.legal.address,
    addressLocality: site.legal.city,
    addressRegion: site.legal.region,
    addressCountry: site.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: [
    { '@type': 'AdministrativeArea', name: site.region },
    ...site.cities.map((name) => ({ '@type': 'City', name })),
  ],
  sameAs: [site.instagram],
};

export const nav = [
  { href: '/catalogo/', label: 'Catálogo' },
  { href: '/recetas-con-kefir/', label: 'Recetas' },
  { href: '/blog/', label: 'Blog' },
  { href: '/pedido/', label: 'Pedir' },
];

export const footerGuides = [
  { href: '/catalogo/', label: 'Catálogo y promociones' },
  { href: '/kefir-en-botella/', label: 'Kéfir en botella' },
  { href: '/yogurt-de-pajaritos/', label: 'Yogurt de pajaritos' },
  { href: '/kefir-beneficios-digestion/', label: 'Beneficios digestivos' },
  { href: '/kefir-vs-yogurt/', label: 'Kéfir vs yogur' },
  { href: '/como-tomar-kefir/', label: 'Cómo tomarlo' },
  { href: '/bulgaros-de-kefir/', label: 'Búlgaros' },
  { href: '/recetas-con-kefir/', label: 'Recetas' },
  { href: '/blog/', label: 'Blog' },
  { href: '/kefir-intolerancia-lactosa/', label: 'Kéfir y lactosa' },
  { href: '/probioticos-naturales/', label: 'Kéfir y probióticos' },
  { href: '/bacterias-del-kefir/', label: 'Qué contiene el kéfir' },
  { href: '/pedido-kefir-iv-region/', label: `Entregas ${site.regionShort}` },
];

export const footerShop = [
  { href: '/pedido/', label: 'Formulario de pedido' },
  { href: '/politicas/', label: 'Políticas y condiciones' },
  { href: '/pedido-kefir-iv-region/', label: `Cobertura ${site.regionShort}` },
];

export function layout({ slug, title, description, body, schema = [], ogType = 'website', noindex = false }) {
  const path = pagePath(slug === '404' ? '' : slug);
  // Ruta relativa: el navegador y Google la resuelven contra el host actual
  // (temporal o definitivo) sin rebuild. Si site.url está definido, canonical/OG absolutos.
  const canonical = abs(path);
  const graph = { '@context': 'https://schema.org', '@graph': [orgSchema, ...schema] };
  const navList = `<ul>${nav.map((n) => `<li><a href="${n.href}"${n.href === pagePath(slug) ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('')}</ul>`;
  const ogAbs = Boolean(site.url);
  const robots = noindex
    ? 'noindex,nofollow'
    : 'index,follow,max-image-preview:large';

  return `<!doctype html>
<html lang="${site.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="${robots}">
<meta name="theme-color" content="#FFFCF8">
<meta name="geo.region" content="CL-CO">
<meta name="geo.placename" content="${site.city}">
<meta property="og:type" content="${ogType}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
${ogAbs ? `<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${abs('/img/og.png')}">` : `<meta property="og:image" content="/img/og.png">`}
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/img/brand/favicon-64.png" type="image/png" sizes="64x64">
<link rel="apple-touch-icon" href="/img/brand/apple-touch-180.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<!-- Fredoka ≈ letra redonda/gruesa del logo; Nunito para leer párrafos sin pelear con la marca. -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400..700&family=Nunito:wght@400..800&display=swap">
<link rel="stylesheet" href="/styles.css">
<script type="application/ld+json">${JSON.stringify(graph)}</script>
</head>
<body>
<a class="skip" href="#main">Saltar al contenido</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="/" aria-label="SanaVida, inicio">${brandLogo(56)}<small>kéfir natural<br>${site.regionShort}</small></a>
    <nav class="nav-desk" aria-label="Principal">${navList}</nav>
    <details class="menu">
      <summary aria-label="Abrir menú"><span></span><span></span><span></span></summary>
      <nav aria-label="Principal móvil">${navList}</nav>
    </details>
    <a class="btn btn-sm btn-wa header-cta" href="/pedido/">${icon('wa')}<span>Pedir</span></a>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <a class="brand brand-light" href="/" aria-label="SanaVida, inicio">${brandLogo(96, true)}</a>
      <p>Yogurt de pajaritos elaborado a mano en ${site.city}. Entregamos en toda la ${site.regionShort}. Bienestar que se cultiva en cada litro.</p>
    </div>
    <nav aria-label="Guías">
      <h2 class="foot-h">Guías</h2>
      <ul>${footerGuides.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul>
    </nav>
    <div>
      <h2 class="foot-h">Pedidos</h2>
      <ul>
        ${footerShop.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
        <li><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp</a></li>
        <li><a href="${site.instagram}" target="_blank" rel="noopener">Instagram ${site.instagramHandle}</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap foot-legal"><small>© ${new Date().getFullYear()} ${site.name} · Elaborado por ${site.legal.company} (RUT ${site.legal.rut}) · ${site.legal.address}, ${site.city}, ${site.region}, Chile · Res. Exenta N.º ${site.legal.seremi.resolution} · <a href="/politicas/">Políticas</a></small></div>
</footer>
<a class="fab" href="${waLink()}" target="_blank" rel="noopener" aria-label="Pedir kéfir por WhatsApp">${icon('wa')}<span>Pedir kéfir</span></a>
</body>
</html>`;
}
