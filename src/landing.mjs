import { site, abs, pagePath } from './config.mjs';
import { btnWa, breadcrumbs, breadcrumbSchema, faq, faqSchema, delivery, ctaBand, related, healthNote, esc, midCta, startPlan, science, testimonialsBlock, trustBar, processBlock, berryBlock, makerBlock, productSchema } from './components.mjs';

const PUBLISHED = '2026-09-23';
const MODIFIED = '2026-10-15';

// Las secciones se declaran como datos {id, title, html} para generar a la vez el índice
// (enlaces ancla = sitelinks potenciales en Google) y el cuerpo, sin duplicar títulos.
export function landing(page) {
  return {
    ...page,
    render(pages) {
      const crumbs = [
        { name: 'Inicio', href: '/' },
        { name: page.nav, href: pagePath(page.slug) },
      ];
      const url = abs(pagePath(page.slug));

      const body = `
<section class="hero hero-sub">
  <div class="wrap">
    ${breadcrumbs(crumbs)}
    <div class="sub-grid">
      <div>
        <p class="eyebrow">${esc(page.eyebrow)}</p>
        <h1 class="display display-sub">${page.h1}</h1>
        <p class="lead">${page.lead}</p>
        <div class="hero-actions">${btnWa(page.cta || 'Pedir kéfir por WhatsApp', page.ctaMsg)}</div>
      </div>
      ${page.keyFacts ? `<aside class="facts" aria-label="Resumen rápido"><p class="facts-t">En 30 segundos</p><ul>${page.keyFacts.map((f) => `<li>${f}</li>`).join('')}</ul></aside>` : ''}
    </div>
  </div>
</section>

<div class="wrap article-grid">
  <nav class="toc" aria-label="En esta guía">
    <p class="toc-t">En esta guía</p>
    <ol>${page.sections.map((s) => `<li><a href="#${s.id}">${esc(s.title)}</a></li>`).join('')}${page.faqs ? '<li><a href="#faq-title">Preguntas frecuentes</a></li>' : ''}</ol>
  </nav>
  <article class="prose">
    ${page.sections.map((s, i) => `<section id="${s.id}"><h2>${esc(s.title)}</h2>${s.html}</section>${i === 1 ? midCta(page.midCta, page.ctaMsg) : ''}`).join('')}
    ${page.health ? healthNote() : ''}
  </article>
</div>

${trustBar()}
${page.process ? processBlock() : ''}
${page.berries ? berryBlock() : ''}
${page.maker ? makerBlock() : ''}
${page.startPlan ? startPlan() : ''}
${page.science ? science(page.slug) : ''}
${testimonialsBlock()}
${page.showDelivery !== false ? delivery() : ''}
${page.faqs ? faq(page.faqs) : ''}
${related(page.slug, pages)}
${ctaBand(page.ctaTitle, page.ctaText)}`;

      const schema = [
        breadcrumbSchema(crumbs),
        {
          '@type': 'Article',
          headline: page.h1.replace(/<[^>]+>/g, ''),
          description: page.description,
          inLanguage: site.lang,
          mainEntityOfPage: url,
          datePublished: PUBLISHED,
          dateModified: MODIFIED,
          author: { '@id': abs('/#negocio') },
          publisher: { '@id': abs('/#negocio') },
          image: abs('/img/og.png'),
        },
      ];
      if (page.faqs) schema.push(faqSchema(page.faqs));
      if (page.product && productSchema()) schema.push(productSchema());
      if (page.howTo) schema.push({ '@type': 'HowTo', name: page.howTo.name, step: page.howTo.steps.map((t, i) => ({ '@type': 'HowToStep', position: i + 1, text: t })) });

      return { body, schema, ogType: 'article' };
    },
  };
}
