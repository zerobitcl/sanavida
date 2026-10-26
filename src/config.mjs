// Fuente única de verdad: producto, lab, legal y entregas. Cualquier cambio se propaga
// a páginas, JSON-LD y sitemap en el próximo build.
export const site = {
  name: 'SanaVida',
  legalName: 'Inversiones Vitalia SpA',
  brandDisplay: 'SANAVIDA',
  tagline: 'Alimenta hoy tu bienestar de mañana',
  pillars: ['Natural', 'Nutritivo', 'Consciente'],
  // Vacío = modo portable (dominio temporal). Cuando tengas el definitivo:
  // url: 'https://tudominio.cl'  →  npm run build
  url: '',
  locale: 'es_CL',
  lang: 'es-CL',
  // TODO: número real en formato internacional sin "+" ni espacios.
  whatsapp: '56900000000',
  instagram: 'https://www.instagram.com/sanavida_kefir/',
  instagramHandle: '@sanavida_kefir',
  city: 'Ovalle',
  region: 'Región de Coquimbo',
  regionShort: 'IV Región',
  country: 'CL',
  geo: { lat: -30.6011, lng: -71.1994 },
  deliveryFee: 1000,
  cities: ['Ovalle', 'La Serena', 'Coquimbo', 'Andacollo', 'Vicuña', 'Monte Patria', 'Combarbalá', 'Illapel', 'Los Vilos'],
  maker: { name: 'Pao', role: 'Elaboradora de SanaVida' },
  // RUT y razón social de la empresa (no de personas naturales).
  legal: {
    company: 'Inversiones Vitalia SpA',
    rut: '78.516.946-8',
    address: 'Daniel Riquelme 735',
    city: 'Ovalle',
    region: 'Región de Coquimbo',
    country: 'Chile',
    seremi: {
      authority: 'SEREMI de Salud Región de Coquimbo',
      resolution: '2604496921',
      date: '30/09/2026',
      validationCode: 'DQ2GD5',
      validationUrl: 'https://seremienlinea.minsal.cl',
    },
  },
  product: {
    name: 'Yoghurt de Pajaritos / Kéfir de Elaboración Natural SanaVida',
    shortName: 'kéfir natural SanaVida',
    flavor: 'Sabor Natural',
    format: 'botella',
    size: '1 L',
    volumeMl: 1000,
    servings: 5,
    servingMl: 200,
    // price en CLP. null = Product schema sin offers (Google no muestra rich result de precio).
    price: 8000,
    ingredients: ['Leche entera', 'Búlgaros vivos'],
    conservation: 'Mantener refrigerado entre 4° y 8°C. Agitar antes de consumir.',
    seals: [
      { id: 'lactosa', label: 'Sin Lactosa', tone: 'teal' },
      { id: 'azucar', label: 'Sin Azúcar Añadida', tone: 'teal' },
      { id: 'gluten', label: 'Libre de Gluten', tone: 'teal' },
      { id: 'bulgaros', label: 'Búlgaros Vivos', tone: 'teal' },
      { id: 'inmune', label: 'Estimula el Sistema Inmune', tone: 'sun' },
      { id: 'probioticos', label: 'Probióticos Naturales Certificados', tone: 'teal' },
    ],
  },
  // Certificado Laboratorio Analab — recuento por gramo de producto.
  lab: {
    name: 'Analab',
    displayName: 'Laboratorio Analab',
    totalCount: true,
    strainsIdentified: false,
    perGram: {
      lacticAcidBacteria: { value: 40_000_000, unit: 'UFC/g', label: 'Bacterias ácido lácticas' },
      yeasts: { value: 5_600_000, unit: 'UFC/g', label: 'Levaduras' },
      enterobacteria: { value: '<10', unit: 'UFC/g', label: 'Enterobacterias' },
      molds: { value: '<10', unit: 'UFC/g', label: 'Mohos' },
      listeria: { value: 'Ausencia', unit: '', label: 'Listeria monocytogenes' },
    },
  },
  // Por 100 ml y por porción de 200 ml (botella 1L = 5 porciones).
  nutrition: {
    servingSize: '200 ml (1 vaso)',
    servingsPerPackage: 5,
    rows: [
      { param: 'Energía', unit: 'kcal', per100: 56, perServing: 112 },
      { param: 'Proteínas', unit: 'g', per100: 3.58, perServing: 7.16 },
      { param: 'Materia grasa', unit: 'g', per100: 2.88, perServing: 5.76 },
      { param: 'Hidratos de carbono disponibles', unit: 'g', per100: 3.98, perServing: 7.96 },
      { param: 'Azúcares totales', unit: 'g', per100: 1.6, perServing: 3.2, note: 'propios de la leche, sin azúcar añadida' },
      { param: 'Fibra dietaria total', unit: 'g', per100: '<1,0', perServing: '<2,0' },
      { param: 'Cenizas', unit: 'g', per100: 0.74, perServing: 1.48 },
      { param: 'Sodio', unit: 'mg', per100: 36.7, perServing: 73.4 },
      { param: 'Calcio', unit: 'mg', per100: 117.3, perServing: 234.6 },
      { param: 'Fósforo', unit: 'mg', per100: 93.5, perServing: 187.0 },
    ],
  },
  media: {
    processVideo: '/video/proceso.webm',
    processPoster: '/img/proceso-poster.webp',
    berries: '/img/batido-frutillas-arandanos.webp',
    maker: '/img/pao.jpg',
  },
  logo: { src: '/img/brand/logo-240.png', large: '/img/brand/logo-480.png', w: 1179, h: 786 },
  claims: {
    short: 'kéfir natural vivo: bacterias buenas para sentirte bien',
    science:
      'Contiene 40 millones de UFC/g de bacterias ácido-lácticas y 5,6 millones de UFC/g de levaduras, certificadas por Laboratorio Analab, propias de la fermentación con nódulos de kéfir.',
    slogan: 'Alimenta hoy tu bienestar de mañana',
    // Guion ads 05-10-26: contraste súper vs natural (repetido en los 4 videos).
    vsSuper:
      'Las opciones del supermercado pasan por procesos industriales para durar meses en góndola y pierden el cultivo vivo. SanaVida es kéfir real: 100% natural, sin pasteurizar, con envío fresco.',
  },
  deliveryPoints: [
    { name: 'Sector Atenas y Villa El Ingenio', note: 'Entrega semanal gratis · Ovalle' },
    { name: 'Plaza de Armas de Ovalle', note: 'Entrega semanal gratis · Ovalle' },
    { name: 'Supermercado Santa Isabel, salida sur de Ovalle', note: 'Entrega semanal gratis · Ovalle' },
  ],
};

export const pagePath = (slug = '') => (slug ? `/${slug}/` : '/');

export const abs = (path) => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return site.url ? `${site.url.replace(/\/$/, '')}${p}` : p;
};

export const waLink = (msg = 'Hola SanaVida, quiero pedir kéfir natural en botella de 1L 🥛') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

export const clp = (n) => `$${n.toLocaleString('es-CL')}`;

export const fmtUfc = (n) =>
  typeof n === 'number' ? n.toLocaleString('es-CL') : n;
