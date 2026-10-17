import { site } from '../config.mjs';
import { shellPage, placeholderCard } from '../shell.mjs';

const posts = [
  {
    title: 'Cómo empezar a tomar kéfir sin que te caiga mal',
    meta: 'Guía',
    body: 'Plan de cucharadas, señales normales y cuándo subir la dosis.',
    href: '/como-tomar-kefir/',
    cta: 'Leer guía',
  },
  {
    title: 'Kéfir vs yogur: qué cambia de verdad',
    meta: 'Educación',
    body: 'Cultivos, lactosa y por qué el kéfir no es “otro yogur”.',
    href: '/kefir-vs-yogurt/',
    cta: 'Leer guía',
  },
  {
    title: 'Qué dice el laboratorio de nuestro kéfir',
    meta: 'Ciencia',
    body: 'UFC/g certificados y cómo leer el análisis sin marketing vacío.',
    href: '/bacterias-del-kefir/',
    cta: 'Leer guía',
  },
  {
    title: 'Beneficios del kéfir para la digestión',
    meta: 'Salud',
    body: 'Gases, hinchazón y cómo incorporarlo con calma.',
    href: '/kefir-beneficios-digestion/',
    cta: 'Leer guía',
  },
  {
    title: 'Recetas con kéfir',
    meta: 'Cocina',
    body: 'Batidos, bowls y formas ricas de tomarlo todos los días.',
    href: '/recetas-con-kefir/',
    cta: 'Ver recetas',
  },
  {
    title: 'Kéfir y lactosa',
    meta: 'Guía',
    body: 'Por qué muchas personas con intolerancia leve lo toleran mejor.',
    href: '/kefir-intolerancia-lactosa/',
    cta: 'Leer guía',
  },
];

export default shellPage({
  slug: 'blog',
  nav: 'Blog',
  tag: 'Blog',
  title: `Blog de kéfir y bienestar | ${site.name}`,
  description: `Artículos sobre kéfir, digestión, recetas y bienestar desde ${site.city}.`,
  eyebrow: 'Blog',
  h1: `Ideas, guías y <em>ciencia amable</em>`,
  lead: `Lecturas sobre kéfir natural, digestión y bienestar desde ${site.city}.`,
  cta: 'Pedir kéfir',
  blocks: [
    {
      id: 'articulos',
      eyebrow: 'Lecturas',
      title: 'Artículos',
      html: `<div class="shell-grid">${posts.map((p) => placeholderCard(p)).join('')}</div>`,
    },
  ],
});
