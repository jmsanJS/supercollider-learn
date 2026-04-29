import type { AudioConfig } from "@/types";

const OSC_TYPES: Record<string, OscillatorType> = {
  SinOsc: "sine",
  Saw: "sawtooth",
  Pulse: "square",
  LFTri: "triangle",
};

function getFreq(code: string): number {
  const match = code.match(
    /(?:SinOsc|Saw|Pulse|LFTri)\.ar\(\s*(-?\d+(?:\.\d+)?)/,
  );
  return match ? parseFloat(match[1]) : 440;
}

function getAmp(code: string): number {
  const match = code.match(/\.ar\([^)]*,\s*[^,)]*,\s*(-?\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0.3;
}

function getOscType(code: string): OscillatorType {
  const match = code.match(/\b(SinOsc|Saw|Pulse|LFTri)\b/);
  return match ? OSC_TYPES[match[1]] : "sine";
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

  const panConfig = getPanConfig(code, freq, amp, type);
  if (panConfig) return panConfig;

  const envConfig = getEnvConfig(code, freq, amp, type);
  if (envConfig) return envConfig;

  return { freq, amp, type };
}