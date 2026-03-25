import type { UGen } from "@/types";

export const UGENS: UGen[] = [
  // ── Oscillators ──────────────────────────────────────────────────────────
  {
    name: "SinOsc",
    category: "Oscillators",
    signature: "SinOsc.ar(freq, phase, mul, add)",
    description:
      "Oscilador sinusoidal puro. El UGen más fundamental de SuperCollider.",
    args: [
      { name: "freq", default: "440", desc: "Frecuencia en Hz" },
      { name: "phase", default: "0", desc: "Fase inicial (0 a 2pi)" },
      { name: "mul", default: "1", desc: "Multiplicador de amplitud" },
      { name: "add", default: "0", desc: "Offset DC" },
    ],
    example: "{ SinOsc.ar(440, 0, 0.3) }.play",
    sound: { freq: 440, amp: 0.3, type: "sine" },
  },
  {
    name: "Saw",
    category: "Oscillators",
    signature: "Saw.ar(freq, mul, add)",
    description:
      "Onda diente de sierra con contenido armónico rico. Ideal para síntesis sustractiva.",
    args: [
      { name: "freq", default: "440", desc: "Frecuencia en Hz" },
      { name: "mul", default: "1", desc: "Amplitud" },
    ],
    example: "{ Saw.ar(220, 0.2) }.play",
    sound: { freq: 220, amp: 0.2, type: "sawtooth" },
  },
  {
    name: "Pulse",
    category: "Oscillators",
    signature: "Pulse.ar(freq, width, mul, add)",
    description:
      "Onda cuadrada/pulso con ancho variable. width=0.5 produce onda cuadrada perfecta.",
    args: [
      { name: "freq", default: "440", desc: "Frecuencia en Hz" },
      { name: "width", default: "0.5", desc: "Ancho de pulso (0 a 1)" },
      { name: "mul", default: "1", desc: "Amplitud" },
    ],
    example: "{ Pulse.ar(440, 0.5, 0.2) }.play",
    sound: { freq: 440, amp: 0.2, type: "square" },
  },

  // ── Noise ─────────────────────────────────────────────────────────────────
  {
    name: "WhiteNoise",
    category: "Noise",
    signature: "WhiteNoise.ar(mul, add)",
    description: "Ruido blanco con igual energía en todas las frecuencias.",
    args: [{ name: "mul", default: "1", desc: "Amplitud" }],
    example: "{ WhiteNoise.ar(0.1) }.play",
    sound: { type: "noise", color: "white", amp: 0.1 },
  },
  {
    name: "PinkNoise",
    category: "Noise",
    signature: "PinkNoise.ar(mul, add)",
    description: "Ruido rosa, más cálido que el blanco. Decae 3dB por octava.",
    args: [{ name: "mul", default: "1", desc: "Amplitud" }],
    example: "{ PinkNoise.ar(0.1) }.play",
    sound: { type: "noise", color: "pink", amp: 0.1 },
  },
  {
    name: "BrownNoise",
    category: "Noise",
    signature: "BrownNoise.ar(mul, add)",
    description: "Ruido marrón, más grave y cálido. Decae 6dB por octava.",
    args: [{ name: "mul", default: "1", desc: "Amplitud" }],
    example: "{ BrownNoise.ar(0.1) }.play",
    sound: { type: "noise", color: "brown", amp: 0.1 },
  },

  // ── Low Frequency ─────────────────────────────────────────────────────────
  {
    name: "LFSaw",
    category: "Low Frequency",
    signature: "LFSaw.ar/kr(freq, iphase, mul, add)",
    description:
      "Oscilador diente de sierra de baja frecuencia. Ideal para modulación (LFO).",
    args: [
      { name: "freq", default: "1", desc: "Frecuencia de modulación" },
      { name: "iphase", default: "0", desc: "Fase inicial" },
    ],
    example: "{ SinOsc.ar(LFSaw.kr(2)*200+600, 0, 0.4) }.play",
    sound: { freq: 600, amp: 0.4, type: "sine", lfo: { rate: 2, depth: 200 } },
  },
  {
    name: "LFPulse",
    category: "Low Frequency",
    signature: "LFPulse.ar/kr(freq, iphase, width, mul, add)",
    description:
      "Onda cuadrada de baja frecuencia. Útil para trémolo y modulación en escalón.",
    args: [
      { name: "freq", default: "1", desc: "Frecuencia de modulación" },
      { name: "iphase", default: "0", desc: "Fase inicial" },
      { name: "width", default: "0.5", desc: "Ciclo de trabajo (0 a 1)" },
    ],
    example: "{ SinOsc.ar(440, 0, LFPulse.kr(4, 0, 0.5)*0.4) }.play",
    sound: { freq: 440, amp: 0.3, type: "sine", lfo: { rate: 4, depth: 150 } },
  },
  {
    name: "LFTri",
    category: "Low Frequency",
    signature: "LFTri.ar/kr(freq, iphase, mul, add)",
    description:
      "Onda triangular de baja frecuencia. Modulación más suave que LFSaw.",
    args: [
      { name: "freq", default: "1", desc: "Frecuencia de modulación" },
      { name: "iphase", default: "0", desc: "Fase inicial" },
    ],
    example: "{ SinOsc.ar(LFTri.kr(1)*100+440, 0, 0.3) }.play",
    sound: { freq: 440, amp: 0.3, type: "sine", lfo: { rate: 1, depth: 100 } },
  },

  // ── Filters ───────────────────────────────────────────────────────────────
  {
    name: "LPF",
    category: "Filters",
    signature: "LPF.ar(in, freq, mul, add)",
    description:
      "Filtro paso bajo de segundo orden. Elimina frecuencias agudas.",
    args: [
      { name: "in", default: "0", desc: "Señal de entrada" },
      { name: "freq", default: "1000", desc: "Frecuencia de corte en Hz" },
    ],
    example: "{ LPF.ar(Saw.ar(200, 0.4), 800) }.play",
    sound: { freq: 200, amp: 0.3, type: "sawtooth" },
  },
  {
    name: "HPF",
    category: "Filters",
    signature: "HPF.ar(in, freq, mul, add)",
    description:
      "Filtro paso alto de segundo orden. Elimina frecuencias graves.",
    args: [
      { name: "in", default: "-", desc: "Señal de entrada" },
      { name: "freq", default: "1000", desc: "Frecuencia de corte en Hz" },
    ],
    example: "{ HPF.ar(Saw.ar(200, 0.4), 800) }.play",
    sound: { freq: 200, amp: 0.3, type: "sawtooth" },
  },
  {
    name: "BPF",
    category: "Filters",
    signature: "BPF.ar(in, freq, rq, mul, add)",
    description:
      "Filtro paso banda. Deja pasar solo las frecuencias cercanas a freq.",
    args: [
      { name: "in", default: "-", desc: "Señal de entrada" },
      { name: "freq", default: "1000", desc: "Frecuencia central en Hz" },
      {
        name: "rq",
        default: "1",
        desc: "Reciproco del factor Q (ancho de banda)",
      },
    ],
    example: "{ BPF.ar(WhiteNoise.ar(0.5), 1200, 0.3) }.play",
    sound: { type: "noise", color: "white", amp: 0.3 },
  },

  // ── Effects ───────────────────────────────────────────────────────────────
  {
    name: "FreeVerb",
    category: "Effects",
    signature: "FreeVerb.ar(in, mix, room, damp, mul, add)",
    description:
      "Reverberación. mix controla mezcla seco/mojado, room el tamaño de sala.",
    args: [
      { name: "in", default: "-", desc: "Señal de entrada" },
      { name: "mix", default: "0.33", desc: "Mezcla seco/mojado (0 a 1)" },
      { name: "room", default: "0.5", desc: "Tamaño de sala (0 a 1)" },
      {
        name: "damp",
        default: "0.5",
        desc: "Amortiguación de altas frecuencias",
      },
    ],
    example: "{ FreeVerb.ar(SinOsc.ar(440, 0, 0.3), 0.5, 0.8) }.play",
    sound: { freq: 440, amp: 0.3, type: "sine" },
  },
  {
    name: "DelayN",
    category: "Effects",
    signature: "DelayN.ar(in, maxdelaytime, delaytime, mul, add)",
    description:
      "Delay sin interpolación. Repite la señal con un retardo fijo.",
    args: [
      { name: "in", default: "-", desc: "Señal de entrada" },
      {
        name: "maxdelaytime",
        default: "0.2",
        desc: "Tiempo máximo de delay en segundos",
      },
      { name: "delaytime", default: "0.2", desc: "Tiempo de delay actual" },
    ],
    example:
      "{ DelayN.ar(SinOsc.ar(440, 0, 0.3), 0.5, 0.3) + SinOsc.ar(440, 0, 0.3) }.play",
    sound: { freq: 440, amp: 0.3, type: "sine" },
  },

  // ── Envelopes ─────────────────────────────────────────────────────────────
  {
    name: "Env",
    category: "Envelopes",
    signature: "Env.new(levels, times, curve)",
    description:
      "Define la envolvente ADSR: ataque, decaimiento, sustain, release.",
    args: [
      { name: "levels", default: "[0, 1, 0]", desc: "Niveles de amplitud" },
      { name: "times", default: "[1, 1]", desc: "Tiempos en segundos" },
      { name: "curve", default: "lin", desc: "Forma de la envolvente" },
    ],
    example:
      "{ SinOsc.ar(440) * EnvGen.kr(Env.perc(0.01, 1), doneAction: Done.freeSelf) }.play",
    sound: { freq: 440, amp: 0.4, type: "sine", env: true },
  },
  {
    name: "EnvGen",
    category: "Envelopes",
    signature:
      "EnvGen.kr(envelope, gate, levelScale, levelBias, timeScale, doneAction)",
    description:
      "Genera una envolvente a partir de un objeto Env. Controla la amplitud en el tiempo.",
    args: [
      {
        name: "envelope",
        default: "-",
        desc: "Objeto Env que define la forma",
      },
      { name: "gate", default: "1", desc: "1 = ataque, 0 = release" },
      {
        name: "doneAction",
        default: "0",
        desc: "Done.freeSelf = libera el synth al terminar",
      },
    ],
    example:
      "{ SinOsc.ar(440) * EnvGen.kr(Env.perc(0.01, 1), doneAction: Done.freeSelf) }.play",
    sound: { freq: 440, amp: 0.4, type: "sine", env: true },
  },

  // ── Spatial ───────────────────────────────────────────────────────────────
  {
    name: "Pan2",
    category: "Spatial",
    signature: "Pan2.ar(in, pos, level)",
    description:
      "Panoramización estéreo. pos va de -1 (izquierda) a 1 (derecha).",
    args: [
      { name: "in", default: "-", desc: "Señal de entrada mono" },
      { name: "pos", default: "0", desc: "Posición estéreo (-1 a 1)" },
      { name: "level", default: "1", desc: "Nivel de ganancia" },
    ],
    example: "{ Pan2.ar(SinOsc.ar(440, 0, 0.3), SinOsc.kr(0.5)) }.play",
    sound: { freq: 440, amp: 0.3, type: "sine", lfo: { rate: 0.5, depth: 50 } },
  },
];
