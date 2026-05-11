import { Exercise } from "@/types";

export const EXERCISES: Exercise[] = [
  {
    id: "ex1",
    level: 1,
    title: "Tono puro",
    tag: "SinOsc",
    goal: "Genera un tono de 440 Hz con amplitud 0.3",
    theory: `SinOsc genera una onda sinusoidal pura.\n\nSintaxis:\n  SinOsc.ar(freq, phase, mul)\n\nEl bloque { }.play envía el audio a los altavoces.`,
    starter: `// Escribe tu solucion dentro del bloque\n{\n  \n}.play`,
    answer: `// Genera un tono puro de 440 Hz\n{\n  SinOsc.ar(440, 0, 0.3)\n}.play`,
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
    starter: `// Escribe tu solucion dentro del bloque\n{\n  \n}.play`,
    answer: `// Cambia la frecuencia a 880 Hz\n{\n  SinOsc.ar(880, 0, 0.3)\n}.play`,
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
    starter: `// Escribe tu solucion dentro del bloque\n{\n  \n}.play`,
    answer: `// Onda cuadrada a 220 Hz\n{\n  Pulse.ar(220, 0.5, 0.2)\n}.play`,
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
    level: 1,
    title: "Ruido blanco",
    tag: "WhiteNoise",
    goal: "Genera ruido blanco a baja amplitud (0.1)",
    theory: `WhiteNoise genera señal aleatoria con igual\nenergía en todas las frecuencias.\n\nÚsalo para:\n  • Efectos de viento, agua, lluvia\n  • Capas de textura\n  • Síntesis de percusión`,
    starter: `// Escribe tu solucion dentro del bloque\n{\n  \n}.play`,
    answer: `// Ruido blanco suave\n{\n  WhiteNoise.ar(0.1)\n}.play`,
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
    starter: `// Escribe tu solucion dentro del bloque\n{\n  \n}.play`,
    answer: `// Sirena: oscila entre 400 y 800 Hz\n{\n  SinOsc.ar(\n    LFSaw.ar(2) * 200 + 600,\n    0, 0.4\n  )\n}.play`,
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
    starter: `// Escribe tu solucion dentro del bloque\n{\n  \n}.play`,
    answer: `// Tecla 5 del teléfono: 770 Hz + 1336 Hz\n{\n  (\n    SinOsc.ar(770) +\n    SinOsc.ar(1336)\n  ) * 0.2\n}.play`,
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
  {
    id: "ex7",
    level: 2,
    title: "Sirena de policía",
    tag: "SinOsc",
    goal: "Crea una sirena de policía que alterna entre dos frecuencias (600 y 800 Hz)",
    theory: `Las sirenas de policía alternan entre dos tonos fijos.\nSe puede lograr con un LFPulse que conmuta entre dos frecuencias:\n\nLFPulse.ar(rate) selecciona 0 o 1 → escala y desplaza\npara obtener freq1 o freq2.\n\nLFPulse.ar(rate) * range + base`,
    starter: `// Escribe tu solucion dentro del bloque\n{\n  \n}.play`,
    answer: `// Sirena de policía: alterna 600 y 800 Hz\n{\n  SinOsc.ar(\n    LFPulse.ar(1) * 200 + 600,\n    0, 0.4\n  )\n}.play`,
    validate(code) {
      const ok = /SinOsc/.test(code) && /LFPulse/.test(code) && /\.play/.test(code);
      const tips = [];
      if (!/LFPulse/.test(code)) tips.push("Usa LFPulse para alternar entre dos frecuencias fijas");
      if (!/SinOsc/.test(code)) tips.push("SinOsc es el oscilador principal");
      const m = code.match(/LFPulse\.ar\(\s*(\d+(?:\.\d+)?)/);
      const rate = m ? parseFloat(m[1]) : 1;
      return {
        ok, tips,
        audio: { freq: 600, amp: 0.4, type: "sine", lfo: { rate, depth: 100, shape: "square", target: "frequency" } },
      };
    },
  },
  {
    id: "ex8",
    level: 2,
    title: "Alarma de coche",
    tag: "SinOsc",
    goal: "Crea una alarma de coche: tono descendente rápido con LFSaw inverso",
    theory: `Las alarmas de coche suelen usar un barrido descendente rápido\nque se repite en bucle.\n\nLFSaw.ar(rate, 1) genera una rampa descendente (iphase: 1).\nMultiplícala por el rango de frecuencias y suma la base:\n\n  LFSaw.ar(2, 1) * (-200) + 900`,
    starter: `// Escribe tu solucion dentro del bloque\n{\n  \n}.play`,
    answer: `// Alarma de coche: barrido descendente\n{\n  SinOsc.ar(\n    LFSaw.ar(2, 1) * (-200) + 900,\n    0, 0.4\n  )\n}.play`,
    validate(code) {
      const ok = /SinOsc/.test(code) && /LFSaw/.test(code) && /\.play/.test(code);
      const tips = [];
      if (!/LFSaw/.test(code)) tips.push("Usa LFSaw para el barrido de frecuencia");
      const m = code.match(/LFSaw\.ar\(\s*(\d+(?:\.\d+)?)/);
      const rate = m ? parseFloat(m[1]) : 2;
      return {
        ok, tips,
        audio: { freq: 900, amp: 0.4, type: "sine", lfo: { rate, depth: 200, shape: "sawtooth", target: "frequency" } },
      };
    },
  },
  {
    id: "ex9",
    level: 3,
    title: "Alarma de incendio",
    tag: "Pulse",
    goal: "Crea una alarma de incendio: pulsos cortos y agudos a 3200 Hz con Pulse",
    theory: `Las alarmas de incendio emiten pulsos cortos y penetrantes.\nPulse.ar con un LFPulse de baja frecuencia como amplitud\ncrea el efecto de intermitencia:\n\n  Pulse.ar(3200, 0.5) * LFPulse.ar(2)`,
    starter: `// Escribe tu solucion dentro del bloque\n{\n  \n}.play`,
    answer: `// Alarma de incendio: pulsos agudos\n{\n  Pulse.ar(3200, 0.5) * LFPulse.ar(2) * 0.3\n}.play`,
    validate(code) {
      const ok = /Pulse/.test(code) && /LFPulse/.test(code) && /\.play/.test(code);
      const tips = [];
      if (!/Pulse/.test(code)) tips.push("Usa Pulse.ar(3200) como oscilador principal");
      if (!/LFPulse/.test(code)) tips.push("Usa LFPulse para crear la intermitencia");
      const m = code.match(/Pulse\.ar\(\s*(\d+(?:\.\d+)?)/);
      const freq = m ? parseFloat(m[1]) : 3200;
      const m2 = code.match(/LFPulse\.ar\(\s*(\d+(?:\.\d+)?)/);
      const rate = m2 ? parseFloat(m2[1]) : 2;
      return {
        ok, tips,
        audio: { freq, amp: 0.3, type: "square", lfo: { rate, depth: 1, shape: "square", target: "amplitude" } },
      };
    },
  },
  {
    id: "ex10",
    level: 2,
    title: "Pitido de microondas",
    tag: "EnvGen",
    goal: "Crea tres pitidos cortos a 1000 Hz usando EnvGen con Env.perc",
    theory: `Los electrodomésticos usan pitidos cortos con envolvente percusiva.\nEnv.perc(attackTime, releaseTime) crea una envolvente\nque sube y baja rápidamente:\n\n  SinOsc.ar(1000) * EnvGen.kr(Env.perc(0.01, 0.1))\n\nPara repetirlos, usa un Array o Phasor.`,
    starter: `// Escribe tu solucion dentro del bloque\n{\n  \n}.play`,
    answer: `// Pitido corto de microondas\n{\n  SinOsc.ar(1000) *\n  EnvGen.kr(Env.perc(0.01, 0.1), doneAction: Done.freeSelf)\n}.play`,
    validate(code) {
      const ok = /SinOsc/.test(code) && /EnvGen/.test(code) && /Env\.perc/.test(code) && /\.play/.test(code);
      const tips = [];
      if (!/EnvGen/.test(code)) tips.push("Usa EnvGen.kr para aplicar la envolvente");
      if (!/Env\.perc/.test(code)) tips.push("Usa Env.perc(attack, release) para la forma del pitido");
      const m = code.match(/SinOsc\.ar\(\s*(\d+(?:\.\d+)?)/);
      const freq = m ? parseFloat(m[1]) : 1000;
      return {
        ok, tips,
        audio: {
          freq, amp: 0.5, type: "sine",
          env: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.001, attackCurve: "linear", decayCurve: "linear" },
        },
      };
    },
  },
  {
    id: "ex11",
    level: 2,
    title: "Temporizador de cocina",
    tag: "EnvGen",
    goal: "Crea un tono de temporizador: 880 Hz con envolvente de 0.05s de ataque y 0.3s de caída",
    theory: `Los temporizadores de cocina usan tonos con caída rápida.\nEnv.perc con un release algo más largo que el attack\nda ese carácter reconocible:\n\n  Env.perc(attackTime, releaseTime, level, curve)`,
    starter: `// Escribe tu solucion dentro del bloque\n{\n  \n}.play`,
    answer: `// Temporizador de cocina\n{\n  SinOsc.ar(880) *\n  EnvGen.kr(Env.perc(0.05, 0.3), doneAction: Done.freeSelf)\n}.play`,
    validate(code) {
      const ok = /SinOsc/.test(code) && /EnvGen/.test(code) && /Env\.perc/.test(code) && /\.play/.test(code);
      const tips = [];
      if (!/EnvGen/.test(code)) tips.push("Usa EnvGen.kr con Env.perc");
      if (!/Env\.perc/.test(code)) tips.push("Env.perc(attack, release) define la envolvente");
      const m = code.match(/SinOsc\.ar\(\s*(\d+(?:\.\d+)?)/);
      const freq = m ? parseFloat(m[1]) : 880;
      const m2 = code.match(/Env\.perc\(\s*[\d.]+\s*,\s*([\d.]+)/);
      const release = m2 ? parseFloat(m2[1]) : 0.3;
      return {
        ok, tips,
        audio: {
          freq, amp: 0.5, type: "sine",
          env: { attack: 0.05, decay: release, sustain: 0, release: 0.001, attackCurve: "linear", decayCurve: "linear" },
        },
      };
    },
  },
  {
    id: "ex12",
    level: 3,
    title: "Despertador digital",
    tag: "Pulse",
    goal: "Crea un despertador: onda cuadrada a 1200 Hz con intermitencia rápida (4 Hz)",
    theory: `Los despertadores digitales usan ondas cuadradas agudas\ncon una intermitencia rítmica para captar la atención.\n\nMultiplica el oscilador por un LFPulse para la intermitencia:\n\n  Pulse.ar(1200, 0.5) * LFPulse.kr(4) * amp`,
    starter: `// Escribe tu solucion dentro del bloque\n{\n  \n}.play`,
    answer: `// Despertador digital\n{\n  Pulse.ar(1200, 0.5) * LFPulse.kr(4) * 0.3\n}.play`,
    validate(code) {
      const ok = /Pulse\.ar/.test(code) && /LFPulse/.test(code) && /\.play/.test(code);
      const tips = [];
      if (!/Pulse\.ar/.test(code)) tips.push("Usa Pulse.ar para la onda cuadrada aguda");
      if (!/LFPulse/.test(code)) tips.push("Usa LFPulse para la intermitencia rítmica");
      const m = code.match(/Pulse\.ar\(\s*(\d+(?:\.\d+)?)/);
      const freq = m ? parseFloat(m[1]) : 1200;
      const m2 = code.match(/LFPulse\.\w+\(\s*(\d+(?:\.\d+)?)/);
      const rate = m2 ? parseFloat(m2[1]) : 4;
      return {
        ok, tips,
        audio: { freq, amp: 0.3, type: "square", lfo: { rate, depth: 1, shape: "square", target: "amplitude" } },
      };
    },
  },
  {
    id: "ex13",
    level: 3,
    title: "Señal de evacuación",
    tag: "SinOsc",
    goal: "Crea una señal de evacuación: tono ascendente lento (300→1200 Hz) con LFSaw",
    theory: `Las señales de evacuación (WHOOP) usan un barrido ascendente\nlento que se repite, diseñado para ser inconfundible.\n\nLFSaw.ar(rate) genera valores de -1 a 1.\nEscálalo para obtener el rango de frecuencias:\n\n  LFSaw.ar(0.5) * 450 + 750  → 300 a 1200 Hz`,
    starter: `// Escribe tu solucion dentro del bloque\n{\n  \n}.play`,
    answer: `// Señal de evacuación: barrido ascendente\n{\n  SinOsc.ar(\n    LFSaw.ar(0.5) * 450 + 750,\n    0, 0.4\n  )\n}.play`,
    validate(code) {
      const ok = /SinOsc/.test(code) && /LFSaw/.test(code) && /\.play/.test(code);
      const tips = [];
      if (!/LFSaw/.test(code)) tips.push("Usa LFSaw para el barrido de frecuencia ascendente");
      if (!/SinOsc/.test(code)) tips.push("SinOsc es el oscilador principal");
      const m = code.match(/LFSaw\.ar\(\s*(\d+(?:\.\d+)?)/);
      const rate = m ? parseFloat(m[1]) : 0.5;
      return {
        ok, tips,
        audio: { freq: 750, amp: 0.4, type: "sine", lfo: { rate, depth: 450, shape: "sawtooth", target: "frequency" } },
      };
    },
  },
];
