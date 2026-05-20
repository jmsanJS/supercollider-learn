import type { AudioConfig, SCCodeValidation } from "@/types";

const MAIN_UGEN = "SinOsc|Saw|Pulse|LFTri";
const NOISE_UGEN = "WhiteNoise|PinkNoise|BrownNoise";
const LFO_UGEN = "LFSaw|LFPulse|LFTri";

const OSC_TYPES: Record<string, OscillatorType> = {
  SinOsc: "sine",
  Saw: "sawtooth",
  Pulse: "square",
  LFTri: "triangle",
};

const LFO_SHAPES: Record<string, "sine" | "sawtooth" | "square" | "triangle"> = {
  LFSaw: "sawtooth",
  LFPulse: "square",
  LFTri: "triangle",
};

const NOISE_COLORS: Record<string, "white" | "pink" | "brown"> = {
  WhiteNoise: "white",
  PinkNoise: "pink",
  BrownNoise: "brown",
};

function hasBalancedPairs(
  code: string,
  openChar: string,
  closeChar: string,
): boolean {
  let depth = 0;
  for (const ch of code) {
    if (ch === openChar) depth += 1;
    if (ch === closeChar) {
      depth -= 1;
      if (depth < 0) return false;
    }
  }
  return depth === 0;
}

export function validateSCCode(code: string): SCCodeValidation {
  const errors: string[] = [];

  if (!hasBalancedPairs(code, "{", "}"))
    errors.push("Falta cerrar o abrir correctamente llaves { }.");
  if (!hasBalancedPairs(code, "(", ")"))
    errors.push("Falta cerrar o abrir correctamente paréntesis ( ).");
  if (!hasBalancedPairs(code, "[", "]"))
    errors.push("Falta cerrar o abrir correctamente corchetes [ ].");

  if (!/\.play\b/.test(code))
    errors.push("Agrega .play al final para ejecutar el bloque de audio.");

  const soundUgenPattern = new RegExp(
    `\\b(${MAIN_UGEN}|${NOISE_UGEN})\\.ar\\s*\\(`,
  );
  if (!soundUgenPattern.test(code))
    errors.push("Usa un UGen con llamada .ar(...) para generar audio.");

  return { ok: errors.length === 0, errors };
}

export function isPlayableSCCode(code: string): boolean {
  return validateSCCode(code).ok;
}

function getMainOscType(code: string): OscillatorType | null {
  const match = code.match(new RegExp(`\\b(${MAIN_UGEN})\\b`));
  return match ? OSC_TYPES[match[1]] : null;
}

function getMainFreq(code: string): number | null {
  const match = code.match(
    new RegExp(`\\b(?:${MAIN_UGEN})\\.ar\\s*\\(\\s*(\\d+(?:\\.\\d+)?)`),
  );
  return match ? parseFloat(match[1]) : null;
}

function getNoiseConfig(code: string): AudioConfig | null {
  const match = code.match(
    new RegExp(`\\b(${NOISE_UGEN})\\.ar\\s*\\(\\s*(\\d+(?:\\.\\d+)?)`),
  );
  if (!match) return null;
  return {
    type: "noise",
    color: NOISE_COLORS[match[1]],
    amp: parseFloat(match[2]),
  };
}

function getDtmfConfig(code: string): AudioConfig | null {
  const freqs = [
    ...code.matchAll(/SinOsc\.ar\s*\(\s*(\d+(?:\.\d+)?)\s*\)/g),
  ].map((m) => parseFloat(m[1]));
  if (freqs.length < 2) return null;
  const ampMatch = code.match(/\)\s*\*\s*(\d+(?:\.\d+)?)/);
  return {
    type: "dtmf",
    freqs: freqs.slice(0, 2),
    amp: ampMatch ? parseFloat(ampMatch[1]) : 1,
  };
}

function getAmConfig(code: string, type: OscillatorType): AudioConfig | null {
  // MainOsc.ar(freq, ...) * LFx.[ar|kr](rate) * amp
  const match = code.match(
    new RegExp(
      `\\b(?:${MAIN_UGEN})\\.ar\\s*\\(\\s*(\\d+(?:\\.\\d+)?)[^)]*\\)\\s*\\*\\s*(${LFO_UGEN})\\.(?:ar|kr)\\s*\\(\\s*(\\d+(?:\\.\\d+)?)`,
    ),
  );
  if (!match) return null;

  const freq = parseFloat(match[1]);
  const lfoName = match[2];
  const rate = parseFloat(match[3]);

  const ampMatch = code.match(
    new RegExp(
      `${lfoName}\\.(?:ar|kr)\\s*\\([^)]*\\)\\s*\\*\\s*(\\d+(?:\\.\\d+)?)`,
    ),
  );

  return {
    freq,
    amp: ampMatch ? parseFloat(ampMatch[1]) : 1,
    type,
    lfo: { rate, depth: 1, shape: LFO_SHAPES[lfoName], target: "amplitude" },
  };
}

function getFmConfig(code: string, type: OscillatorType): AudioConfig | null {
  // MainOsc.ar(LFx.[ar|kr](rate, ...) * depth + center, phase, amp)
  const match = code.match(
    new RegExp(
      `\\b(?:${MAIN_UGEN})\\.ar\\s*\\(\\s*(${LFO_UGEN})\\.(?:ar|kr)\\s*\\(\\s*(\\d+(?:\\.\\d+)?)`,
    ),
  );
  if (!match) return null;

  const lfoName = match[1];
  const rate = parseFloat(match[2]);

  const depthMatch = code.match(
    new RegExp(
      `${lfoName}\\.(?:ar|kr)\\s*\\([^)]*\\)\\s*\\*\\s*\\(?\\s*-?\\s*(\\d+(?:\\.\\d+)?)`,
    ),
  );
  let depth = depthMatch ? parseFloat(depthMatch[1]) : 100;

  const centerMatch = code.match(/\+\s*(\d+(?:\.\d+)?)/);
  let center = centerMatch ? parseFloat(centerMatch[1]) : 440;

  // LFPulse outputs 0..1 (asymmetric). Shift to midpoint so audio.ts' symmetric
  // min/max formula renders the intended [center, center + depth] range.
  if (lfoName === "LFPulse") {
    center += depth / 2;
    depth = depth / 2;
  }

  const ampMatch = code.match(
    /\+\s*\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*,\s*(\d+(?:\.\d+)?)/,
  );

  return {
    freq: center,
    amp: ampMatch ? parseFloat(ampMatch[1]) : 1,
    type,
    lfo: { rate, depth, shape: LFO_SHAPES[lfoName], target: "frequency" },
  };
}

function getSweepConfig(code: string, type: OscillatorType): AudioConfig | null {
  const xlineMatch = code.match(
    /XLine\.(?:ar|kr)\s*\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)/,
  );
  const lineMatch = code.match(
    /(?<![A-Za-z])Line\.(?:ar|kr)\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)/,
  );

  const activeMatch = xlineMatch ?? lineMatch;
  if (!activeMatch) return null;

  const curve = xlineMatch ? "exponential" : "linear";
  const sweep = {
    start: parseFloat(activeMatch[1]),
    end: parseFloat(activeMatch[2]),
    duration: parseFloat(activeMatch[3]),
    curve,
  } as const;

  const perc = code.match(
    /Env\.perc\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/,
  );
  if (!perc) return { type, amp: 0.4, sweep };

  return {
    type,
    amp: 0.4,
    sweep,
    env: {
      attack: parseFloat(perc[1]),
      decay: parseFloat(perc[2]),
      sustain: 0,
      release: 0.001,
      attackCurve: "linear",
      decayCurve: curve,
    },
  };
}

function getEnvConfig(code: string, type: OscillatorType): AudioConfig | null {
  if (!/Env\.perc|EnvGen/.test(code)) return null;

  const freq = getMainFreq(code) ?? 440;

  const perc = code.match(
    /Env\.perc\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/,
  );
  if (!perc) return { freq, amp: 0.5, type };

  return {
    freq,
    amp: 0.5,
    type,
    env: {
      attack: parseFloat(perc[1]),
      decay: parseFloat(perc[2]),
      sustain: 0,
      release: 0.001,
      attackCurve: "linear",
      decayCurve: "linear",
    },
  };
}

function getPanConfig(code: string, type: OscillatorType): AudioConfig | null {
  if (!/Pan2/.test(code)) return null;

  const freq = getMainFreq(code) ?? 440;
  const panLfoMatch = code.match(/SinOsc\.kr\s*\(\s*(\d+(?:\.\d+)?)/);
  return {
    freq,
    type,
    pan: true,
    lfo: { rate: panLfoMatch ? parseFloat(panLfoMatch[1]) : 0.5, depth: 0 },
  };
}

function getPlainConfig(code: string, type: OscillatorType): AudioConfig {
  const freq = getMainFreq(code) ?? 440;

  const threeArg = code.match(
    /\.ar\s*\(\s*\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*,\s*(\d+(?:\.\d+)?)/,
  );
  if (threeArg) return { freq, amp: parseFloat(threeArg[1]), type };

  const sawTwoArg = code.match(
    /\bSaw\.ar\s*\(\s*\d+(?:\.\d+)?\s*,\s*(\d+(?:\.\d+)?)/,
  );
  if (sawTwoArg) return { freq, amp: parseFloat(sawTwoArg[1]), type };

  return { freq, type };
}

export function parseSCCode(code: string): AudioConfig {
  const stereo = /!\s*2/.test(code);

  const noise = getNoiseConfig(code);
  if (noise) return { ...noise, stereo };

  const dtmf = getDtmfConfig(code);
  if (dtmf) return { ...dtmf, stereo };

  const type = getMainOscType(code);
  if (!type) return { stereo };

  const am = getAmConfig(code, type);
  if (am) return { ...am, stereo };

  const fm = getFmConfig(code, type);
  if (fm) return { ...fm, stereo };

  const sweep = getSweepConfig(code, type);
  if (sweep) return { ...sweep, stereo };

  const env = getEnvConfig(code, type);
  if (env) return { ...env, stereo };

  const pan = getPanConfig(code, type);
  if (pan) return { ...pan, stereo };

  return { ...getPlainConfig(code, type), stereo };
}
