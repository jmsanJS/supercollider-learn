import { Exercise } from "@/types";

export const EXERCISES: Exercise[] = [
  {
    id: "ex1",
    level: 1,
    title: "Tono puro",
    tag: "SinOsc",
    goal: "Genera un tono de 440 Hz con amplitud 0.3",
    theory: `SinOsc genera una onda sinusoidal pura.\n\nSintaxis:\n  SinOsc.ar(freq, phase, mul)\n\nEl bloque { }.play envía el audio a los altavoces.`,
    starter: `// Genera un tono puro de 440 Hz\n{\n  SinOsc.ar(440, 0, 0.3)\n}.play`,
    validate(code) {
      const ok =
        /SinOsc/.test(code) &&
        /\.ar/.test(code) &&
        /\.play/.test(code) &&
        /{[\s\S]*}/.test(code);
      const tips = [];
      if (!/SinOsc/.test(code)) tips.push("Usa SinOsc para la onda sinusoidal");
      if (!/\.play/.test(code)) tips.push("Agrega .play al final del bloque");
      const m = code.match(/SinOsc\.ar\(\s*(\d+(?:\.\d+)?)/);
      const freq = m ? parseFloat(m[1]) : 440;
      return { ok, tips, audio: { freq, amp: 0.3, type: "sine" } };
    },
  },
  {
    id: "ex2",
    level: 1,
    title: "Octava arriba",
    tag: "SinOsc",
    goal: "Modifica el tono anterior para sonar una octava más alta (880 Hz)",
    theory: `Duplicar la frecuencia sube exactamente una octava:\n\n  220 Hz → La3\n  440 Hz → La4  ← referencia\n  880 Hz → La5\n\nEs la relación matemática fundamental de la música occidental.`,
    starter: `// Cambia la frecuencia a 880 Hz\n{\n  SinOsc.ar(440, 0, 0.3)\n}.play`,
    validate(code) {
      const m = code.match(/SinOsc\.ar\(\s*(\d+(?:\.\d+)?)/);
      const freq = m ? parseFloat(m[1]) : 0;
      const ok = freq === 880 && /\.play/.test(code);
      const tips = [];
      if (freq !== 880) tips.push("Cambia 440 por 880 en el primer argumento");
      return { ok, tips, audio: { freq, amp: 0.3, type: "sine" } };
    },
  },
  {
    id: "ex3",
    level: 1,
    title: "Onda cuadrada",
    tag: "Pulse",
    goal: "Genera una onda cuadrada a 220 Hz usando Pulse",
    theory: `Pulse genera ondas cuadradas/rectangulares.\nTiene un timbre más brillante y "electrónico" que SinOsc.\n\nPulse.ar(freq, width, mul)\n  width: 0.5 = onda cuadrada perfecta`,
    starter: `// Onda cuadrada a 220 Hz\n{\n  Pulse.ar(220, 0.5, 0.2)\n}.play`,
    validate(code) {
      const ok = /Pulse/.test(code) && /\.ar/.test(code) && /\.play/.test(code);
      const tips = [];
      if (!/Pulse/.test(code)) tips.push("Usa Pulse.ar() en lugar de SinOsc");
      const m = code.match(/Pulse\.ar\(\s*(\d+(?:\.\d+)?)/);
      const freq = m ? parseFloat(m[1]) : 220;
      return { ok, tips, audio: { freq, amp: 0.2, type: "square" } };
    },
  },
  {
    id: "ex4",
    level: 2,
    title: "Ruido blanco",
    tag: "WhiteNoise",
    goal: "Genera ruido blanco a baja amplitud (0.1)",
    theory: `WhiteNoise genera señal aleatoria con igual\nenergía en todas las frecuencias.\n\nÚsalo para:\n  • Efectos de viento, agua, lluvia\n  • Capas de textura\n  • Síntesis de percusión`,
    starter: `// Ruido blanco suave\n{\n  WhiteNoise.ar(0.1)\n}.play`,
    validate(code) {
      const ok = /WhiteNoise/.test(code) && /\.play/.test(code);
      const tips = [];
      if (!/WhiteNoise/.test(code)) tips.push("Usa WhiteNoise.ar(amplitud)");
      return { ok, tips, audio: { type: "noise", color: "white", amp: 0.1 } };
    },
  },
  {
    id: "ex5",
    level: 2,
    title: "Sirena de ambulancia",
    tag: "LFSaw",
    goal: "Usa LFSaw para modular la frecuencia de SinOsc y crear una sirena",
    theory: `La modulación de frecuencia (FM) usa un oscilador\npara controlar la frecuencia de otro.\n\nLFSaw.ar(rate) * depth + center\n  • rate:   velocidad de oscilación\n  • depth:  rango de variación\n  • center: frecuencia central`,
    starter: `// Sirena: oscila entre 400 y 800 Hz\n{\n  SinOsc.ar(\n    LFSaw.ar(2) * 200 + 600,\n    0, 0.4\n  )\n}.play`,
    validate(code) {
      const ok =
        /SinOsc/.test(code) && /LFSaw/.test(code) && /\.play/.test(code);
      const tips = [];
      if (!/LFSaw/.test(code))
        tips.push(
          "Necesitas LFSaw dentro del argumento de frecuencia de SinOsc",
        );
      if (!/SinOsc/.test(code)) tips.push("SinOsc es el oscilador principal");
      const m = code.match(/LFSaw\.ar\(\s*(\d+(?:\.\d+)?)/);
      const rate = m ? parseFloat(m[1]) : 2;
      return {
        ok,
        tips,
        audio: { freq: 600, amp: 0.4, type: "sine", lfo: { rate, depth: 200 } },
      };
    },
  },
  {
    id: "ex6",
    level: 3,
    title: "Teclas de teléfono",
    tag: "DTMF",
    goal: "Mezcla dos SinOsc para reproducir el tono DTMF del número 5 (770 + 1336 Hz)",
    theory: `Las teclas del teléfono usan DTMF (Dual-Tone Multi-Frequency).\nCada tecla es la SUMA de dos frecuencias:\n\n     1209  1336  1477\n770:  4     5     6\n852:  7     8     9\n\nTecla 5 = 770 Hz + 1336 Hz\n\nMezcla con: (SinOsc.ar(f1) + SinOsc.ar(f2)) * amp`,
    starter: `// Tecla 5 del teléfono: 770 Hz + 1336 Hz\n{\n  (\n    SinOsc.ar(770) +\n    SinOsc.ar(1336)\n  ) * 0.2\n}.play`,
    validate(code) {
      const has770 = /770/.test(code);
      const has1336 = /1336/.test(code);
      const ok =
        has770 && has1336 && /SinOsc/.test(code) && /\.play/.test(code);
      const tips = [];
      if (!has770)
        tips.push("Agrega SinOsc.ar(770) para la frecuencia de fila");
      if (!has1336)
        tips.push("Agrega SinOsc.ar(1336) para la frecuencia de columna");
      return {
        ok,
        tips,
        audio: { type: "dtmf", freqs: [770, 1336], amp: 0.2 },
      };
    },
  },
];
