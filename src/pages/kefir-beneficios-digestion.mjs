import { landing } from '../landing.mjs';

// Contenido YMYL (salud): Google exige lenguaje prudente y sin promesas médicas. Por eso se
// habla de "puede ayudar" y se incluye aviso sanitario; exagerar aquí penaliza el ranking.
export default landing({
  slug: 'kefir-beneficios-digestion',
  nav: 'Kéfir para gases e inflamación',
  tag: 'Salud digestiva',
  health: true,
  title: 'Kéfir para gases, inflamación y colon irritable | SanaVida',
  description: 'Beneficios del kéfir para la digestión, los gases, la hinchazón y el colon irritable: cómo tomarlo y precauciones. kéfir natural en la IV Región.',
  eyebrow: 'Salud digestiva',
  h1: 'Kéfir para gases, inflamación y <em>colon irritable</em>: lo que sí puede hacer por ti',
  lead: 'Hinchazón, gases, pesadez, estreñimiento. Consumir kéfir regularmente puede ayudar a desinflamar el abdomen, mejorar la digestión y que tu cuerpo absorba mejor los nutrientes — protegiéndote del malestar de estómago.',
  cta: 'Quiero probar el kéfir',
  ctaMsg: 'Hola SanaVida, quiero probar el kéfir para mejorar mi digestión',
  keyFacts: [
    'Repleto de bacterias buenas y probióticos naturales.',
    'Puede ayudar con gases, hinchazón y digestión pesada.',
    'La fermentación reduce buena parte de la lactosa.',
    'Debe ser kéfir real: sin pasteurizar, no de góndola.',
  ],
  startPlan: true,
  midCta: '¿Sufres de gases o hinchazón? Te orientamos para empezar con la dosis justa.',
  sections: [
    {
      id: 'como-actua',
      title: 'Cómo actúa el kéfir en tu intestino',
      html: `<p>Tu intestino alberga billones de microorganismos: la <strong>microbiota intestinal</strong>. Cuando está en equilibrio, ayuda a digerir, produce compuestos que nutren la pared intestinal y conversa con tu sistema inmune. Cuando se desequilibra (estrés, antibióticos, dieta ultraprocesada), aparecen con frecuencia gases, hinchazón y cambios en el tránsito.</p>
<p>El kéfir está repleto de <strong>bacterias buenas y probióticos naturales</strong> que pueden ayudar a limpiar el intestino, combatir los gases y devolverle el equilibrio a tu sistema digestivo. Es uno de los fermentados con mayor diversidad microbiana.</p>`,
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
<li><strong>Ánimo y descanso:</strong> gran parte de la serotonina se produce en el intestino. Cuando la digestión se equilibra, muchas personas notan mejor humor, más claridad mental y mejor sueño.</li>
<li><strong>Sistema inmune:</strong> gran parte de las defensas se relaciona con el intestino; cuidarlo es cuidarte por dentro.</li>
<li><strong>Nutrición y energía:</strong> ayuda a absorber mejor los nutrientes de las comidas y aporta proteínas, calcio y vitaminas del grupo B.</li>
<li><strong>Piel y bienestar:</strong> al reducir inflamación digestiva, a menudo se nota también por fuera (menos “cara inflamada”, más vitalidad).</li>
</ul>`,
    },
    {
      id: 'por-que-vivo',
      title: 'Por qué importa que el kéfir esté vivo',
      html: `<p>Para obtener estos resultados necesitas un <strong>kéfir real</strong>. Las opciones del supermercado suelen pasar por procesos térmicos o industriales para durar meses en góndola: eso destruye buena parte de las bacterias buenas y el efecto reparador.</p>
<p>El kéfir SanaVida es <strong>100% natural</strong>: no se pasteuriza, no lleva conservantes y se entrega fresco en la IV Región. Compara en <a href="/kefir-vs-yogurt/">kéfir vs yogur industrial</a>.</p>`,
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
  ctaTitle: 'Prueba una opción 100% natural',
  ctaText: 'Haz tu pedido hoy con envío a domicilio. Kéfir real, sin pasar por la góndola.',
});
