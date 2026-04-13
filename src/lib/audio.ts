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
  const rate = audio.lfo!.rate;
  const depth = audio.lfo!.depth;
  const shape = audio.lfo!.shape ?? "sine";
  const target = audio.lfo!.target ?? "frequency";

  const amp = new Tone.Gain(audio.amp ?? 0.3).toDestination();

  const synth = new Tone.Synth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.05, decay: 0, sustain: 1, release: 0.3 },
  });

  synth.connect(amp);

  let lfo: Tone.LFO;

  if (target === "amplitude") {
    lfo = new Tone.LFO({
      frequency: rate,
      min: 0,
      max: audio.amp ?? 0.3,
      type: shape,
    })
      .connect(amp.gain)
      .start();
  } else {
    lfo = new Tone.LFO({
      frequency: rate,
      min: freq - depth,
      max: freq + depth,
      type: shape,
    })
      .connect(synth.oscillator.frequency)
      .start();
  }

  synth.triggerAttack(freq);

  return { synth, lfo };
}

export function createEnvSynth(audio: AudioConfig): Pick<AudioRefs, "synth"> {
  const synth = new Tone.Synth({
    oscillator: { type: audio.type as OscillatorType },
    envelope: {
      attack: audio.env?.attack,
      decay: audio.env?.decay,
      sustain: audio.env?.sustain,
      release: audio.env?.release,
      attackCurve: audio.env?.attackCurve,
      decayCurve: audio.env?.decayCurve,
    },
    volume: Tone.gainToDb(audio.amp ?? 1),
  }).toDestination();

  const timeInSecs =
    (audio.env?.attack ?? 0) +
    (audio.env?.decay ?? 0) +
    (audio.env?.sustain ?? 0) +
    (audio.env?.release ?? 0);

  synth.triggerAttackRelease(audio.freq ?? 440, timeInSecs);

  return { synth };
}

export function createSynth(audio: AudioConfig): Pick<AudioRefs, "synth"> {
  const synth = new Tone.Synth({
    oscillator: { type: (audio.type ?? "sine") as OscillatorType },
    envelope: { attack: 0.01, decay: 0, sustain: 1, release: 0.1 },
    volume: Tone.gainToDb(audio.amp ?? 0.3),
  }).toDestination();

  synth.triggerAttack(audio.freq ?? 440);

  return { synth };
}

export function createPanner(
  audio: AudioConfig,
): Pick<AudioRefs, "synth" | "lfo" | "panner"> {
  const panner = new Tone.Panner(0).toDestination();

  const lfo = new Tone.LFO({
    frequency: audio.lfo?.rate ?? 0.5,
    min: -1,
    max: 1,
    type: "sine",
  })
    .connect(panner.pan)
    .start();

  const synth = new Tone.Synth({
    oscillator: { type: (audio.type ?? "sine") as OscillatorType },
    envelope: { attack: 0.05, decay: 0, sustain: 1, release: 0.5 },
    volume: Tone.gainToDb(audio.amp ?? 0.3),
  }).connect(panner);

  synth.triggerAttack(audio.freq ?? 440);

  return { synth, lfo, panner };
}

export function createFilteredSynth(
  audio: AudioConfig,
): Pick<AudioRefs, "synth" | "filter"> {
  const filter = new Tone.Filter({
    type: audio.filter!.type,
    frequency: audio.filter!.freq,
    Q: audio.filter?.Q ?? 1,
  }).toDestination();

  const synth = new Tone.Synth({
    oscillator: { type: audio.type as OscillatorType },
    envelope: { attack: 0.05, decay: 0, sustain: 1, release: 0.5 },
    volume: Tone.gainToDb(audio.amp ?? 0.3),
  }).connect(filter);

  synth.triggerAttack(audio.freq ?? 220);

  return { synth, filter };
}

export function createFilteredNoise(
  audio: AudioConfig,
): Pick<AudioRefs, "noise" | "filter"> {
  const filter = new Tone.Filter({
    type: audio.filter!.type,
    frequency: audio.filter!.freq,
    Q: audio.filter?.Q ?? 4,
  }).toDestination();

  const noise = new Tone.Noise(audio.color ?? "white").connect(filter);
  noise.volume.value = Tone.gainToDb(audio.amp ?? 0.3);
  noise.start();

  return { noise, filter };
}

export function createReverbSynth(
  audio: AudioConfig,
): Pick<AudioRefs, "synth" | "reverb"> {
  const reverb = new Tone.Reverb({
    decay: (audio.reverb?.room ?? 0.5) * 6,
    wet: audio.reverb?.mix ?? 0.5,
    // no damp arg in Tone
  }).toDestination();

  const synth = new Tone.Synth({
    oscillator: { type: (audio.type ?? "sine") as OscillatorType },
    envelope: {
      attack: 0.02, // = Env.perc -> attackTime
      release: 5, // Env.linen -> attackTime + sustainTime + releaseTime
    },
    volume: Tone.gainToDb(audio.amp ?? 0.5),
  }).connect(reverb);

  // Gliss def
  const now = Tone.now();
  synth.oscillator.frequency.setValueAtTime(audio.freq ?? 880, now);
  synth.oscillator.frequency.exponentialRampToValueAtTime(
    (audio.freq ?? 880) * 0.02,
    now + 1,
  );

  synth.triggerAttackRelease(audio.freq ?? 880, now);

  return { synth, reverb };
}

export function createDelay(
  audio: AudioConfig,
): Pick<AudioRefs, "sample" | "delay"> {
  const delay = new Tone.Delay(1.5).toDestination();
  const sample = new Tone.Player(audio.sample).toDestination();

  Tone.loaded().then(() => {
    sample.start();
  });

  sample.connect(delay);

  return { sample, delay };
}
