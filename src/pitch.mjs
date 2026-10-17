import { site } from './config.mjs';
import { btnWa, icon } from './components.mjs';

/**
 * Guion de venta (videos ads 05-10-26). Bloques reutilizables para home y landings.
 * Tono comercial alineado a Meta/ads; en páginas YMYL se combina con healthNote.
 */

export const pitchSymptoms = [
  { t: '¿Estreñimiento?', d: 'Apoya el tránsito de forma natural.' },
  { t: '¿Inflamación?', d: 'Ayuda a desinflamar el abdomen.' },
  { t: '¿Piel apagada?', d: 'Cuando el intestino se equilibra, se nota por fuera.' },
  { t: '¿Mal humor?', d: 'El eje intestino–cerebro influye en cómo te sientes.' },
  { t: '¿Fatiga mental?', d: 'Mejor absorción = más energía disponible.' },
  { t: '¿Gases y pesadez?', d: 'Bacterias buenas que reequilibran la digestión.' },
];

/** Video 3: checklist de síntomas → kéfir */
export const symptomsBlock = () => `
<section class="section pitch-symptoms" aria-labelledby="sintomas-title">
  <div class="wrap">
    <div class="pitch-symptoms-head">
      <p class="eyebrow">Parte uno: el kéfir</p>
      <h2 id="sintomas-title" class="h2">¿Estreñimiento? ¿Inflamación? ¿Mal humor? <em>Toma kéfir.</em></h2>
      <p class="lead">Alimentos para sanar tu sistema digestivo. El kéfir artesanal ayuda a limpiar el intestino, combatir los gases y devolverle el equilibrio — sin depender de laxantes o pastillas.</p>
    </div>
    <ul class="pitch-symptom-grid">
      ${pitchSymptoms.map((s) => `<li><strong>${s.t}</strong><span>${s.d}</span></li>`).join('')}
    </ul>
    <p class="center"><a class="link" href="/kefir-beneficios-digestion/">Beneficios para la digestión ${icon('arrow')}</a></p>
  </div>
</section>`;

/** Videos 1 + 4: eje intestino–cerebro / “sentirse bien” */
export const gutBrainBlock = () => `
<section class="section pitch-gut" aria-labelledby="eje-title">
  <div class="wrap pitch-gut-grid">
    <div>
      <p class="eyebrow">Tu segundo cerebro</p>
      <h2 id="eje-title" class="h2">La palabra kéfir significa <em>“sentirse bien”</em></h2>
      <p class="lead">Al tomarlo, las bacterias buenas alimentan y reprograman tu sistema digestivo. Mejoran la comunicación entre intestino y cerebro: cómo duermes, cómo piensas y cómo te sientes.</p>
      <ul class="ticks">
        <li>Gran parte de la serotonina (la hormona del bienestar) se produce en el intestino.</li>
        <li>Cuando comes algo que te inflama, el cansancio y el mal humor aparecen casi solos.</li>
        <li>Desinflamar la digestión es una forma natural de recuperar energía y claridad mental.</li>
      </ul>
    </div>
    <aside class="pitch-gut-card" aria-label="Eje intestino cerebro">
      <p class="pitch-gut-stat">Intestino ↔ cerebro</p>
      <p>Si tu intestino está mal, tu mente también lo siente. El kéfir real ayuda a limpiar, desinflamar y que tu digestión funcione al 100%.</p>
      <p class="small">El kéfir es un alimento, no un medicamento. Si tienes una condición diagnosticada, consulta a un profesional.</p>
    </aside>
  </div>
</section>`;

/** Hook repetido en los 4 videos: súper vs artesanal */
export const realVsSuperBlock = () => `
<section class="section pitch-vs" aria-labelledby="real-title">
  <div class="wrap">
    <p class="eyebrow">Kéfir real</p>
    <h2 id="real-title" class="h2">Para notar el cambio, necesitas un kéfir <em>real</em></h2>
    <p class="lead">Las opciones del supermercado pasan por procesos industriales (a menudo térmicos) para que duren meses en la góndola. Ese trato destruye buena parte de las bacterias buenas — y con ellas, el efecto reparador.</p>
    <div class="pitch-vs-grid">
      <article class="pitch-vs-card pitch-vs-bad">
        <h3>Del súper</h3>
        <ul>
          <li>Procesos para alargar la vida útil</li>
          <li>Cultivo debilitado o inactivo</li>
          <li>Meses en góndola</li>
          <li>Pierde el efecto vivo</li>
        </ul>
      </article>
      <article class="pitch-vs-card pitch-vs-good">
        <h3>SanaVida artesanal</h3>
        <ul>
          <li>100% natural, sin pasteurizar</li>
          <li>Búlgaros vivos, fermentación real</li>
          <li>Entrega fresca en ${site.city} y la ${site.regionShort}</li>
          <li>Listo para tomar, con cultivo activo</li>
        </ul>
      </article>
    </div>
    <div class="center hero-actions" style="justify-content:center;margin-top:2rem">
      ${btnWa('Pedir kéfir artesanal con envío', 'Hola SanaVida, quiero pedir kéfir artesanal 100% natural con envío a domicilio')}
      <a class="btn btn-ghost" href="/pedido/">Formulario de pedido ${icon('arrow')}</a>
    </div>
  </div>
</section>`;

/** Video 1: beneficios clave en 4 pilares de venta */
export const pitchBenefits = [
  { t: 'Digestión liviana', d: 'Desinflama, combate gases y pesadez, y ayuda a absorber mejor la energía de las comidas.' },
  { t: 'Ánimo y descanso', d: 'Mejora la comunicación intestino–cerebro: cómo duermes, piensas y te sientes.' },
  { t: 'Amigable con la lactosa', d: 'Aunque viene de la leche, es tan ligero que muchas personas intolerantes lo toleran bien.' },
  { t: 'Defensas desde adentro', d: 'Un intestino equilibrado fortalece tus defensas. Cuidarlo es cuidarte por dentro.' },
];
