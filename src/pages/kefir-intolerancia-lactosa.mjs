import { landing } from '../landing.mjs';
import { site } from '../config.mjs';

export default landing({
  slug: 'kefir-intolerancia-lactosa',
  nav: 'Kéfir y lactosa',
  tag: 'Lactosa',
  health: true,
  title: 'Kéfir e intolerancia a la lactosa: ¿se puede tomar? | SanaVida',
  description: 'Muchas personas con intolerancia leve a la lactosa toleran mejor el kéfir porque la fermentación reduce buena parte de la lactosa. Cómo probarlo con cuidado.',
  eyebrow: 'Digestión sensible',
  h1: 'Kéfir e intolerancia a la lactosa: <em>¿se puede tomar?</em>',
  lead: 'No es lo mismo que la leche. Durante la fermentación, los búlgaros consumen buena parte de la lactosa. Aun así, conviene probarlo con criterio.',
  cta: 'Quiero probar con cuidado',
  ctaMsg: 'Hola SanaVida, tengo sensibilidad a la lactosa y quiero probar el kéfir',
  keyFacts: [
    'La fermentación reduce gran parte de la lactosa.',
    'No es apto si hay alergia a la proteína de la leche.',
    'Empieza con 1 a 2 cucharadas y observa.',
    'Si tu intolerancia es severa, consulta primero.',
  ],
  startPlan: true,
  sections: [
    {
      id: 'por-que',
      title: 'Por qué el kéfir suele sentar mejor que la leche',
      html: `<p>Los <strong>búlgaros</strong> se alimentan de la lactosa de la leche. Mientras fermentan, la transforman en ácidos orgánicos y el producto final queda con <strong>menos lactosa</strong> que la leche de partida.</p>
<p>Además, el kéfir aporta enzimas y microorganismos que, en muchas personas, facilitan la digestión de lo que queda. Por eso a menudo se tolera mejor que un vaso de leche o que algunos yogures azucarados.</p>`,
    },
    {
      id: 'no-es-alergia',
      title: 'Intolerancia ≠ alergia',
      html: `<p>Son cosas distintas:</p>
<ul>
<li><strong>Intolerancia a la lactosa:</strong> dificultad para digerir el azúcar de la leche. Aquí el kéfir puede ser una opción a probar.</li>
<li><strong>Alergia a la proteína de la leche:</strong> reacción inmunitaria. En ese caso el kéfir de leche <strong>no es apto</strong>.</li>
</ul>`,
    },
    {
      id: 'como-probar',
      title: 'Cómo probarlo si eres sensible',
      html: `<ol class="steps-list">
<li>Empieza con <strong>1 o 2 cucharadas</strong>, idealmente con comida.</li>
<li>Espera 24–48 horas y observa cómo te sientes.</li>
<li>Si te sienta bien, sube de a poco: cucharadas, medio vaso y luego un vaso diario.</li>
</ol>
<p>Guía completa de primeras semanas: <a href="/como-tomar-kefir/">cómo tomar kéfir</a>.</p>`,
    },
    {
      id: 'cuando-no',
      title: 'Cuándo no conviene',
      html: `<ul>
<li>Alergia diagnosticada a proteína láctea.</li>
<li>Indicación médica de evitar lácteos no pasteurizados.</li>
<li>Síntomas intensos o persistentes: consulta a un profesional; el kéfir no reemplaza un diagnóstico.</li>
</ul>
<p>Más contexto digestivo en <a href="/kefir-beneficios-digestion/">kéfir para gases e inflamación</a>.</p>`,
    },
  ],
  faqs: [
    { q: '¿El kéfir es sin lactosa?', a: 'No es “cero lactosa”. Tiene mucha menos que la leche, pero no es un producto deslactosado industrial. Por eso se prueba en cantidades pequeñas.' },
    { q: '¿Hay kéfir vegetal?', a: 'Existe kéfir de agua u otros sustratos, pero SanaVida elabora kéfir de leche. Si necesitas opción vegetal, este producto no es el adecuado.' },
    { q: '¿Puedo tomarlo todos los días si soy intolerante leve?', a: 'Muchas personas lo hacen sin problema tras la adaptación. Si aparecen molestias, baja la dosis o pausa y consulta.' },
  ],
  ctaTitle: 'Pruébalo a tu ritmo',
  ctaText: `Kéfir artesanal fresco, coordinado en la ${site.regionShort}.`,
});
