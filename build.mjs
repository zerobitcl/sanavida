import { mkdir, writeFile, readFile, cp, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { site } from './src/config.mjs';
import { layout } from './src/layout.mjs';
import home from './src/pages/home.mjs';
import pajaritos from './src/pages/yogurt-de-pajaritos.mjs';
import digestion from './src/pages/kefir-beneficios-digestion.mjs';
import vsYogurt from './src/pages/kefir-vs-yogurt.mjs';
import comoTomar from './src/pages/como-tomar-kefir.mjs';
import bulgaros from './src/pages/bulgaros-de-kefir.mjs';
import pedidoRegion from './src/pages/pedido-kefir-iv-region.mjs';
import recetas from './src/pages/recetas-con-kefir.mjs';
import lactosa from './src/pages/kefir-intolerancia-lactosa.mjs';
import probioticos from './src/pages/probioticos-naturales.mjs';
import bacterias from './src/pages/bacterias-del-kefir.mjs';
import botella from './src/pages/kefir-en-botella.mjs';
import catalogo from './src/pages/catalogo.mjs';
import pedido from './src/pages/pedido.mjs';
import politicas from './src/pages/politicas.mjs';
import blog from './src/pages/blog.mjs';
import cotizacion from './src/pages/cotizacion.mjs';
import dashboard from './src/pages/dashboard.mjs';
import oferta from './src/pages/oferta.mjs';

const OUT = 'dist';
const pages = [
  home,
  catalogo,
  pedido,
  politicas,
  blog,
  cotizacion,
  dashboard,
  oferta,
  pajaritos,
  digestion,
  vsYogurt,
  comoTomar,
  bulgaros,
  pedidoRegion,
  recetas,
  lactosa,
  probioticos,
  bacterias,
  botella,
];
const today = new Date().toISOString().slice(0, 10);

// Minificado conservador (sin dependencias): colapsa espacios entre etiquetas y comentarios.
// Suficiente para páginas de ~20 KB; gzip/brotli del servidor hace el resto.
// Sólo se colapsa whitespace con salto de línea: los espacios entre inline (</strong> <em>) son texto.
const minHtml = (h) => h.replace(/<!--(?!\[)[\s\S]*?-->/g, '').replace(/>\s*\n\s*</g, '><').replace(/\n\s*/g, '\n').trim();
const minCss = (c) => c.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,>])\s*/g, '$1').replace(/;}/g, '}').trim();

// El proyecto vive en Google Drive: el cliente de sincronización bloquea archivos un instante.
await rm(OUT, { recursive: true, force: true, maxRetries: 10, retryDelay: 300 });
await mkdir(OUT, { recursive: true });
await cp('public', OUT, { recursive: true });

// Hash en el nombre: permite cachear el CSS 1 año en el CDN/navegador sin servir versiones viejas.
const css = minCss(await readFile('src/styles.css', 'utf8'));
const cssFile = `styles.${createHash('md5').update(css).digest('hex').slice(0, 8)}.css`;
await writeFile(join(OUT, cssFile), css);
const withCss = (html) => html.replace('href="/styles.css"', `href="/${cssFile}"`);

for (const page of pages) {
  const dir = join(OUT, page.slug);
  await mkdir(dir, { recursive: true });

  // Landings autónomas (p. ej. ads): HTML completo sin shell del sitio.
  if (page.standalone) {
    const { html } = page.render(pages);
    await writeFile(join(dir, 'index.html'), minHtml(html));
    if (page.title.length > 65 || page.description.length > 160) {
      console.warn(`⚠ SERP truncado en /${page.slug}: title ${page.title.length}, desc ${page.description.length}`);
    }
    continue;
  }

  const { body, schema, ogType } = page.render(pages);
  const html = withCss(
    layout({
      slug: page.slug,
      title: page.title,
      description: page.description,
      body,
      schema,
      ogType,
      noindex: Boolean(page.noindex),
    }),
  );
  await writeFile(join(dir, 'index.html'), minHtml(html));
  if (page.title.length > 65 || page.description.length > 160) {
    console.warn(`⚠ SERP truncado en /${page.slug}: title ${page.title.length}, desc ${page.description.length}`);
  }
}

const notFound = layout({
  slug: '404',
  title: 'Página no encontrada | SanaVida',
  description: 'La página que buscas no existe.',
  body: `<section class="hero hero-sub"><div class="wrap narrow"><p class="eyebrow">Error 404</p><h1 class="display display-sub">Esta página se nos <em>fermentó</em> de más.</h1><p class="lead">No encontramos lo que buscabas. Vuelve al inicio o revisa nuestras guías.</p><div class="hero-actions"><a class="btn btn-wa" href="/">Ir al inicio</a></div></div></section>`,
});
await writeFile(join(OUT, '404.html'), withCss(minHtml(notFound).replace('index,follow', 'noindex')));

await mkdir(join(OUT, 'img'), { recursive: true });
// Sitemap exige URLs absolutas: sólo se genera cuando hay dominio definitivo.
if (site.url) {
  const base = site.url.replace(/\/$/, '');
  await writeFile(
    join(OUT, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => !p.noindex)
  .map((p) => `  <url><loc>${base}/${p.slug ? p.slug + '/' : ''}</loc><lastmod>${today}</lastmod><priority>${p.slug ? '0.8' : '1.0'}</priority></url>`)
  .join('\n')}
</urlset>
`,
  );
  await writeFile(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);
} else {
  await writeFile(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n`);
  console.log('ℹ Dominio vacío: sitemap omitido (portable para hosting temporal).');
}

console.log(`✓ ${pages.length} páginas generadas en /${OUT}${site.url ? ` → ${site.url}` : ' (URLs relativas)'}`);
