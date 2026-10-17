import { site, clp } from '../config.mjs';
import { shellPage, placeholderCard } from '../shell.mjs';
import { btnWa, jarArt, icon } from '../components.mjs';

const products = [
  {
    title: site.product.shortName,
    meta: `${site.product.size} · ${site.product.flavor}`,
    body: `${site.claims.short}. Listo para tomar, sin pasteurizar.`,
    href: '/kefir-en-botella/',
    cta: 'Ver producto',
  },
  {
    title: 'Pack familiar (placeholder)',
    meta: 'Promoción',
    body: 'Slot para pack o formato adicional. Precio y detalle pendientes.',
  },
  {
    title: 'Suscripción semanal (placeholder)',
    meta: 'Próximamente',
    body: 'Pedido recurrente con entrega fija. Flujo y condiciones pendientes.',
  },
];

const promos = [
  {
    title: 'Promo de lanzamiento',
    meta: 'Activa al publicar precio',
    body: 'Espacio para descuento, 2x1 o beneficio de primera compra.',
  },
  {
    title: 'Ruta consolidada',
    meta: site.regionShort,
    body: `Cuando se juntan pedidos hacia tu comuna, coordinamos entrega. Delivery en ${site.city}: ${site.deliveryFee ? clp(site.deliveryFee) : 'por confirmar'}.`,
    href: '/pedido-kefir-iv-region/',
    cta: 'Cómo pedir',
  },
];

export default shellPage({
  slug: 'catalogo',
  nav: 'Catálogo',
  tag: 'Productos',
  title: `Catálogo y promociones | ${site.name}`,
  description: `Productos y promociones de kéfir artesanal SanaVida en ${site.city}. Botella ${site.product.size}, packs y ofertas vigentes.`,
  eyebrow: 'Productos',
  h1: `Catálogo SanaVida: kéfir <em>vivo</em> y promociones`,
  lead: `Aquí vivirá el catálogo completo y las promociones activas. Por ahora: la botella artesanal de ${site.product.size} y slots listos para packs, suscripciones y ofertas.`,
  stubNote: 'Estructura de catálogo + promos. Precios, packs y copy fino llegan después.',
  cta: 'Pedir por WhatsApp',
  ctaMsg: 'Hola SanaVida, quiero ver el catálogo y pedir kéfir',
  blocks: [
    {
      id: 'productos',
      eyebrow: 'Catálogo',
      title: 'Productos',
      lead: 'Tarjetas placeholder: se reemplazan con datos reales (precio, stock, formatos).',
      html: `<div class="shell-grid">${products.map((p) => placeholderCard(p)).join('')}</div>
        <div class="shell-feature">
          <div class="shell-feature-art">${jarArt()}</div>
          <div>
            <h3 class="h3">${site.product.name}</h3>
            <p class="lead">${site.claims.science}</p>
            <div class="hero-actions">
              ${btnWa('Pedir esta botella')}
              <a class="btn btn-ghost" href="/kefir-en-botella/">Ficha completa ${icon('arrow')}</a>
            </div>
          </div>
        </div>`,
    },
    {
      id: 'promociones',
      eyebrow: 'Ofertas',
      title: 'Promociones',
      lead: 'Slots listos para activar campañas sin tocar layout.',
      html: `<div class="shell-grid shell-grid-2">${promos.map((p) => placeholderCard(p)).join('')}</div>`,
    },
  ],
});
