import type { AudioConfig, LocalizedString, SCCodeValidation } from "@/types";
import { t, type UIKey } from "@/i18n/ui";

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
  const errorKeys: UIKey[] = [];

  if (!hasBalancedPairs(code, "{", "}")) errorKeys.push("sc_err_braces");
  if (!hasBalancedPairs(code, "(", ")")) errorKeys.push("sc_err_parens");
  if (!hasBalancedPairs(code, "[", "]")) errorKeys.push("sc_err_brackets");
  if (!/\.play\b/.test(code)) errorKeys.push("sc_err_play");

  const soundUgenPattern = new RegExp(`\\b(${MAIN_UGEN}|${NOISE_UGEN})\\.ar\\s*\\(`);
  if (!soundUgenPattern.test(code)) errorKeys.push("sc_err_ugen");

  // Strip single-line comments before checking for UPPERCASE placeholders so
  // comments like "// Replace the UPPERCASE words:" don't trigger a false positive.
  const codeBody = code.replace(/\/\/.*/g, "");
  if (/\b[A-Z]{3,}\b/.test(codeBody)) errorKeys.push("sc_err_placeholders");

  const errors: LocalizedString[] = errorKeys.map((key) => ({
    en: t("en", key),
    es: t("es", key),
    fr: t("fr", key),
  }));

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
    new RegExp(`\\b(${NOISE_UGEN})\\.ar\\s*\\(\\s*(\\d+(?:\\.\\d+)?)?`),
  );
  if (!match) return null;
  return {
    type: "noise",
    color: NOISE_COLORS[match[1]],
    amp: match[2] ? parseFloat(match[2]) : 1,
  };
}

function getMixConfig(code: string): AudioConfig | null {
  // Capture up to 3 args: (arg1, arg2, arg3)
  // arg2 may be negative (e.g. SC phase values)
  const oscPattern = new RegExp(
    `\\b(${MAIN_UGEN}|${NOISE_UGEN})\\.ar\\s*\\(\\s*(\\d+(?:\\.\\d+)?)(?:\\s*,\\s*(-?\\d+(?:\\.\\d+)?))?(?:\\s*,\\s*(\\d+(?:\\.\\d+)?))?`,
    "g",
  );
  const matches = [...code.matchAll(oscPattern)];
  if (matches.length < 2) return null;

  const oscillators = matches.map((m) => {
    const name = m[1];
    if (NOISE_COLORS[name]) {
      // WhiteNoise.ar(mul) — first arg is mul
      const amp = m[2] ? parseFloat(m[2]) : undefined;
      return { type: NOISE_COLORS[name] as "white" | "pink" | "brown", ...(amp !== undefined ? { amp } : {}) };
    }
    const oscType = OSC_TYPES[name] as "sine" | "sawtooth" | "square" | "triangle";
    const freq = parseFloat(m[2]);
    // Pulse.ar(freq, width, mul) / SinOsc.ar(freq, phase, mul) / LFTri.ar(freq, iphase, mul) → mul is arg3
    // Saw.ar(freq, mul) → mul is arg2
    const mulStr = name === "Saw" ? m[3] : m[4];
    const amp = mulStr ? parseFloat(mulStr) : undefined;
    const pulseWidth = oscType === "square" && m[3] ? parseFloat(m[3]) : undefined;
    // SinOsc phase is in radians (0–2π) → degrees: × (180/π)
    // LFTri iphase is in cycles (0–2) → degrees: × 180
    // Pulse arg2 is width (not phase); Saw has no phase arg
    let phase: number | undefined;
    if (name === "SinOsc" && m[3]) phase = parseFloat(m[3]) * (180 / Math.PI);
    if (name === "LFTri" && m[3]) phase = parseFloat(m[3]) * 180;
    return { type: oscType, freq, ...(pulseWidth !== undefined ? { pulseWidth } : {}), ...(amp !== undefined ? { amp } : {}), ...(phase !== undefined ? { phase } : {}) };
  });

  const ampMatch = code.match(/\)\s*\*\s*(\d+(?:\.\d+)?)/);
  return {
    type: "mix",
    oscillators,
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

  // Extract the oscillator's own mul arg so users can experiment with it.
  // Saw.ar(freq, mul) → 2nd arg; all others (SinOsc/Pulse/LFTri) → 3rd arg.
  const oscMulMatch = type === "sawtooth"
    ? code.match(/\bSaw\.ar\s*\(\s*\d+(?:\.\d+)?\s*,\s*(\d+(?:\.\d+)?)/)
    : code.match(new RegExp(`\\b(?:${MAIN_UGEN})\\.ar\\s*\\(\\s*\\d+(?:\\.\\d+)?\\s*,\\s*-?\\d+(?:\\.\\d+)?\\s*,\\s*(\\d+(?:\\.\\d+)?)`));
  const oscMul = oscMulMatch ? parseFloat(oscMulMatch[1]) : 1;
  const outerAmp = ampMatch ? parseFloat(ampMatch[1]) : 1;

  return {
    freq,
    amp: outerAmp * oscMul,
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

  const iphaseMatch = code.match(
    new RegExp(
      `${lfoName}\\.(?:ar|kr)\\s*\\(\\s*\\d+(?:\\.\\d+)?\\s*,\\s*(\\d+(?:\\.\\d+)?)`,
    ),
  );
  // SC iphase is in cycles (0–2); Tone.LFO phase is in degrees (0–360)
  const phase = iphaseMatch ? parseFloat(iphaseMatch[1]) * 180 : 0;

  const depthMatch = code.match(
    new RegExp(
      `${lfoName}\\.(?:ar|kr)\\s*\\([^)]*\\)\\s*\\*\\s*\\(?\\s*(-?\\s*\\d+(?:\\.\\d+)?)`,
    ),
  );
  let depth = depthMatch ? parseFloat(depthMatch[1].replace(/\s/g, "")) : 100;

  const centerMatch = code.match(/\+\s*(\d+(?:\.\d+)?)/);
  let center = centerMatch ? parseFloat(centerMatch[1]) : 440;

  // LFPulse outputs 0..1 (asymmetric). Shift to midpoint so audio.ts' symmetric
  // min/max formula renders the intended [center, center + depth] range.
  let lfoWidth: number | undefined;
  if (lfoName === "LFPulse") {
    center += depth / 2;
    depth = depth / 2;
    const widthMatch = code.match(
      /LFPulse\.(?:ar|kr)\s*\(\s*\d+(?:\.\d+)?\s*,\s*\d+(?:\.\d+)?\s*,\s*(\d+(?:\.\d+)?)/,
    );
    lfoWidth = widthMatch ? parseFloat(widthMatch[1]) : undefined;
  }

  const ampMatch = code.match(
    /\+\s*\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*,\s*(\d+(?:\.\d+)?)/,
  );

  // Pulse.ar(lfo_expr, width, amp): the second arg after "+ center," is the width
  const pulseWidthMatch = type === "square"
    ? code.match(/\+\s*\d+(?:\.\d+)?\s*,\s*([\d.]+)/)
    : null;
  const pulseWidth = pulseWidthMatch ? parseFloat(pulseWidthMatch[1]) : undefined;

  return {
    freq: center,
    amp: ampMatch ? parseFloat(ampMatch[1]) : 1,
    type,
    ...(pulseWidth !== undefined ? { pulseWidth } : {}),
    lfo: { rate, depth, shape: LFO_SHAPES[lfoName], target: "frequency", phase, width: lfoWidth },
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
    /Env\.perc\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)(?:\s*,\s*([\d.]+))?/,
  );
  if (!perc) return { type, amp: 0.4, sweep };

  return {
    type,
    amp: perc[3] ? parseFloat(perc[3]) : 0.4,
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
  const pulseWidth = type === "square" ? getPulseWidth(code) : undefined;

  const threeArg = code.match(
    /\.ar\s*\(\s*\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*,\s*(\d+(?:\.\d+)?)/,
  );
  const sawTwoArg = code.match(/\bSaw\.ar\s*\(\s*\d+(?:\.\d+)?\s*,\s*(\d+(?:\.\d+)?)/);

  const perc = code.match(
    /Env\.perc\s*\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)(?:\s*,\s*([\d.]+))?/,
  );
  const envLevel = perc?.[3] ? parseFloat(perc[3]) : undefined;
  const amp = threeArg ? parseFloat(threeArg[1]) : sawTwoArg ? parseFloat(sawTwoArg[1]) : (envLevel ?? 0.5);

  if (!perc) return { freq, amp, type, pulseWidth };

  return {
    freq,
    amp,
    type,
    pulseWidth,
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

function getPulseWidth(code: string): number | undefined {
  // Pulse.ar(freq, width, ...) — second arg is the duty cycle (0–1)
  const match = code.match(
    /Pulse\.ar\s*\(\s*\d+(?:\.\d+)?\s*,\s*(\d+(?:\.\d+)?)/,
  );
  return match ? parseFloat(match[1]) : undefined;
}

function getPlainConfig(code: string, type: OscillatorType): AudioConfig {
  const freq = getMainFreq(code) ?? 440;
  const pulseWidth = type === "square" ? getPulseWidth(code) : undefined;

  const threeArg = code.match(
    /\.ar\s*\(\s*\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?\s*,\s*(\d+(?:\.\d+)?)/,
  );
  if (threeArg) return { freq, amp: parseFloat(threeArg[1]), type, pulseWidth };

  const sawTwoArg = code.match(
    /\bSaw\.ar\s*\(\s*\d+(?:\.\d+)?\s*,\s*(\d+(?:\.\d+)?)/,
  );
  if (sawTwoArg) return { freq, amp: parseFloat(sawTwoArg[1]), type, pulseWidth };

  return { freq, type, pulseWidth };
}

export function parseSCCode(code: string): AudioConfig {
  const stereo = /!\s*2/.test(code);

  const mix = getMixConfig(code);
  if (mix) return { ...mix, stereo };

  const noise = getNoiseConfig(code);
  if (noise) return { ...noise, stereo };

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
