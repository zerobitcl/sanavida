import { site } from '../config.mjs';
import { renderProductPage } from '../product.mjs';

export default {
  slug: 'kefir-en-botella',
  nav: 'Kéfir en botella',
  tag: 'Producto',
  title: 'Kéfir artesanal 1L Ovalle | Yoghurt de Pajaritos SanaVida',
  description:
    'Kéfir artesanal y yoghurt de pajaritos en botella 1L. 40M UFC/g, sin lactosa, sin azúcar añadida. Certificado Analab. Entregas en Ovalle y IV Región.',
  render: renderProductPage,
};
