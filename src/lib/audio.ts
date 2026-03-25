import * as Tone from "tone";
import type { AudioConfig, AudioRefs } from "@/types";

export function createNoise(audio: AudioConfig): Pick<AudioRefs, "noise"> {
  const noise = new Tone.Noise(audio.color).toDestination();
  noise.volume.value = Tone.gainToDb(audio.amp ?? 0.1);
  noise.start();
  return { noise };
}

export function createDTMF(
  audio: AudioConfig,
): Pick<AudioRefs, "synth" | "synth2"> {
  const [f1, f2] = audio.freqs ?? [770, 1336];
  const gain = new Tone.Gain(audio.amp ?? 0.2).toDestination();
  const s1 = new Tone.Oscillator(f1, "sine").connect(gain);
  const s2 = new Tone.Oscillator(f2, "sine").connect(gain);
  s1.start();
  s2.start();
  return { synth: s1, synth2: s2 };
}

export function createLFOSynth(
  audio: AudioConfig,
): Pick<AudioRefs, "synth" | "lfo"> {
  const freq = audio.freq ?? 440;
  const lfo = new Tone.LFO(
    audio.lfo!.rate,
    freq - audio.lfo!.depth,
    freq + audio.lfo!.depth,
  ).start();
  const synth = new Tone.Synth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.05, decay: 0, sustain: 1, release: 0.3 },
    volume: Tone.gainToDb(audio.amp ?? 0.3),
  }).toDestination();
  lfo.connect(synth.oscillator.frequency);
  synth.triggerAttack(freq);
  return { synth, lfo };
}

export function createEnvSynth(audio: AudioConfig): Pick<AudioRefs, "synth"> {
  const synth = new Tone.Synth({
    oscillator: { type: (audio.type ?? "sine") as OscillatorType },
    envelope: { attack: 0.01, decay: 0.5, sustain: 0, release: 0.1 },
    volume: Tone.gainToDb(audio.amp ?? 0.3),
  }).toDestination();
  synth.triggerAttackRelease(audio.freq ?? 440, "2n");
  return { synth };
}

export function createSynth(audio: AudioConfig): Pick<AudioRefs, "synth"> {
  const synth = new Tone.Synth({
    oscillator: { type: (audio.type ?? "sine") as OscillatorType },
    envelope: { attack: 0.05, decay: 0, sustain: 1, release: 0.5 },
    volume: Tone.gainToDb(audio.amp ?? 0.3),
  }).toDestination();
  synth.triggerAttack(audio.freq ?? 440);
  return { synth };
}
