import type { AudioConfig } from "@/types";

const OSC_TYPES: Record<string, OscillatorType> = {
  SinOsc: "sine",
  Saw:    "sawtooth",
  Pulse:  "square",
  LFTri:  "triangle",
};

export function parseSCCode(code: string): AudioConfig {
  const freqMatch = code.match(/(?:SinOsc|Saw|Pulse|LFTri)\.ar\(\s*(-?\d+(?:\.\d+)?)/);
  const freq = freqMatch ? parseFloat(freqMatch[1]) : 440;

  const ampMatch = code.match(/\.ar\([^)]*,\s*[^,)]*,\s*(-?\d+(?:\.\d+)?)/);
  const amp = ampMatch ? parseFloat(ampMatch[1]) : 1;

  const oscMatch = code.match(/\b(SinOsc|Saw|Pulse|LFTri)\b/);
  const type = oscMatch ? OSC_TYPES[oscMatch[1]] : "sine";

  if (/WhiteNoise/.test(code)) return { type: "noise", color: "white", amp };
  if (/PinkNoise/.test(code))  return { type: "noise", color: "pink",  amp };
  if (/BrownNoise/.test(code)) return { type: "noise", color: "brown", amp };

  const dtmfFreqs = [...code.matchAll(/SinOsc\.ar\(\s*(\d+)/g)].map(m => parseFloat(m[1]));
  if (dtmfFreqs.length >= 2) {
    return { type: "dtmf", freqs: dtmfFreqs.slice(0, 2), amp };
  }

  const lfoMatch = code.match(/LF(?:Saw|Pulse|Tri)\.(?:ar|kr)\(\s*(\d+(?:\.\d+)?)/);
  const depthMatch = code.match(/LF(?:Saw|Pulse|Tri)\.(?:ar|kr)\([^)]*\)\s*\*\s*(\d+(?:\.\d+)?)/);
  if (lfoMatch) {
    return {
      freq,
      amp,
      type: "sine",
      lfo: {
        rate:  parseFloat(lfoMatch[1]),
        depth: depthMatch ? parseFloat(depthMatch[1]) : 100,
      },
    };
  }

  if (/Pan2/.test(code)) {
    const panLfoMatch = code.match(/SinOsc\.kr\(\s*(\d+(?:\.\d+)?)/);
    return {
      freq,
      amp,
      type,
      pan: true,
      lfo: { rate: panLfoMatch ? parseFloat(panLfoMatch[1]) : 0.5, depth: 0 },
    };
  }

  if (/Env\.perc|EnvGen/.test(code)) {
    // Example: EnvGen.kr(Env.perc(0.01, 0.1), ...)
    const perc = code.match(
      /Env\.perc\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/,
    );
    if (perc) {
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
    return { freq, amp, type };
  }

  // Default
  return { freq, amp, type };
}