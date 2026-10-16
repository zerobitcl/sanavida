import { landing } from '../landing.mjs';

// Contenido YMYL (salud): Google exige lenguaje prudente y sin promesas médicas. Por eso se
// habla de "puede ayudar" y se incluye aviso sanitario; exagerar aquí penaliza el ranking.
export default landing({
  slug: 'kefir-beneficios-digestion',
  nav: 'Kéfir para gases e inflamación',
  tag: 'Salud digestiva',
  health: true,
  title: 'Kéfir para gases, inflamación y colon irritable | SanaVida',
  description: 'Beneficios del kéfir para la digestión, los gases, la hinchazón y el colon irritable: cómo tomarlo y precauciones. Kéfir artesanal en la IV Región.',
  eyebrow: 'Salud digestiva',
  h1: 'Kéfir para gases, inflamación y <em>colon irritable</em>: lo que sí puede hacer por ti',
  lead: 'Hinchazón después de comer, gases, digestiones pesadas. Si te suena familiar, el kéfir puede ser un buen aliado. Te explicamos por qué, cómo empezar y en qué casos conviene consultar primero.',
  cta: 'Quiero probar el kéfir',
  ctaMsg: 'Hola SanaVida, quiero probar el kéfir para mejorar mi digestión',
  keyFacts: [
    'Contiene bacterias ácido-lácticas y levaduras viables.',
    'La fermentación reduce buena parte de la lactosa.',
    'Puede ayudar a una digestión más liviana.',
    'Empieza con cucharadas y sube de forma gradual.',
  ],
  startPlan: true,
  midCta: '¿Sufres de gases o hinchazón? Te orientamos para empezar con la dosis justa.',
  sections: [
    {
      id: 'como-actua',
      title: 'Cómo actúa el kéfir en tu intestino',
      html: `<p>Tu intestino alberga billones de microorganismos: la <strong>microbiota intestinal</strong>. Cuando está en equilibrio, ayuda a digerir, produce compuestos que nutren la pared intestinal y conversa con tu sistema inmune. Cuando se desequilibra (estrés, antibióticos, dieta ultraprocesada), aparecen con frecuencia gases, hinchazón y cambios en el tránsito.</p>
<p>El kéfir es uno de los alimentos fermentados con <strong>mayor diversidad de microorganismos</strong>. Al consumirlo con regularidad, aportas bacterias ácido-lácticas y levaduras que pueden colaborar a mantener ese equilibrio. Además, durante la fermentación se generan ácidos orgánicos y péptidos que se estudian por su efecto en la salud digestiva.</p>`,
    },
    {
      id: 'gases-hinchazon',
      title: 'Kéfir para los gases y la hinchazón',
      html: `<p>Muchas personas notan una <strong>digestión más liviana</strong> tras algunas semanas de consumo regular. Hay dos razones principales:</p>
<ul>
<li><strong>Menos lactosa:</strong> los búlgaros consumen parte de la lactosa de la leche, por lo que suele tolerarse mejor que la leche común en personas con sensibilidad leve.</li>
<li><strong>Aporte de microbiota:</strong> los microorganismos del kéfir pueden ayudar a que la fermentación en tu colon sea más equilibrada.</li>
</ul>
<p>Un detalle importante: <strong>los primeros días algunas personas sienten más gases</strong>. Es una adaptación habitual y por eso recomendamos empezar con 1 o 2 cucharadas e ir subiendo. Te lo explicamos paso a paso en <a href="/como-tomar-kefir/">cómo empezar a tomar kéfir</a>.</p>`,
    },
    {
      id: 'colon-irritable',
      title: '¿Sirve el kéfir si tengo colon irritable?',
      html: `<p>El síndrome de intestino irritable es distinto en cada persona. Algunos estudios con alimentos fermentados muestran mejoras en síntomas como la distensión, pero <strong>no hay una respuesta única</strong>: a unas personas les sienta muy bien y otras necesitan ir más lento.</p>
<p>Si tienes colon irritable diagnosticado, nuestra recomendación es incorporarlo en <strong>dosis pequeñas</strong>, observar cómo responde tu cuerpo durante dos o tres semanas y conversarlo con tu gastroenterólogo o nutricionista, sobre todo si sigues una dieta baja en FODMAP.</p>`,
    },
    {
      id: 'otros-beneficios',
      title: 'Otros beneficios del kéfir',
      html: `<ul>
<li><strong>Sistema inmune:</strong> gran parte de las defensas del cuerpo se relaciona con el intestino; una microbiota diversa contribuye a su buen funcionamiento.</li>
<li><strong>Nutrición:</strong> aporta proteínas de alta calidad, calcio, fósforo y vitaminas del grupo B.</li>
<li><strong>Bienestar general:</strong> el eje intestino-cerebro es un área de investigación activa; muchas personas reportan sentirse mejor en general al cuidar su digestión.</li>
</ul>`,
    },
    {
      id: 'por-que-vivo',
      title: 'Por qué importa que el kéfir esté vivo',
      html: `<p>Todos estos beneficios dependen de que los microorganismos <strong>lleguen activos</strong>. Un producto pasteurizado después de fermentar conserva el sabor, pero pierde gran parte de su cultivo.</p>
<p>El kéfir SanaVida <strong>no se pasteuriza</strong>, no lleva conservantes y se entrega fresco en la IV Región, para que recibas el cultivo en su mejor momento. Compara las diferencias en <a href="/kefir-vs-yogurt/">kéfir vs yogur industrial</a>.</p>`,
    },
    {
      id: 'precauciones',
      title: 'Precauciones',
      html: `<ul>
<li>Si eres <strong>alérgico/a a la proteína de la leche</strong>, el kéfir de leche no es para ti.</li>
<li>Si eres <strong>inmunosuprimido/a</strong>, estás embarazada o en tratamiento médico, consulta antes de consumir alimentos no pasteurizados.</li>
<li>Si tus síntomas digestivos son intensos, persistentes o vienen con sangre, baja de peso o fiebre, acude a un profesional: el kéfir no reemplaza un diagnóstico.</li>
</ul>`,
    },
  ],
  faqs: [
    { q: '¿Cuánto kéfir debo tomar para la digestión?', a: 'Empieza con 1 a 2 cucharadas al día. Si te sienta bien, sube a 3 o 4 cucharadas, luego a medio vaso en la segunda semana y a un vaso (200 a 250 ml) desde la tercera. La constancia importa más que la cantidad.' },
    { q: '¿Cuándo se notan los efectos del kéfir?', a: 'Varía mucho entre personas. Algunas notan una digestión más liviana en la primera o segunda semana; otras necesitan un mes de consumo regular.' },
    { q: '¿El kéfir puede dar gases al principio?', a: 'Sí, es habitual durante los primeros días mientras tu intestino se adapta. Por eso conviene partir con porciones pequeñas.' },
    { q: '¿Lo puedo tomar si soy intolerante a la lactosa?', a: 'Muchas personas con intolerancia leve lo toleran bien, porque la fermentación reduce buena parte de la lactosa. Si tu intolerancia es severa, pruébalo en cantidades muy pequeñas y consulta a tu médico.' },
  ],
  ctaTitle: 'Dale a tu digestión un aliado vivo',
  ctaText: 'Kéfir artesanal no pasteurizado, entregado fresco en la IV Región.',
});
