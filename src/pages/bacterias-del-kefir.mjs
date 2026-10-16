import { landing } from '../landing.mjs';
import { site } from '../config.mjs';

export default landing({
  slug: 'bacterias-del-kefir',
  nav: 'Qué contiene el kéfir',
  tag: 'Ciencia',
  title: 'Qué contiene el kéfir: bacterias, levaduras y kefirán | SanaVida',
  description: 'Bacterias ácido-lácticas, levaduras y kefirán: qué hay realmente en un kéfir artesanal, cómo se forma y qué se puede afirmar con evidencia.',
  eyebrow: 'Ciencia sin exageraciones',
  h1: 'Qué contiene el kéfir: <em>bacterias, levaduras</em> y lo que la ciencia sí dice',
  lead: `${site.claims.short}. Te explicamos qué microorganismos participan, qué hace cada uno y por qué preferimos hablar con precisión antes que con promesas.`,
  cta: 'Probar kéfir artesanal',
  ctaMsg: 'Hola SanaVida, leí sobre qué contiene el kéfir y quiero probarlo',
  midCta: '¿Te interesa probarlo? Te contamos cómo empezar sin molestias.',
  keyFacts: [
    'Bacterias ácido-lácticas: fermentan la lactosa.',
    'Levaduras: aportan la leve efervescencia.',
    'Kefirán: polisacárido propio de los búlgaros.',
    'Viables = vivas al momento de consumir.',
  ],
  science: true,
  sections: [
    {
      id: 'bulgaros',
      title: 'Todo empieza en los búlgaros',
      html: `<p>Los búlgaros (o "pajaritos") son una <strong>comunidad simbiótica</strong> de bacterias y levaduras unidas por una matriz de proteínas y un polisacárido llamado <strong>kefirán</strong>. No se pueden fabricar desde cero en un laboratorio: se reproducen y se heredan, igual que una masa madre.</p>
<p>Cuando se ponen en leche, esa comunidad se activa, consume la lactosa y transforma la leche en kéfir. Por eso dos kéfires hechos con búlgaros distintos pueden tener perfiles microbianos diferentes. Más detalle en <a href="/bulgaros-de-kefir/">cómo cuidar los búlgaros</a>.</p>`,
    },
    {
      id: 'bacterias',
      title: 'Bacterias ácido-lácticas',
      html: `<p>Son las protagonistas. Transforman la lactosa en <strong>ácido láctico</strong>, lo que le da al kéfir su sabor ácido, baja el pH y lo protege de forma natural contra microorganismos indeseados.</p>
<p>En la literatura científica sobre kéfir aparecen con frecuencia géneros como <em>Lactobacillus</em>, <em>Lactococcus</em>, <em>Leuconostoc</em> y <em>Acetobacter</em>. La composición exacta depende de cada cultivo, de la leche y del tiempo de fermentación.</p>`,
    },
    {
      id: 'levaduras',
      title: 'Levaduras',
      html: `<p>Conviven con las bacterias y producen pequeñas cantidades de CO₂ (la leve efervescencia) y trazas mínimas de alcohol. Esta combinación de bacterias <strong>y</strong> levaduras es lo que distingue al kéfir del yogur, que se elabora sólo con bacterias. Compara ambos en <a href="/kefir-vs-yogurt/">kéfir vs yogur</a>.</p>`,
    },
    {
      id: 'viables',
      title: 'Qué significa "viables"',
      html: `<p>Que los microorganismos están <strong>vivos</strong> al momento de consumir el producto. Para que eso ocurra:</p>
<ul>
<li>El kéfir <strong>no se pasteuriza</strong> después de fermentar (el calor los elimina).</li>
<li>Se mantiene <strong>refrigerado</strong> (el frío los conserva y frena la fermentación).</li>
<li>Se consume <strong>fresco</strong>, dentro de la semana.</li>
</ul>`,
    },
    {
      id: 'probiotico',
      title: '¿Por qué no decimos "probiótico"?',
      html: `<p>Según la definición científica internacional, un <strong>probiótico</strong> es una cepa específica, identificada, con evidencia de beneficio en cantidades determinadas. Un alimento fermentado puede contener microorganismos vivos sin que todos califiquen técnicamente como probióticos.</p>
<p>Por eso nuestra frase es: <strong>"${site.claims.science}"</strong>. Es más precisa y es exactamente lo que podemos respaldar. Profundizamos en <a href="/probioticos-naturales/">kéfir y probióticos</a>.</p>`,
    },
    {
      id: 'laboratorio',
      title: 'Lo que estamos midiendo',
      html: `<p>Certificado por <strong>${site.lab.displayName}</strong>: <strong>40.000.000 UFC/g</strong> de bacterias ácido-lácticas y <strong>5.600.000 UFC/g</strong> de levaduras, con ausencia de Listeria monocytogenes. ${site.lab.strainsIdentified ? 'Además, tenemos identificación de las cepas presentes.' : 'El siguiente paso es la <strong>identificación de cepas específicas</strong>; cuando esté, la publicaremos aquí.'} Detalle completo en <a href="/kefir-en-botella/#nutricion">kéfir en botella</a>.</p>
<p>Preferimos avanzar paso a paso y contarte lo que sabemos, en lugar de copiar promesas genéricas.</p>`,
    },
  ],
  faqs: [
    { q: '¿Qué bacterias tiene el kéfir?', a: 'Principalmente bacterias ácido-lácticas (en la literatura aparecen géneros como Lactobacillus, Lactococcus y Leuconostoc) y bacterias acéticas, además de levaduras. La composición exacta varía según cada cultivo de búlgaros.' },
    { q: '¿El kéfir tiene más bacterias que el yogur?', a: 'Suele tener mayor diversidad, porque combina muchas especies de bacterias y levaduras, mientras que el yogur se elabora con un cultivo definido de 2 o 3 bacterias.' },
    { q: '¿Qué es el kefirán?', a: 'Es un polisacárido que producen los propios búlgaros. Forma parte de su estructura y aporta cuerpo y viscosidad al kéfir.' },
    { q: '¿Las bacterias del kéfir sobreviven en el refrigerador?', a: 'Sí. El frío las mantiene vivas y ralentiza la fermentación. Lo que las elimina es el calor alto, como hervir o pasteurizar.' },
  ],
  ctaTitle: 'Un alimento vivo, explicado con honestidad',
  ctaText: `Pide tu kéfir artesanal y coordina la entrega en la ${site.regionShort}.`,
});
