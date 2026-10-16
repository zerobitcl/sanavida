import { landing } from '../landing.mjs';

const steps = [
  'Días 1 a 3: toma 1 a 2 cucharadas al día, idealmente con el desayuno.',
  'Días 4 a 7: si te sentiste bien, sube a 3 o 4 cucharadas.',
  'Semana 2: pasa a medio vaso (unos 100 ml) al día.',
  'Desde la semana 3: un vaso entero (200 a 250 ml) diario, con constancia.',
  'Endulza solo después de fermentado, con fruta, miel o canela, nunca con azúcar refinada en exceso.',
  'Guárdalo siempre refrigerado, con la botella bien cerrada, y consúmelo dentro de 7 a 10 días.',
];

export default landing({
  slug: 'como-tomar-kefir',
  nav: 'Cómo empezar a tomar kéfir',
  tag: 'Principiantes',
  title: 'Cómo tomar kéfir: cantidad, horario y recetas | SanaVida',
  description: '¿Eres nuevo/a con el kéfir? Cuánto tomar, a qué hora, cómo conservarlo y recetas fáciles para que te guste desde el primer sorbo. Guía para principiantes.',
  eyebrow: '¿Eres nuevo/a con el kéfir?',
  h1: 'Cómo empezar a tomar kéfir: <em>lee esto antes</em> de tu primer sorbo',
  lead: 'Guarda esta guía para cuando llegue tu primer pedido. Te explicamos cuánto tomar, a qué hora, cómo conservarlo y cómo hacerlo rico si el sabor ácido te sorprende.',
  cta: 'Hacer mi primer pedido',
  ctaMsg: 'Hola SanaVida, es mi primera vez con el kéfir y quiero hacer un pedido',
  keyFacts: [
    'Empieza con 1 a 2 cucharadas, no con un vaso.',
    'Sube la dosis a medida que tu cuerpo tolera.',
    'Algo de gases los primeros días es normal.',
    'Meta: un vaso diario desde la semana 3.',
  ],
  midCta: '¿Es tu primera vez? Te acompañamos por WhatsApp con la dosis de inicio.',
  startPlan: true,
  howTo: { name: 'Cómo empezar a tomar kéfir', steps },
  sections: [
    {
      id: 'cuanto',
      title: '¿Cuánto kéfir tomar al día?',
      html: `<p>La clave es <strong>empezar con cucharadas</strong>. Tu intestino necesita adaptarse a los microorganismos del kéfir, y partir con un vaso entero es la razón más común por la que a alguien "le cae mal" al principio.</p>
<ol class="steps-list">${steps.slice(0, 4).map((s) => `<li>${s}</li>`).join('')}</ol>
<p>Si en algún momento sientes molestias, vuelve a la dosis anterior por unos días y sigue subiendo más lento. No hay apuro: la constancia importa más que la cantidad.</p>`,
    },
    {
      id: 'horario',
      title: '¿A qué hora conviene tomarlo?',
      html: `<p>No hay una hora mágica, pero muchas personas lo prefieren <strong>en ayunas o con el desayuno</strong>, porque así forma parte de la rutina y es más fácil ser constante. Otras lo toman a media tarde como colación o antes de dormir.</p>
<p>Lo que sí marca la diferencia es la <strong>constancia</strong>: tomarlo todos los días funciona mejor que tomar mucho de vez en cuando.</p>`,
    },
    {
      id: 'sabor',
      title: 'Si el sabor ácido te sorprende',
      html: `<p>Es normal: el kéfir natural es ácido y levemente efervescente. Estas son las formas favoritas de nuestra comunidad para hacerlo más amable:</p>
<ul>
<li><strong>Batido de plátano y avena:</strong> 1 vaso de kéfir, ½ plátano, 2 cucharadas de avena. Licúa y listo.</li>
<li><strong>Con frutillas y miel:</strong> frutillas picadas y un hilo de miel encima.</li>
<li><strong>Bowl de desayuno:</strong> kéfir con granola, semillas de chía y fruta de la estación.</li>
<li><strong>Versión salada:</strong> con pepino, ajo, eneldo y sal, como aderezo o dip.</li>
</ul>
<p><strong>Importante:</strong> agrega el dulce <strong>después</strong> de la fermentación. El azúcar refinada en exceso no le hace bien al cultivo ni a tu digestión.</p>`,
    },
    {
      id: 'conservar',
      title: 'Cómo conservar tu kéfir',
      html: `<ul>
<li>Guárdalo <strong>siempre refrigerado</strong> (4° a 8°C) apenas lo recibas.</li>
<li>Usa <strong>frasco de vidrio</strong> bien cerrado; evita envases metálicos reactivos.</li>
<li>Consúmelo dentro de <strong>7 a 10 días</strong>. Con el paso de los días se vuelve más ácido y puede separarse en suero y cuajada: es normal, solo agítalo.</li>
<li>Si huele a podrido, tiene moho o colores extraños, descártalo.</li>
</ul>`,
    },
    {
      id: 'que-esperar',
      title: 'Qué esperar las primeras semanas',
      html: `<p>Durante los primeros días algunas personas notan <strong>más gases o cambios en el tránsito</strong>: es la adaptación. Luego, con consumo regular, muchas personas reportan una digestión más liviana y menos hinchazón. Lee más sobre esto en <a href="/kefir-beneficios-digestion/">beneficios del kéfir para la digestión</a>.</p>`,
    },
  ],
  faqs: [
    { q: '¿Se puede tomar kéfir todos los días?', a: 'Sí. De hecho, la constancia diaria es lo que más se relaciona con sus beneficios. Una cantidad de 1 a 1,5 vasos diarios es cómoda para la mayoría de los adultos.' },
    { q: '¿Es normal que el kéfir se separe?', a: 'Sí. Con el tiempo se separa en suero (líquido amarillento) y cuajada. Basta con agitar la botella antes de servir.' },
    { q: '¿Puedo calentarlo o cocinar con él?', a: 'Puedes, pero el calor elimina los microorganismos vivos. Para aprovechar sus bacterias y levaduras vivas, consúmelo frío o a temperatura ambiente.' },
    { q: '¿El kéfir se puede congelar?', a: 'No lo recomendamos: congelarlo afecta la textura y parte del cultivo. Es mejor pedir la cantidad que consumes en una semana.' },
  ],
  ctaTitle: 'Tu primera botella te está esperando',
  ctaText: 'Escríbenos, te asesoramos si es tu primera vez y coordinamos la entrega en la IV Región.',
});
