import { Exercise } from "@/types";

export const EXERCISES: Exercise[] = [
  {
    id: "ex1",
    level: 1,
    title: "Tono puro",
    tag: "SinOsc",
    goal: "Genera un tono puro a 440 Hz con amplitud 0.3",
    theory: `¿Cuál UGen genera una onda sinusoidal pura?

  SinOsc.ar(freq, phase, mul)

  freq  → la frecuencia determina qué tan agudo o grave suena. Se mide en Hz (hercios). 440 Hz es la nota La4, la referencia estándar de afinación.

  phase → el desfase inicial de la onda. Empieza siempre en 0.

  mul   → el volumen de la señal. Va de 0.0 (silencio) a 1.0 (volumen máximo). Usa valores bajos (0.1 – 0.4) para no saturar los altavoces.

El bloque { }.play envía el audio a los altavoces.

Si tienes alguna duda de cómo funcionan los UGens, puedes consultar la pestaña de UGens comunes para revisar la sintaxis e incluso escuchar el sonido que producen.
`,
    starter: `// Escribe tu código dentro del bloque { }.play:\n{\n  // Aquí va tu código\n\n}.play`,
    answer: `// Genera un tono puro de 440 Hz\n{\n  SinOsc.ar(440, 0, 0.3) ! 2\n}.play`,
    validate(code) {
      const hasSinOsc = /SinOsc/.test(code);
      const hasCorrectCall = /SinOsc\.ar\s*\(\s*440\s*,\s*0\s*,\s*0\.3\s*\)/.test(code);
      const ok = hasCorrectCall;
      const tips = [];
      if (!hasSinOsc) tips.push("El UGen para tonos puros se llama SinOsc. Escríbelo dentro del bloque { }.");
      if (hasSinOsc && !hasCorrectCall) tips.push("SinOsc.ar necesita tres argumentos: la frecuencia (en Hz), la fase (empieza en 0) y el volumen (entre 0.0 y 1.0).");;
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
    goal: "Sube el tono una octava (880 Hz) y cambia la amplitud a 0.5",
    theory: `Duplicar la frecuencia sube exactamente una octava:

  La3 → 220 Hz
  La4 → 440 Hz
  La5 → ???

Es la relación matemática fundamental de la música occidental.
`,
    starter: `// Así quedó el ejercicio anterior:\n{\n  SinOsc.ar(440, 0, 0.3) ! 2  // ← modifica los argumentos\n}.play`,
    answer: `// Cambia la frecuencia y la amplitud\n{\n  SinOsc.ar(880, 0, 0.5) ! 2\n}.play`,
    validate(code) {
      const m = code.match(/SinOsc\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
      const freq = m ? parseFloat(m[1]) : 0;
      const ampMatch = code.match(/SinOsc\.ar\s*\(\s*[\d.]+\s*,\s*[\d.]+\s*,\s*(\d+(?:\.\d+)?)/);
      const amp = ampMatch ? parseFloat(ampMatch[1]) : 0;
      const ok = freq === 880 && amp === 0.5;
      const tips = [];
      if (freq !== 880) tips.push("Duplicar la frecuencia sube una octava. El primer argumento de SinOsc.ar es la frecuencia en Hz.");
      if (amp !== 0.5) tips.push("Modifica la amplitud. El tercer argumento de SinOsc.ar (mul).");
      return { ok, tips, audio: { freq, amp, type: "sine" } };
    },
  },
  {
    id: "ex3",
    level: 1,
    title: "Onda cuadrada",
    tag: "Pulse",
    goal: "Genera una onda cuadrada a 220 Hz con amplitud 0.2",
    theory: `Para producir ondas cuadradas o rectangulares debes utilizar Pulse. Tiene un timbre más brillante que SinOsc.

Sintaxis:
  Pulse.ar(freq, width, mul)

  freq  → frecuencia en Hz, igual que en SinOsc.

  width → ancho del pulso. Determina la forma de la onda. 0.5 produce una onda cuadrada perfecta (simétrica). Valores distintos de 0.5 crean asimetría y cambian el timbre.

  mul   → amplitud (o volumen). Usa un valor bajo como 0.2.`,
    starter: `// Escribe tu código dentro del bloque { }.play:\n{\n  // Tu código va aquí\n\n}.play`,
    answer: `// Onda cuadrada a 220 Hz\n{\n  Pulse.ar(220, 0.5, 0.2) ! 2\n}.play`,
    validate(code) {
      const hasPulse = /Pulse\.ar/.test(code);
      const hasFreq220 = /Pulse\.ar\s*\(\s*220\s*,\s*0\.5/.test(code);
      const ok = hasPulse && hasFreq220;
      const tips = [];
      if (!hasPulse) tips.push("Usa Pulse.ar(...) — es el UGen para ondas cuadradas y rectangulares.");
      if (hasPulse && !hasFreq220) tips.push("Pulse.ar necesita: la frecuencia en Hz y el ancho del pulso (0.5 para onda cuadrada perfecta).");
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
    goal: "Genera ruido blanco con amplitud 0.1",
    theory: `WhiteNoise genera señal aleatoria con igual
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
    starter: `// Escribe tu código dentro del bloque { }.play:\n{\n  // Tu código va aquí\n\n}.play`,
    answer: `// Ruido blanco suave\n{\n  WhiteNoise.ar(0.1) ! 2\n}.play`,
    validate(code) {
      const hasWhiteNoise = /WhiteNoise/.test(code);
      const hasCorrectCall = /WhiteNoise\.ar\s*\(\s*0\.1\s*\)/.test(code);
      const ok = hasWhiteNoise && hasCorrectCall;
      const tips = [];
      if (!hasWhiteNoise) tips.push("Usa el UGen que genera ruido con energía en todas las frecuencias.");
      if (hasWhiteNoise && !hasCorrectCall) tips.push("WhiteNoise.ar solo necesita un argumento: el volumen (mul). Usa un valor bajo para no saturar.");
      return { ok, tips, audio: { type: "noise", color: "white", amp: 0.1 } };
    },
  },
  {
    id: "ex5",
    level: 2,
    title: "Sirena de ambulancia",
    tag: "LFSaw",
    goal: "Sirena de ambulancia: frecuencia que oscila entre 400 y 800 Hz a 2 veces por segundo, amplitud 0.4",
    theory: `Para crear una sirena, necesitas que la frecuencia de SinOsc cambie sola con el tiempo. Esto se llama modulación de frecuencia.

LFSaw es un oscilador lento (LFO) que genera una rampa ascendente que va de -1 a +1 de forma cíclica.

Si multiplicas esa rampa por un rango y le sumas una frecuencia central, obtienes un barrido de frecuencias:

  LFSaw.ar(velocidad) * rango + centro

  frecuencia → cuántas veces por segundo oscila (ej: 2 = dos veces/seg)
  rango      → cuántos Hz sube y baja respecto al centro
  centro     → frecuencia central alrededor de la que oscila

Coloca esa expresión como primer argumento de SinOsc.ar:
  SinOsc.ar( LFSaw.ar(...) * ... + ..., 0, amplitud )`,
    starter: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  SinOsc.ar(\n    LFSaw.ar(FRECUENCIA) * RANGO + CENTRO,\n    0, 0.4\n  ) ! 2\n}.play`,
    answer: `// Sirena: oscila entre 400 y 800 Hz\n{\n  SinOsc.ar(\n    LFSaw.ar(2) * 200 + 600,\n    0, 0.4\n  ) ! 2\n}.play`,
    validate(code) {
      const hasSinOsc = /SinOsc/.test(code);
      const hasLFSaw = /LFSaw/.test(code);
      const hasRate2 = /LFSaw\.ar\s*\(\s*2\s*\)/.test(code);
      const hasDepth200 = /200/.test(code);
      const hasCenter600 = /600/.test(code);
      const ok = hasSinOsc && hasLFSaw && hasRate2 && hasDepth200 && hasCenter600;
      const tips = [];
      if (!hasSinOsc) tips.push("Necesitas SinOsc.ar como oscilador principal. El primer argumento es la frecuencia.");
      if (!hasLFSaw) tips.push("Usa LFSaw.ar dentro del primer argumento de SinOsc para que la frecuencia cambie sola.");
      if (hasLFSaw && !hasRate2) tips.push("El primer argumento de LFSaw.ar es la velocidad de oscilación (cuántas veces por segundo).");
      if (!hasDepth200) tips.push("Multiplica LFSaw.ar por el rango de frecuencias que quieres barrer.");
      if (!hasCenter600) tips.push("Suma la frecuencia central al resultado de LFSaw para determinar alrededor de qué nota oscila.");
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
    goal: "Teclas de teléfono: mezcla dos tonos a 770 Hz y 1336 Hz con amplitud 0.2",
    theory: `Las teclas del teléfono usan DTMF (Dual-Tone Multi-Frequency).
Cada tecla es la SUMA de dos frecuencias distintas:

     1209  1336  1477
770:  4     5     6
852:  7     8     9

Tecla 5 = 770 Hz + 1336 Hz

En SuperCollider, sumar dos UGens mezcla sus señales:
  (SinOsc.ar(f1) + SinOsc.ar(f2)) * amplitud

Los paréntesis son importantes para que la multiplicación
de amplitud se aplique a la señal combinada.`,
    starter: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  (\n    UGEN(FRECUENCIA) +\n    UGEN(FRECUENCIA)\n  ) * AMPLITUD ! 2\n}.play`,
    answer: `// Tecla 5 del teléfono: 770 Hz + 1336 Hz\n{\n  (\n    SinOsc.ar(770) +\n    SinOsc.ar(1336)\n  ) * 0.2 ! 2\n}.play`,
    validate(code) {
      const has770 = /SinOsc\.ar\s*\(\s*770\s*\)/.test(code);
      const has1336 = /SinOsc\.ar\s*\(\s*1336\s*\)/.test(code);
      const ok = has770 && has1336;
      const tips = [];
      if (!has770) tips.push("Falta uno de los dos SinOsc. Busca la frecuencia de fila de la tecla 5 en la tabla de la teoría.");
      if (!has1336) tips.push("Falta el otro SinOsc. Busca la frecuencia de columna de la tecla 5 en la tabla de la teoría.");
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
    goal: "Sirena de policía: alterna entre 600 y 800 Hz una vez por segundo, amplitud 0.4",
    theory: `En algunos países, las sirenas de policía alternan entre dos tonos fijos,
 es decir, no hacen un barrido suave como la ambulancia, sino que saltan.

LFPulse es un oscilador lento que solo produce 0 o 1 de forma cíclica.
Si escalas ese 0/1 obtienes dos valores de frecuencia distintos:

  LFPulse.ar(frecuencia) * diferencia + base

  frecuencia  → cuántas veces por segundo alterna (ej: 1 = una vez/seg)
  diferencia → cuántos Hz de diferencia hay entre los dos tonos
  base       → la frecuencia más baja de las dos

Cuando LFPulse vale 0: la frecuencia es (0 * diferencia + base) = base
Cuando LFPulse vale 1: la frecuencia es (1 * diferencia + base) = base + diferencia

Utiliza esto como primer argumento de SinOsc.ar.`,
    starter: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  SinOsc.ar(\n    LFPulse.ar(FRECUENCIA) * DIFERENCIA + BASE,\n    0, 0.4\n  ) ! 2\n}.play`,
    answer: `// Sirena de policía: alterna 600 y 800 Hz\n{\n  SinOsc.ar(\n    LFPulse.ar(1) * 200 + 600,\n    0, 0.4\n  ) ! 2\n}.play`,
    validate(code) {
      const hasSinOsc = /SinOsc/.test(code);
      const hasLFPulse = /LFPulse/.test(code);
      const hasRate1 = /LFPulse\.ar\s*\(\s*1\s*\)/.test(code);
      const hasRange200 = /200/.test(code);
      const hasBase600 = /600/.test(code);
      const ok = hasSinOsc && hasLFPulse && hasRate1 && hasRange200 && hasBase600;
      const tips = [];
      if (!hasSinOsc) tips.push("Necesitas SinOsc.ar como oscilador principal.");
      if (!hasLFPulse) tips.push("Usa LFPulse.ar dentro del primer argumento de SinOsc — genera 0 o 1 para alternar entre dos frecuencias.");
      if (hasLFPulse && !hasRate1) tips.push("El primer argumento de LFPulse.ar es la velocidad de alternancia (veces por segundo).");
      if (!hasRange200) tips.push("La diferencia entre 800 Hz y 600 Hz es el rango que debes multiplicar por LFPulse.");
      if (!hasBase600) tips.push("La frecuencia más baja (base) se suma al resultado de LFPulse * diferencia.");
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
    goal: "Alarma de coche: barrido descendente entre 700 y 900 Hz, 2 veces por segundo, amplitud 0.4",
    theory: `Las alarmas de coche suelen usar un barrido descendente rápido
que se repite en bucle. Empieza agudo y cae.

LFSaw normalmente sube de -1 a +1 (rampa ascendente).
Si usas iphase: 1 inviertes la dirección: baja de +1 a -1.

  LFSaw.ar(frq, iphase, mul, add) // Utiliza solo frea e iphase para este ejercicio 

  freq    → las veces por segundo que se repite el barrido.
  iphase  → fase inicial. Con 1 la rampa es descendente.

Para que el barrido sea descendente en frecuencia, la
diferencia de Hz que multiplicas debe ser negativa:

  LFSaw.ar(freq, 1) * (-rango) + centro

  centro - rango = frecuencia mínima
  centro + 0     = frecuencia máxima (al inicio del ciclo)`,
    starter: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  SinOsc.ar(\n    LFSaw.ar(FRECUENCIA, 1) * (-RANGO) + CENTRO,\n    0, 0.4\n  ) ! 2\n}.play`,
    answer: `// Alarma de coche: barrido descendente\n{\n  SinOsc.ar(\n    LFSaw.ar(2, 1) * (-200) + 900,\n    0, 0.4\n  ) ! 2\n}.play`,
    validate(code) {
      const hasSinOsc = /SinOsc/.test(code);
      const hasLFSaw = /LFSaw/.test(code);
      const hasLFSawWithIphase = /LFSaw\.ar\s*\(\s*2\s*,\s*1\s*\)/.test(code);
      const hasNeg200 = /\(\s*-\s*200\s*\)|\*\s*-\s*200\b/.test(code);
      const hasBase900 = /900/.test(code);
      const ok = hasSinOsc && hasLFSaw && hasLFSawWithIphase && hasNeg200 && hasBase900;
      const tips = [];
      if (!hasLFSaw) tips.push("Usa LFSaw.ar dentro del primer argumento de SinOsc para barrer la frecuencia.");
      if (hasLFSaw && !hasLFSawWithIphase) tips.push("LFSaw.ar tiene un segundo argumento llamado iphase. Cambiarlo a 1 invierte la dirección de la rampa.");
      if (!hasNeg200) tips.push("Para que el barrido sea descendente, el rango de Hz que multiplicas debe ser negativo: * (-rango).");
      if (!hasBase900) tips.push("La frecuencia central (centro) se suma al final y determina el punto de partida del barrido.");
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
    goal: "Alarma de incendio: pulsos agudos a 3200 Hz intermitentes a 2 veces por segundo, amplitud 0.3",
    theory: `Las alarmas de incendio emiten pulsos cortos y penetrantes.
Se consigue con dos capas:

  1. Pulse.ar genera la onda aguda y continua.
  2. LFPulse.ar actúa como interruptor (0 o 1) que enciende
     y apaga esa onda a una velocidad lenta.

Al multiplicar ambos:
  Pulse.ar(frecuencia, ancho) * LFPulse.ar(velocidad)

  frecuencia → qué tan agudo es el tono del pitido (en Hz)
  ancho      → ancho de pulso de Pulse (0.5 para cuadrada perfecta)
  velocidad  → cuántas veces por segundo parpadea la alarma

La multiplicación hace que LFPulse "encienda" y "apague"
el oscilador Pulse de forma rítmica.`,
    starter: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  UGEN * UGEN * AMPLITUD ! 2\n}.play`,
    answer: `// Alarma de incendio: pulsos agudos\n{\n  Pulse.ar(3200, 0.5) * LFPulse.ar(2) * 0.3 ! 2\n}.play`,
    validate(code) {
      const hasPulseAr = /Pulse\.ar/.test(code);
      const hasFreq3200 = /Pulse\.ar\s*\(\s*3200\b/.test(code);
      const hasLFPulse = /LFPulse/.test(code);
      const hasLFPulseRate2 = /LFPulse\.ar\s*\(\s*2\s*\)/.test(code);
      const ok = hasPulseAr && hasFreq3200 && hasLFPulse && hasLFPulseRate2;
      const tips = [];
      if (!hasPulseAr) tips.push("Usa Pulse.ar como oscilador principal para generar la onda cuadrada aguda.");
      if (hasPulseAr && !hasFreq3200) tips.push("El primer argumento de Pulse.ar es la frecuencia del tono. Las alarmas de incendio son muy agudas.");
      if (!hasLFPulse) tips.push("Usa LFPulse.ar y multiplícalo por Pulse.ar para crear la intermitencia rítmica.");
      if (hasLFPulse && !hasLFPulseRate2) tips.push("El primer argumento de LFPulse.ar es la velocidad de parpadeo (veces por segundo).");
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
    goal: "Pitido de microondas: tono a 1000 Hz con ataque 0.01s y caída 0.1s",
    theory: `Los electrodomésticos usan pitidos cortos con envolvente percusiva.
En lugar de un tono continuo, el sonido sube y baja en amplitud rápidamente.

EnvGen.kr genera esa forma de amplitud. Se multiplica por el oscilador:
  SinOsc.ar(freq) * EnvGen.kr(envolvente)

Env.perc define la forma de la envolvente:
  Env.perc(ataque, caída)

  ataque → tiempo en segundos que tarda en subir al volumen máximo
           (muy corto, como 0.01 s)
  caída  → tiempo en segundos que tarda en bajar a silencio
           (algo más largo, como 0.1 s)

doneAction: Done.freeSelf libera el synth cuando termina la envolvente.`,
    starter: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  SinOsc.ar(FRECUENCIA) *\n  EnvGen.kr(Env.perc(ATAQUE, CAIDA), doneAction: Done.freeSelf) ! 2\n}.play`,
    answer: `// Pitido corto de microondas\n{\n  SinOsc.ar(1000) *\n  EnvGen.kr(Env.perc(0.01, 0.1), doneAction: Done.freeSelf) ! 2\n}.play`,
    validate(code) {
      const hasSinOsc = /SinOsc/.test(code);
      const hasFreq1000 = /SinOsc\.ar\s*\(\s*1000\s*\)/.test(code);
      const hasEnvGen = /EnvGen/.test(code);
      const hasEnvPerc = /Env\.perc/.test(code);
      const hasPercValues = /Env\.perc\s*\(\s*0\.01\s*,\s*0\.1\s*\)/.test(code);
      const ok = hasSinOsc && hasFreq1000 && hasEnvGen && hasEnvPerc && hasPercValues;
      const tips = [];
      if (!hasEnvGen) tips.push("Usa EnvGen.kr y multiplícalo por SinOsc.ar para dar forma al volumen en el tiempo.");
      if (!hasEnvPerc) tips.push("Usa Env.perc(ataque, caída) como envolvente dentro de EnvGen.kr.");
      if (hasEnvPerc && !hasPercValues) tips.push("Env.perc necesita dos tiempos: el de ataque (subida) y el de caída, ambos en segundos.");
      if (hasSinOsc && !hasFreq1000) tips.push("El primer argumento de SinOsc.ar es la frecuencia del pitido en Hz.");
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
    goal: "Temporizador de cocina: tono a 880 Hz con ataque 0.05s y caída 0.3s",
    theory: `Los temporizadores de cocina usan tonos con caída rápida.
La envolvente define la "personalidad" del sonido:

  Env.perc(ataque, caída)

  ataque → tiempo que tarda en alcanzar el volumen máximo
           Un ataque largo (0.05 s) da un inicio más suave.
  caída  → tiempo que tarda en apagarse
           Una caída larga (0.3 s) deja que el sonido resuene.

Compara con el ejercicio anterior (0.01/0.1):
  0.01 s ataque + 0.1 s caída = pitido seco (microondas)
  0.05 s ataque + 0.3 s caída = tono más resonante (temporizador)

Misma estructura: SinOsc.ar(freq) * EnvGen.kr(Env.perc(...))`,
    starter: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  SinOsc.ar(FRECUENCIA) *\n  EnvGen.kr(Env.perc(ATAQUE, CAIDA), doneAction: Done.freeSelf) ! 2\n}.play`,
    answer: `// Temporizador de cocina\n{\n  SinOsc.ar(880) *\n  EnvGen.kr(Env.perc(0.05, 0.3), doneAction: Done.freeSelf) ! 2\n}.play`,
    validate(code) {
      const hasSinOsc = /SinOsc/.test(code);
      const hasFreq880 = /SinOsc\.ar\s*\(\s*880\s*\)/.test(code);
      const hasEnvGen = /EnvGen/.test(code);
      const hasEnvPerc = /Env\.perc/.test(code);
      const hasPercValues = /Env\.perc\s*\(\s*0\.05\s*,\s*0\.3\s*\)/.test(code);
      const ok = hasSinOsc && hasFreq880 && hasEnvGen && hasEnvPerc && hasPercValues;
      const tips = [];
      if (!hasEnvGen) tips.push("Usa EnvGen.kr multiplicado por SinOsc.ar para dar forma al volumen en el tiempo.");
      if (!hasEnvPerc) tips.push("Usa Env.perc(ataque, caída) para definir cómo sube y baja el sonido.");
      if (hasEnvPerc && !hasPercValues) tips.push("Los tiempos de ataque y caída del objetivo están en la descripción del ejercicio (en segundos).");
      if (hasSinOsc && !hasFreq880) tips.push("El primer argumento de SinOsc.ar es la frecuencia en Hz. Busca cuál corresponde al objetivo.");
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
    goal: "Despertador digital: onda cuadrada a 1200 Hz intermitente a 4 veces por segundo, amplitud 0.3",
    theory: `Los despertadores digitales usan ondas cuadradas agudas
con una intermitencia rítmica para captar la atención.

La técnica es la misma que en la alarma de incendio:
multiplica el oscilador por un LFPulse para la intermitencia:

  Pulse.ar(frecuencia, ancho) * LFPulse.kr(velocidad) * amplitud

  Nota: aquí usamos LFPulse.kr en lugar de .ar
  .kr (control rate) es más eficiente para señales lentas
  que no necesitan precisión de audio.

  frecuencia            → el tono agudo del pitido (Hz)
  ancho                 → ancho de pulso de Pulse (0.5 para cuadrada perfecta)
  frecuencia (LFPulse)  → cuántas veces por segundo parpadea (Hz)
  amplitud              → volumen general`,
    starter: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  UGEN(FRECUENCIA, ANCHO) *\n  UGEN(FRECUENCIA) * AMPLITUD ! 2\n}.play`,
    answer: `// Despertador digital\n{\n  Pulse.ar(1200, 0.5) * LFPulse.kr(4) * 0.3 ! 2\n}.play`,
    validate(code) {
      const hasPulseAr = /Pulse\.ar/.test(code);
      const hasFreq1200 = /Pulse\.ar\s*\(\s*1200\b/.test(code);
      const hasWidth05 = /Pulse\.ar\s*\(\s*1200\s*,\s*0\.5\s*\)/.test(code);
      const hasLFPulse = /LFPulse/.test(code);
      const hasRate4 = /LFPulse\.\w+\s*\(\s*4\s*\)/.test(code);
      const ok = hasPulseAr && hasWidth05 && hasLFPulse && hasRate4;
      const tips = [];
      if (!hasPulseAr) tips.push("Usa Pulse.ar como oscilador principal para la onda cuadrada aguda.");
      if (hasPulseAr && !hasFreq1200) tips.push("El primer argumento de Pulse.ar es la frecuencia del tono del despertador en Hz.");
      if (hasPulseAr && hasFreq1200 && !hasWidth05) tips.push("El segundo argumento de Pulse.ar es el ancho del pulso. ¿Qué valor produce una onda cuadrada perfecta?");
      if (!hasLFPulse) tips.push("Multiplica Pulse.ar por LFPulse.kr para crear el efecto de intermitencia rítmica.");
      if (hasLFPulse && !hasRate4) tips.push("El primer argumento de LFPulse.kr es la velocidad de parpadeo en Hz.");
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
    goal: "Señal de evacuación: barrido ascendente de 300 a 1200 Hz, una vez cada 2 segundos, amplitud 0.4",
    theory: `Las señales de evacuación (WHOOP) usan un barrido ascendente
lento que se repite, diseñado para ser inconfundible.

LFSaw.ar genera valores de -1 a 1 en rampa ascendente.
Para convertirlos en un rango de frecuencias útil:

  LFSaw.ar(frecuencia) * mitad_del_rango + centro

  frecuencia       → cuántas veces por segundo se repite (Hz)
  mitad_del_rango  → la mitad de la diferencia entre la frecuencia
                     máxima y la mínima
  centro           → el punto medio entre la frecuencia más alta y
                     la más baja

Ejemplo de cálculo:
  mínimo          = 300 Hz, máximo = 1200 Hz
  centro          = (300 + 1200) / 2 = 750
  mitad_del_rango = (1200 - 300) / 2 = 450

  → LFSaw.ar(vel) * 450 + 750 oscila entre 300 y 1200 Hz`,
    starter: `// Reemplaza las palabras en MAYÚSCULAS:\n{\n  UGEN(\n    UGEN(FRECUENCIA) * MITAD_RANGO + CENTRO,\n    FASE,\n    AMPLITUD\n  ) ! 2\n}.play`,
    answer: `// Señal de evacuación: barrido ascendente\n{\n  SinOsc.ar(\n    LFSaw.ar(0.5) * 450 + 750,\n    0, 0.4\n  ) ! 2\n}.play`,
    validate(code) {
      const hasSinOsc = /SinOsc/.test(code);
      const hasLFSaw = /LFSaw/.test(code);
      const hasRate05 = /LFSaw\.ar\s*\(\s*0\.5\s*\)/.test(code);
      const hasDepth450 = /450/.test(code);
      const hasCenter750 = /750/.test(code);
      const ok = hasSinOsc && hasLFSaw && hasRate05 && hasDepth450 && hasCenter750;
      const tips = [];
      if (!hasSinOsc) tips.push("Usa SinOsc.ar como oscilador principal. El primer argumento será la expresión de frecuencia.");
      if (!hasLFSaw) tips.push("Usa LFSaw.ar dentro del primer argumento de SinOsc para que la frecuencia suba de forma cíclica.");
      if (hasLFSaw && !hasRate05) tips.push("El primer argumento de LFSaw.ar es la velocidad del barrido. Una sirena de evacuación es lenta.");
      if (!hasDepth450) tips.push("Multiplica LFSaw por la mitad del rango de frecuencias. Calcula: (máximo - mínimo) / 2.");
      if (!hasCenter750) tips.push("Suma la frecuencia central. Calcula: (máximo + mínimo) / 2.");
      const m = code.match(/LFSaw\.ar\s*\(\s*(\d+(?:\.\d+)?)/);
      const rate = m ? parseFloat(m[1]) : 0.5;
      return {
        ok, tips,
        audio: { freq: 750, amp: 0.4, type: "sine", lfo: { rate, depth: 450, shape: "sawtooth", target: "frequency" } },
      };
    },
  },
];
