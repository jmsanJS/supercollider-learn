import { Exercise } from "@/types";

export const EXERCISES: Exercise[] = [
  {
    id: "ex1",
    level: 1,
    title: {
      en: "Pure tone",
      es: "Tono puro",
      fr: "Ton pur",
    },
    tag: "SinOsc",
    goal: {
      en: "Generate a pure tone at 440 Hz with amplitude 0.3",
      es: "Genera un tono puro a 440 Hz con amplitud 0.3",
      fr: "Génère un ton pur à 440 Hz avec une amplitude de 0.3",
    },
    theory: {
      en: `Which UGen generates a pure sine wave?

  SinOsc.ar(freq, phase, mul)

  freq  → frequency determines how high or low it sounds. Measured in Hz (hertz). 440 Hz is the note A4, the standard tuning reference.

  phase → the initial phase offset of the wave. Always start at 0.

  mul   → the signal volume. Ranges from 0.0 (silence) to 1.0 (maximum volume). Use low values (0.1 – 0.4) to avoid clipping the speakers.

The { }.play block sends the audio to the speakers.

If you have any doubts about how UGens work, you can check the Common UGens tab to review the syntax and even listen to the sound they produce.
`,
      es: `¿Cuál UGen genera una onda sinusoidal pura?

  SinOsc.ar(freq, phase, mul)

  freq  → la frecuencia determina qué tan agudo o grave suena. Se mide en Hz (hercios). 440 Hz es la nota La4, la referencia estándar de afinación.

  phase → el desfase inicial de la onda. Empieza siempre en 0.

  mul   → el volumen de la señal. Va de 0.0 (silencio) a 1.0 (volumen máximo). Usa valores bajos (0.1 – 0.4) para no saturar los altavoces.

El bloque { }.play envía el audio a los altavoces.

Si tienes alguna duda de cómo funcionan los UGens, puedes consultar la pestaña de UGens comunes para revisar la sintaxis e incluso escuchar el sonido que producen.
`,
      fr: `Quel UGen génère une onde sinusoïdale pure ?

  SinOsc.ar(freq, phase, mul)

  freq  → la fréquence détermine si le son est aigu ou grave. Elle se mesure en Hz (hertz). 440 Hz correspond à la note La4, la référence d'accordage standard.

  phase → le déphasage initial de l'onde. Commencez toujours à 0.

  mul   → le volume du signal. Va de 0.0 (silence) à 1.0 (volume maximum). Utilisez de faibles valeurs (0.1 – 0.4) pour ne pas saturer les haut-parleurs.

Le bloc { }.play envoie l'audio aux haut-parleurs.

Si vous avez des doutes sur le fonctionnement des UGens, consultez l'onglet UGens courants pour revoir la syntaxe et même écouter le son qu'ils produisent.
`,
    },
    starter: {
      en: `// Write your code inside the { }.play block:\n{\n  // Your code goes here\n  \n}.play`,
      es: `// Escribe tu código dentro del bloque { }.play:\n{\n  // Aquí va tu código\n  \n}.play`,
      fr: `// Écrivez votre code dans le bloc { }.play :\n{\n  // Votre code va ici\n  \n}.play`,
    },
    answer: {
      en: `// Generate a pure tone at 440 Hz\n{\n  SinOsc.ar(440, 0, 0.3) ! 2\n}.play`,
      es: `// Genera un tono puro de 440 Hz\n{\n  SinOsc.ar(440, 0, 0.3) ! 2\n}.play`,
      fr: `// Générer un ton pur à 440 Hz\n{\n  SinOsc.ar(440, 0, 0.3) ! 2\n}.play`,
    },
    validate(code) {
      const hasSinOsc = /SinOsc/.test(code);
      const hasCorrectCall = /SinOsc\.ar\s*\(\s*440\s*,\s*0\s*,\s*0\.3\s*\)/.test(code);
      const hasAllArgs = /SinOsc\.ar\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*\)/.test(code);
      const ok = hasCorrectCall;
      const tips = [];
      if (!hasSinOsc) tips.push({ en: "The UGen for pure tones is called SinOsc. Write it inside the { } block.", es: "El UGen para tonos puros se llama SinOsc. Escríbelo dentro del bloque { }.", fr: "L'UGen pour les tons purs s'appelle SinOsc. Écrivez-le à l'intérieur du bloc { }." });
      else if (hasAllArgs && !ok) tips.push({ en: "The arguments are present but a value is not what is expected. Check the numbers.", es: "Los argumentos están presentes pero algún valor no es el esperado. Revisa los números.", fr: "Les arguments sont présents mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else if (!ok) tips.push({ en: "SinOsc.ar needs three arguments: frequency (in Hz), phase (starts at 0) and volume (between 0.0 and 1.0).", es: "SinOsc.ar necesita tres argumentos: la frecuencia (en Hz), la fase (empieza en 0) y el volumen (entre 0.0 y 1.0).", fr: "SinOsc.ar a besoin de trois arguments : la fréquence (en Hz), la phase (commence à 0) et le volume (entre 0.0 et 1.0)." });
      return { ok, tips };
    },
  },
  {
    id: "ex2",
    level: 1,
    title: { en: "Octave up", es: "Octava arriba", fr: "Octave au-dessus" },
    tag: "SinOsc",
    goal: {
      en: "Raise the pitch one octave (880 Hz) and change the amplitude to 0.5",
      es: "Sube el tono una octava (880 Hz) y cambia la amplitud a 0.5",
      fr: "Montez le pitch d'une octave (880 Hz) et changez l'amplitude à 0.5",
    },
    theory: {
      en: `Doubling the frequency raises the pitch exactly one octave:

  A3 → 220 Hz
  A4 → 440 Hz
  A5 → ???

This is the fundamental mathematical relationship of Western music.
`,
      es: `Duplicar la frecuencia sube exactamente una octava:

  La3 → 220 Hz
  La4 → 440 Hz
  La5 → ???

Es la relación matemática fundamental de la música occidental.
`,
      fr: `Doubler la fréquence monte exactement d'une octave :

  La3 → 220 Hz
  La4 → 440 Hz
  La5 → ???

C'est la relation mathématique fondamentale de la musique occidentale.
`,
    },
    starter: {
      en: `// This is how the previous exercise looked:\n{\n  SinOsc.ar(440, 0, 0.3) ! 2  // ← modify the arguments\n}.play`,
      es: `// Así quedó el ejercicio anterior:\n{\n  SinOsc.ar(440, 0, 0.3) ! 2  // ← modifica los argumentos\n}.play`,
      fr: `// Voici comment s'est terminé l'exercice précédent :\n{\n  SinOsc.ar(440, 0, 0.3) ! 2  // ← modifiez les arguments\n}.play`,
    },
    answer: {
      en: `// Change the frequency and amplitude\n{\n  SinOsc.ar(880, 0, 0.5) ! 2\n}.play`,
      es: `// Cambia la frecuencia y la amplitud\n{\n  SinOsc.ar(880, 0, 0.5) ! 2\n}.play`,
      fr: `// Changez la fréquence et l'amplitude\n{\n  SinOsc.ar(880, 0, 0.5) ! 2\n}.play`,
    },
    validate(code) {
      const m = code.match(/SinOsc\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
      const freq = m ? parseFloat(m[1]) : 0;
      const ampMatch = code.match(/SinOsc\.ar\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*(\d+(?:\.\d+)?)/);
      const amp = ampMatch ? parseFloat(ampMatch[1]) : 0;
      const hasAllArgs = /SinOsc\.ar\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*\)/.test(code);
      const ok = freq === 880 && amp === 0.5;
      const tips = [];
      if (hasAllArgs && !ok) tips.push({ en: "The arguments are present but a value is not what is expected. Check the numbers.", es: "Los argumentos están presentes pero algún valor no es el esperado. Revisa los números.", fr: "Les arguments sont présents mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else if (!ok) {
        if (freq !== 880) tips.push({ en: "Doubling the frequency raises an octave. The first argument of SinOsc.ar is the frequency in Hz.", es: "Duplicar la frecuencia sube una octava. El primer argumento de SinOsc.ar es la frecuencia en Hz.", fr: "Doubler la fréquence monte d'une octave. Le premier argument de SinOsc.ar est la fréquence en Hz." });
        if (amp !== 0.5) tips.push({ en: "Modify the amplitude. The third argument of SinOsc.ar (mul).", es: "Modifica la amplitud. El tercer argumento de SinOsc.ar (mul).", fr: "Modifiez l'amplitude. Le troisième argument de SinOsc.ar (mul)." });
      }
      return { ok, tips };
    },
  },
  {
    id: "ex3",
    level: 1,
    title: { en: "Square wave", es: "Onda cuadrada", fr: "Onde carrée" },
    tag: "Pulse",
    goal: {
      en: "Generate a perfect square wave at 220 Hz with amplitude 0.2",
      es: "Genera una onda cuadrada perfecta a 220 Hz con amplitud 0.2",
      fr: "Génère une onde carrée parfaite à 220 Hz avec une amplitude de 0.2",
    },
    theory: {
      en: `To produce square or rectangular waves use Pulse. It has a brighter timbre than SinOsc.

Syntax:
  Pulse.ar(freq, width, mul)

  freq  → frequency in Hz, same as in SinOsc.

  width → pulse width. Determines the shape of the wave. 0.5 produces a perfect square wave (symmetric). Values other than 0.5 create asymmetry and change the timbre.

  mul   → amplitude (or volume). Use a low value like 0.2.

As in the previous exercises, remember you can duplicate the signal to both channels with ! 2.`,
      es: `Para producir ondas cuadradas o rectangulares debes utilizar Pulse. Tiene un timbre más brillante que SinOsc.

Sintaxis:
  Pulse.ar(freq, width, mul)

  freq  → frecuencia en Hz, igual que en SinOsc.

  width → ancho del pulso. Determina la forma de la onda. 0.5 produce una onda cuadrada perfecta (simétrica). Valores distintos de 0.5 crean asimetría y cambian el timbre.

  mul   → amplitud (o volumen). Usa un valor bajo como 0.2.

Como en los ejercicios anteriores, recuerda que puedes duplicar la señal a ambos canales con "! 2".`,
      fr: `Pour produire des ondes carrées ou rectangulaires, utilisez Pulse. Son timbre est plus brillant que SinOsc.

Syntaxe :
  Pulse.ar(freq, width, mul)

  freq  → fréquence en Hz, comme dans SinOsc.

  width → largeur d'impulsion. Détermine la forme de l'onde. 0.5 produit une onde carrée parfaite (symétrique). Des valeurs différentes de 0.5 créent une asymétrie et modifient le timbre.

  mul   → amplitude (ou volume). Utilisez une faible valeur comme 0.2.

Comme dans les exercices précédents, rappelle-toi que tu peux dupliquer le signal sur les deux canaux avec ! 2.`,
    },
    starter: {
      en: `// Write your code inside the { }.play block:\n{\n  // Your code goes here\n  \n}.play`,
      es: `// Escribe tu código dentro del bloque { }.play:\n{\n  // Tu código va aquí\n  \n}.play`,
      fr: `// Écrivez votre code dans le bloc { }.play :\n{\n  // Votre code va ici\n  \n}.play`,
    },
    answer: {
      en: `// Square wave at 220 Hz\n{\n  Pulse.ar(220, 0.5, 0.2) ! 2\n}.play`,
      es: `// Onda cuadrada a 220 Hz\n{\n  Pulse.ar(220, 0.5, 0.2) ! 2\n}.play`,
      fr: `// Onde carrée à 220 Hz\n{\n  Pulse.ar(220, 0.5, 0.2) ! 2\n}.play`,
    },
    validate(code) {
      const hasPulse = /Pulse\.ar/.test(code);
      const hasCorrectCall = /Pulse\.ar\s*\(\s*220\s*,\s*0\.5\s*,\s*0\.2/.test(code);
      const hasAllArgs = /Pulse\.ar\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+/.test(code);
      const ok = hasCorrectCall;
      const tips = [];
      if (!hasPulse) tips.push({ en: "Use Pulse.ar(...) — it is the UGen for square and rectangular waves.", es: "Usa Pulse.ar(...) — es el UGen para ondas cuadradas y rectangulares.", fr: "Utilisez Pulse.ar(...) — c'est l'UGen pour les ondes carrées et rectangulaires." });
      else if (hasAllArgs && !ok) tips.push({ en: "The arguments are present but a value is not what is expected. Check the numbers.", es: "Los argumentos están presentes pero algún valor no es el esperado. Revisa los números.", fr: "Les arguments sont présents mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else if (!ok) tips.push({ en: "Pulse.ar needs three arguments: the frequency in Hz, the pulse width (0.5 for a perfect square wave), and the amplitude (mul).", es: "Pulse.ar necesita tres argumentos: la frecuencia en Hz, el ancho del pulso (0.5 para onda cuadrada perfecta) y la amplitud (mul).", fr: "Pulse.ar a besoin de trois arguments : la fréquence en Hz, la largeur d'impulsion (0.5 pour une onde carrée parfaite) et l'amplitude (mul)." });
      return { ok, tips };
    },
  },
  {
    id: "ex4",
    level: 1,
    title: { en: "White noise", es: "Ruido blanco", fr: "Bruit blanc" },
    tag: "WhiteNoise",
    goal: {
      en: "Generate white noise with amplitude 0.1",
      es: "Genera ruido blanco con amplitud 0.1",
      fr: "Génère du bruit blanc avec une amplitude de 0.1",
    },
    theory: {
      en: `WhiteNoise generates a random signal with equal
energy at all frequencies.

Unlike SinOsc or Pulse, WhiteNoise has no
defined frequency — it generates pure noise.

Syntax:
  WhiteNoise.ar(mul)

  mul → only needs the volume. No frequency, no phase. Use a low value like 0.1 to avoid clipping.

Use it for:
  • Wind, water, rain effects
  • Texture layers
  • Percussion synthesis`,
      es: `WhiteNoise genera señal aleatoria con igual
energía en todas las frecuencias.

A diferencia de SinOsc o Pulse, WhiteNoise no tiene
una frecuencia definida — genera ruido puro.

Sintaxis:
  WhiteNoise.ar(mul)

  mul → solo necesita el volumen. Sin frecuencia, sin fase. Usa un valor bajo como 0.1 para no saturar.

Úsalo para:
  • Efectos de viento, agua, lluvia
  • Capas de textura
  • Síntesis de percusión`,
      fr: `WhiteNoise génère un signal aléatoire avec une énergie
égale à toutes les fréquences.

Contrairement à SinOsc ou Pulse, WhiteNoise n'a
aucune fréquence définie — il génère du bruit pur.

Syntaxe :
  WhiteNoise.ar(mul)

  mul → n'a besoin que du volume. Pas de fréquence, pas de phase. Utilisez une faible valeur comme 0.1 pour ne pas saturer.

Utilisez-le pour :
  • Effets de vent, d'eau, de pluie
  • Couches de texture
  • Synthèse de percussions`,
    },
    starter: {
      en: `// Write your code inside the { }.play block:\n{\n  // Your code goes here\n  \n}.play`,
      es: `// Escribe tu código dentro del bloque { }.play:\n{\n  // Tu código va aquí\n  \n}.play`,
      fr: `// Écrivez votre code dans le bloc { }.play :\n{\n  // Votre code va ici\n  \n}.play`,
    },
    answer: {
      en: `// Soft white noise\n{\n  WhiteNoise.ar(0.1) ! 2\n}.play`,
      es: `// Ruido blanco suave\n{\n  WhiteNoise.ar(0.1) ! 2\n}.play`,
      fr: `// Bruit blanc doux\n{\n  WhiteNoise.ar(0.1) ! 2\n}.play`,
    },
    validate(code) {
      const hasWhiteNoise = /WhiteNoise/.test(code);
      const hasCorrectCall = /WhiteNoise\.ar\s*\(\s*0\.1\s*\)/.test(code);
      const hasAnyArg = /WhiteNoise\.ar\s*\(\s*[\d.]+\s*\)/.test(code);
      const ok = hasWhiteNoise && hasCorrectCall;
      const tips = [];
      if (!hasWhiteNoise) tips.push({ en: "Use the UGen that generates noise with energy at all frequencies.", es: "Usa el UGen que genera ruido con energía en todas las frecuencias.", fr: "Utilisez l'UGen qui génère du bruit avec de l'énergie à toutes les fréquences." });
      else if (hasAnyArg && !ok) tips.push({ en: "The arguments are present but a value is not what is expected. Check the numbers.", es: "Los argumentos están presentes pero algún valor no es el esperado. Revisa los números.", fr: "Les arguments sont présents mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else if (!ok) tips.push({ en: "WhiteNoise.ar only needs one argument: the volume (mul). Use a low value to avoid clipping.", es: "WhiteNoise.ar solo necesita un argumento: el volumen (mul). Usa un valor bajo para no saturar.", fr: "WhiteNoise.ar n'a besoin que d'un argument : le volume (mul). Utilisez une valeur faible pour ne pas saturer." });
      return { ok, tips };
    },
  },
  {
    id: "ex5",
    level: 1,
    title: { en: "Sawtooth wave", es: "Diente de sierra", fr: "Dent de scie" },
    tag: "Saw",
    goal: {
      en: "Generate a sawtooth wave at 330 Hz with amplitude 0.2",
      es: "Genera una onda de diente de sierra a 330 Hz con amplitud 0.2",
      fr: "Génère une onde en dent de scie à 330 Hz avec une amplitude de 0.2",
    },
    theory: {
      en: `The sawtooth wave is one of the richest waveforms in harmonics. Unlike SinOsc (pure and smooth wave), Saw contains all harmonics of the series, giving it a bright and piercing timbre.

Syntax:
  Saw.ar(freq, mul)

  freq → the frequency in Hz, same as in SinOsc. 330 Hz corresponds approximately to the note E3.

  mul  → the amplitude (volume). Use moderate values (0.1 – 0.3) because its harmonic richness can sound very full at high volumes.

The sawtooth wave is the ideal starting point for subtractive synthesis: it is filtered afterwards to sculpt the timbre.`,
      es: `La onda de diente de sierra es una de las formas de onda más ricas en armónicos. A diferencia de SinOsc (onda pura y suave), Saw contiene todos los armónicos de la serie, lo que le da un timbre brillante y penetrante.

Sintaxis:
  Saw.ar(freq, mul)

  freq → la frecuencia en Hz, igual que en SinOsc. 330 Hz corresponde aproximadamente a la nota Mi3.

  mul  → la amplitud (volumen). Usa valores moderados (0.1 – 0.3) porque su riqueza armónica puede sonar muy cargada a volúmenes altos.

La onda de diente de sierra es el punto de partida ideal para la síntesis substractiva: se filtra después para esculpir el timbre.`,
      fr: `L'onde en dent de scie est l'une des formes d'onde les plus riches en harmoniques. Contrairement à SinOsc (onde pure et douce), Saw contient tous les harmoniques de la série, ce qui lui donne un timbre brillant et perçant.

Syntaxe :
  Saw.ar(freq, mul)

  freq → la fréquence en Hz, comme dans SinOsc. 330 Hz correspond approximativement à la note Mi3.

  mul  → l'amplitude (volume). Utilisez des valeurs modérées (0.1 – 0.3) car sa richesse harmonique peut sonner très chargée à des volumes élevés.

L'onde en dent de scie est le point de départ idéal pour la synthèse soustractive : elle est ensuite filtrée pour sculpter le timbre.`,
    },
    starter: {
      en: `// Write your code inside the { }.play block:\n{\n  // Your code goes here\n  \n}.play`,
      es: `// Escribe tu código dentro del bloque { }.play:\n{\n  // Tu código va aquí\n  \n}.play`,
      fr: `// Écrivez votre code dans le bloc { }.play :\n{\n  // Votre code va ici\n  \n}.play`,
    },
    answer: {
      en: `// Sawtooth wave at 330 Hz\n{\n  Saw.ar(330, 0.2) ! 2\n}.play`,
      es: `// Onda de diente de sierra a 330 Hz\n{\n  Saw.ar(330, 0.2) ! 2\n}.play`,
      fr: `// Onde en dent de scie à 330 Hz\n{\n  Saw.ar(330, 0.2) ! 2\n}.play`,
    },
    validate(code) {
      const hasSaw = /Saw\.ar/.test(code);
      const hasCorrectCall = /Saw\.ar\s*\(\s*330\s*,\s*0\.2\s*\)/.test(code);
      const hasAllArgs = /Saw\.ar\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*\)/.test(code);
      const ok = hasCorrectCall;
      const tips = [];
      if (!hasSaw) tips.push({ en: "The UGen for the sawtooth wave is called Saw. Write it inside the { } block.", es: "El UGen para la onda de diente de sierra se llama Saw. Escríbelo dentro del bloque { }.", fr: "L'UGen pour l'onde en dent de scie s'appelle Saw. Écrivez-le à l'intérieur du bloc { }." });
      else if (hasAllArgs && !ok) tips.push({ en: "The arguments are present but a value is not what is expected. Check the numbers.", es: "Los argumentos están presentes pero algún valor no es el esperado. Revisa los números.", fr: "Les arguments sont présents mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else if (!ok) tips.push({ en: "Saw.ar needs two arguments: the frequency in Hz and the amplitude (mul).", es: "Saw.ar necesita dos argumentos: la frecuencia en Hz y la amplitud (mul).", fr: "Saw.ar a besoin de deux arguments : la fréquence en Hz et l'amplitude (mul)." });
      return { ok, tips };
    },
  },
  {
    id: "ex6",
    level: 2,
    title: { en: "Ambulance siren", es: "Sirena de ambulancia", fr: "Sirène d'ambulance" },
    tag: "LFSaw",
    goal: {
      en: "Frequency oscillating between 400 and 800 Hz at 2 times per second, amplitude 0.4",
      es: "Frecuencia que oscila entre 400 y 800 Hz a 2 veces por segundo, amplitud 0.4",
      fr: "Fréquence oscillant entre 400 et 800 Hz à 2 fois par seconde, amplitude 0.4",
    },
    theory: {
      en: `Now that you've finished the level 1 exercises, let's step it up. We'll recreate sounds you could hear every day in real life.

To create a siren, you need the frequency of SinOsc to change on its own over time. This is called frequency modulation.

LFSaw is a slow oscillator (LFO) that generates an ascending ramp from -1 to +1 cyclically.

If you multiply that ramp by a range and add a center frequency, you get a frequency sweep:

  LFSaw.ar(rate, iphase) * range + center

  rate   → how many times per second it oscillates (e.g. 2 = twice/sec)
  iphase → initial phase of the ramp. Ranges from 0 to 2. 0 starts at the bottom (-1), 1 starts in the middle (0), 2 starts at the top (+1).
  range  → how many Hz it goes up and down from the center
  center → the central frequency around which it oscillates`,
      es: `Ahora que terminaste los ejercicios de nivel 1, subamos la intensidad. Vamos a recrear sonidos que podrías escuchar en el día a día.

Para crear una sirena, necesitas que la frecuencia de SinOsc cambie sola con el tiempo. Esto se llama modulación de frecuencia.

LFSaw es un oscilador lento (LFO) que genera una rampa ascendente que va de -1 a +1 de forma cíclica.

Si multiplicas esa rampa por un rango y le sumas una frecuencia central, obtienes un barrido de frecuencias:

  LFSaw.ar(frecuencia, fase_inicial) * rango + centro

  frecuencia    → cuántas veces por segundo oscila (ej: 2 = dos veces/seg)
  fase_inicial  → fase inicial de la rampa. Va de 0 a 2. 0 empieza abajo (-1), 1 empieza en el medio (0), 2 empieza arriba (+1)
  rango         → cuántos Hz sube y baja respecto al centro
  centro        → frecuencia central alrededor de la que oscila`,
      fr: `Maintenant que vous avez terminé les exercices de niveau 1, passons à la vitesse supérieure. Nous allons recréer des sons que vous pourriez entendre au quotidien.

Pour créer une sirène, vous devez faire varier la fréquence de SinOsc automatiquement dans le temps. C'est ce qu'on appelle la modulation de fréquence.

LFSaw est un oscillateur lent (LFO) qui génère une rampe ascendante allant de -1 à +1 de façon cyclique.

Si vous multipliez cette rampe par une plage et y ajoutez une fréquence centrale, vous obtenez un balayage de fréquences :

  LFSaw.ar(rate, phase) * range + center

  rate   → combien de fois par seconde il oscille (ex : 2 = deux fois/sec)
  iphase → phase initiale de la rampe. Va de 0 à 2. 0 commence en bas (-1), 1 commence au milieu (0), 2 commence en haut (+1)
  range  → de combien de Hz il monte et descend par rapport au centre
  center → la fréquence centrale autour de laquelle il oscille`,
    },
    starter: {
      en: `// Replace the UPPERCASE words:\n{\n  SinOsc.ar(\n    LFSaw.ar(RATE, IPHASE) * RANGE + CENTER,\n    0, AMPLITUDE\n  ) ! 2\n}.play`,
      es: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  SinOsc.ar(\n    LFSaw.ar(FRECUENCIA, FASE_INICIAL) * RANGO + CENTRO,\n    0, AMPLITUD\n  ) ! 2\n}.play`,
      fr: `// Remplacez les mots en MAJUSCULES :\n{\n  SinOsc.ar(\n    LFSaw.ar(RATE, PHASE_INITIALE) * RANGE + CENTER,\n    0, AMPLITUDE\n  ) ! 2\n}.play`,
    },
    answer: {
      en: `// Siren: oscillates between 400 and 800 Hz\n{\n  SinOsc.ar(\n    LFSaw.ar(2, 1) * 200 + 600,\n    0, 0.4\n  ) ! 2\n}.play`,
      es: `// Sirena: oscila entre 400 y 800 Hz\n{\n  SinOsc.ar(\n    LFSaw.ar(2, 1) * 200 + 600,\n    0, 0.4\n  ) ! 2\n}.play`,
      fr: `// Sirène : oscille entre 400 et 800 Hz\n{\n  SinOsc.ar(\n    LFSaw.ar(2, 1) * 200 + 600,\n    0, 0.4\n  ) ! 2\n}.play`,
    },
    validate(code) {
      const hasSinOsc = /SinOsc/.test(code);
      const hasLFSaw = /LFSaw/.test(code);
      const hasRate2 = /LFSaw\.ar\s*\(\s*2\s*[,)]/.test(code);
      const hasIphase1 = /LFSaw\.ar\s*\(\s*[\d.]+\s*,\s*1\s*\)/.test(code);
      const hasDepth200 = /200/.test(code);
      const hasCenter600 = /600/.test(code);
      const hasAmp = /,\s*0\s*,\s*0\.4/.test(code);
      const hasStructure = hasSinOsc && hasLFSaw && /LFSaw\.ar\s*\(\s*[\d.]+(?:\s*,\s*[\d.]+)?\s*\)\s*\*\s*[\d.]+\s*\+\s*[\d.]+/.test(code);
      const ok = hasSinOsc && hasLFSaw && hasRate2 && hasIphase1 && hasDepth200 && hasCenter600 && hasAmp;
      const tips = [];
      if (!hasSinOsc) tips.push({ en: "You need SinOsc.ar as the main oscillator. The first argument is the frequency.", es: "Necesitas SinOsc.ar como oscilador principal. El primer argumento es la frecuencia.", fr: "Vous avez besoin de SinOsc.ar comme oscillateur principal. Le premier argument est la fréquence." });
      else if (!hasLFSaw) tips.push({ en: "Use LFSaw.ar inside the first argument of SinOsc so the frequency changes on its own.", es: "Usa LFSaw.ar dentro del primer argumento de SinOsc para que la frecuencia cambie sola.", fr: "Utilisez LFSaw.ar dans le premier argument de SinOsc pour que la fréquence change automatiquement." });
      else if (hasStructure && !ok) tips.push({ en: "The structure is correct but a value is not what is expected. Check the numbers.", es: "La estructura es correcta pero algún valor no es el esperado. Revisa los números.", fr: "La structure est correcte mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else {
        if (hasLFSaw && !hasRate2) tips.push({ en: "The first argument of LFSaw.ar is the oscillation rate (how many times per second).", es: "El primer argumento de LFSaw.ar es la velocidad de oscilación (cuántas veces por segundo).", fr: "Le premier argument de LFSaw.ar est la vitesse d'oscillation (combien de fois par seconde)." });
        if (!hasIphase1) tips.push({ en: "The second argument of LFSaw.ar is the initial phase (iphase). It ranges from 0 to 2.", es: "El segundo argumento de LFSaw.ar es la fase inicial (iphase). Va de 0 a 2.", fr: "Le deuxième argument de LFSaw.ar est la phase initiale (iphase). Elle va de 0 à 2." });
        if (!hasDepth200) tips.push({ en: "Multiply LFSaw.ar by the frequency range you want to sweep.", es: "Multiplica LFSaw.ar por el rango de frecuencias que quieres barrer.", fr: "Multipliez LFSaw.ar par la plage de fréquences que vous voulez balayer." });
        if (!hasCenter600) tips.push({ en: "Add the center frequency to the result of LFSaw to determine which note it oscillates around.", es: "Suma la frecuencia central al resultado de LFSaw para determinar alrededor de qué nota oscila.", fr: "Ajoutez la fréquence centrale au résultat de LFSaw pour déterminer autour de quelle note il oscille." });
        if (!hasAmp) tips.push({ en: "The amplitude is the third argument of SinOsc.ar (after the frequency expression and phase 0).", es: "La amplitud es el tercer argumento de SinOsc.ar (tras la expresión de frecuencia y la fase 0).", fr: "L'amplitude est le troisième argument de SinOsc.ar (après l'expression de fréquence et la phase 0)." });
      }
      return { ok, tips };
    },
  },
  {
    id: "ex7",
    level: 2,
    title: { en: "Police siren", es: "Sirena de policía", fr: "Sirène de police" },
    tag: "SinOsc",
    goal: {
      en: "Alternate between 600 and 800 Hz once per second, amplitude 0.3",
      es: "Alterna entre 600 y 800 Hz una vez por segundo, amplitud 0.3",
      fr: "Alterne entre 600 et 800 Hz une fois par seconde, amplitude 0.3",
    },
    theory: {
      en: `In some countries, police sirens alternate between two fixed tones,
meaning they do not make a smooth sweep like the ambulance, but instead jump.

LFPulse is a slow oscillator that only produces 0 or 1 cyclically.
If you scale that 0/1 you get two different frequency values:

  LFPulse.ar(rate, iphase, width) * difference + base

  rate       → how many times per second it alternates (e.g. 1 = once/sec)
  difference → how many Hz of difference there are between the two tones
  base       → the lower of the two frequencies

LFPulse also accepts iphase (0 to 1, default 0) and width (0 to 1, default 0.5), but they are not needed for this exercise.

When LFPulse is 0: frequency is (0 * difference + base) = base
When LFPulse is 1: frequency is (1 * difference + base) = base + difference

Use this as the first argument of SinOsc.ar.`,
      es: `En algunos países, las sirenas de policía alternan entre dos tonos fijos,
 es decir, no hacen un barrido suave como la ambulancia, sino que saltan.

LFPulse es un oscilador lento que solo produce 0 o 1 de forma cíclica.
Si escalas ese 0/1 obtienes dos valores de frecuencia distintos:

  LFPulse.ar(frecuencia, fase_inicial, ancho) * diferencia + base

  frecuencia  → cuántas veces por segundo alterna (ej: 1 = una vez/seg)
  diferencia  → cuántos Hz de diferencia hay entre los dos tonos
  base        → la frecuencia más baja de las dos

LFPulse también acepta fase_inicial (0 a 1, por defecto 0) y ancho (0 a 1, por defecto 0.5), pero no son necesarios para este ejercicio.

Cuando LFPulse vale 0: la frecuencia es (0 * diferencia + base) = base
Cuando LFPulse vale 1: la frecuencia es (1 * diferencia + base) = base + diferencia

Utiliza esto como primer argumento de SinOsc.ar.`,
      fr: `Dans certains pays, les sirènes de police alternent entre deux tons fixes,
c'est-à-dire qu'elles ne font pas un balayage progressif comme l'ambulance, mais sautent.

LFPulse est un oscillateur lent qui ne produit que 0 ou 1 de façon cyclique.
Si vous mettez à l'échelle ce 0/1 vous obtenez deux valeurs de fréquence différentes :

  LFPulse.ar(rate, iphase, width) * difference + base

  rate       → combien de fois par seconde il alterne (ex : 1 = une fois/sec)
  difference → de combien de Hz de différence il y a entre les deux tons
  base       → la fréquence la plus basse des deux

LFPulse accepte aussi iphase (0 à 1, défaut 0) et width (0 à 1, défaut 0.5), mais ils ne sont pas nécessaires pour cet exercice.

Quand LFPulse vaut 0 : la fréquence est (0 * difference + base) = base
Quand LFPulse vaut 1 : la fréquence est (1 * difference + base) = base + difference

Utilisez ceci comme premier argument de SinOsc.ar.`,
    },
    starter: {
      en: `// Replace the UPPERCASE words:\n{\n  SinOsc.ar(\n    LFPulse.ar(RATE, IPHASE) * DIFFERENCE + BASE,\n    0, AMPLITUDE\n  ) ! 2\n}.play`,
      es: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  SinOsc.ar(\n    LFPulse.ar(FRECUENCIA, FASE_INICIAL) * DIFERENCIA + BASE,\n    0, AMPLITUD\n  ) ! 2\n}.play`,
      fr: `// Remplacez les mots en MAJUSCULES :\n{\n  SinOsc.ar(\n    LFPulse.ar(RATE, IPHASE) * DIFFERENCE + BASE,\n    0, AMPLITUDE\n  ) ! 2\n}.play`,
    },
    answer: {
      en: `// Police siren: alternates 600 and 800 Hz\n{\n  SinOsc.ar(\n    LFPulse.ar(1, 0) * 200 + 600,\n    0, 0.3\n  ) ! 2\n}.play`,
      es: `// Sirena de policía: alterna 600 y 800 Hz\n{\n  SinOsc.ar(\n    LFPulse.ar(1, 0) * 200 + 600,\n    0, 0.3\n  ) ! 2\n}.play`,
      fr: `// Sirène de police : alterne 600 et 800 Hz\n{\n  SinOsc.ar(\n    LFPulse.ar(1, 0) * 200 + 600,\n    0, 0.3\n  ) ! 2\n}.play`,
    },
    validate(code) {
      const hasSinOsc = /SinOsc/.test(code);
      const hasLFPulse = /LFPulse/.test(code);
      const hasRate1 = /LFPulse\.ar\s*\(\s*1\s*\)/.test(code);
      const hasRange200 = /200/.test(code);
      const hasBase600 = /600/.test(code);
      const hasAmp = /,\s*0\s*,\s*0\.3/.test(code);
      const hasStructure = hasSinOsc && hasLFPulse && /LFPulse\.ar\s*\(\s*[\d.]+\s*\)\s*\*\s*[\d.]+\s*\+\s*[\d.]+/.test(code);
      const ok = hasSinOsc && hasLFPulse && hasRate1 && hasRange200 && hasBase600 && hasAmp;
      const tips = [];
      if (!hasSinOsc) tips.push({ en: "You need SinOsc.ar as the main oscillator.", es: "Necesitas SinOsc.ar como oscilador principal.", fr: "Vous avez besoin de SinOsc.ar comme oscillateur principal." });
      else if (!hasLFPulse) tips.push({ en: "Use LFPulse.ar inside the first argument of SinOsc — it generates 0 or 1 to alternate between two frequencies.", es: "Usa LFPulse.ar dentro del primer argumento de SinOsc — genera 0 o 1 para alternar entre dos frecuencias.", fr: "Utilisez LFPulse.ar dans le premier argument de SinOsc — il génère 0 ou 1 pour alterner entre deux fréquences." });
      else if (hasStructure && !ok) tips.push({ en: "The structure is correct but a value is not what is expected. Check the numbers.", es: "La estructura es correcta pero algún valor no es el esperado. Revisa los números.", fr: "La structure est correcte mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else {
        if (hasLFPulse && !hasRate1) tips.push({ en: "The first argument of LFPulse.ar is the alternation rate (times per second).", es: "El primer argumento de LFPulse.ar es la velocidad de alternancia (veces por segundo).", fr: "Le premier argument de LFPulse.ar est la vitesse d'alternance (fois par seconde)." });
        if (!hasRange200) tips.push({ en: "The difference between 800 Hz and 600 Hz is the range you must multiply by LFPulse.", es: "La diferencia entre 800 Hz y 600 Hz es el rango que debes multiplicar por LFPulse.", fr: "La différence entre 800 Hz et 600 Hz est la plage que vous devez multiplier par LFPulse." });
        if (!hasBase600) tips.push({ en: "The lowest frequency (base) is added to the result of LFPulse * difference.", es: "La frecuencia más baja (base) se suma al resultado de LFPulse * diferencia.", fr: "La fréquence la plus basse (base) est ajoutée au résultat de LFPulse * difference." });
        if (!hasAmp) tips.push({ en: "The amplitude is the third argument of SinOsc.ar (after the frequency expression and phase 0). Set it to 0.3.", es: "La amplitud es el tercer argumento de SinOsc.ar (tras la expresión de frecuencia y la fase 0). Ponla en 0.3.", fr: "L'amplitude est le troisième argument de SinOsc.ar (après l'expression de fréquence et la phase 0). Mettez-la à 0.3." });
      }
      return { ok, tips };
    },
  },
  {
    id: "ex8",
    level: 2,
    title: { en: "Car alarm", es: "Alarma de coche", fr: "Alarme de voiture" },
    tag: "SinOsc",
    goal: {
      en: "Descending sweep between 700 and 900 Hz, 2 times per second, amplitude 0.5",
      es: "Barrido descendente entre 700 y 900 Hz, 2 veces por segundo, amplitud 0.5",
      fr: "Balayage descendant entre 700 et 900 Hz, 2 fois par seconde, amplitude 0.5",
    },
    theory: {
      en: `Car alarms typically use a fast descending sweep
that loops. It starts high and falls.

LFSaw normally goes up from -1 to +1 (ascending ramp).
If you use iphase: 1 you reverse the direction: it goes down from +1 to -1.

  LFSaw.ar(frq, iphase, mul, add) // Only use freq and iphase for this exercise

  freq   → how many times per second the sweep repeats.
  iphase → initial phase. With 1 the ramp is descending.

For the sweep to be descending in frequency, the
Hz difference you multiply must be negative:

  LFSaw.ar(freq, iphase) * (-range) + center

  center - range = minimum frequency
  center + 0     = maximum frequency (at the start of the cycle)`,
      es: `Las alarmas de coche suelen usar un barrido descendente rápido
que se repite en bucle. Empieza agudo y cae.

LFSaw normalmente sube de -1 a +1 (rampa ascendente).
Si usas iphase: 1 inviertes la dirección: baja de +1 a -1.

  LFSaw.ar(frq, iphase, mul, add) // Utiliza solo freq e iphase para este ejercicio

  freq   → las veces por segundo que se repite el barrido.
  iphase → fase inicial. Con 1 la rampa es descendente.

Para que el barrido sea descendente en frecuencia, la
diferencia de Hz que multiplicas debe ser negativa:

  LFSaw.ar(freq, fase) * (-rango) + centro

  centro - rango = frecuencia mínima
  centro + 0     = frecuencia máxima (al inicio del ciclo)`,
      fr: `Les alarmes de voiture utilisent généralement un balayage descendant rapide
qui se répète en boucle. Il commence aigu et descend.

LFSaw monte normalement de -1 à +1 (rampe ascendante).
Si vous utilisez iphase: 1 vous inversez la direction : il descend de +1 à -1.

  LFSaw.ar(frq, iphase, mul, add) // Utilisez seulement freq et iphase pour cet exercice

  freq   → combien de fois par seconde le balayage se répète.
  iphase → phase initiale. Avec 1 la rampe est descendante.

Pour que le balayage soit descendant en fréquence, la
différence de Hz que vous multipliez doit être négative :

  LFSaw.ar(freq, phase) * (-range) + center

  center - range = fréquence minimale
  center + 0     = fréquence maximale (au début du cycle)`,
    },
    starter: {
      en: `// Replace the UPPERCASE words:\n{\n  SinOsc.ar(\n    LFSaw.ar(RATE, PHASE) * (-RANGE) + CENTER,\n    0, AMPLITUDE\n  ) ! 2\n}.play`,
      es: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  SinOsc.ar(\n    LFSaw.ar(FRECUENCIA, PHASE) * (-RANGO) + CENTRO,\n    0, AMPLITUD\n  ) ! 2\n}.play`,
      fr: `// Remplacez les mots en MAJUSCULES :\n{\n  SinOsc.ar(\n    LFSaw.ar(RATE, PHASE) * (-RANGE) + CENTER,\n    0, AMPLITUDE\n  ) ! 2\n}.play`,
    },
    answer: {
      en: `// Car alarm: descending sweep\n{\n  SinOsc.ar(\n    LFSaw.ar(2, 1) * (-200) + 900,\n    0, 0.5\n  ) ! 2\n}.play`,
      es: `// Alarma de coche: barrido descendente\n{\n  SinOsc.ar(\n    LFSaw.ar(2, 1) * (-200) + 900,\n    0, 0.5\n  ) ! 2\n}.play`,
      fr: `// Alarme de voiture : balayage descendant\n{\n  SinOsc.ar(\n    LFSaw.ar(2, 1) * (-200) + 900,\n    0, 0.5\n  ) ! 2\n}.play`,
    },
    validate(code) {
      const hasSinOsc = /SinOsc/.test(code);
      const hasLFSaw = /LFSaw/.test(code);
      const hasLFSawWithIphase = /LFSaw\.ar\s*\(\s*2\s*,\s*1\s*\)/.test(code);
      const hasNeg200 = /\(\s*-\s*200\s*\)|\*\s*-\s*200\b/.test(code);
      const hasBase900 = /900/.test(code);
      const hasAmp = /,\s*0\s*,\s*0\.5/.test(code);
      const hasStructure = hasSinOsc && hasLFSaw &&
        /LFSaw\.ar\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*\)/.test(code) &&
        /\(\s*-\s*[\d.]+\s*\)|\*\s*-\s*[\d.]+/.test(code) &&
        /\+\s*[\d.]+/.test(code);
      const ok = hasSinOsc && hasLFSaw && hasLFSawWithIphase && hasNeg200 && hasBase900 && hasAmp;
      const tips = [];
      if (!hasLFSaw) tips.push({ en: "Use LFSaw.ar inside the first argument of SinOsc to sweep the frequency.", es: "Usa LFSaw.ar dentro del primer argumento de SinOsc para barrer la frecuencia.", fr: "Utilisez LFSaw.ar dans le premier argument de SinOsc pour balayer la fréquence." });
      else if (hasStructure && !ok) tips.push({ en: "The structure is correct but a value is not what is expected. Check the numbers.", es: "La estructura es correcta pero algún valor no es el esperado. Revisa los números.", fr: "La structure est correcte mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else {
        if (hasLFSaw && !hasLFSawWithIphase) tips.push({ en: "LFSaw.ar has a second argument called iphase. Setting it to 1 reverses the direction of the ramp.", es: "LFSaw.ar tiene un segundo argumento llamado iphase. Cambiarlo a 1 invierte la dirección de la rampa.", fr: "LFSaw.ar a un second argument appelé iphase. Le mettre à 1 inverse la direction de la rampe." });
        if (!hasNeg200) tips.push({ en: "For the sweep to be descending, the Hz range you multiply must be negative: * (-range).", es: "Para que el barrido sea descendente, el rango de Hz que multiplicas debe ser negativo: * (-rango).", fr: "Pour que le balayage soit descendant, la plage de Hz que vous multipliez doit être négative : * (-range)." });
        if (!hasBase900) tips.push({ en: "The center frequency is added at the end and determines the starting point of the sweep.", es: "La frecuencia central (centro) se suma al final y determina el punto de partida del barrido.", fr: "La fréquence centrale est ajoutée à la fin et détermine le point de départ du balayage." });
        if (!hasAmp) tips.push({ en: "The amplitude is the third argument of SinOsc.ar (after the frequency expression and phase 0).", es: "La amplitud es el tercer argumento de SinOsc.ar (tras la expresión de frecuencia y la fase 0).", fr: "L'amplitude est le troisième argument de SinOsc.ar (après l'expression de fréquence et la phase 0)." });
      }
      return { ok, tips };
    },
  },
  {
    id: "ex9",
    level: 2,
    title: { en: "Microwave beep", es: "Pitido de microondas", fr: "Bip de micro-ondes" },
    tag: "EnvGen",
    goal: {
      en: "Tone at 1000 Hz with rise 0.01s and fall 0.1s",
      es: "Tono a 1000 Hz con subida 0.01s y bajada 0.1s",
      fr: "Ton à 1000 Hz avec montée 0.01s et descente 0.1s",
    },
    theory: {
      en: `Household appliances use short beeps with a percussive envelope.
Instead of a continuous tone, the sound rises and falls in amplitude quickly.

EnvGen.kr generates that amplitude shape. It is multiplied by the oscillator:
  SinOsc.ar(freq) * EnvGen.kr(envelope)

Env.perc defines the shape of the envelope:
  Env.perc(attack, decay, level, curve)

  attack → time in seconds to rise to maximum volume (very short, like 0.01 s)
  decay  → time in seconds to fall to silence (somewhat longer, like 0.1 s)
  level  → peak amplitude of the envelope (default 1). Not used in this exercise.
  curve  → shape of the curve: 0 is linear, negative values give an exponential drop (default -4). Not used in this exercise.

EnvGen.kr also takes a doneAction argument:
  doneAction: Done.freeSelf

Without it, the synth node would keep running silently on the server after the envelope ends, wasting CPU. Done.freeSelf tells SuperCollider to free (delete) the synth automatically once the envelope reaches its end.`,
      es: `Los electrodomésticos usan pitidos cortos con envolvente percusiva.
En lugar de un tono continuo, el sonido sube y baja en amplitud rápidamente.

EnvGen.kr genera esa forma de amplitud. Se multiplica por el oscilador:
  SinOsc.ar(freq) * EnvGen.kr(envolvente)

Env.perc define la forma de la envolvente:
  Env.perc(ataque, caída, nivel, curva)

  ataque → tiempo en segundos que tarda en subir al volumen máximo
           (muy corto, como 0.01 s)
  caída  → tiempo en segundos que tarda en bajar a silencio
           (algo más largo, como 0.1 s)
  nivel  → amplitud máxima de la envolvente (por defecto 1). No se usa en este ejercicio.
  curva  → forma de la curva: 0 es lineal, valores negativos dan una caída exponencial (por defecto -4). No se usa en este ejercicio.

EnvGen.kr también acepta el argumento doneAction:
  doneAction: Done.freeSelf

Sin él, el nodo del synth seguiría corriendo en silencio en el servidor después de que termine la envolvente, desperdiciando CPU. Done.freeSelf le indica a SuperCollider que libere (elimine) el synth automáticamente cuando la envolvente llega a su fin.`,
      fr: `Les appareils électroménagers utilisent de courts bips avec une enveloppe percussive.
Au lieu d'un ton continu, le son monte et descend rapidement en amplitude.

EnvGen.kr génère cette forme d'amplitude. Il est multiplié par l'oscillateur :
  SinOsc.ar(freq) * EnvGen.kr(envelope)

Env.perc définit la forme de l'enveloppe :
  Env.perc(attack, decay, level, curve)

  attack → temps en secondes pour monter au volume maximum
           (très court, comme 0.01 s)
  decay  → temps en secondes pour descendre au silence
           (un peu plus long, comme 0.1 s)
  level  → amplitude maximale de l'enveloppe (défaut 1). Pas utilisé dans cet exercice.
  curve  → forme de la courbe : 0 est linéaire, les valeurs négatives donnent une chute exponentielle (défaut -4). Pas utilisé dans cet exercice.

EnvGen.kr accepte aussi un argument doneAction :
  doneAction: Done.freeSelf

Sans lui, le nœud synth continuerait à tourner silencieusement sur le serveur après la fin de l'enveloppe, gaspillant du CPU. Done.freeSelf indique à SuperCollider de libérer (supprimer) le synth automatiquement une fois que l'enveloppe atteint sa fin.`,
    },
    starter: {
      en: `// Replace the UPPERCASE words:\n{\n  SinOsc.ar(FREQUENCY) *\n  EnvGen.kr(Env.perc(ATTACK, DECAY), doneAction: Done.freeSelf) ! 2\n}.play`,
      es: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  SinOsc.ar(FRECUENCIA) *\n  EnvGen.kr(Env.perc(ATAQUE, CAIDA), doneAction: Done.freeSelf) ! 2\n}.play`,
      fr: `// Remplacez les mots en MAJUSCULES :\n{\n  SinOsc.ar(FREQUENCE) *\n  EnvGen.kr(Env.perc(ATTACK, DECAY), doneAction: Done.freeSelf) ! 2\n}.play`,
    },
    answer: {
      en: `// Short microwave beep\n{\n  SinOsc.ar(1000) *\n  EnvGen.kr(Env.perc(0.01, 0.1), doneAction: Done.freeSelf) ! 2\n}.play`,
      es: `// Pitido corto de microondas\n{\n  SinOsc.ar(1000) *\n  EnvGen.kr(Env.perc(0.01, 0.1), doneAction: Done.freeSelf) ! 2\n}.play`,
      fr: `// Court bip de micro-ondes\n{\n  SinOsc.ar(1000) *\n  EnvGen.kr(Env.perc(0.01, 0.1), doneAction: Done.freeSelf) ! 2\n}.play`,
    },
    validate(code) {
      const hasSinOsc = /SinOsc/.test(code);
      const hasFreq1000 = /SinOsc\.ar\s*\(\s*1000\s*\)/.test(code);
      const hasEnvGen = /EnvGen/.test(code);
      const hasEnvPerc = /Env\.perc/.test(code);
      const hasPercValues = /Env\.perc\s*\(\s*0\.01\s*,\s*0\.1\s*\)/.test(code);
      const hasStructure = hasSinOsc && /SinOsc\.ar\s*\(\s*[\d.]+\s*\)/.test(code) &&
        hasEnvGen && hasEnvPerc && /Env\.perc\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*\)/.test(code);
      const ok = hasSinOsc && hasFreq1000 && hasEnvGen && hasEnvPerc && hasPercValues;
      const tips = [];
      if (!hasEnvGen) tips.push({ en: "Use EnvGen.kr and multiply it by SinOsc.ar to shape the volume over time.", es: "Usa EnvGen.kr y multiplícalo por SinOsc.ar para dar forma al volumen en el tiempo.", fr: "Utilisez EnvGen.kr et multipliez-le par SinOsc.ar pour façonner le volume dans le temps." });
      else if (!hasEnvPerc) tips.push({ en: "Use Env.perc(attack, decay) as the envelope inside EnvGen.kr.", es: "Usa Env.perc(ataque, caída) como envolvente dentro de EnvGen.kr.", fr: "Utilisez Env.perc(attack, decay) comme enveloppe dans EnvGen.kr." });
      else if (hasStructure && !ok) tips.push({ en: "The arguments are present but a value is not what is expected. Check the numbers.", es: "Los argumentos están presentes pero algún valor no es el esperado. Revisa los números.", fr: "Les arguments sont présents mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else {
        if (hasEnvPerc && !hasPercValues) tips.push({ en: "Env.perc needs two times: the attack (rise) and the decay, both in seconds.", es: "Env.perc necesita dos tiempos: el de ataque (subida) y el de caída, ambos en segundos.", fr: "Env.perc a besoin de deux durées : l'attaque (montée) et la chute, toutes deux en secondes." });
        if (hasSinOsc && !hasFreq1000) tips.push({ en: "The first argument of SinOsc.ar is the beep frequency in Hz.", es: "El primer argumento de SinOsc.ar es la frecuencia del pitido en Hz.", fr: "Le premier argument de SinOsc.ar est la fréquence du bip en Hz." });
      }
      return { ok, tips };
    },
  },
  {
    id: "ex10",
    level: 2,
    title: { en: "Kitchen timer", es: "Temporizador de cocina", fr: "Minuteur de cuisine" },
    tag: "Pulse",
    goal: {
      en: "Square-wave tone at 880 Hz, width 0.35, rise 0.05s, fall 0.3s",
      es: "Tono de onda cuadrada a 880 Hz, ancho 0.35, subida 0.05s, bajada 0.3s",
      fr: "Ton d'onde carrée à 880 Hz, largeur 0.35, montée 0.05s, descente 0.3s",
    },
    theory: {
      en: `Think that a kitchen timer has a slightly buzzier sound than the microwave beep of the last exercise. This time we'll use Pulse.ar — it generates a square-like wave whose timbre depends on its width:

  Pulse.ar(freq, width)

  freq  → frequency in Hz
  width → pulse width. 0.5 is a perfect square wave. Values below 0.5 create
          an asymmetric wave with a brighter, sharper character.

In the previous exercise the oscillator was multiplied by the envelope afterwards:
  SinOsc.ar(freq) * EnvGen.kr(...)

This time, pass EnvGen.kr directly as the third argument (mul) of Pulse.ar:
  Pulse.ar(freq, width, EnvGen.kr(Env.perc(attack, decay), doneAction: Done.freeSelf))

Both are equivalent — it is just a different way to write the same thing.

Compare with the previous exercise:
  SinOsc + 0.01 s / 0.1 s  = pure, dry beep (microwave)
  Pulse  + 0.05 s / 0.3 s  = buzzy, rounder tone (timer)`,
      es: `Piensa que un temporizador de cocina tiene un sonido ligeramente más áspero que el pitido del microondas del ejercicio anterior. Esta vez usaremos Pulse.ar — genera una onda de tipo cuadrado cuyo timbre depende de su ancho:

  Pulse.ar(freq, ancho)

  freq  → frecuencia en Hz
  ancho → ancho del pulso. 0.5 es onda cuadrada perfecta. Valores por debajo
          de 0.5 crean una onda asimétrica con un carácter más brillante y cortante.

En el ejercicio anterior el oscilador se multiplicaba por la envolvente después:
  SinOsc.ar(freq) * EnvGen.kr(...)

Esta vez, pasa EnvGen.kr directamente como tercer argumento (mul) de Pulse.ar:
  Pulse.ar(freq, ancho, EnvGen.kr(Env.perc(ataque, caída), doneAction: Done.freeSelf))

Ambas formas son equivalentes — es solo una manera distinta de escribir lo mismo.

Compara con el ejercicio anterior:
  SinOsc + 0.01 s / 0.1 s = pitido puro y seco (microondas)
  Pulse  + 0.05 s / 0.3 s = tono áspero y más redondo (temporizador)`,
      fr: `Pensez qu'un minuteur de cuisine a un son légèrement plus rugueux que le bip du micro-ondes du dernier exercice. Cette fois nous allons utiliser Pulse.ar — il génère une onde de type carré dont le timbre dépend de sa largeur :

  Pulse.ar(freq, width)

  freq  → fréquence en Hz
  width → largeur d'impulsion. 0.5 est une onde carrée parfaite. Les valeurs
          inférieures à 0.5 créent une onde asymétrique au caractère plus brillant et tranchant.

Dans l'exercice précédent, l'oscillateur était multiplié par l'enveloppe après :
  SinOsc.ar(freq) * EnvGen.kr(...)

Cette fois, passez EnvGen.kr directement comme troisième argument (mul) de Pulse.ar :
  Pulse.ar(freq, width, EnvGen.kr(Env.perc(attack, decay), doneAction: Done.freeSelf))

Les deux sont équivalents — c'est juste une façon différente d'écrire la même chose.

Comparez avec l'exercice précédent :
  SinOsc + 0.01 s / 0.1 s = bip pur et sec (micro-ondes)
  Pulse  + 0.05 s / 0.3 s = ton rugueux et plus rond (minuteur)`,
    },
    starter: {
      en: `// Replace the UPPERCASE words:\n{\n  Pulse.ar(FREQUENCY, WIDTH,\n    EnvGen.kr(Env.perc(ATTACK, DECAY), doneAction: Done.freeSelf)\n  ) ! 2\n}.play`,
      es: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  Pulse.ar(FRECUENCIA, ANCHO,\n    EnvGen.kr(Env.perc(ATAQUE, CAIDA), doneAction: Done.freeSelf)\n  ) ! 2\n}.play`,
      fr: `// Remplacez les mots en MAJUSCULES :\n{\n  Pulse.ar(FREQUENCE, LARGEUR,\n    EnvGen.kr(Env.perc(ATTACK, DECAY), doneAction: Done.freeSelf)\n  ) ! 2\n}.play`,
    },
    answer: {
      en: `// Kitchen timer\n{\n  Pulse.ar(880, 0.35,\n    EnvGen.kr(Env.perc(0.05, 0.3), doneAction: Done.freeSelf)\n  ) ! 2\n}.play`,
      es: `// Temporizador de cocina\n{\n  Pulse.ar(880, 0.35,\n    EnvGen.kr(Env.perc(0.05, 0.3), doneAction: Done.freeSelf)\n  ) ! 2\n}.play`,
      fr: `// Minuteur de cuisine\n{\n  Pulse.ar(880, 0.35,\n    EnvGen.kr(Env.perc(0.05, 0.3), doneAction: Done.freeSelf)\n  ) ! 2\n}.play`,
    },
    validate(code) {
      const hasPulse = /Pulse\.ar/.test(code);
      const hasFreq880 = /Pulse\.ar\s*\(\s*880\b/.test(code);
      const hasWidth = /Pulse\.ar\s*\(\s*[\d.]+\s*,\s*0\.35\s*,/.test(code);
      const hasEnvInMul = /Pulse\.ar\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*EnvGen\./.test(code);
      const hasEnvGen = /EnvGen/.test(code);
      const hasEnvPerc = /Env\.perc/.test(code);
      const hasPercValues = /Env\.perc\s*\(\s*0\.05\s*,\s*0\.3\s*\)/.test(code);
      const hasStructure = hasPulse && hasEnvInMul &&
        hasEnvPerc && /Env\.perc\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*\)/.test(code);
      const ok = hasPulse && hasFreq880 && hasWidth && hasEnvInMul && hasEnvGen && hasEnvPerc && hasPercValues;
      const tips = [];
      if (!hasPulse) tips.push({ en: "Use Pulse.ar as the oscillator — it generates a square-like wave with adjustable width.", es: "Usa Pulse.ar como oscilador — genera una onda de tipo cuadrado con ancho ajustable.", fr: "Utilisez Pulse.ar comme oscillateur — il génère une onde de type carré avec une largeur ajustable." });
      else if (!hasEnvGen) tips.push({ en: "Pass EnvGen.kr as the third argument of Pulse.ar to shape the volume over time.", es: "Pasa EnvGen.kr como tercer argumento de Pulse.ar para dar forma al volumen en el tiempo.", fr: "Passez EnvGen.kr comme troisième argument de Pulse.ar pour façonner le volume dans le temps." });
      else if (!hasEnvInMul) tips.push({ en: "EnvGen.kr should go inside Pulse.ar as its third argument (mul), not multiplied outside.", es: "EnvGen.kr debe ir dentro de Pulse.ar como su tercer argumento (mul), no multiplicado afuera.", fr: "EnvGen.kr doit aller à l'intérieur de Pulse.ar comme troisième argument (mul), pas multiplié à l'extérieur." });
      else if (!hasEnvPerc) tips.push({ en: "Use Env.perc(attack, decay) inside EnvGen.kr to define how the sound rises and falls.", es: "Usa Env.perc(ataque, caída) dentro de EnvGen.kr para definir cómo sube y baja el sonido.", fr: "Utilisez Env.perc(attack, decay) dans EnvGen.kr pour définir comment le son monte et descend." });
      else if (hasStructure && !ok) tips.push({ en: "The arguments are present but a value is not what is expected. Check the numbers.", es: "Los argumentos están presentes pero algún valor no es el esperado. Revisa los números.", fr: "Les arguments sont présents mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else {
        if (hasPulse && !hasFreq880) tips.push({ en: "The first argument of Pulse.ar is the frequency in Hz.", es: "El primer argumento de Pulse.ar es la frecuencia en Hz.", fr: "Le premier argument de Pulse.ar est la fréquence en Hz." });
        if (hasPulse && hasFreq880 && !hasWidth) tips.push({ en: "The second argument of Pulse.ar is the pulse width.", es: "El segundo argumento de Pulse.ar es el ancho del pulso.", fr: "Le second argument de Pulse.ar est la largeur d'impulsion." });
        if (hasEnvPerc && !hasPercValues) tips.push({ en: "Check the two arguments of Env.perc: rise time and fall time (both in seconds).", es: "Revisa los dos argumentos de Env.perc: tiempo de subida y tiempo de bajada (ambos en segundos).", fr: "Vérifiez les deux arguments d'Env.perc : temps de montée et temps de descente (tous deux en secondes)." });
      }
      return { ok, tips };
    },
  },
  {
    id: "ex11",
    level: 2,
    title: { en: "Power-up", es: "Recarga de poder", fr: "Recharge de pouvoir" },
    tag: "Line",
    goal: {
      en: "Linear rise from 200 to 1200 Hz in 0.2 seconds, with rise 0.01s and fall 1s",
      es: "Subida lineal de 200 a 1200 Hz en 0.2 segundos, con subida 0.01s y bajada 1s",
      fr: "Montée linéaire de 200 à 1200 Hz en 0.2 secondes, avec montée 0.01s et descente 1s",
    },
    theory: {
      en: `Line.kr generates a linear ramp: the frequency rises or falls at constant speed from one value to another.

Line.kr(start, end, dur)

  start → initial frequency in Hz
  end   → final frequency in Hz
  dur   → duration of the traverse in seconds

Unlike XLine (which uses an exponential curve), Line advances in equal steps. This means it rises the same number of Hz per second throughout the traverse.

Since the ear perceives pitch on a logarithmic scale, a linear ramp from 200 to 1200 Hz sounds faster at the beginning than at the end. This is the "power-up" or "video game signal" effect.
`,
      es: `Line.kr genera una rampa lineal: la frecuencia sube o baja a velocidad constante desde un valor hasta otro.

Line.kr(start, end, dur)

  start → frecuencia inicial en Hz
  end   → frecuencia final en Hz
  dur   → duración del recorrido en segundos

A diferencia de XLine (que usa una curva exponencial), Line avanza en pasos iguales. Eso significa que sube los mismos Hz por segundo durante todo el recorrido.

Como el oído percibe el tono en escala logarítmica, una rampa lineal de 200 a 1200 Hz suena más rápida al principio que al final. Es el efecto de "power-up" o "señal de videojuego".
`,
      fr: `Line.kr génère une rampe linéaire : la fréquence monte ou descend à vitesse constante d'une valeur à une autre.

Line.kr(start, end, dur)

  start → fréquence initiale en Hz
  end   → fréquence finale en Hz
  dur   → durée du parcours en secondes

Contrairement à XLine (qui utilise une courbe exponentielle), Line avance par pas égaux. Cela signifie qu'il monte du même nombre de Hz par seconde tout au long du parcours.

Comme l'oreille perçoit la hauteur sur une échelle logarithmique, une rampe linéaire de 200 à 1200 Hz sonne plus vite au début qu'à la fin. C'est l'effet "power-up" ou "signal de jeu vidéo".
`,
    },
    starter: {
      en: `// Replace the UPPERCASE words:\n{\n  SinOsc.ar(\n    Line.kr(START, END, DUR),\n    PHASE\n  ) * EnvGen.kr(Env.perc(ATTACK, DECAY), doneAction: Done.freeSelf) ! 2\n}.play`,
      es: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  SinOsc.ar(\n    Line.kr(INICIO, FIN, DUR),\n    FASE\n  ) * EnvGen.kr(Env.perc(ATAQUE, CAIDA), doneAction: Done.freeSelf) ! 2\n}.play`,
      fr: `// Remplacez les mots en MAJUSCULES :\n{\n  SinOsc.ar(\n    Line.kr(START, END, DUR),\n    PHASE\n  ) * EnvGen.kr(Env.perc(ATTACK, DECAY), doneAction: Done.freeSelf) ! 2\n}.play`,
    },
    answer: {
      en: `// Linear pitch rise\n{\n  SinOsc.ar(\n    Line.kr(200, 1200, 0.2),\n    0\n  ) * EnvGen.kr(Env.perc(0.01, 1), doneAction: Done.freeSelf) ! 2\n}.play`,
      es: `// Subida de tono lineal\n{\n  SinOsc.ar(\n    Line.kr(200, 1200, 0.2),\n    0\n  ) * EnvGen.kr(Env.perc(0.01, 1), doneAction: Done.freeSelf) ! 2\n}.play`,
      fr: `// Montée linéaire de hauteur\n{\n  SinOsc.ar(\n    Line.kr(200, 1200, 0.2),\n    0\n  ) * EnvGen.kr(Env.perc(0.01, 1), doneAction: Done.freeSelf) ! 2\n}.play`,
    },
    validate(code) {
      const hasSinOsc = /SinOsc/.test(code);
      const hasLine = /(?<![A-Za-z])Line\.kr/.test(code);
      const hasEnvGen = /EnvGen/.test(code);
      const hasEnvPerc = /Env\.perc/.test(code);
      const hasCorrectLine = /(?<![A-Za-z])Line\.kr\s*\(\s*200\s*,\s*1200\s*,\s*0.2\s*\)/.test(code);
      const hasPercValues = /Env\.perc\s*\(\s*0\.01\s*,\s*1\s*\)/.test(code);
      const hasStructure = hasSinOsc && hasLine &&
        /(?<![A-Za-z])Line\.kr\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*\)/.test(code) &&
        hasEnvGen && hasEnvPerc && /Env\.perc\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*\)/.test(code);
      const ok = hasSinOsc && hasLine && hasCorrectLine && hasEnvGen && hasEnvPerc && hasPercValues;
      const tips = [];
      if (!hasSinOsc) tips.push({ en: "You need SinOsc.ar as the oscillator. The frequency will come from the Line.kr sweep.", es: "Necesitas SinOsc.ar como oscilador. La frecuencia vendrá del barrido de Line.kr.", fr: "Vous avez besoin de SinOsc.ar comme oscillateur. La fréquence viendra du balayage de Line.kr." });
      else if (!hasLine) tips.push({ en: "Use Line.kr as the first argument of SinOsc.ar so the frequency rises linearly.", es: "Usa Line.kr como primer argumento de SinOsc.ar para que la frecuencia suba de forma lineal.", fr: "Utilisez Line.kr comme premier argument de SinOsc.ar pour que la fréquence monte de façon linéaire." });
      else if (!hasEnvGen) tips.push({ en: "Multiply by EnvGen.kr to give the sound a duration and have it release when done.", es: "Multiplica por EnvGen.kr para darle duración al sonido y que se libere al terminar.", fr: "Multipliez par EnvGen.kr pour donner une durée au son et qu'il se libère à la fin." });
      else if (!hasEnvPerc) tips.push({ en: "Use Env.perc inside EnvGen.kr to define the attack and decay of the tone.", es: "Usa Env.perc dentro de EnvGen.kr para definir el ataque y la caída del tono.", fr: "Utilisez Env.perc dans EnvGen.kr pour définir l'attaque et la chute du ton." });
      else if (hasStructure && !ok) tips.push({ en: "The structure is correct but a value is not what is expected. Check the numbers.", es: "La estructura es correcta pero algún valor no es el esperado. Revisa los números.", fr: "La structure est correcte mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else {
        if (!hasCorrectLine) tips.push({ en: "Check the three arguments of Line.kr: start frequency, end frequency and duration in seconds.", es: "Revisa los tres argumentos de Line.kr: frecuencia inicial, frecuencia final y duración en segundos.", fr: "Vérifiez les trois arguments de Line.kr : fréquence de départ, fréquence finale et durée en secondes." });
        if (!hasPercValues) tips.push({ en: "Check the Env.perc times: very short attack and decay equal to the sweep duration.", es: "Revisa los tiempos de Env.perc: ataque muy corto y caída igual a la duración del barrido.", fr: "Vérifiez les durées d'Env.perc : attaque très courte et chute égale à la durée du balayage." });
      }
      return { ok, tips };
    },
  },
  {
    id: "ex12",
    level: 3,
    title: { en: "Phone keypad", es: "Teclas de teléfono", fr: "Clavier téléphonique" },
    tag: "DTMF",
    goal: {
      en: "Mix two tones at 770 Hz and 1336 Hz with amplitude 0.2",
      es: "Mezcla dos tonos a 770 Hz y 1336 Hz con amplitud 0.2",
      fr: "Mélange deux tons à 770 Hz et 1336 Hz avec une amplitude de 0.2",
    },
    theory: {
      en: `Welcome to level 3 exercises. From here the starter won't name the UGen — you'll see UGEN as a placeholder. Read the theory carefully and look at what the editor shows you: the answer is in there.

Phone keypads use DTMF (Dual-Tone Multi-Frequency).
Each key is the sum of two different frequencies:

     1209  1336  1477
770:  4     5     6   ← keys
852:  7     8     9

Key 5 = 770 Hz + 1336 Hz

In SuperCollider, adding two UGens mixes their signals:
  (UGEN.ar(f1) + UGEN.ar(f2)) * amplitude

Parentheses are important so that the amplitude multiplication applies to the combined signal.`,
      es: `Bienvenido a los ejercicios de nivel 3. A partir de aquí el código de inicio no nombrará el UGen — verás UGEN como marcador. Lee la teoría con atención y fíjate en lo que muestra el editor: la respuesta está ahí.

Las teclas del teléfono usan DTMF (Dual-Tone Multi-Frequency).
Cada tecla es la suma de dos frecuencias distintas:

     1209  1336  1477
770:  4     5     6   ← teclas
852:  7     8     9

Tecla 5 = 770 Hz + 1336 Hz

En SuperCollider, sumar dos UGens mezcla sus señales:
  (UGEN.ar(f1) + UGEN.ar(f2)) * amplitud

Los paréntesis son importantes para que la multiplicación de amplitud se aplique a la señal combinada.`,
      fr: `Bienvenue dans les exercices de niveau 3. À partir d'ici le code de départ ne nommera plus l'UGen — vous verrez UGEN comme espace réservé. Lisez la théorie attentivement et regardez ce que montre l'éditeur : la réponse est là.

Les touches de téléphone utilisent le DTMF (Dual-Tone Multi-Frequency).
Chaque touche est la somme de deux fréquences différentes :

     1209  1336  1477
770:  4     5     6   ← touches
852:  7     8     9

Touche 5 = 770 Hz + 1336 Hz

Dans SuperCollider, additionner deux UGens mélange leurs signaux :
  (UGEN.ar(f1) + UGEN.ar(f2)) * amplitude

Les parenthèses sont importantes pour que la multiplication d'amplitude s'applique au signal combiné.`,
    },
    starter: {
      en: `// Replace the UPPERCASE words:\n{\n  (\n    UGEN.ar(FREQUENCY) +\n    UGEN.ar(FREQUENCY)\n  ) * AMPLITUDE ! 2\n}.play`,
      es: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  (\n    UGEN.ar(FRECUENCIA) +\n    UGEN.ar(FRECUENCIA)\n  ) * AMPLITUD ! 2\n}.play`,
      fr: `// Remplacez les mots en MAJUSCULES :\n{\n  (\n    UGEN.ar(FREQUENCE) +\n    UGEN.ar(FREQUENCE)\n  ) * AMPLITUDE ! 2\n}.play`,
    },
    answer: {
      en: `// Key 5 on the phone: 770 Hz + 1336 Hz\n{\n  (\n    SinOsc.ar(770) +\n    SinOsc.ar(1336)\n  ) * 0.2 ! 2\n}.play`,
      es: `// Tecla 5 del teléfono: 770 Hz + 1336 Hz\n{\n  (\n    SinOsc.ar(770) +\n    SinOsc.ar(1336)\n  ) * 0.2 ! 2\n}.play`,
      fr: `// Touche 5 du téléphone : 770 Hz + 1336 Hz\n{\n  (\n    SinOsc.ar(770) +\n    SinOsc.ar(1336)\n  ) * 0.2 ! 2\n}.play`,
    },
    validate(code) {
      const has770 = /SinOsc\.ar\s*\(\s*770\s*\)/.test(code);
      const has1336 = /SinOsc\.ar\s*\(\s*1336\s*\)/.test(code);
      const hasAmp = /\*\s*0\.2\b/.test(code);
      const hasTwoSinOscCalls = (code.match(/SinOsc\.ar\s*\(\s*[\d.]+\s*\)/g) ?? []).length >= 2;
      const ok = has770 && has1336 && hasAmp;
      const tips = [];
      if (hasTwoSinOscCalls && !ok) tips.push({ en: "The arguments are present but a value is not what is expected. Check the numbers.", es: "Los argumentos están presentes pero algún valor no es el esperado. Revisa los números.", fr: "Les arguments sont présents mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else {
        if (!has770) tips.push({ en: "One of the two SinOscs is missing. Look for the row frequency of key 5 in the theory table.", es: "Falta uno de los dos SinOsc. Busca la frecuencia de fila de la tecla 5 en la tabla de la teoría.", fr: "Il manque un des deux SinOsc. Cherchez la fréquence de ligne de la touche 5 dans le tableau de la théorie." });
        if (!has1336) tips.push({ en: "The other SinOsc is missing. Look for the column frequency of key 5 in the theory table.", es: "Falta el otro SinOsc. Busca la frecuencia de columna de la tecla 5 en la tabla de la teoría.", fr: "L'autre SinOsc manque. Cherchez la fréquence de colonne de la touche 5 dans le tableau de la théorie." });
        if (!hasAmp) tips.push({ en: "Multiply the combined signal by the amplitude to control the volume.", es: "Multiplica la señal combinada por la amplitud para controlar el volumen.", fr: "Multipliez le signal combiné par l'amplitude pour contrôler le volume." });
      }
      return { ok, tips };
    },
  },

  {
    id: "ex13",
    level: 3,
    title: { en: "Fire alarm", es: "Alarma de incendio", fr: "Alarme incendie" },
    tag: "Pulse",
    goal: {
      en: "Sharp pulses at 3200 Hz intermittent at 2 times per second, amplitude 0.3",
      es: "Pulsos agudos a 3200 Hz intermitentes a 2 veces por segundo, amplitud 0.3",
      fr: "Impulsions aiguës à 3200 Hz intermittentes à 2 fois par seconde, amplitude 0.3",
    },
    theory: {
      en: `Fire alarms emit short, piercing pulses. The sound uses two generators multiplied together:

  1. A square-like wave — two args: frequency (the pitch) and width (duty cycle, 0–1).
  2. A low-frequency generator that switches between 0 and 1 — one arg: rate.
     Multiplying by it turns the first wave on and off rhythmically.

The pattern:
  UGEN.ar(frequency, width) * UGEN.ar(rate) * amplitude

  frequency  → pitch of the alarm tone (Hz)
  width      → duty cycle (0.5 = perfect square wave)
  rate       → how many flashes per second
  amplitude  → overall volume`,
      es: `Las alarmas de incendio emiten pulsos cortos y penetrantes. El sonido usa dos generadores multiplicados entre sí:

  1. Una onda de tipo cuadrada — dos argumentos: frecuencia (el tono) y ancho (ciclo de trabajo, 0–1).
  2. Un generador de baja frecuencia que alterna entre 0 y 1 — un argumento: frecuencia. Multiplicar por él enciende y apaga la primera onda de forma rítmica.

El patrón:
  UGEN.ar(frecuencia, ancho) * UGEN.ar(frecuencia) * amplitud

  frecuencia  → tono de la alarma (Hz)
  ancho       → ciclo de trabajo (0.5 = cuadrada perfecta)
  frecuencia (interruptor) → cuántas veces por segundo parpadea
  amplitud    → volumen general`,
      fr: `Les alarmes incendie émettent de courtes impulsions perçantes. Le son utilise deux générateurs multipliés ensemble :

  1. Une onde de type carré — deux arguments : frequency (la hauteur) et width (rapport cyclique, 0–1).
  2. Un générateur basse fréquence qui alterne entre 0 et 1 — un argument : rate. Le multiplier allume et éteint la première onde de façon rythmique.

Le patron :
  UGEN.ar(frequency, width) * UGEN.ar(rate) * amplitude

  frequency  → hauteur du ton d'alarme (Hz)
  width      → rapport cyclique (0.5 = onde carrée parfaite)
  rate       → combien de clignotements par seconde
  amplitude  → volume général`,
    },
    starter: {
      en: `// Replace the UPPERCASE words:\n{\n  UGEN.ar(FREQUENCY, WIDTH) * \n  UGEN.ar(RATE) * AMPLITUDE ! 2\n}.play`,
      es: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  UGEN.ar(FRECUENCIA, ANCHO) * \n  UGEN.ar(FRECUENCIA) * AMPLITUD ! 2\n}.play`,
      fr: `// Remplacez les mots en MAJUSCULES :\n{\n  UGEN.ar(FREQUENCE, LARGEUR) * \n  UGEN.ar(RATE) * AMPLITUDE ! 2\n}.play`,
    },
    answer: {
      en: `// Fire alarm: sharp pulses\n{\n  Pulse.ar(3200, 0.5) * LFPulse.ar(2) * 0.3 ! 2\n}.play`,
      es: `// Alarma de incendio: pulsos agudos\n{\n  Pulse.ar(3200, 0.5) * LFPulse.ar(2) * 0.3 ! 2\n}.play`,
      fr: `// Alarme incendie : impulsions aiguës\n{\n  Pulse.ar(3200, 0.5) * LFPulse.ar(2) * 0.3 ! 2\n}.play`,
    },
    validate(code) {
      const hasPulseAr = /Pulse\.ar/.test(code);
      const hasFreq3200 = /Pulse\.ar\s*\(\s*3200\b/.test(code);
      const hasLFPulse = /LFPulse/.test(code);
      const hasLFPulseRate2 = /LFPulse\.ar\s*\(\s*2\s*\)/.test(code);
      const hasAmp = /\*\s*0\.3\b/.test(code);
      const hasStructure = hasPulseAr && /Pulse\.ar\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*\)/.test(code) &&
        hasLFPulse && /LFPulse\.ar\s*\(\s*[\d.]+\s*\)/.test(code);
      const ok = hasPulseAr && hasFreq3200 && hasLFPulse && hasLFPulseRate2 && hasAmp;
      const tips = [];
      if (!hasPulseAr) tips.push({ en: "Use Pulse.ar as the main oscillator to generate the sharp square wave.", es: "Usa Pulse.ar como oscilador principal para generar la onda cuadrada aguda.", fr: "Utilisez Pulse.ar comme oscillateur principal pour générer l'onde carrée aiguë." });
      else if (!hasLFPulse) tips.push({ en: "Use LFPulse.ar and multiply it by Pulse.ar to create the rhythmic intermittence.", es: "Usa LFPulse.ar y multiplícalo por Pulse.ar para crear la intermitencia rítmica.", fr: "Utilisez LFPulse.ar et multipliez-le par Pulse.ar pour créer l'intermittence rythmique." });
      else if (hasStructure && !ok) tips.push({ en: "The arguments are present but a value is not what is expected. Check the numbers.", es: "Los argumentos están presentes pero algún valor no es el esperado. Revisa los números.", fr: "Les arguments sont présents mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else {
        if (hasPulseAr && !hasFreq3200) tips.push({ en: "The first argument of Pulse.ar is the tone frequency. Fire alarms are very high-pitched.", es: "El primer argumento de Pulse.ar es la frecuencia del tono. Las alarmas de incendio son muy agudas.", fr: "Le premier argument de Pulse.ar est la fréquence du ton. Les alarmes incendie sont très aiguës." });
        if (hasLFPulse && !hasLFPulseRate2) tips.push({ en: "The first argument of LFPulse.ar is the flash rate (times per second).", es: "El primer argumento de LFPulse.ar es la velocidad de parpadeo (veces por segundo).", fr: "Le premier argument de LFPulse.ar est la vitesse de clignotement (fois par seconde)." });
        if (!hasAmp) tips.push({ en: "Multiply the result by the amplitude to set the volume.", es: "Multiplica el resultado por la amplitud para ajustar el volumen.", fr: "Multipliez le résultat par l'amplitude pour régler le volume." });
      }
      return { ok, tips };
    },
  },

  {
    id: "ex14",
    level: 3,
    title: { en: "Digital alarm clock", es: "Despertador digital", fr: "Réveil numérique" },
    tag: "Pulse",
    goal: {
      en: "Square wave at 1200 Hz intermittent at 4 times per second, amplitude 0.3",
      es: "Onda cuadrada a 1200 Hz intermitente a 4 veces por segundo, amplitud 0.3",
      fr: "Onde carrée à 1200 Hz intermittente à 4 fois par seconde, amplitude 0.3",
    },
    theory: {
      en: `Digital alarm clocks use the same technique as the fire alarm:
a square-like wave multiplied by an on/off switch.

This time the switch runs at control rate (.kr instead of .ar),
which is more efficient for slow signals that don't need audio precision.

The pattern:
  UGEN.ar(frequency, width) * UGEN.kr(rate) * amplitude

  frequency  → pitch of the beep (Hz)
  width      → duty cycle (0.5 = perfect square wave)
  rate       → how many flashes per second
  amplitude  → overall volume`,
      es: `Los despertadores digitales usan la misma técnica que la alarma de incendio:
una onda cuadrada multiplicada por un interruptor de encendido/apagado.

Esta vez el interruptor funciona a tasa de control (.kr en lugar de .ar),
lo que es más eficiente para señales lentas que no necesitan precisión de audio.

El patrón:
  UGEN.ar(frecuencia, ancho) * UGEN.kr(frecuencia) * amplitud

  frecuencia  → tono del pitido (Hz)
  ancho       → ciclo de trabajo (0.5 = cuadrada perfecta)
  frecuencia (interruptor) → cuántas veces por segundo parpadea
  amplitud    → volumen general`,
      fr: `Les réveils numériques utilisent la même technique que l'alarme incendie :
une onde de type carré multipliée par un interrupteur marche/arrêt.

Cette fois l'interrupteur fonctionne au taux de contrôle (.kr au lieu de .ar),
plus efficace pour les signaux lents qui n'ont pas besoin de précision audio.

Le patron :
  UGEN.ar(frequency, width) * UGEN.kr(rate) * amplitude

  frequency  → hauteur du bip (Hz)
  width      → rapport cyclique (0.5 = onde carrée parfaite)
  rate       → combien de clignotements par seconde
  amplitude  → volume général`,
    },
    starter: {
      en: `// Replace the UPPERCASE words:\n{\n  UGEN.ar(FREQUENCY, WIDTH) *\n  UGEN.kr(RATE) * AMPLITUDE ! 2\n}.play`,
      es: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  UGEN.ar(FRECUENCIA, ANCHO) *\n  UGEN.kr(FRECUENCIA) * AMPLITUD ! 2\n}.play`,
      fr: `// Remplacez les mots en MAJUSCULES :\n{\n  UGEN.ar(FREQUENCE, LARGEUR) *\n  UGEN.kr(RATE) * AMPLITUDE ! 2\n}.play`,
    },
    answer: {
      en: `// Digital alarm clock\n{\n  Pulse.ar(1200, 0.5) * LFPulse.kr(4) * 0.3 ! 2\n}.play`,
      es: `// Despertador digital\n{\n  Pulse.ar(1200, 0.5) * LFPulse.kr(4) * 0.3 ! 2\n}.play`,
      fr: `// Réveil numérique\n{\n  Pulse.ar(1200, 0.5) * LFPulse.kr(4) * 0.3 ! 2\n}.play`,
    },
    validate(code) {
      const hasPulseAr = /Pulse\.ar/.test(code);
      const hasFreq1200 = /Pulse\.ar\s*\(\s*1200\b/.test(code);
      const hasWidth05 = /Pulse\.ar\s*\(\s*1200\s*,\s*0\.5\s*\)/.test(code);
      const hasLFPulse = /LFPulse/.test(code);
      const hasRate4 = /LFPulse\.\w+\s*\(\s*4\s*\)/.test(code);
      const hasAmp = /\*\s*0\.3\b/.test(code);
      const hasStructure = hasPulseAr && /Pulse\.ar\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*\)/.test(code) &&
        hasLFPulse && /LFPulse\.\w+\s*\(\s*[\d.]+\s*\)/.test(code);
      const ok = hasPulseAr && hasWidth05 && hasLFPulse && hasRate4 && hasAmp;
      const tips = [];
      if (!hasPulseAr) tips.push({ en: "Use Pulse.ar as the main oscillator for the sharp square wave.", es: "Usa Pulse.ar como oscilador principal para la onda cuadrada aguda.", fr: "Utilisez Pulse.ar comme oscillateur principal pour l'onde carrée aiguë." });
      else if (!hasLFPulse) tips.push({ en: "Multiply Pulse.ar by LFPulse.kr to create the rhythmic flashing effect.", es: "Multiplica Pulse.ar por LFPulse.kr para crear el efecto de intermitencia rítmica.", fr: "Multipliez Pulse.ar par LFPulse.kr pour créer l'effet d'intermittence rythmique." });
      else if (hasStructure && !ok) tips.push({ en: "The arguments are present but a value is not what is expected. Check the numbers.", es: "Los argumentos están presentes pero algún valor no es el esperado. Revisa los números.", fr: "Les arguments sont présents mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else {
        if (hasPulseAr && !hasFreq1200) tips.push({ en: "The first argument of Pulse.ar is the alarm clock tone frequency in Hz.", es: "El primer argumento de Pulse.ar es la frecuencia del tono del despertador en Hz.", fr: "Le premier argument de Pulse.ar est la fréquence du ton du réveil en Hz." });
        if (hasPulseAr && hasFreq1200 && !hasWidth05) tips.push({ en: "The second argument of Pulse.ar is the pulse width. What value produces a perfect square wave?", es: "El segundo argumento de Pulse.ar es el ancho del pulso. ¿Qué valor produce una onda cuadrada perfecta?", fr: "Le second argument de Pulse.ar est la largeur d'impulsion. Quelle valeur produit une onde carrée parfaite ?" });
        if (hasLFPulse && !hasRate4) tips.push({ en: "The first argument of LFPulse.kr is the flash rate in Hz.", es: "El primer argumento de LFPulse.kr es la velocidad de parpadeo en Hz.", fr: "Le premier argument de LFPulse.kr est la vitesse de clignotement en Hz." });
        if (!hasAmp) tips.push({ en: "Multiply the result by the amplitude to set the volume.", es: "Multiplica el resultado por la amplitud para ajustar el volumen.", fr: "Multipliez le résultat par l'amplitude pour régler le volume." });
      }
      return { ok, tips };
    },
  },
  {
    id: "ex15",
    level: 3,
    title: { en: "Evacuation signal", es: "Señal de evacuación", fr: "Signal d'évacuation" },
    tag: "Pulse",
    goal: {
      en: "Ascending pulse sweep from 300 to 1200 Hz, once every 2 seconds, width 0.5, amplitude 0.4",
      es: "Barrido de pulso ascendente de 300 a 1200 Hz, una vez cada 2 segundos, ancho 0.5, amplitud 0.4",
      fr: "Balayage d'impulsion ascendant de 300 à 1200 Hz, une fois toutes les 2 secondes, largeur 0.5, amplitude 0.4",
    },
    theory: {
      en: `Evacuation signals (WHOOP) use a smooth tone whose frequency rises slowly and repeats.

Two generators nested together:
  1. A square-like wave — three args: frequency (expression), width (duty cycle), amplitude.
  2. An ascending ramp from -1 to 1 that repeats at a set rate — one arg: rate.
     Scaling and shifting it maps the -1..1 range to a frequency sweep:

     UGEN.ar(rate, iphase) * half_range + center

  rate       → how many times per second the sweep repeats (Hz)
  iphase     → starting position of the ramp (1 = start from the bottom)
  half_range → (max_freq − min_freq) / 2
  center     → (max_freq + min_freq) / 2

Example:
  min = 300 Hz, max = 1200 Hz
  center     = (300 + 1200) / 2 = 750
  half_range = (1200 − 300) / 2 = 450

Use the frequency expression as the first arg of the outer oscillator, width as the second, amplitude as the third.`,
      es: `Las señales de evacuación (WHOOP) usan una onda cuya frecuencia sube lentamente y se repite.

Dos generadores anidados:
  1. Una onda de tipo cuadrada — tres argumentos: frecuencia (expresión), ancho (ciclo de trabajo), amplitud.
  2. Una rampa ascendente de -1 a 1 que se repite a una velocidad dada — dos argumentos: frecuencia, iphase.
     iphase indica dónde empieza la rampa (1 = fondo de la rampa, comienza a subir de inmediato).
     Escalarla y desplazarla convierte el rango -1..1 en un barrido de frecuencias:

     UGEN.ar(frecuencia, iphase) * mitad_rango + centro

  frecuencia  → cuántas veces por segundo se repite el barrido (Hz)
  iphase      → posición inicial de la rampa (1 = empezar desde el fondo)
  mitad_rango → (máx − mín) / 2
  centro      → (máx + mín) / 2

Ejemplo:
  mín = 300 Hz, máx = 1200 Hz
  centro      = (300 + 1200) / 2 = 750
  mitad_rango = (1200 − 300) / 2 = 450

Usa la expresión de frecuencia como primer argumento del oscilador exterior, el ancho como segundo y la amplitud como tercero.`,
      fr: `Les signaux d'évacuation (WHOOP) utilisent une onde dont la fréquence monte lentement et se répète.

Deux générateurs imbriqués :
  1. Une onde de type carré — trois arguments : fréquence (expression), width (rapport cyclique), amplitude.
  2. Une rampe ascendante de -1 à 1 qui se répète à une vitesse donnée — deux arguments : rate, iphase.
     iphase définit où la rampe commence (1 = bas de la rampe, commence à monter immédiatement).
     La mettre à l'échelle et la décaler convertit la plage -1..1 en un balayage de fréquences :

     UGEN.ar(rate, iphase) * half_range + center

  rate       → combien de fois par seconde le balayage se répète (Hz)
  iphase     → position initiale de la rampe (1 = commencer depuis le bas)
  half_range → (max − min) / 2
  center     → (max + min) / 2

Exemple :
  min = 300 Hz, max = 1200 Hz
  center     = (300 + 1200) / 2 = 750
  half_range = (1200 − 300) / 2 = 450

Utilisez l'expression de fréquence comme premier argument de l'oscillateur extérieur, le width comme second, l'amplitude comme troisième.`,
    },
    starter: {
      en: `// Replace the UPPERCASE words:\n{\n  UGEN.ar(\n    UGEN.ar(RATE, IPHASE) * HALF_RANGE + CENTER,\n    WIDTH,\n    AMPLITUDE\n  ) ! 2\n}.play`,
      es: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  UGEN.ar(\n    UGEN.ar(FRECUENCIA, IPHASE) * MITAD_RANGO + CENTRO,\n    ANCHO,\n    AMPLITUD\n  ) ! 2\n}.play`,
      fr: `// Remplacez les mots en MAJUSCULES :\n{\n  UGEN.ar(\n    UGEN.ar(RATE, IPHASE) * HALF_RANGE + CENTER,\n    WIDTH,\n    AMPLITUDE\n  ) ! 2\n}.play`,
    },
    answer: {
      en: `// Evacuation signal: ascending sweep\n{\n  Pulse.ar(\n    LFSaw.ar(0.5, 1) * 450 + 750,\n    0.5, 0.4\n  ) ! 2\n}.play`,
      es: `// Señal de evacuación: barrido ascendente\n{\n  Pulse.ar(\n    LFSaw.ar(0.5, 1) * 450 + 750,\n    0.5, 0.4\n  ) ! 2\n}.play`,
      fr: `// Signal d'évacuation : balayage ascendant\n{\n  Pulse.ar(\n    LFSaw.ar(0.5, 1) * 450 + 750,\n    0.5, 0.4\n  ) ! 2\n}.play`,
    },
    validate(code) {
      const hasPulse = /Pulse\.ar/.test(code);
      const hasLFSaw = /LFSaw/.test(code);
      const hasRate05 = /LFSaw\.ar\s*\(\s*0\.5/.test(code);
      const hasIphase1 = /LFSaw\.ar\s*\(\s*0\.5\s*,\s*1\s*\)/.test(code);
      const hasDepth450 = /450/.test(code);
      const hasCenter750 = /750/.test(code);
      const hasWidth05 = /,\s*0\.5\s*,/.test(code);
      const hasAmp = /,\s*[\d.]+\s*,\s*0\.4/.test(code);
      const ok = hasPulse && hasLFSaw && hasIphase1 && hasDepth450 && hasCenter750 && hasWidth05 && hasAmp;
      const tips = [];
      if (!hasPulse) tips.push({ en: "Use Pulse.ar as the main oscillator. The first argument will be the frequency expression.", es: "Usa Pulse.ar como oscilador principal. El primer argumento será la expresión de frecuencia.", fr: "Utilisez Pulse.ar comme oscillateur principal. Le premier argument sera l'expression de fréquence." });
      else if (!hasLFSaw) tips.push({ en: "Use LFSaw.ar inside the first argument of Pulse.ar so the frequency rises cyclically.", es: "Usa LFSaw.ar dentro del primer argumento de Pulse.ar para que la frecuencia suba de forma cíclica.", fr: "Utilisez LFSaw.ar dans le premier argument de Pulse.ar pour que la fréquence monte de façon cyclique." });
      else {
        if (!hasRate05) tips.push({ en: "The first argument of LFSaw.ar is the sweep rate. An evacuation siren is slow.", es: "El primer argumento de LFSaw.ar es la velocidad del barrido. Una sirena de evacuación es lenta.", fr: "Le premier argument de LFSaw.ar est la vitesse du balayage. Une sirène d'évacuation est lente." });
        if (hasRate05 && !hasIphase1) tips.push({ en: "The second argument of LFSaw.ar is the initial phase (iphase). Check the theory for the value that makes the sweep start from the bottom.", es: "El segundo argumento de LFSaw.ar es la fase inicial (iphase). Consulta la teoría para encontrar el valor que hace que el barrido empiece desde el fondo.", fr: "Le second argument de LFSaw.ar est la phase initiale (iphase). Consultez la théorie pour trouver la valeur qui fait démarrer le balayage depuis le bas." });
        if (!hasDepth450) tips.push({ en: "Multiply LFSaw by half the frequency range. Calculate: (max - min) / 2.", es: "Multiplica LFSaw por la mitad del rango de frecuencias. Calcula: (máximo - mínimo) / 2.", fr: "Multipliez LFSaw par la moitié de la plage de fréquences. Calculez : (max - min) / 2." });
        if (!hasCenter750) tips.push({ en: "Add the center frequency. Calculate: (max + min) / 2.", es: "Suma la frecuencia central. Calcula: (máximo + mínimo) / 2.", fr: "Ajoutez la fréquence centrale. Calculez : (max + min) / 2." });
        if (!hasWidth05) tips.push({ en: "The second argument of Pulse.ar is the width (duty cycle). A value of 0.5 gives a perfect square wave.", es: "El segundo argumento de Pulse.ar es el ancho (ciclo de trabajo). Un valor de 0.5 da una onda cuadrada perfecta.", fr: "Le second argument de Pulse.ar est le width (rapport cyclique). Une valeur de 0.5 donne une onde carrée parfaite." });
        if (!hasAmp) tips.push({ en: "The amplitude is the third argument of Pulse.ar (after the frequency expression and width).", es: "La amplitud es el tercer argumento de Pulse.ar (tras la expresión de frecuencia y el ancho).", fr: "L'amplitude est le troisième argument de Pulse.ar (après l'expression de fréquence et le width)." });
        if (tips.length === 0 && !ok) tips.push({ en: "The structure is correct but a value is not what is expected. Check the numbers.", es: "La estructura es correcta pero algún valor no es el esperado. Revisa los números.", fr: "La structure est correcte mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      }
      return { ok, tips };
    },
  },

  {
    id: "ex16",
    level: 3,
    title: { en: "Laser shot", es: "Disparo láser", fr: "Tir laser" },
    tag: "XLine",
    goal: {
      en: "Exponential sweep from 1500 to 200 Hz in 0.2 seconds, with rise 0.001s, fall 0.3s, level 0.5",
      es: "Barrido exponencial de 1500 a 200 Hz en 0.2 segundos, con subida 0.001s, bajada 0.3s, nivel 0.5",
      fr: "Balayage exponentiel de 1500 à 200 Hz en 0.2 secondes, avec montée 0.001s, descente 0.3s, niveau 0.5",
    },
    theory: {
      en: `A laser shot is a pitch that falls fast — not linearly, but exponentially.
The ear perceives pitch on a logarithmic scale, so an exponential fall sounds more natural.

Two generators nested together:
  1. A sawtooth wave — two args: frequency (expression), amplitude expression.
  2. A single-shot exponential sweep — three args: start, end, dur (seconds).
     Unlike cyclic ramps, it runs from start to end exactly once and stops. The amplitude is a percussive envelope:
     UGEN.kr(UGEN.perc(attack, decay, level), doneAction: Done.freeSelf)

  start   → initial frequency (Hz)
  end     → final frequency (Hz)
  dur     → sweep duration in seconds
  attack  → rise time (very short for a shot)
  decay   → fall time (close to the sweep duration)
  level   → peak amplitude of the envelope (0–1)`,
      es: `Un disparo láser es un tono que cae rápido, no de forma lineal, sino exponencial.
El oído percibe el tono en escala logarítmica, así que una caída exponencial suena más natural.

Dos generadores anidados:
  1. Una onda de sierra — dos argumentos: frecuencia (expresión), expresión de amplitud.
  2. Un barrido exponencial de un solo disparo — tres argumentos: start, end, dur (segundos).
     A diferencia de las rampas cíclicas, recorre el rango de start a end una sola vez y se detiene. La amplitud es una envolvente percusiva:
     UGEN.kr(UGEN.perc(attack, decay, level), doneAction: Done.freeSelf)

  start   → frecuencia inicial (Hz)
  end     → frecuencia final (Hz)
  dur     → duración del barrido en segundos
  ataque  → tiempo de subida (muy corto para un disparo)
  caída   → tiempo de bajada (cercano a la duración del barrido)
  nivel   → amplitud máxima de la envolvente (0–1)`,
      fr: `Un tir laser est un ton qui descend rapidement — non pas de façon linéaire, mais exponentielle.
L'oreille perçoit la hauteur sur une échelle logarithmique, donc une chute exponentielle sonne plus naturelle.

Deux générateurs imbriqués :
  1. Une onde en dents de scie — deux arguments : fréquence (expression), expression d'amplitude.
  2. Un balayage exponentiel en un seul coup — trois arguments : start, end, dur (secondes).
     Contrairement aux rampes cycliques, il parcourt la plage de start à end une seule fois et s'arrête. L'amplitude est une enveloppe percussive :
     UGEN.kr(UGEN.perc(attack, decay, level), doneAction: Done.freeSelf)

  start   → fréquence initiale (Hz)
  end     → fréquence finale (Hz)
  dur     → durée du balayage en secondes
  attack  → temps de montée (très court pour un tir)
  decay   → temps de descente (proche de la durée du balayage)
  level   → amplitude maximale de l'enveloppe (0–1)`,
    },
    starter: {
      en: `// Replace the UPPERCASE words:\n{\n  UGEN.ar(\n    UGEN.kr(START, END, DUR),\n    UGEN.kr(UGEN.perc(ATTACK, DECAY, LEVEL), doneAction: Done.freeSelf)\n  ) ! 2\n}.play`,
      es: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  UGEN.ar(\n    UGEN.kr(START, END, DUR),\n    UGEN.kr(UGEN.perc(ATAQUE, CAIDA, NIVEL), doneAction: Done.freeSelf)\n  ) ! 2\n}.play`,
      fr: `// Remplacez les mots en MAJUSCULES :\n{\n  UGEN.ar(\n    UGEN.kr(START, END, DUR),\n    UGEN.kr(UGEN.perc(ATTACK, DECAY, LEVEL), doneAction: Done.freeSelf)\n  ) ! 2\n}.play`,
    },
    answer: {
      en: `// Laser shot\n{\n  Saw.ar(\n    XLine.kr(1500, 200, 0.2),\n    EnvGen.kr(Env.perc(0.001, 0.3, 0.5), doneAction: Done.freeSelf)\n  ) ! 2\n}.play`,
      es: `// Disparo láser\n{\n  Saw.ar(\n    XLine.kr(1500, 200, 0.2),\n    EnvGen.kr(Env.perc(0.001, 0.3, 0.5), doneAction: Done.freeSelf)\n  ) ! 2\n}.play`,
      fr: `// Tir laser\n{\n  Saw.ar(\n    XLine.kr(1500, 200, 0.2),\n    EnvGen.kr(Env.perc(0.001, 0.3, 0.5), doneAction: Done.freeSelf)\n  ) ! 2\n}.play`,
    },
    validate(code) {
      const hasSaw = /Saw\.ar/.test(code);
      const hasXLine = /XLine/.test(code);
      const hasEnvGen = /EnvGen/.test(code);
      const hasEnvPerc = /Env\.perc/.test(code);
      const hasCorrectXLine = /XLine\.kr\s*\(\s*1500\s*,\s*200\s*,\s*0\.2\s*\)/.test(code);
      const hasPercTimes = /Env\.perc\s*\(\s*0\.001\s*,\s*0\.3\s*,/.test(code);
      const hasPercLevel = /Env\.perc\s*\(\s*0\.001\s*,\s*0\.3\s*,\s*0\.5\s*\)/.test(code);
      const hasStructure = hasSaw && hasXLine &&
        /XLine\.kr\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*\)/.test(code) &&
        hasEnvGen && hasEnvPerc && /Env\.perc\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*[\d.]+\s*\)/.test(code);
      const ok = hasSaw && hasXLine && hasCorrectXLine && hasEnvGen && hasEnvPerc && hasPercLevel;
      const tips = [];
      if (!hasSaw) tips.push({ en: "Use Saw.ar as the oscillator. The frequency will be the XLine.kr sweep.", es: "Usa Saw.ar como oscilador. La frecuencia será el barrido de XLine.kr.", fr: "Utilisez Saw.ar comme oscillateur. La fréquence sera le balayage de XLine.kr." });
      else if (!hasXLine) tips.push({ en: "Use XLine.kr as the first argument of Saw.ar so the frequency falls exponentially.", es: "Usa XLine.kr como primer argumento de Saw.ar para que la frecuencia caiga de forma exponencial.", fr: "Utilisez XLine.kr comme premier argument de Saw.ar pour que la fréquence descende de façon exponentielle." });
      else if (!hasEnvGen) tips.push({ en: "Use EnvGen.kr as the second argument of Saw.ar so the shot has a defined duration and releases itself.", es: "Usa EnvGen.kr como segundo argumento de Saw.ar para que el disparo tenga una duración definida y se libere solo.", fr: "Utilisez EnvGen.kr comme second argument de Saw.ar pour que le tir ait une durée définie et se libère tout seul." });
      else if (!hasEnvPerc) tips.push({ en: "Use Env.perc inside EnvGen.kr to define the attack and decay of the shot.", es: "Usa Env.perc dentro de EnvGen.kr para definir el ataque y la caída del disparo.", fr: "Utilisez Env.perc dans EnvGen.kr pour définir l'attaque et la chute du tir." });
      else if (hasStructure && !ok) tips.push({ en: "The structure is correct but a value is not what is expected. Check the numbers.", es: "La estructura es correcta pero algún valor no es el esperado. Revisa los números.", fr: "La structure est correcte mais une valeur n'est pas celle attendue. Vérifiez les nombres." });
      else {
        if (!hasCorrectXLine) tips.push({ en: "Check the three arguments of XLine.kr: start frequency, end frequency and duration in seconds.", es: "Revisa los tres argumentos de XLine.kr: frecuencia inicial, frecuencia final y duración en segundos.", fr: "Vérifiez les trois arguments de XLine.kr : fréquence de départ, fréquence finale et durée en secondes." });
        if (!hasPercTimes) tips.push({ en: "Check the Env.perc times: the attack is very short and the decay matches the sweep duration.", es: "Revisa los tiempos de Env.perc: el ataque es muy corto y la caída coincide con la duración del barrido.", fr: "Vérifiez les durées d'Env.perc : l'attaque est très courte et la chute correspond à la durée du balayage." });
        if (hasPercTimes && !hasPercLevel) tips.push({ en: "Env.perc has a third argument: the peak level (amplitude) of the envelope.", es: "Env.perc tiene un tercer argumento: el nivel máximo (amplitud) de la envolvente.", fr: "Env.perc a un troisième argument : le niveau maximal (amplitude) de l'enveloppe." });
      }
      return { ok, tips };
    },
  },

];
