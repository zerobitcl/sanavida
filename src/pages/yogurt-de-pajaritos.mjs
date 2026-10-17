import { landing } from '../landing.mjs';
import { site, clp } from '../config.mjs';

export default landing({
  slug: 'yogurt-de-pajaritos',
  nav: 'Yogurt de pajaritos',
  tag: 'Local',
  title: `Yogurt de pajaritos en la ${site.regionShort}: qué es y dónde comprar`,
  description: `El yogurt de pajaritos es kéfir de leche fermentado con búlgaros. Cómpralo natural en la ${site.region}: puntos en Ovalle y entregas regionales.`,
  eyebrow: 'El kéfir de siempre, con nombre chileno',
  h1: `Yogurt de pajaritos en la ${site.regionShort}: <em>el de la abuela</em>, hecho a mano`,
  lead: `Si alguna vez te regalaron "pajaritos" en un frasco, ya conoces el kéfir. En SanaVida lo seguimos preparando igual en ${site.city}: con búlgaros vivos, sin pasteurizar y disponible en toda la región.`,
  cta: 'Quiero yogurt de pajaritos',
  ctaMsg: 'Hola SanaVida, quiero pedir yogurt de pajaritos',
  keyFacts: [
    '"Pajaritos" = búlgaros o gránulos de kéfir.',
    'Yogurt de pajaritos = kéfir de leche fermentado con esos gránulos.',
    'Sabor ácido, textura bebible y levemente efervescente.',
    `Lo entregamos gratis cada semana en 3 puntos de ${site.city}.`,
  ],
  sections: [
    {
      id: 'que-es',
      title: '¿Qué es el yogurt de pajaritos?',
      html: `<p>En Chile le decimos <strong>yogurt de pajaritos</strong> al kéfir de leche. El nombre viene de los <strong>gránulos blancos</strong> que flotan en el frasco y que, al moverse durante la fermentación, parecen pequeños pájaros. En otras partes se les llama <em>búlgaros</em>, <em>nódulos de kéfir</em> o simplemente <em>granos de kéfir</em>.</p>
<p>Esos gránulos no son un ingrediente que se agrega y desaparece: son una <strong>colonia viva</strong> de bacterias ácido-lácticas y levaduras unidas por una matriz de proteínas y polisacáridos (el kefirán). Cuando los pones en leche, se alimentan de su lactosa y la transforman en una bebida fermentada, espesa y ácida. Luego se cuelan, se vuelven a poner en leche fresca y el ciclo se repite indefinidamente.</p>
<p>Por eso el yogurt de pajaritos se ha compartido de familia en familia durante generaciones: un solo puñado de búlgaros bien cuidados alcanza para toda la vida.</p>`,
    },
    {
      id: 'diferencia-yogur',
      title: '¿Es lo mismo que el yogur?',
      html: `<p>No exactamente. Aunque popularmente se le llame "yogurt", el kéfir es un fermentado distinto:</p>
<ul>
<li><strong>Cultivo:</strong> el yogur usa 2 o 3 cepas de bacterias; los pajaritos combinan decenas de bacterias <em>y</em> levaduras.</li>
<li><strong>Fermentación:</strong> el yogur se incuba con calor; el kéfir fermenta a temperatura ambiente.</li>
<li><strong>Textura y sabor:</strong> el kéfir es más líquido, más ácido y a veces levemente burbujeante.</li>
</ul>
<p>Si quieres la comparación completa, revisa nuestra guía <a href="/kefir-vs-yogurt/">kéfir vs yogur industrial</a>.</p>`,
    },
    {
      id: 'sabor',
      title: '¿A qué sabe el yogurt de pajaritos?',
      html: `<p>Tiene un sabor <strong>ácido y fresco</strong>, parecido a un yogur natural sin azúcar pero más vivo, con un toque levemente efervescente que viene de las levaduras. Mientras más horas fermenta, más ácido y espeso queda.</p>
<p>Si es tu primera vez, te recomendamos empezar con porciones pequeñas y endulzarlo <strong>después</strong> de la fermentación con fruta, miel o canela. En la guía <a href="/como-tomar-kefir/">cómo empezar a tomar kéfir</a> te damos ideas concretas.</p>`,
    },
    {
      id: 'comprar-ovalle',
      title: `Dónde comprar yogurt de pajaritos en la ${site.regionShort}`,
      html: `<p>En SanaVida preparamos yogurt de pajaritos natural en ${site.city} y lo repartimos en toda la ${site.region}.</p>
<p><strong>En ${site.city}</strong>, gratis cada semana en:</p>
<ul>${site.deliveryPoints.map((p) => `<li>${p.name}</li>`).join('')}</ul>
<p>Delivery en ${site.city} por <strong>${clp(site.deliveryFee)}</strong>. Si estás en La Serena, Coquimbo u otra comuna, <a href="/pedido-kefir-iv-region/">coordinamos entregas consolidadas</a>.</p>`,
    },
    {
      id: 'por-que-natural',
      title: 'Por qué natural y no del supermercado',
      html: `<p>Los productos de kéfir industriales suelen pasar por procesos de estandarización, espesantes o pasteurización posterior para alargar su vida útil. El resultado es práctico, pero el cultivo que llega a tu mesa ya no es el mismo.</p>
<p>Nuestro yogurt de pajaritos <strong>no se pasteuriza después de fermentar</strong>, no lleva conservantes y se entrega fresco. Es exactamente lo que harías en casa con tus propios pajaritos, pero sin tener que cuidarlos tú.</p>`,
    },
  ],
  faqs: [
    { q: '¿Por qué se llama yogurt de pajaritos?', a: 'Porque los gránulos de kéfir que fermentan la leche, al moverse dentro del frasco, recuerdan a pequeños pájaros. Es un nombre popular chileno para el kéfir de leche.' },
    { q: '¿Venden los pajaritos (búlgaros) para hacerlo en casa?', a: 'Escríbenos por WhatsApp y te contamos la disponibilidad. Mientras tanto, en nuestra <a href="/bulgaros-de-kefir/">guía de búlgaros de kéfir</a> te explicamos cómo cuidarlos.' },
    { q: '¿El yogurt de pajaritos tiene alcohol?', a: 'Las levaduras producen trazas mínimas de alcohol durante la fermentación, normalmente muy por debajo del 1%. En fermentaciones de 24 horas en leche es prácticamente imperceptible.' },
    { q: '¿Lo pueden tomar los niños?', a: 'En general sí, en porciones pequeñas y a partir de la edad en que el pediatra indique lácteos. Ante cualquier duda, consulta con su médico.' },
  ],
  ctaTitle: 'Tu botella de yogurt de pajaritos, esta semana',
  ctaText: `Pídelo por WhatsApp: Ovalle o resto de la ${site.regionShort}.`,
});
