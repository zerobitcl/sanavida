import { site, clp } from '../config.mjs';
import { shellPage } from '../shell.mjs';
import { btnWa, jarArt, icon } from '../components.mjs';

const price = site.product.price ? clp(site.product.price) : null;

export default shellPage({
  slug: 'catalogo',
  nav: 'Catálogo',
  tag: 'Productos',
  title: `Catálogo y promociones | ${site.name}`,
  description: `Productos y promociones de kéfir natural SanaVida en ${site.city}. Botella ${site.product.size}.`,
  eyebrow: 'Productos',
  h1: `Catálogo SanaVida: kéfir <em>natural</em>`,
  lead: `Kéfir vivo en botella de ${site.product.size}, listo para tomar. Hecho en ${site.city}, con entregas en la ${site.regionShort}.`,
  cta: 'Pedir por WhatsApp',
  ctaMsg: 'Hola SanaVida, quiero pedir kéfir natural',
  blocks: [
    {
      id: 'productos',
      eyebrow: 'Botella',
      title: site.product.shortName,
      html: `<div class="shell-feature">
          <div class="shell-feature-art">${jarArt()}</div>
          <div>
            <p class="lead">${site.claims.short}. ${site.product.flavor} · ${site.product.size}${price ? ` · ${price}` : ''}.</p>
            <ul class="ticks">
              ${site.product.seals.slice(0, 4).map((s) => `<li>${s.label}</li>`).join('')}
            </ul>
            <div class="hero-actions">
              ${btnWa('Pedir esta botella')}
              <a class="btn btn-ghost" href="/kefir-en-botella/">Ficha completa ${icon('arrow')}</a>
            </div>
          </div>
        </div>`,
    },
    {
      id: 'promociones',
      eyebrow: 'Entregas',
      title: 'Cómo recibe tu pedido',
      lead: `Puntos gratis en ${site.city} y rutas consolidadas en la ${site.regionShort}. Delivery en ${site.city}: ${clp(site.deliveryFee)}.`,
      html: `<div class="hero-actions">
        <a class="btn btn-ghost" href="/pedido-kefir-iv-region/">Ver coberturas ${icon('arrow')}</a>
        <a class="btn btn-ghost" href="/pedido/">Hacer un pedido</a>
      </div>`,
    },
  ],
});
