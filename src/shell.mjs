import { site, pagePath } from './config.mjs';
import { breadcrumbs, breadcrumbSchema, ctaBand, esc, btnWa, icon } from './components.mjs';

/** Banner visible solo en shells: marca “estructura lista, copy pendiente”. */
const stubBanner = (note) =>
  note
    ? `<aside class="shell-banner" role="status"><strong>Estructura lista</strong> — ${esc(note)}</aside>`
    : '';

/**
 * Página-shell: hero corto + bloques placeholder + CTA.
 * Usado para secciones nuevas mientras llega el contenido fino.
 */
export function shellPage(page) {
  return {
    slug: page.slug,
    nav: page.nav,
    tag: page.tag || page.nav,
    title: page.title,
    description: page.description,
    noindex: Boolean(page.noindex),
    render() {
      const crumbs = [
        { name: 'Inicio', href: '/' },
        { name: page.nav, href: pagePath(page.slug) },
      ];
      const blocks = (page.blocks || [])
        .map(
          (b) => `
<section class="section shell-block" id="${esc(b.id)}" aria-labelledby="${esc(b.id)}-title">
  <div class="wrap">
    <p class="eyebrow">${esc(b.eyebrow || 'Próximamente')}</p>
    <h2 id="${esc(b.id)}-title" class="h2">${b.title}</h2>
    ${b.lead ? `<p class="lead">${b.lead}</p>` : ''}
    ${b.html || ''}
  </div>
</section>`,
        )
        .join('');

      const body = `
<section class="hero hero-sub">
  <div class="wrap">
    ${breadcrumbs(crumbs)}
    ${stubBanner(page.stubNote)}
    <p class="eyebrow">${esc(page.eyebrow || site.name)}</p>
    <h1 class="display display-sub">${page.h1}</h1>
    <p class="lead">${page.lead}</p>
    ${
      page.actions
        ? `<div class="hero-actions">${page.actions}</div>`
        : page.hideCta
          ? ''
          : `<div class="hero-actions">${btnWa(page.cta || 'Hablar por WhatsApp', page.ctaMsg)}</div>`
    }
  </div>
</section>
${blocks}
${page.hideCtaBand ? '' : ctaBand(page.ctaTitle, page.ctaText)}`;

      return {
        body,
        schema: [breadcrumbSchema(crumbs)],
        ogType: page.ogType || 'website',
      };
    },
  };
}

export const placeholderCard = ({ title, meta, body, href, cta = 'Ver' }) => `
<article class="shell-card">
  <div class="shell-card-media" aria-hidden="true"></div>
  <div class="shell-card-body">
    ${meta ? `<span class="tag">${esc(meta)}</span>` : ''}
    <h3>${esc(title)}</h3>
    <p>${esc(body)}</p>
    ${href ? `<a class="link" href="${href}">${esc(cta)} ${icon('arrow')}</a>` : `<span class="shell-muted">Contenido pendiente</span>`}
  </div>
</article>`;

export const formField = ({ name, label, type = 'text', required = true, options, placeholder, rows }) => {
  const id = `f-${name}`;
  const req = required ? ' required' : '';
  const ph = placeholder ? ` placeholder="${esc(placeholder)}"` : '';
  if (type === 'textarea') {
    return `<label class="field" for="${id}"><span>${esc(label)}</span><textarea id="${id}" name="${name}" rows="${rows || 4}"${req}${ph}></textarea></label>`;
  }
  if (type === 'select') {
    return `<label class="field" for="${id}"><span>${esc(label)}</span><select id="${id}" name="${name}"${req}>
      <option value="">Selecciona…</option>
      ${(options || []).map((o) => `<option value="${esc(o.value || o)}">${esc(o.label || o)}</option>`).join('')}
    </select></label>`;
  }
  return `<label class="field" for="${id}"><span>${esc(label)}</span><input id="${id}" name="${name}" type="${type}"${req}${ph}></label>`;
};
