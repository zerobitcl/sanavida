import { landing } from '../landing.mjs';
import { site } from '../config.mjs';

export default landing({
  slug: 'recetas-con-kefir',
  nav: 'Recetas con kéfir',
  tag: 'Recetas',
  title: 'Recetas con kéfir: batido de frutillas y arándanos | SanaVida',
  description: `Recetas fáciles con kéfir artesanal: batido de frutillas y arándanos, bowls, aderezos y versión salada. Guía práctica desde la ${site.regionShort}.`,
  eyebrow: 'En la cocina',
  h1: 'Recetas con kéfir: <em>fáciles</em>, ricas y sin arruinar el cultivo',
  lead: 'El kéfir natural es ácido. Estas preparaciones lo hacen amable desde el primer día, sin agregar azúcar durante la fermentación.',
  cta: 'Pedir kéfir para cocinar',
  ctaMsg: 'Hola SanaVida, quiero pedir kéfir para preparar recetas',
  keyFacts: [
    'Endulza siempre después de fermentar.',
    'No lo hiervas: el calor elimina sus bacterias y levaduras vivas.',
    'Funciona dulce y salado.',
    `Ideal para desayunos en la ${site.regionShort}.`,
  ],
  berries: true,
  sections: [
    {
      id: 'batido-frutillas-arandanos',
      title: 'Batido de frutillas y arándanos',
      html: `<p>El favorito para empezar: el dulzor natural de los frutos rojos equilibra la acidez del kéfir.</p>
<ul>
<li>1 vaso de kéfir SanaVida, directo de la botella</li>
<li>5 frutillas</li>
<li>Un puñado de arándanos (frescos o congelados)</li>
<li>Opcional: 1 cucharadita de miel</li>
</ul>
<p>Licúa 20 segundos y tómalo de inmediato. Con arándanos congelados queda espeso y frío, sin necesidad de hielo.</p>`,
    },
    {
      id: 'batido-platano',
      title: 'Batido de plátano y avena',
      html: `<p>La puerta de entrada favorita si el sabor ácido te sorprende.</p>
<ul>
<li>1 vaso de kéfir</li>
<li>½ plátano maduro</li>
<li>2 cucharadas de avena</li>
<li>Opcional: canela o un hilo de miel</li>
</ul>
<p>Licúa 20 segundos. Listo.</p>`,
    },
    {
      id: 'bowl',
      title: 'Bowl de desayuno',
      html: `<p>Sirve el kéfir en un bowl y agrega granola, semillas de chía, frutillas o fruta de la estación. Queda como un yogur bowl, pero con más vida.</p>`,
    },
    {
      id: 'frutillas-miel',
      title: 'Con frutillas y miel',
      html: `<p>Pica frutillas, úntalas con un poco de miel y mézclalas con el kéfir. Simple, rápido y muy pedido en verano.</p>`,
    },
    {
      id: 'aderezo',
      title: 'Aderezo salado (tipo tzatziki)',
      html: `<ul>
<li>1 vaso de kéfir (si está muy líquido, cuélalo 1–2 horas)</li>
<li>Pepino rallado y escurrido</li>
<li>Ajo picado, eneldo o cilantro, sal y limón</li>
</ul>
<p>Ideal con ensaladas, papas o como dip.</p>`,
    },
    {
      id: 'tips',
      title: 'Tips para no perder los beneficios',
      html: `<ul>
<li>No agregues azúcar refinada <strong>durante</strong> la fermentación (eso es cosa de los <a href="/bulgaros-de-kefir/">búlgaros</a>).</li>
<li>El calor alto mata el cultivo: si lo usas en una salsa caliente, hazlo al final y sin hervir.</li>
<li>Si es tu primera vez, parte con porciones chicas: <a href="/como-tomar-kefir/">cómo empezar a tomar kéfir</a>.</li>
</ul>`,
    },
  ],
  faqs: [
    { q: '¿Puedo reemplazar el yogur por kéfir en cualquier receta?', a: 'En la mayoría sí. Como es más líquido, en preparaciones que necesitan cuerpo conviene colarlo unas horas o reducir un poco el líquido de la receta.' },
    { q: '¿El kéfir se puede congelar para smoothies?', a: 'Se puede, pero pierde textura. Mejor usarlo fresco y pedir la cantidad de una semana.' },
    { q: '¿Qué fruta combina mejor?', a: 'Plátano, frutillas, mango y berries. Evita agregar demasiada fruta ácida si tu kéfir ya está muy fermentado.' },
  ],
  ctaTitle: '¿Listo para probar estas recetas?',
  ctaText: `Pide tu kéfir fresco y prepáralo esta semana en la ${site.regionShort}.`,
});
