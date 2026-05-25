import * as Tone from "tone";
import type { AudioConfig, AudioRefs, FilterConfig } from "@/types";

function buildSynth(audio: AudioConfig) {
  // When pulseWidth is present, use Tone's "pulse" oscillator so the duty cycle
  // is honoured. SC width (0–1) maps to Tone width (-1 to 1): toneW = 2*scW - 1.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const oscOptions: any =
    audio.pulseWidth !== undefined
      ? { type: "pulse", width: audio.pulseWidth * 2 - 1 }
      : { type: audio.type as OscillatorType };

  return new Tone.Synth({
    oscillator: oscOptions,
    envelope: {
      attack: audio.env?.attack ?? 0.01,
      decay: audio.env?.decay ?? 0,
      sustain: audio.env?.sustain ?? 1,
      release: audio.env?.release ?? 0.1,
      ...audio.env,
    },
    volume: Tone.gainToDb(audio.amp ?? 1),
  });
}

function getOutput(audio: AudioConfig): { out: Tone.ToneAudioNode; panner?: Tone.Panner } {
  if (audio.stereo !== false) return { out: Tone.getDestination() };
  const panner = new Tone.Panner(-1).toDestination();
  return { out: panner, panner };
}

function builtFilter(filter?: FilterConfig) {
  return new Tone.Filter({
    type: filter!.type,
    frequency: filter!.freq,
    Q: filter?.Q ?? 1,
  })
}

export function createNoise(audio: AudioConfig): Pick<AudioRefs, "noise" | "panner"> {
  const { out, panner } = getOutput(audio);
  const noise = new Tone.Noise(audio.color).connect(out);

  noise.volume.value = Tone.gainToDb(audio.amp ?? 1);
  noise.start();

  return { noise, panner };
}

export function createOscMix(
  audio: AudioConfig,
): Pick<AudioRefs, "oscillators" | "panner"> {
  const { out, panner } = getOutput(audio);
  const gain = new Tone.Gain(audio.amp ?? 1).connect(out);

  const oscs = (audio.oscillators ?? [{ type: "sine", freq: 770 }, { type: "sine", freq: 1336 }]).map((mix) => {
    const noiseTypes = ["white", "pink", "brown"] as const;
    const isNoise = (noiseTypes as readonly string[]).includes(mix.type);
    if (isNoise) {
      const noise = new Tone.Noise(mix.type as "white" | "pink" | "brown").connect(gain);
      noise.volume.value = Tone.gainToDb(mix.amp ?? 1);
      noise.start();
      return noise as unknown as Tone.Oscillator;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const oscOptions: any = mix.type === "square" && mix.pulseWidth !== undefined
      ? { type: "pulse", frequency: mix.freq ?? 440, width: mix.pulseWidth * 2 - 1, phase: mix.phase ?? 0 }
      : { type: mix.type as OscillatorType, frequency: mix.freq ?? 440, phase: mix.phase ?? 0 };
    // OmniOscillator handles all types including "pulse" (Tone.Oscillator rejects it)
    const osc = new Tone.OmniOscillator(oscOptions).connect(gain);
    osc.volume.value = Tone.gainToDb(mix.amp ?? 1);
    osc.start();
    return osc as unknown as Tone.Oscillator;
  });

  return { oscillators: oscs, panner };
}

export function createLFOSynth(
  audio: AudioConfig,
): Pick<AudioRefs, "synth" | "lfo" | "panner"> {
  const freq = audio.freq ?? 440;
  const rate = audio.lfo!.rate;
  const depth = audio.lfo!.depth;
  const shape = audio.lfo!.shape ?? "sine";
  const target = audio.lfo!.target ?? "frequency";

  const { out, panner } = getOutput(audio);
  const amp = new Tone.Gain(audio.amp ?? 1).connect(out);

  const synth = buildSynth(audio);
  synth.connect(amp);

  let lfo: Tone.LFO | Tone.Oscillator;

  if (target === "amplitude") {
    lfo = new Tone.LFO({
      frequency: rate,
      min: 0,
      max: audio.amp ?? 1,
      type: shape,
    })
      .connect(amp.gain)
      .start();
  } else if (shape === "square" && audio.lfo!.width !== undefined) {
    // Variable duty-cycle pulse: sawtooth → WaveShaper → AudioToGain → Scale.
    // Tone.Scale maps [0,1]→[min,max], so we need AudioToGain to convert ±1→[0,1]
    // first (matching Tone.LFO's internal chain). Then we emulate connectSignal by
    // zeroing the frequency Signal so triggerAttack doesn't add on top of our output.
    const lfoWidth = audio.lfo!.width;
    const threshold = 1 - 2 * lfoWidth;
    const osc = new Tone.Oscillator({
      type: "sawtooth",
      frequency: rate,
      phase: audio.lfo!.phase ?? 0,
    });
    const shaper = new Tone.WaveShaper(
      (x: number) => (x > threshold ? 1 : -1),
      4096,
    );
    const a2g = new Tone.AudioToGain();
    const scaler = new Tone.Scale(freq - depth, freq + depth);
    osc.connect(shaper);
    shaper.connect(a2g);
    a2g.connect(scaler);
    // Emulate connectSignal: zero the freq Signal so it doesn't add to our output
    synth.oscillator.frequency.cancelScheduledValues(0);
    synth.oscillator.frequency.setValueAtTime(0, 0);
    synth.oscillator.frequency.overridden = true;
    scaler.connect(synth.oscillator.frequency);
    osc.start();
    lfo = osc;
  } else {
    lfo = new Tone.LFO({
      frequency: rate,
      min: freq - depth,
      max: freq + depth,
      type: shape,
      phase: audio.lfo!.phase ?? 0,
    })
      .connect(synth.oscillator.frequency)
      .start();
  }

  synth.triggerAttack(freq);

  return { synth, lfo, panner };
}

export function createEnvSynth(audio: AudioConfig): Pick<AudioRefs, "synth" | "panner"> {
  const { out, panner } = getOutput(audio);
  const synth = buildSynth(audio);
  synth.connect(out);

  const timeInSecs =
    (audio.env?.attack ?? 0) +
    (audio.env?.decay ?? 0) +
    (audio.env?.sustain ?? 0) +
    (audio.env?.release ?? 0);

  synth.triggerAttackRelease(audio.freq ?? 440, timeInSecs);

  return { synth, panner };
}

export function createSweepSynth(audio: AudioConfig): Pick<AudioRefs, "synth" | "panner"> {
  const { out, panner } = getOutput(audio);
  const synth = buildSynth(audio);
  synth.connect(out);

  const { start, end, duration } = audio.sweep!;
  const totalTime =
    (audio.env?.attack ?? 0) +
    (audio.env?.decay ?? 0) +
    (audio.env?.sustain ?? 0) +
    (audio.env?.release ?? 0);

  const now = Tone.now();
  synth.oscillator.frequency.setValueAtTime(start, now);
  if (audio.sweep!.curve === "linear") {
    synth.oscillator.frequency.linearRampToValueAtTime(end, now + duration);
  } else {
    synth.oscillator.frequency.exponentialRampToValueAtTime(end, now + duration);
  }
  synth.triggerAttackRelease(start, totalTime || duration, now);

  return { synth, panner };
}

export function createSynth(audio: AudioConfig): Pick<AudioRefs, "synth" | "panner"> {
  const { out, panner } = getOutput(audio);
  const synth = buildSynth(audio);
  synth.connect(out);

  synth.triggerAttack(audio.freq ?? 440);

  return { synth, panner };
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

  const synth = buildSynth(audio);
  synth.connect(panner);
  synth.triggerAttack(audio.freq ?? 440);

  return { synth, lfo, panner };
}

export function createFilteredSynth(
  audio: AudioConfig,
): Pick<AudioRefs, "synth" | "filter" | "panner"> {
  const { out, panner } = getOutput(audio);
  const filter = builtFilter(audio.filter);
  filter.connect(out);

  const synth = buildSynth(audio);
  synth.connect(filter);
  synth.triggerAttack(audio.freq ?? 220);

  return { synth, filter, panner };
}

export function createFilteredNoise(
  audio: AudioConfig,
): Pick<AudioRefs, "noise" | "filter" | "panner"> {
  const { out, panner } = getOutput(audio);
  const filter = builtFilter(audio.filter);
  filter.connect(out);

  const noise = new Tone.Noise(audio.color ?? "white").connect(filter);
  noise.volume.value = Tone.gainToDb(audio.amp ?? 1);
  noise.start();

  return { noise, filter, panner };
}

export function createReverbSynth(
  audio: AudioConfig,
): Pick<AudioRefs, "synth" | "reverb" | "panner"> {
  const { out, panner } = getOutput(audio);
  const reverb = new Tone.Reverb({
    decay: (audio.reverb?.room ?? 0.5) * 6,
    wet: audio.reverb?.mix ?? 0.5,
  }).connect(out);

  // Env.linen -> attackTime + sustainTime + releaseTime
  const synth = buildSynth(audio);
  synth.connect(reverb);
  // Gliss def
  const now = Tone.now();
  synth.oscillator.frequency.setValueAtTime(audio.freq ?? 440, now);
  synth.oscillator.frequency.exponentialRampToValueAtTime(
    (audio.freq ?? 440) * 0.02,
    now + 1,
  );

  synth.triggerAttackRelease(audio.freq ?? 440, now);

  return { synth, reverb, panner };
}

export function createDelay(
  audio: AudioConfig,
): Pick<AudioRefs, "sample" | "delay" | "panner"> {
  const { out, panner } = getOutput(audio);
  const delay = new Tone.Delay(1.5).connect(out);
  const sample = new Tone.Player(audio.sample).connect(out);

  Tone.loaded().then(() => sample.start());

  sample.connect(delay);

  return { sample, delay, panner };
}
