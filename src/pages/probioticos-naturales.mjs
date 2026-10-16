import { landing } from '../landing.mjs';
import { site } from '../config.mjs';

// La keyword "probióticos naturales" tiene volumen, pero el contenido no afirma que el producto
// sea probiótico: explica el concepto y posiciona la marca por su precisión (diferenciador real).
export default landing({
  slug: 'probioticos-naturales',
  nav: 'Kéfir y probióticos',
  tag: 'Microbiota',
  health: true,
  title: '¿El kéfir es probiótico? Lo que dice la ciencia | SanaVida',
  description: 'Qué es realmente un probiótico, qué contiene el kéfir artesanal y por qué la precisión importa. Bacterias ácido-lácticas y levaduras viables, explicadas.',
  eyebrow: 'Alimentación real',
  h1: '¿El kéfir es probiótico? <em>Lo que sí</em> se puede afirmar',
  lead: 'Muchos productos se venden como "probióticos" sin respaldo. Te explicamos qué significa el término, qué contiene el kéfir artesanal y cómo elegir uno con microorganismos realmente vivos.',
  cta: 'Probar kéfir vivo',
  ctaMsg: 'Hola SanaVida, quiero probar el kéfir artesanal',
  keyFacts: [
    'Probiótico = cepa identificada con beneficio demostrado.',
    'El kéfir contiene bacterias ácido-lácticas y levaduras viables.',
    'Para que estén vivas, no debe pasteurizarse después.',
    'La constancia diaria importa más que la cantidad.',
  ],
  science: true,
  startPlan: true,
  sections: [
    {
      id: 'que-es',
      title: 'Qué es exactamente un probiótico',
      html: `<p>La definición científica aceptada internacionalmente dice que los probióticos son <strong>microorganismos vivos que, administrados en cantidades adecuadas, confieren un beneficio a la salud</strong>. La clave está en el detalle: se habla de <strong>cepas específicas</strong>, identificadas y estudiadas.</p>
<p>Por eso no basta con que un alimento esté fermentado para llamarlo "probiótico". Es una distinción que muchas marcas pasan por alto.</p>`,
    },
    {
      id: 'kefir',
      title: 'Qué contiene el kéfir artesanal',
      html: `<p>${site.claims.science} Esas bacterias y levaduras provienen de los búlgaros y son las que transforman la leche en kéfir.</p>
<p>Es uno de los fermentados con mayor diversidad microbiana. Te lo explicamos en detalle en <a href="/bacterias-del-kefir/">qué contiene el kéfir</a>.</p>`,
    },
    {
      id: 'microbiota',
      title: 'Fermentados y microbiota',
      html: `<p>Tu intestino alberga un ecosistema (la <strong>microbiota</strong>) que participa en la digestión y en el funcionamiento del sistema inmune. Una dieta ultraprocesada, el estrés o los antibióticos pueden alterarlo.</p>
<p>Incluir alimentos fermentados con microorganismos vivos es una forma práctica de sumar diversidad a tu alimentación. Lee más en <a href="/kefir-beneficios-digestion/">kéfir y digestión</a>.</p>`,
    },
    {
      id: 'como-elegir',
      title: 'Cómo elegir un kéfir con microorganismos vivos',
      html: `<ul>
<li>Ingredientes mínimos: leche y búlgaros.</li>
<li>Sin pasteurización posterior a la fermentación.</li>
<li>Fresco y refrigerado.</li>
<li>Sabor ácido y leve efervescencia: señales de un cultivo activo.</li>
<li>Una marca que te diga con claridad qué puede respaldar y qué no.</li>
</ul>`,
    },
  ],
  faqs: [
    { q: '¿El kéfir es un probiótico?', a: 'El kéfir contiene bacterias ácido-lácticas y levaduras viables. Técnicamente, "probiótico" se refiere a cepas identificadas con beneficio demostrado; algunas cepas presentes en kéfires han sido estudiadas, pero la composición varía en cada cultivo.' },
    { q: '¿El kéfir reemplaza un suplemento probiótico?', a: 'Son cosas distintas. El kéfir es un alimento; un suplemento entrega cepas específicas en dosis definidas. Si tienes una indicación médica, sigue la recomendación de tu profesional.' },
    { q: '¿Cuánto kéfir tomar al día?', a: 'Si nunca lo has tomado, parte con 1 a 2 cucharadas al día y sube gradualmente hasta un vaso (200 a 250 ml) en unas tres semanas.' },
    { q: '¿Los microorganismos del kéfir mueren con el frío?', a: 'No. El refrigerador los mantiene vivos y frena la fermentación. El calor alto sí los elimina.' },
  ],
  ctaTitle: 'Un fermentado vivo, sin promesas vacías',
  ctaText: `Pide kéfir artesanal SanaVida y coordina entrega en la ${site.regionShort}.`,
});
