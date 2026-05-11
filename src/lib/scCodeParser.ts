import type { AudioConfig, SCCodeValidation } from "@/types";

const SOUND_UGEN = "(SinOsc|Saw|Pulse|LFTri|WhiteNoise|PinkNoise|BrownNoise)";

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

  const hasBalancedBraces = hasBalancedPairs(code, "{", "}");
  if (!hasBalancedBraces) errors.push("Falta cerrar o abrir correctamente llaves { }.");

  const hasBalancedParens = hasBalancedPairs(code, "(", ")");
  if (!hasBalancedParens)
    errors.push("Falta cerrar o abrir correctamente paréntesis ( ).");

  const hasBalancedBrackets = hasBalancedPairs(code, "[", "]");
  if (!hasBalancedBrackets)
    errors.push("Falta cerrar o abrir correctamente corchetes [ ].");

  const hasPlayCall = /\.play\b/.test(code);
  if (!hasPlayCall)
    errors.push("Agrega .play al final para ejecutar el bloque de audio.");

  const hasUGenArCall = new RegExp(`\\b${SOUND_UGEN}\\.ar\\s*\\(`).test(code);
  if (!hasUGenArCall) {
    errors.push(
      "Usa un UGen con llamada .ar(...) para generar audio.",
    );
  }

  return { ok: errors.length === 0, errors };
}

export function isPlayableSCCode(code: string): boolean {
  return validateSCCode(code).ok;
}

function getFreq(code: string): number {
  const match = code.match(
    /(?:SinOsc|Saw|Pulse|LFTri)\.ar\(\s*(-?\d+(?:\.\d+)?)/,
  );
  return match ? parseFloat(match[1]) : 440;
}

function getAmp(code: string): number {
  // Third arg: SinOsc.ar(freq, phase, mul), Pulse.ar(freq, width, mul), LFTri.ar(freq, iphase, mul)
  const thirdArg = code.match(/\.ar\([^)]*,\s*[^,)]*,\s*(-?\d+(?:\.\d+)?)/);
  if (thirdArg) return parseFloat(thirdArg[1]);
  // Second arg: Saw.ar(freq, mul)
  const sawArg = code.match(/Saw\.ar\s*\(\s*-?\d+(?:\.\d+)?\s*,\s*(-?\d+(?:\.\d+)?)\s*\)/);
  if (sawArg) return parseFloat(sawArg[1]);
  // Single arg: WhiteNoise.ar(mul), PinkNoise.ar(mul), BrownNoise.ar(mul)
  const noiseArg = code.match(/(?:WhiteNoise|PinkNoise|BrownNoise)\.ar\s*\(\s*(\d+(?:\.\d+)?)\s*\)/);
  if (noiseArg) return parseFloat(noiseArg[1]);
  return 1;
}

function getOscType(code: string): OscillatorType | null {
  const OSC_TYPES: Record<string, OscillatorType> = {
    SinOsc: "sine",
    Saw: "sawtooth",
    Pulse: "square",
    LFTri: "triangle",
  };
  const match = code.match(/\b(SinOsc|Saw|Pulse|LFTri)\b/);
  return match ? OSC_TYPES[match[1]] : null;
}

function getNoiseConfig(code: string, amp: number): AudioConfig | null {
  if (/WhiteNoise/.test(code)) return { type: "noise", color: "white", amp };
  if (/PinkNoise/.test(code)) return { type: "noise", color: "pink", amp };
  if (/BrownNoise/.test(code)) return { type: "noise", color: "brown", amp };
  return null;
}

function getDtmfConfig(code: string, amp: number): AudioConfig | null {
  const dtmfFreqs = [...code.matchAll(/SinOsc\.ar\(\s*(\d+)/g)].map((m) =>
    parseFloat(m[1]),
  );
  if (dtmfFreqs.length >= 2) {
    return { type: "dtmf", freqs: dtmfFreqs.slice(0, 2), amp };
  }
  return null;
}

function getLfoConfig(
  code: string,
  freq: number,
  amp: number,
): AudioConfig | null {
  const lfoMatch = code.match(/LF(?:Saw|Pulse|Tri)\.(?:ar|kr)\(\s*(\d+(?:\.\d+)?)/);
  if (!lfoMatch) return null;

  const depthMatch = code.match(
    /LF(?:Saw|Pulse|Tri)\.(?:ar|kr)\([^)]*\)\s*\*\s*(-?\d+(?:\.\d+)?)/,
  );

  return {
    freq,
    amp,
    type: "sine",
    lfo: {
      rate: parseFloat(lfoMatch[1]),
      depth: depthMatch ? parseFloat(depthMatch[1]) : 100,
    },
  };
}

function getPanConfig(
  code: string,
  freq: number,
  amp: number,
  type: OscillatorType,
): AudioConfig | null {
  if (!/Pan2/.test(code)) return null;

  const panLfoMatch = code.match(/SinOsc\.kr\(\s*(\d+(?:\.\d+)?)/);
  return {
    freq,
    amp,
    type,
    pan: true,
    lfo: { rate: panLfoMatch ? parseFloat(panLfoMatch[1]) : 0.5, depth: 0 },
  };
}

function getEnvConfig(
  code: string,
  freq: number,
  amp: number,
  type: OscillatorType,
): AudioConfig | null {
  if (!/Env\.perc|EnvGen/.test(code)) return null;

  const perc = code.match(
    /Env\.perc\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/,
  );
  if (!perc) return { freq, amp, type };

  const attack = parseFloat(perc[1]);
  const decay = parseFloat(perc[2]); // SC's `releaseTime` in Env.perc
  return {
    freq,
    amp,
    type,
    env: {
      attack,
      decay,
      sustain: 0,
      release: 0.001,
      attackCurve: "linear",
      decayCurve: "linear",
    },
  };
}

export function parseSCCode(code: string): AudioConfig {
  const freq = getFreq(code);
  const amp = getAmp(code);
  const type = getOscType(code);

  const noiseConfig = getNoiseConfig(code, amp);
  if (noiseConfig) return noiseConfig;

  const dtmfConfig = getDtmfConfig(code, amp);
  if (dtmfConfig) return dtmfConfig;

  const lfoConfig = getLfoConfig(code, freq, amp);
  if (lfoConfig) return lfoConfig;

  if (!type) return {};

  const panConfig = getPanConfig(code, freq, amp, type);
  if (panConfig) return panConfig;

  const envConfig = getEnvConfig(code, freq, amp, type);
  if (envConfig) return envConfig;

  return { freq, amp, type };
}