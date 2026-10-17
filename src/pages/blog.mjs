import { site } from '../config.mjs';
import { shellPage, placeholderCard } from '../shell.mjs';

const posts = [
  {
    title: 'Cómo empezar a tomar kéfir sin que te caiga mal',
    meta: 'Guía · Borrador',
    body: 'Plan de cucharadas, señales normales y cuándo subir la dosis.',
    href: '/como-tomar-kefir/',
    cta: 'Leer guía',
  },
  {
    title: 'Kéfir vs yogur: qué cambia de verdad',
    meta: 'Educación · Publicado',
    body: 'Cultivos, lactosa y por qué el kéfir no es “otro yogur”.',
    href: '/kefir-vs-yogurt/',
    cta: 'Leer guía',
  },
  {
    title: 'Qué dice el laboratorio de nuestro kéfir',
    meta: 'Ciencia · Publicado',
    body: 'UFC/g certificados y cómo leer el análisis sin marketing vacío.',
    href: '/bacterias-del-kefir/',
    cta: 'Leer guía',
  },
  {
    title: 'Slot de artículo nuevo (IA + SEO)',
    meta: 'Pendiente',
    body: 'Aquí entran posts generados/optimizados con el flujo de contenido IA.',
  },
  {
    title: 'Slot de artículo nuevo (IA + SEO)',
    meta: 'Pendiente',
    body: 'Segundo slot para calendario editorial.',
  },
  {
    title: 'Slot de artículo nuevo (IA + SEO)',
    meta: 'Pendiente',
    body: 'Tercer slot para keywords locales (Ovalle, La Serena, Coquimbo).',
  },
];

export default shellPage({
  slug: 'blog',
  nav: 'Blog',
  tag: 'Blog',
  title: `Blog de kéfir y bienestar | ${site.name}`,
  description: `Artículos sobre kéfir, digestión, recetas y bienestar desde ${site.city}. Contenido educativo SanaVida.`,
  eyebrow: 'Blog',
  h1: `Ideas, guías y <em>ciencia amable</em>`,
  lead: 'Índice del blog. Las landings SEO actuales alimentan las primeras tarjetas; los slots vacíos se llenan con el flujo de contenido IA.',
  stubNote: 'Índice listo. Falta CMS/posts propios + pipeline de optimización con IA.',
  cta: 'Pedir kéfir',
  blocks: [
    {
      id: 'articulos',
      eyebrow: 'Lecturas',
      title: 'Artículos',
      html: `<div class="shell-grid">${posts.map((p) => placeholderCard(p)).join('')}</div>
        <p class="shell-muted center" style="margin-top:2rem">También puedes explorar las <a href="/recetas-con-kefir/">recetas</a> y las guías del footer.</p>`,
    },
  ],
});
