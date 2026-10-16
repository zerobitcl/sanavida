import { landing } from '../landing.mjs';

const rows = [
  ['Cultivo', 'Búlgaros vivos (nódulos reales) que se reutilizan', 'Cultivos iniciadores industriales, a menudo liofilizados'],
  ['Microorganismos', 'Bacterias ácido-lácticas y levaduras', 'Pocas especies de bacterias, sin levaduras'],
  ['Proceso', 'Fermentación natural a temperatura ambiente', 'Incubación industrial con calor controlado'],
  ['¿Llega vivo?', 'Sí, no se pasteuriza después de fermentar', 'Depende; algunos se tratan térmicamente'],
  ['Lactosa', 'Muy reducida por la fermentación', 'Parcialmente reducida'],
  ['Azúcar', 'Sin azúcar añadida', 'Frecuentemente con azúcar y saborizantes'],
  ['Aditivos', 'Ninguno', 'Espesantes, estabilizantes, colorantes'],
  ['Textura', 'Bebible, levemente efervescente', 'Cremosa y homogénea'],
  ['Origen', 'Artesanal, hecho en Ovalle', 'Producción masiva'],
];

export default landing({
  slug: 'kefir-vs-yogurt',
  nav: 'Kéfir vs yogur industrial',
  tag: 'Comparativa',
  title: 'Kéfir vs yogur: diferencias y cuál es mejor | SanaVida',
  description: 'Kéfir o yogur industrial: comparamos microorganismos vivos, lactosa, azúcar y aditivos. Descubre cuál conviene si sufres de gases o inflamación.',
  eyebrow: 'Comparativa honesta',
  h1: 'Kéfir vs yogur industrial: <em>cuál elegir</em> si sufres de gases e inflamación',
  lead: 'Ambos son lácteos fermentados, pero no son lo mismo. Te mostramos las diferencias que importan cuando lo que buscas es cuidar tu digestión, no solo comer algo rico.',
  cta: 'Probar kéfir artesanal',
  keyFacts: [
    'El kéfir tiene mucha más diversidad de microorganismos.',
    'Suele tener menos lactosa y cero azúcar añadida.',
    'El yogur es más suave y cremoso: buena puerta de entrada.',
    'Lo clave es que el cultivo llegue vivo.',
  ],
  sections: [
    {
      id: 'tabla',
      title: 'Comparación rápida',
      html: `<div class="table-wrap"><table>
<caption>Kéfir artesanal SanaVida frente a un yogur industrial promedio</caption>
<thead><tr><th scope="col">Característica</th><th scope="col">Kéfir SanaVida</th><th scope="col">Yogur industrial</th></tr></thead>
<tbody>${rows.map((r) => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</tbody>
</table></div>
<p class="small">La columna "yogur industrial" describe un producto promedio de supermercado; existen yogures naturales sin azúcar con buen perfil. Revisa siempre la etiqueta.</p>`,
    },
    {
      id: 'microorganismos',
      title: 'Microorganismos: la gran diferencia',
      html: `<p>El yogur se elabora con un cultivo definido, habitualmente <em>Lactobacillus bulgaricus</em> y <em>Streptococcus thermophilus</em>, a veces con alguna cepa extra añadida. El kéfir, en cambio, nace de los <strong>búlgaros</strong>: una comunidad de <strong>decenas de especies de bacterias y levaduras</strong> que conviven en equilibrio.</p>
<p>Esa diversidad es justamente lo que se asocia a una microbiota intestinal más resiliente. Más variedad de microorganismos suele significar más funciones distintas trabajando a tu favor.</p>`,
    },
    {
      id: 'azucar-aditivos',
      title: 'Azúcar y aditivos: lee la etiqueta',
      html: `<p>Muchos yogures "saludables" del supermercado contienen <strong>azúcar añadida, jarabes, saborizantes, espesantes y colorantes</strong>. Para alguien con digestión sensible, esos ingredientes pueden ser parte del problema.</p>
<p>Nuestro kéfir lleva exactamente dos cosas: <strong>leche y búlgaros</strong>. Si lo quieres dulce, agrégale fruta o miel después, como te contamos en <a href="/como-tomar-kefir/">cómo tomar kéfir</a>.</p>`,
    },
    {
      id: 'gases',
      title: '¿Cuál es mejor si tengo gases o inflamación?',
      html: `<p>Si tu objetivo es cuidar tu digestión, el kéfir tiene ventaja: menos lactosa, sin azúcares añadidos y una microbiota más diversa. Aun así, si nunca has tomado fermentados, el yogur natural puede ser una transición más suave.</p>
<p>Nuestra recomendación práctica: empieza con <strong>1 o 2 cucharadas de kéfir al día</strong> y sube de a poco durante tres semanas, como explicamos en el <a href="/como-tomar-kefir/">plan de inicio</a>. Si quieres profundizar, lee <a href="/kefir-beneficios-digestion/">kéfir para gases, inflamación y colon irritable</a>.</p>`,
    },
    {
      id: 'cuando-yogur',
      title: '¿Cuándo tiene sentido el yogur?',
      html: `<p>No se trata de demonizar el yogur. Un yogur natural, sin azúcar y con cultivos vivos es un buen alimento, y su textura cremosa funciona muy bien en preparaciones como salsas o postres. La diferencia está en <strong>qué tan procesado</strong> esté y en <strong>qué buscas</strong>: si es diversidad de microorganismos vivos, el kéfir gana.</p>`,
    },
  ],
  faqs: [
    { q: '¿El kéfir es más saludable que el yogur?', a: 'En términos de diversidad de microorganismos, sí: el kéfir contiene muchas más especies de bacterias y levaduras. Un yogur natural sin azúcar también es un buen alimento; lo importante es evitar versiones azucaradas y ultraprocesadas.' },
    { q: '¿Puedo reemplazar el yogur por kéfir en recetas?', a: 'Sí. Funciona en batidos, avena remojada, aderezos y marinadas. Al ser más líquido, en recetas que requieren cuerpo puedes colarlo unas horas para obtener un kéfir más espeso.' },
    { q: '¿El kéfir engorda más que el yogur?', a: 'Un kéfir de leche sin azúcar tiene calorías similares a la leche con que se prepara. Muchos yogures comerciales aportan más calorías por el azúcar añadida.' },
  ],
  ctaTitle: 'Haz la prueba tú mismo/a',
  ctaText: 'Pide tu kéfir artesanal y compáralo con el yogur de siempre.',
});
