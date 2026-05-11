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
      const hasSinOsc = /SinOsc/.test(code);
      const hasCorrectCall = /SinOsc\.ar\s*\(\s*440\s*,\s*0\s*,\s*0\.3\s*\)/.test(code);
      const hasPlay = /\.play/.test(code);
      const ok = hasCorrectCall && hasPlay;
      const tips = [];
      if (!hasSinOsc) tips.push("Usa el UGen que genera una onda sinusoidal pura.");
      if (hasSinOsc && !hasCorrectCall) tips.push("Revisa los argumentos del UGen: freq...");
      if (!hasPlay) tips.push("Agrega .play al final del bloque para ejecutar el audio.");
      const m = code.match(/SinOsc\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
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
      const m = code.match(/SinOsc\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
      const freq = m ? parseFloat(m[1]) : 0;
      const hasPlay = /\.play/.test(code);
      const ok = freq === 880 && hasPlay;
      const tips = [];
      if (freq !== 880) tips.push("Recuerda: duplicar la frecuencia sube exactamente una octava.");
      if (!hasPlay) tips.push("Agrega .play al final del bloque.");
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
      const hasPulse = /Pulse\.ar/.test(code);
      const hasFreq220 = /Pulse\.ar\s*\(\s*220\s*,\s*0\.5/.test(code);
      const hasPlay = /\.play/.test(code);
      const ok = hasPulse && hasFreq220 && hasPlay;
      const tips = [];
      if (!hasPulse) tips.push("Usa el UGen que genera ondas cuadradas.");
      if (hasPulse && !hasFreq220) tips.push("Revisa la frecuencia y el ancho del pulso.");
      if (!hasPlay) tips.push("Agrega .play al final del bloque.");
      const m = code.match(/Pulse\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
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
      const hasWhiteNoise = /WhiteNoise/.test(code);
      const hasCorrectCall = /WhiteNoise\.ar\s*\(\s*0\.1\s*\)/.test(code);
      const hasPlay = /\.play/.test(code);
      const ok = hasWhiteNoise && hasCorrectCall && hasPlay;
      const tips = [];
      if (!hasWhiteNoise) tips.push("Usa el UGen que genera ruido con energía uniforme en todas las frecuencias.");
      if (hasWhiteNoise && !hasCorrectCall) tips.push("Revisa la amplitud del UGen de ruido.");
      if (!hasPlay) tips.push("Agrega .play al final del bloque.");
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
      const hasSinOsc = /SinOsc/.test(code);
      const hasLFSaw = /LFSaw/.test(code);
      const hasRate2 = /LFSaw\.ar\s*\(\s*2\s*\)/.test(code);
      const hasDepth200 = /200/.test(code);
      const hasCenter600 = /600/.test(code);
      const hasPlay = /\.play/.test(code);
      const ok = hasSinOsc && hasLFSaw && hasRate2 && hasDepth200 && hasCenter600 && hasPlay;
      const tips = [];
      if (!hasSinOsc) tips.push("Necesitas un oscilador sinusoidal como portadora.");
      if (!hasLFSaw) tips.push("Necesitas un LFO de rampa dentro del argumento de frecuencia del oscilador principal.");
      if (hasLFSaw && !hasRate2) tips.push("Revisa la velocidad del LFO.");
      if (!hasDepth200) tips.push("Revisa el rango de variación de frecuencia.");
      if (!hasCenter600) tips.push("Revisa la frecuencia central de la sirena.");
      const m = code.match(/LFSaw\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
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
      const has770 = /SinOsc\.ar\s*\(\s*770\s*\)/.test(code);
      const has1336 = /SinOsc\.ar\s*\(\s*1336\s*\)/.test(code);
      const hasPlay = /\.play/.test(code);
      const ok = has770 && has1336 && hasPlay;
      const tips = [];
      if (!has770) tips.push("Falta el tono de fila del DTMF.");
      if (!has1336) tips.push("Falta el tono de columna del DTMF.");
      if (!hasPlay) tips.push("Agrega .play al final del bloque.");
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
      const hasSinOsc = /SinOsc/.test(code);
      const hasLFPulse = /LFPulse/.test(code);
      const hasRate1 = /LFPulse\.ar\s*\(\s*1\s*\)/.test(code);
      const hasRange200 = /200/.test(code);
      const hasBase600 = /600/.test(code);
      const hasPlay = /\.play/.test(code);
      const ok = hasSinOsc && hasLFPulse && hasRate1 && hasRange200 && hasBase600 && hasPlay;
      const tips = [];
      if (!hasSinOsc) tips.push("Necesitas un oscilador sinusoidal como portadora.");
      if (!hasLFPulse) tips.push("Necesitas un LFO de onda cuadrada para conmutar entre dos frecuencias.");
      if (hasLFPulse && !hasRate1) tips.push("Revisa la velocidad de alternancia del LFO.");
      if (!hasRange200) tips.push("Revisa el rango de variación entre los dos tonos.");
      if (!hasBase600) tips.push("Revisa la frecuencia base de la sirena.");
      const m = code.match(/LFPulse\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
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
      const hasSinOsc = /SinOsc/.test(code);
      const hasLFSaw = /LFSaw/.test(code);
      const hasLFSawWithIphase = /LFSaw\.ar\s*\(\s*2\s*,\s*1\s*\)/.test(code);
      const hasNeg200 = /\(\s*-\s*200\s*\)|\*\s*-\s*200\b/.test(code);
      const hasBase900 = /900/.test(code);
      const hasPlay = /\.play/.test(code);
      const ok = hasSinOsc && hasLFSaw && hasLFSawWithIphase && hasNeg200 && hasBase900 && hasPlay;
      const tips = [];
      if (!hasLFSaw) tips.push("Necesitas un LFO de rampa para el barrido de frecuencia.");
      if (hasLFSaw && !hasLFSawWithIphase) tips.push("Revisa el segundo argumento de LFSaw para invertir la dirección de la rampa.");
      if (!hasNeg200) tips.push("Para un barrido descendente, el factor de escala de frecuencia debe ser negativo.");
      if (!hasBase900) tips.push("Revisa la frecuencia base del barrido.");
      const m = code.match(/LFSaw\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
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
      const hasPulseAr = /Pulse\.ar/.test(code);
      const hasFreq3200 = /Pulse\.ar\s*\(\s*3200\b/.test(code);
      const hasLFPulse = /LFPulse/.test(code);
      const hasLFPulseRate2 = /LFPulse\.ar\s*\(\s*2\s*\)/.test(code);
      const hasPlay = /\.play/.test(code);
      const ok = hasPulseAr && hasFreq3200 && hasLFPulse && hasLFPulseRate2 && hasPlay;
      const tips = [];
      if (!hasPulseAr) tips.push("Usa el UGen indicado en el objetivo como oscilador principal.");
      if (hasPulseAr && !hasFreq3200) tips.push("Revisa la frecuencia del oscilador.");
      if (!hasLFPulse) tips.push("Necesitas un LFO de onda cuadrada para crear la intermitencia.");
      if (hasLFPulse && !hasLFPulseRate2) tips.push("Revisa la velocidad de la intermitencia.");
      const m = code.match(/Pulse\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
      const freq = m ? parseFloat(m[1]) : 3200;
      const m2 = code.match(/LFPulse\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
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
      const hasSinOsc = /SinOsc/.test(code);
      const hasFreq1000 = /SinOsc\.ar\s*\(\s*1000\s*\)/.test(code);
      const hasEnvGen = /EnvGen/.test(code);
      const hasEnvPerc = /Env\.perc/.test(code);
      const hasPercValues = /Env\.perc\s*\(\s*0\.01\s*,\s*0\.1\s*\)/.test(code);
      const hasPlay = /\.play/.test(code);
      const ok = hasSinOsc && hasFreq1000 && hasEnvGen && hasEnvPerc && hasPercValues && hasPlay;
      const tips = [];
      if (!hasEnvGen) tips.push("Necesitas un generador de envolvente para dar forma al sonido.");
      if (!hasEnvPerc) tips.push("Usa una envolvente percusiva para que el sonido suba y baje rápidamente.");
      if (hasEnvPerc && !hasPercValues) tips.push("Revisa los tiempos de ataque y caída de la envolvente.");
      if (hasSinOsc && !hasFreq1000) tips.push("Revisa la frecuencia del oscilador.");
      const m = code.match(/SinOsc\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
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
      const hasSinOsc = /SinOsc/.test(code);
      const hasFreq880 = /SinOsc\.ar\s*\(\s*880\s*\)/.test(code);
      const hasEnvGen = /EnvGen/.test(code);
      const hasEnvPerc = /Env\.perc/.test(code);
      const hasPercValues = /Env\.perc\s*\(\s*0\.05\s*,\s*0\.3\s*\)/.test(code);
      const hasPlay = /\.play/.test(code);
      const ok = hasSinOsc && hasFreq880 && hasEnvGen && hasEnvPerc && hasPercValues && hasPlay;
      const tips = [];
      if (!hasEnvGen) tips.push("Necesitas un generador de envolvente para dar forma al sonido.");
      if (!hasEnvPerc) tips.push("Usa una envolvente percusiva para definir el ataque y la caída del tono.");
      if (hasEnvPerc && !hasPercValues) tips.push("Revisa los tiempos de ataque y caída indicados en el objetivo.");
      if (hasSinOsc && !hasFreq880) tips.push("Revisa la frecuencia del oscilador.");
      const m = code.match(/SinOsc\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
      const freq = m ? parseFloat(m[1]) : 880;
      const m2 = code.match(/Env\.perc\s*\(\s*[\d.]+\s*,\s*([\d.]+)/);
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
      const hasPulseAr = /Pulse\.ar/.test(code);
      const hasFreq1200 = /Pulse\.ar\s*\(\s*1200\b/.test(code);
      const hasWidth05 = /Pulse\.ar\s*\(\s*1200\s*,\s*0\.5\s*\)/.test(code);
      const hasLFPulse = /LFPulse/.test(code);
      const hasRate4 = /LFPulse\.\w+\s*\(\s*4\s*\)/.test(code);
      const hasPlay = /\.play/.test(code);
      const ok = hasPulseAr && hasWidth05 && hasLFPulse && hasRate4 && hasPlay;
      const tips = [];
      if (!hasPulseAr) tips.push("Usa el UGen indicado en el objetivo para generar la onda cuadrada.");
      if (hasPulseAr && !hasFreq1200) tips.push("Revisa la frecuencia del oscilador.");
      if (hasPulseAr && hasFreq1200 && !hasWidth05) tips.push("El segundo argumento del UGen controla el ancho del pulso.");
      if (!hasLFPulse) tips.push("Necesitas un LFO de onda cuadrada para crear la intermitencia rítmica.");
      if (hasLFPulse && !hasRate4) tips.push("Revisa la velocidad de la intermitencia.");
      const m = code.match(/Pulse\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
      const freq = m ? parseFloat(m[1]) : 1200;
      const m2 = code.match(/LFPulse\.\w+\s*\(\s*(\d+(?:\.\d+)?)/);
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
      const hasSinOsc = /SinOsc/.test(code);
      const hasLFSaw = /LFSaw/.test(code);
      const hasRate05 = /LFSaw\.ar\s*\(\s*0\.5\s*\)/.test(code);
      const hasDepth450 = /450/.test(code);
      const hasCenter750 = /750/.test(code);
      const hasPlay = /\.play/.test(code);
      const ok = hasSinOsc && hasLFSaw && hasRate05 && hasDepth450 && hasCenter750 && hasPlay;
      const tips = [];
      if (!hasSinOsc) tips.push("Necesitas un oscilador sinusoidal como portadora.");
      if (!hasLFSaw) tips.push("Necesitas un LFO de rampa ascendente dentro del argumento de frecuencia.");
      if (hasLFSaw && !hasRate05) tips.push("Revisa la velocidad del barrido.");
      if (!hasDepth450) tips.push("Revisa el rango de variación de frecuencia.");
      if (!hasCenter750) tips.push("Revisa la frecuencia central del barrido.");
      const m = code.match(/LFSaw\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
      const rate = m ? parseFloat(m[1]) : 0.5;
      return {
        ok, tips,
        audio: { freq: 750, amp: 0.4, type: "sine", lfo: { rate, depth: 450, shape: "sawtooth", target: "frequency" } },
      };
    },
  },
];
