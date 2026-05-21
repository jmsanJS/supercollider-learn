import type { UGen } from "@/types";

export const UGENS: UGen[] = [
  // ── Oscillators ──
  {
    name: "SinOsc",
    category: "Oscillators",
    signature: "SinOsc.ar(freq, phase, mul, add)",
    description: {
      en: "Pure sinusoidal oscillator. The most fundamental UGen in SuperCollider.",
      es: "Oscilador sinusoidal puro. El UGen más fundamental de SuperCollider.",
      fr: "Oscillateur sinusoïdal pur. L'UGen le plus fondamental de SuperCollider.",
    },
    args: [
      { name: "freq", default: "440", desc: { en: "Frequency in Hz", es: "Frecuencia en Hz", fr: "Fréquence en Hz" } },
      { name: "phase", default: "0", desc: { en: "Initial phase (0 to 2pi)", es: "Fase inicial (0 a 2pi)", fr: "Phase initiale (0 à 2pi)" } },
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
    ],
    example: "{ SinOsc.ar(440, 0, 0.3) ! 2 }.play",
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
    ],
    sound: { freq: 440, amp: 0.3, type: "sine" },
  },
  {
    name: "Saw",
    category: "Oscillators",
    signature: "Saw.ar(freq, mul, add)",
    description: {
      en: "Sawtooth wave with rich harmonic content. Ideal for subtractive synthesis.",
      es: "Onda diente de sierra con contenido armónico rico. Ideal para síntesis sustractiva.",
      fr: "Onde en dent de scie avec un riche contenu harmonique. Idéale pour la synthèse soustractive.",
    },
    args: [
      { name: "freq", default: "440", desc: { en: "Frequency in Hz", es: "Frecuencia en Hz", fr: "Fréquence en Hz" } },
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
    ],
    example: "{ Saw.ar(220, 0.2) ! 2 }.play",
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
    ],
    sound: { freq: 220, amp: 0.2, type: "sawtooth" },
  },
  {
    name: "Pulse",
    category: "Oscillators",
    signature: "Pulse.ar(freq, width, mul, add)",
    description: {
      en: "Square/pulse wave with variable width. width=0.5 produces a perfect square wave.",
      es: "Onda cuadrada/pulso con ancho variable. width=0.5 produce onda cuadrada perfecta.",
      fr: "Onde carrée/impulsion à largeur variable. width=0.5 produit une onde carrée parfaite.",
    },
    args: [
      { name: "freq", default: "440", desc: { en: "Frequency in Hz", es: "Frecuencia en Hz", fr: "Fréquence en Hz" } },
      { name: "width", default: "0.5", desc: { en: "Pulse width (0 to 1)", es: "Ancho de pulso (0 a 1)", fr: "Largeur d'impulsion (0 à 1)" } },
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
    ],
    example: "{ Pulse.ar(440, 0.5, 0.2) ! 2 }.play",
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "width: 0.5 → perfect square wave (half cycle high, half cycle low); lower values create narrower pulses and a more nasal sound", es: "width: 0.5 → onda cuadrada perfecta (mitad del ciclo en alto, mitad en bajo); valores menores crean pulsos más estrechos y un sonido más nasal", fr: "width: 0.5 → onde carrée parfaite (moitié du cycle en haut, moitié en bas) ; des valeurs plus basses créent des impulsions plus étroites et un son plus nasal" },
    ],
    sound: { freq: 440, amp: 0.2, type: "square" },
  },

  // ── Noise ──
  {
    name: "WhiteNoise",
    category: "Noise",
    signature: "WhiteNoise.ar(mul, add)",
    description: {
      en: "White noise with equal energy at all frequencies.",
      es: "Ruido blanco con igual energía en todas las frecuencias.",
      fr: "Bruit blanc avec une énergie égale à toutes les fréquences.",
    },
    args: [
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
    ],
    example: "{ WhiteNoise.ar(0.1) ! 2 }.play",
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "Noise has no defined frequency, so it only accepts mul and add: there is nothing else to control in the synthesis", es: "El ruido no tiene frecuencia definida, por eso solo acepta mul y add: no hay nada más que controlar en la síntesis", fr: "Le bruit n'a pas de fréquence définie, c'est pourquoi il n'accepte que mul et add : il n'y a rien d'autre à contrôler dans la synthèse" },
    ],
    sound: { type: "noise", color: "white", amp: 0.1 },
  },
  {
    name: "PinkNoise",
    category: "Noise",
    signature: "PinkNoise.ar(mul, add)",
    description: {
      en: "Pink noise, warmer than white. Decays 3dB per octave.",
      es: "Ruido rosa, más cálido que el blanco. Decae 3dB por octava.",
      fr: "Bruit rose, plus chaud que le blanc. Décroît de 3 dB par octave.",
    },
    args: [
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
    ],
    example: "{ PinkNoise.ar(0.1) ! 2 }.play",
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "Noise has no defined frequency, so it only accepts mul and add: there is nothing else to control in the synthesis", es: "El ruido no tiene frecuencia definida, por eso solo acepta mul y add: no hay nada más que controlar en la síntesis", fr: "Le bruit n'a pas de fréquence définie, c'est pourquoi il n'accepte que mul et add : il n'y a rien d'autre à contrôler dans la synthèse" },
    ],
    sound: { type: "noise", color: "pink", amp: 0.1 },
  },
  {
    name: "BrownNoise",
    category: "Noise",
    signature: "BrownNoise.ar(mul, add)",
    description: {
      en: "Brown noise, deeper and warmer. Decays 6dB per octave.",
      es: "Ruido marrón, más grave y cálido. Decae 6dB por octava.",
      fr: "Bruit brun, plus grave et plus chaud. Décroît de 6 dB par octave.",
    },
    args: [
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
    ],
    example: "{ BrownNoise.ar(0.1) ! 2 }.play",
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "Noise has no defined frequency, so it only accepts mul and add: there is nothing else to control in the synthesis", es: "El ruido no tiene frecuencia definida, por eso solo acepta mul y add: no hay nada más que controlar en la síntesis", fr: "Le bruit n'a pas de fréquence définie, c'est pourquoi il n'accepte que mul et add : il n'y a rien d'autre à contrôler dans la synthèse" },
    ],
    sound: { type: "noise", color: "brown", amp: 0.1 },
  },

  // ── Low Frequency ──
  {
    name: "LFSaw",
    category: "Low Frequency",
    signature: "LFSaw.ar/kr(freq, iphase, mul, add)",
    description: {
      en: "Low-frequency sawtooth oscillator. Ideal for modulation (LFO).",
      es: "Oscilador diente de sierra de baja frecuencia. Ideal para modulación (LFO).",
      fr: "Oscillateur en dent de scie basse fréquence. Idéal pour la modulation (LFO).",
    },
    args: [
      { name: "freq", default: "1", desc: { en: "Modulation frequency", es: "Frecuencia de modulación", fr: "Fréquence de modulation" } },
      { name: "iphase", default: "0", desc: { en: "Initial phase", es: "Fase inicial", fr: "Phase initiale" } },
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
    ],
    example: `{
  SinOsc.ar(
    LFSaw.kr(2) * 200 + 600,
    0,
    0.3) ! 2
}.play`,
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "LFSaw.kr(2) oscillates between -1 and 1 at 2 Hz; × 200 converts that range to ±200 Hz; + 600 shifts the centre to 600 Hz → frequency sweeps between 400 and 800 Hz", es: "LFSaw.kr(2) oscila entre -1 y 1 a 2 Hz; × 200 convierte ese rango en ±200 Hz; + 600 desplaza el centro a 600 Hz → la frecuencia barre entre 400 y 800 Hz", fr: "LFSaw.kr(2) oscille entre -1 et 1 à 2 Hz ; × 200 convertit cette plage en ±200 Hz ; + 600 décale le centre à 600 Hz → la fréquence balaie entre 400 et 800 Hz" },
      { en: ".kr is used instead of .ar because it is an LFO: it runs at control rate (lower CPU cost) as it does not need audio resolution", es: "Se usa .kr en vez de .ar porque es un LFO: corre a tasa de control (menor coste de CPU) ya que no necesita la resolución de audio", fr: ".kr est utilisé à la place de .ar car c'est un LFO : il fonctionne à la fréquence de contrôle (coût CPU inférieur) car il ne nécessite pas la résolution audio" },
    ],
    sound: {
      freq: 600,
      amp: 0.3,
      type: "sine",
      lfo: { rate: 2, depth: 200, shape: "sawtooth", target: "frequency" },
    },
  },
  {
    name: "LFPulse",
    category: "Low Frequency",
    signature: "LFPulse.ar/kr(freq, iphase, width, mul, add)",
    description: {
      en: "Low-frequency square wave. Useful for tremolo and step modulation.",
      es: "Onda cuadrada de baja frecuencia. Útil para trémolo y modulación en escalón.",
      fr: "Onde carrée basse fréquence. Utile pour le trémolo et la modulation en escalier.",
    },
    args: [
      { name: "freq", default: "1", desc: { en: "Modulation frequency", es: "Frecuencia de modulación", fr: "Fréquence de modulation" } },
      { name: "iphase", default: "0", desc: { en: "Initial phase", es: "Fase inicial", fr: "Phase initiale" } },
      { name: "width", default: "0.5", desc: { en: "Duty cycle (0 to 1)", es: "Ciclo de trabajo (0 a 1)", fr: "Cycle de travail (0 à 1)" } },
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
    ],
    example: `{
	SinOsc.ar(
		440,
		0,
		LFPulse.kr(2, 0, 0.5) * 0.3
	) ! 2
}.play`,
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "LFPulse.kr(2, 0, 0.5) * 0.3 produces a tremolo: amplitude alternates between 0 and 0.3 at 2 Hz (on/off)", es: "LFPulse.kr(2, 0, 0.5) * 0.3 produce un trémolo: la amplitud alterna entre 0 y 0.3 a 2 Hz (encendido/apagado)", fr: "LFPulse.kr(2, 0, 0.5) * 0.3 produit un trémolo : l'amplitude alterne entre 0 et 0.3 à 2 Hz (allumé/éteint)" },
    ],
    sound: {
      freq: 440,
      amp: 0.3,
      type: "sine",
      lfo: { rate: 2, depth: 0, shape: "square", target: "amplitude" },
    },
  },
  {
    name: "LFTri",
    category: "Low Frequency",
    signature: "LFTri.ar/kr(freq, iphase, mul, add)",
    description: {
      en: "Low-frequency triangular wave. Smoother modulation than LFSaw.",
      es: "Onda triangular de baja frecuencia. Modulación más suave que LFSaw.",
      fr: "Onde triangulaire basse fréquence. Modulation plus douce que LFSaw.",
    },
    args: [
      { name: "freq", default: "1", desc: { en: "Modulation frequency", es: "Frecuencia de modulación", fr: "Fréquence de modulation" } },
      { name: "iphase", default: "0", desc: { en: "Initial phase", es: "Fase inicial", fr: "Phase initiale" } },
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
    ],
    example: `{
	SinOsc.ar(
		LFTri.kr(1) * 100 + 440,
		0,
		0.3
	) ! 2
}.play`,
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "LFTri.kr(1) oscillates between -1 and 1 at 1 Hz; × 100 gives ±100 Hz; + 440 centres at 440 Hz → smooth vibrato sweeping between 340 and 540 Hz", es: "LFTri.kr(1) oscila entre -1 y 1 a 1 Hz; × 100 da ±100 Hz; + 440 centra en 440 Hz → vibrato suave que barre entre 340 y 540 Hz", fr: "LFTri.kr(1) oscille entre -1 et 1 à 1 Hz ; × 100 donne ±100 Hz ; + 440 centre à 440 Hz → vibrato doux balayant entre 340 et 540 Hz" },
    ],
    sound: {
      freq: 440,
      amp: 0.3,
      type: "sine",
      lfo: { rate: 1, depth: 100, shape: "triangle", target: "frequency" },
    },
  },

  // ── Filters ──
  {
    name: "LPF",
    category: "Filters",
    signature: "LPF.ar(in, freq, mul, add)",
    description: {
      en: "Second-order low-pass filter. Removes high frequencies.",
      es: "Filtro paso bajo de segundo orden. Elimina frecuencias agudas.",
      fr: "Filtre passe-bas du second ordre. Supprime les hautes fréquences.",
    },
    args: [
      { name: "in", default: "0", desc: { en: "Input signal", es: "Señal de entrada", fr: "Signal d'entrée" } },
      { name: "freq", default: "1000", desc: { en: "Cutoff frequency in Hz", es: "Frecuencia de corte en Hz", fr: "Fréquence de coupure en Hz" } },
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
    ],
    example: `{
  LPF.ar(
    Saw.ar(220, 0.3),
    800
  ) ! 2
}.play`,
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "With a cutoff at 800 Hz over a Saw at 220 Hz, the high harmonics are removed → warmer, rounder sound", es: "Con corte en 800 Hz sobre una Saw de 220 Hz se eliminan los armónicos agudos → sonido más cálido y redondo", fr: "Avec une coupure à 800 Hz sur une Saw de 220 Hz, les harmoniques aigus sont supprimés → son plus chaud et plus rond" },
    ],
    sound: {
      freq: 220,
      amp: 0.3,
      type: "sawtooth",
      filter: { type: "lowpass", freq: 800 },
    },
  },
  {
    name: "HPF",
    category: "Filters",
    signature: "HPF.ar(in, freq, mul, add)",
    description: {
      en: "Second-order high-pass filter. Removes low frequencies.",
      es: "Filtro paso alto de segundo orden. Elimina frecuencias graves.",
      fr: "Filtre passe-haut du second ordre. Supprime les basses fréquences.",
    },
    args: [
      { name: "in", default: "-", desc: { en: "Input signal", es: "Señal de entrada", fr: "Signal d'entrée" } },
      { name: "freq", default: "1000", desc: { en: "Cutoff frequency in Hz", es: "Frecuencia de corte en Hz", fr: "Fréquence de coupure en Hz" } },
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
    ],
    example: `{
  HPF.ar(
    Saw.ar(220, 0.3),
    800
  ) ! 2
}.play`,
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "With a cutoff at 800 Hz over a Saw at 220 Hz, the low frequencies are removed → only the high harmonics pass, brighter and thinner sound", es: "Con corte en 800 Hz sobre una Saw de 220 Hz se eliminan los graves → solo pasan los armónicos agudos, sonido más brillante y delgado", fr: "Avec une coupure à 800 Hz sur une Saw de 220 Hz, les graves sont supprimés → seuls les harmoniques aigus passent, son plus brillant et plus fin" },
    ],
    sound: {
      freq: 220,
      amp: 0.3,
      type: "sawtooth",
      filter: { type: "highpass", freq: 800 },
    },
  },
  {
    name: "BPF",
    category: "Filters",
    signature: "BPF.ar(in, freq, rq, mul, add)",
    description: {
      en: "Band-pass filter. Only lets frequencies close to freq pass through.",
      es: "Filtro paso banda. Deja pasar solo las frecuencias cercanas a freq.",
      fr: "Filtre passe-bande. Laisse passer uniquement les fréquences proches de freq.",
    },
    args: [
      { name: "in", default: "-", desc: { en: "Input signal", es: "Señal de entrada", fr: "Signal d'entrée" } },
      { name: "freq", default: "1000", desc: { en: "Central frequency in Hz", es: "Frecuencia central en Hz", fr: "Fréquence centrale en Hz" } },
      { name: "rq", default: "1", desc: { en: "Reciprocal of the Q factor (bandwidth)", es: "Recíproco del factor Q (ancho de banda)", fr: "Réciproque du facteur Q (largeur de bande)" } },
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
    ],
    example: `{
  BPF.ar(
    WhiteNoise.ar(0.5),
    1200,
    0.25
  ) ! 2
}.play`,
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "rq = 1/Q: low rq (0.1) → narrow band, very resonant sound; high rq (1) → wide band, gentle filter", es: "rq = 1/Q: rq bajo (0.1) → banda estrecha, sonido muy resonante; rq alto (1) → banda ancha, filtro suave", fr: "rq = 1/Q : rq bas (0.1) → bande étroite, son très résonant ; rq élevé (1) → large bande, filtre doux" },
      { en: "Applied to white noise, the BPF acts as a resonator that colours the noise with a dominant frequency", es: "Aplicado a ruido blanco, el BPF actúa como un resonador que colorea el ruido con una frecuencia dominante", fr: "Appliqué au bruit blanc, le BPF agit comme un résonateur qui colore le bruit avec une fréquence dominante" },
    ],
    sound: {
      type: "noise",
      color: "white",
      amp: 0.5,
      filter: { type: "bandpass", freq: 1200, Q: 4 },
    },
  },

  // ── Effects ──
  {
    name: "FreeVerb",
    category: "Effects",
    signature: "FreeVerb.ar(in, mix, room, damp, mul, add)",
    description: {
      en: "Reverb. mix controls dry/wet blend, room controls the room size.",
      es: "Reverberación. mix controla mezcla seco/mojado, room el tamaño de sala.",
      fr: "Réverbération. mix contrôle le mélange sec/humide, room la taille de la salle.",
    },
    args: [
      { name: "in", default: "-", desc: { en: "Input signal", es: "Señal de entrada", fr: "Signal d'entrée" } },
      { name: "mix", default: "0.33", desc: { en: "Dry/wet mix (0 to 1)", es: "Mezcla seco/mojado (0 a 1)", fr: "Mélange sec/humide (0 à 1)" } },
      { name: "room", default: "0.5", desc: { en: "Room size (0 to 1)", es: "Tamaño de sala (0 a 1)", fr: "Taille de la salle (0 à 1)" } },
      { name: "damp", default: "0.5", desc: { en: "High-frequency damping", es: "Amortiguación de altas frecuencias", fr: "Amortissement des hautes fréquences" } },
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
    ],
    example: `{
  var env, snd;

  env = EnvGen.ar(
    Env.linen(0.02, 4, 1, 0.5, curve: -4),
    doneAction: Done.freeSelf
  );

  snd = SinOsc.ar(
    EnvGen.ar(Env.perc(level: 880)),
    0,
    0.3
  );

  snd = FreeVerb.ar(snd, 0.5, 0.8, 0);
  snd = snd * env;
  snd ! 2
}.play`,
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "EnvGen with Env.perc modulates the frequency: the attack goes from 0 to 880 Hz and falls quickly → percussive 'boing' sound", es: "EnvGen con Env.perc modula la frecuencia: el ataque va de 0 a 880 Hz y cae rápido → sonido percusivo tipo 'boing'", fr: "EnvGen avec Env.perc module la fréquence : l'attaque va de 0 à 880 Hz et descend rapidement → son percussif type 'boing'" },
      { en: "doneAction: Done.freeSelf releases the node from the server when the envelope ends, preventing accumulation of silent synths in memory", es: "doneAction: Done.freeSelf libera el nodo del servidor al terminar la envolvente, evitando acumular synths silenciosos en memoria", fr: "doneAction: Done.freeSelf libère le nœud du serveur quand l'enveloppe se termine, évitant d'accumuler des synths silencieux en mémoire" },
    ],
    sound: {
      freq: 880,
      amp: 0.5,
      type: "sine",
      reverb: { mix: 0.5, room: 0.8 },
    },
  },
  {
    name: "DelayN",
    category: "Effects",
    signature: "DelayN.ar(in, maxdelaytime, delaytime, mul, add)",
    description: {
      en: "Delay without interpolation. Repeats the signal with a fixed delay.",
      es: "Delay sin interpolación. Repite la señal con un retardo fijo.",
      fr: "Délai sans interpolation. Répète le signal avec un retard fixe.",
    },
    args: [
      { name: "in", default: "-", desc: { en: "Input signal", es: "Señal de entrada", fr: "Signal d'entrée" } },
      { name: "maxdelaytime", default: "0.2", desc: { en: "Maximum delay time in seconds", es: "Tiempo máximo de delay en segundos", fr: "Temps de délai maximum en secondes" } },
      { name: "delaytime", default: "0.2", desc: { en: "Current delay time", es: "Tiempo de delay actual", fr: "Temps de délai actuel" } },
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
    ],
    example: `{
  var snd, delay, buf;

  buf = Buffer.read(s, "/Users/me/Desktop/poing.mp3");
  snd = PlayBuf.ar(1, buf, loop: 0);
  delay = DelayN.ar(snd, 1.5, 1.5);

  snd = snd + delay;
  snd ! 2
}.play`,
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "snd + delay mixes the original signal with the echo: you hear the direct sound and its repetition 1.5 seconds later", es: "snd + delay mezcla la señal original con el eco: se escucha el sonido directo y su repetición 1.5 segundos después", fr: "snd + delay mélange le signal original avec l'écho : vous entendez le son direct et sa répétition 1,5 seconde plus tard" },
      { en: "maxdelaytime must be greater than or equal to delaytime; it reserves the memory buffer needed for the delay", es: "maxdelaytime debe ser mayor o igual que delaytime; reserva el buffer de memoria necesario para el delay", fr: "maxdelaytime doit être supérieur ou égal à delaytime ; il réserve le tampon mémoire nécessaire pour le délai" },
    ],
    sound: { sample: "/dist/audio/poing.mp3", delay: true },
  },

  // ── Envelopes --
  {
    name: "Env",
    category: "Envelopes",
    signature: "Env.new(levels, times, curve)",
    description: {
      en: "Defines the ADSR envelope: attack, decay, sustain, release.",
      es: "Define la envolvente ADSR: ataque, decaimiento, sustain, release.",
      fr: "Définit l'enveloppe ADSR : attaque, chute, sustain, release.",
    },
    args: [
      { name: "levels", default: "[0, 1, 0]", desc: { en: "Amplitude levels", es: "Niveles de amplitud", fr: "Niveaux d'amplitude" } },
      { name: "times", default: "[1, 1]", desc: { en: "Times in seconds", es: "Tiempos en segundos", fr: "Durées en secondes" } },
      { name: "curve", default: "\\lin", desc: { en: "Envelope shape", es: "Forma de la envolvente", fr: "Forme de l'enveloppe" } },
    ],
    example: `{
  SinOsc.ar(440) * EnvGen.kr(
    Env.new(
      [0, 0.5, 0],
      [3, 1],
      \\lin
    ),
    doneAction: Done.freeSelf
  ) ! 2
}.play`,
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "levels has one more element than times: [0, 0.5, 0] with [3, 1] means 'rise to 0.5 in 3 s, then fall to 0 in 1 s'", es: "levels tiene un elemento más que times: [0, 0.5, 0] con [3, 1] significa 'sube a 0.5 en 3 s, luego baja a 0 en 1 s'", fr: "levels a un élément de plus que times : [0, 0.5, 0] avec [3, 1] signifie 'monte à 0.5 en 3 s, puis descend à 0 en 1 s'" },
      { en: "Env only defines the shape; EnvGen is the one that plays it back and generates the control signal", es: "Env solo define la forma; EnvGen es quien la reproduce y genera la señal de control", fr: "Env définit seulement la forme ; EnvGen est celui qui la reproduit et génère le signal de contrôle" },
    ],
    sound: {
      freq: 440,
      amp: 0.5,
      type: "sine",
      env: { attack: 3, decay: 1, sustain: 0, release: 0.001, attackCurve: "linear", decayCurve: "linear" },
    },
  },
  {
    name: "EnvGen",
    category: "Envelopes",
    signature: "EnvGen.kr(envelope, gate, levelScale, levelBias, timeScale, doneAction)",
    description: {
      en: "Generates an envelope from an Env object. Controls amplitude over time.",
      es: "Genera una envolvente a partir de un objeto Env. Controla la amplitud en el tiempo.",
      fr: "Génère une enveloppe à partir d'un objet Env. Contrôle l'amplitude dans le temps.",
    },
    args: [
      { name: "envelope", default: "-", desc: { en: "Env object that defines the shape", es: "Objeto Env que define la forma", fr: "Objet Env qui définit la forme" } },
      { name: "gate", default: "1", desc: { en: "1 = attack, 0 = release", es: "1 = ataque, 0 = release", fr: "1 = attaque, 0 = release" } },
      { name: "doneAction", default: "0", desc: { en: "Done.freeSelf = releases the synth when done", es: "Done.freeSelf = libera el synth al terminar", fr: "Done.freeSelf = libère le synth quand c'est terminé" } },
    ],
    example: `{
  Saw.ar(220) * EnvGen.kr(
    Env.new(
      [0, 0.5, 0],
      [0.5, 2],
      \\lin
    ),
    doneAction: Done.freeSelf
  ) ! 2
}.play`,
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "doneAction: Done.freeSelf releases the node from the server when the envelope ends, preventing accumulation of silent synths in memory", es: "doneAction: Done.freeSelf libera el nodo del servidor al terminar la envolvente, evitando acumular synths silenciosos en memoria", fr: "doneAction: Done.freeSelf libère le nœud du serveur quand l'enveloppe se termine, évitant d'accumuler des synths silencieux en mémoire" },
      { en: "EnvGen runs at control rate (.kr) to modulate amplitude — more efficient than .ar for this purpose", es: "EnvGen corre a tasa de control (.kr) para modular la amplitud — más eficiente que .ar para este propósito", fr: "EnvGen fonctionne à la fréquence de contrôle (.kr) pour moduler l'amplitude — plus efficace que .ar pour cet usage" },
    ],
    sound: {
      freq: 220,
      amp: 0.5,
      type: "sawtooth",
      env: { attack: 0.5, decay: 2, sustain: 0, release: 0.001, attackCurve: "linear", decayCurve: "linear" },
    },
  },

  // ── Lines ──
  {
    name: "XLine",
    category: "Envelopes",
    signature: "XLine.kr(start, end, dur, mul, add, doneAction)",
    description: {
      en: "Generates an exponential curve from start to end in dur seconds. Ideal for frequency sweeps.",
      es: "Genera una curva exponencial desde start hasta end en dur segundos. Ideal para barridos de frecuencia.",
      fr: "Génère une courbe exponentielle de start à end en dur secondes. Idéal pour les balayages de fréquence.",
    },
    args: [
      { name: "start", default: "1", desc: { en: "Initial value (non-zero)", es: "Valor inicial (distinto de cero)", fr: "Valeur initiale (différente de zéro)" } },
      { name: "end", default: "10", desc: { en: "Final value (same sign as start)", es: "Valor final (mismo signo que start)", fr: "Valeur finale (même signe que start)" } },
      { name: "dur", default: "1", desc: { en: "Sweep duration in seconds", es: "Duración del barrido en segundos", fr: "Durée du balayage en secondes" } },
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
      { name: "doneAction", default: "0", desc: { en: "Done.freeSelf = releases the synth when done", es: "Done.freeSelf = libera el synth al terminar", fr: "Done.freeSelf = libère le synth quand c'est terminé" } },
    ],
    example: `{
  SinOsc.ar(
    XLine.kr(2000, 200, 0.4),
    0,
    EnvGen.kr(Env.perc(0.001, 0.4), doneAction: Done.freeSelf)
  ) ! 2
}.play`,
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "The ear perceives pitch on a logarithmic scale, so XLine (exponential) sounds like a 'natural' pitch glide", es: "El oído percibe el tono en escala logarítmica, así que XLine (exponencial) suena como un deslizamiento 'natural' de pitch", fr: "L'oreille perçoit la hauteur sur une échelle logarithmique, donc XLine (exponentiel) sonne comme un glissement de hauteur 'naturel'" },
      { en: "start and end must be non-zero and have the same sign; otherwise the server throws an error", es: "start y end deben ser distintos de cero y tener el mismo signo; de lo contrario el servidor lanza un error", fr: "start et end doivent être différents de zéro et avoir le même signe ; sinon le serveur lance une erreur" },
      { en: "Used as the frequency argument of SinOsc, it creates laser shot, bomb drop or siren effects", es: "Usado como argumento de frecuencia de SinOsc, crea efectos de disparo láser, caída de bomba o sirena", fr: "Utilisé comme argument de fréquence de SinOsc, il crée des effets de tir laser, de chute de bombe ou de sirène" },
    ],
    sound: {
      type: "sine",
      amp: 0.4,
      sweep: { start: 2000, end: 200, duration: 0.4, curve: "exponential" },
      env: { attack: 0.001, decay: 0.4, sustain: 0, release: 0.001, attackCurve: "linear", decayCurve: "exponential" },
    },
  },
  {
    name: "Line",
    category: "Envelopes",
    signature: "Line.kr(start, end, dur, mul, add, doneAction)",
    description: {
      en: "Generates a linear ramp from start to end in dur seconds.",
      es: "Genera una rampa lineal desde start hasta end en dur segundos.",
      fr: "Génère une rampe linéaire de start à end en dur secondes.",
    },
    args: [
      { name: "start", default: "0", desc: { en: "Initial value", es: "Valor inicial", fr: "Valeur initiale" } },
      { name: "end", default: "1", desc: { en: "Final value", es: "Valor final", fr: "Valeur finale" } },
      { name: "dur", default: "1", desc: { en: "Ramp duration in seconds", es: "Duración de la rampa en segundos", fr: "Durée de la rampe en secondes" } },
      { name: "mul", default: "1", desc: { en: "Amplitude. The output will be multiplied by this value", es: "Amplitud. La salida se multiplicará por este valor", fr: "Amplitude. La sortie sera multipliée par cette valeur" } },
      { name: "add", default: "0", desc: { en: "Value added to the output", es: "Valor añadido a la salida", fr: "Valeur ajoutée à la sortie" } },
      { name: "doneAction", default: "0", desc: { en: "Done.freeSelf = releases the synth when done", es: "Done.freeSelf = libera el synth al terminar", fr: "Done.freeSelf = libère le synth quand c'est terminé" } },
    ],
    example: `{
  SinOsc.ar(
    Line.kr(200, 2000, 1),
    0,
    EnvGen.kr(Env.perc(0.001, 1), doneAction: Done.freeSelf)
  ) ! 2
}.play`,
    note: [
      { en: "! 2 duplicates the signal to the left and right channel → stereo output", es: "! 2 duplica la señal al canal izquierdo y derecho → salida estéreo", fr: "! 2 duplique le signal vers le canal gauche et droit → sortie stéréo" },
      { en: "Unlike XLine, Line accepts zero and values of different signs, making it more flexible for modulating parameters other than frequency", es: "A diferencia de XLine, Line acepta cero y valores de signos distintos, por lo que es más flexible para modular parámetros que no sean frecuencia", fr: "Contrairement à XLine, Line accepte zéro et des valeurs de signes différents, ce qui le rend plus flexible pour moduler des paramètres autres que la fréquence" },
      { en: "For frequencies, XLine sounds more natural because the ear perceives pitch on a logarithmic scale; Line produces a glide that perceptually accelerates towards higher pitches", es: "Para frecuencias, XLine suena más natural porque el oído percibe el tono en escala logarítmica; Line produce un deslizamiento que se acelera perceptualmente hacia los agudos", fr: "Pour les fréquences, XLine sonne plus naturel car l'oreille perçoit la hauteur sur une échelle logarithmique ; Line produit un glissement qui s'accélère perceptuellement vers les aigus" },
    ],
    sound: {
      type: "sine",
      amp: 0.4,
      sweep: { start: 200, end: 2000, duration: 1, curve: "linear" },
      env: { attack: 0.001, decay: 1, sustain: 0, release: 0.001, attackCurve: "linear", decayCurve: "linear" },
    },
  },

  // ── Spatial --
  {
    name: "Pan2",
    category: "Spatial",
    signature: "Pan2.ar(in, pos, level)",
    description: {
      en: "Stereo panning.",
      es: "Panoramización estéreo.",
      fr: "Panoramique stéréo.",
    },
    args: [
      { name: "in", default: "-", desc: { en: "Mono input signal", es: "Señal de entrada mono", fr: "Signal d'entrée mono" } },
      { name: "pos", default: "0", desc: { en: "Stereo position (-1 to 1)", es: "Posición estéreo (-1 a 1)", fr: "Position stéréo (-1 à 1)" } },
      { name: "level", default: "1", desc: { en: "Gain level", es: "Nivel de ganancia", fr: "Niveau de gain" } },
    ],
    example: `{
  Pan2.ar(
    SinOsc.ar(440, 0, 0.3),
    SinOsc.kr(0.5)
  )
}.play`,
    note: [
      { en: "Pan2 already generates stereo output internally (two channels), so it does not need ! 2", es: "Pan2 ya genera salida estéreo internamente (dos canales), por eso no necesita ! 2", fr: "Pan2 génère déjà une sortie stéréo en interne (deux canaux), il n'a donc pas besoin de ! 2" },
      { en: "SinOsc.kr(0.5) in 'pos' makes the sound sweep from left (-1) to right (1) every 2 seconds", es: "SinOsc.kr(0.5) en 'pos' hace que el sonido barra de izquierda (-1) a derecha (1) cada 2 segundos", fr: "SinOsc.kr(0.5) dans 'pos' fait balayer le son de gauche (-1) à droite (1) toutes les 2 secondes" },
    ],
    sound: {
      freq: 440,
      amp: 0.3,
      type: "sine",
      pan: true,
      lfo: { rate: 0.5, depth: 0 },
    },
  },
];
