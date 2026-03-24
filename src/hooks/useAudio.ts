"use client";

import { useCallback, useRef } from "react";
import * as Tone from "tone";
import type { AudioConfig, AudioRefs } from "@/types";

export function useAudio() {
  const refs = useRef<AudioRefs>({});

  const stop = useCallback(() => {
    try {
      if (refs.current.synth instanceof Tone.Synth) {
        refs.current.synth.triggerRelease();
      } else {
        refs.current.synth?.stop();
      }
      refs.current.synth?.dispose();
      refs.current.synth2?.stop();
      refs.current.synth2?.dispose();
      refs.current.lfo?.stop();
      refs.current.lfo?.dispose();
      refs.current.noise?.stop();
      refs.current.noise?.dispose();
    } catch {}
    refs.current = {};
  }, []);

  const play = useCallback(
    async (audio: AudioConfig) => {
      stop();
      await Tone.start();

      try {
        if (audio.type === "noise") {
          const noise = new Tone.Noise(
            (audio.color ?? "white") as Tone.NoiseType,
          ).toDestination();
          noise.volume.value = Tone.gainToDb(audio.amp ?? 0.1);
          noise.start();
          refs.current.noise = noise;
        } else if (audio.type === "dtmf") {
          const [f1, f2] = audio.freqs ?? [770, 1336];
          const gain = new Tone.Gain(audio.amp ?? 0.2).toDestination();
          const s1 = new Tone.Oscillator(f1, "sine").connect(gain);
          const s2 = new Tone.Oscillator(f2, "sine").connect(gain);
          s1.start();
          s2.start();
          refs.current.synth = s1;
          refs.current.synth2 = s2;
        } else if (audio.lfo) {
          const lfo = new Tone.LFO(
            audio.lfo.rate,
            (audio.freq ?? 440) - audio.lfo.depth,
            (audio.freq ?? 440) + audio.lfo.depth,
          ).start();
          const synth = new Tone.Synth({
            oscillator: { type: "sine" },
            envelope: { attack: 0.05, decay: 0, sustain: 1, release: 0.3 },
            volume: Tone.gainToDb(audio.amp ?? 0.3),
          }).toDestination();
          lfo.connect(synth.oscillator.frequency);
          synth.triggerAttack(audio.freq ?? 440);
          refs.current.synth = synth;
          refs.current.lfo = lfo;
        } else if (audio.env) {
          const synth = new Tone.Synth({
            oscillator: {
              type: (audio.type ?? "sine")
            },
            envelope: { attack: 0.01, decay: 0.5, sustain: 0, release: 0.1 },
            volume: Tone.gainToDb(audio.amp ?? 0.3),
          }).toDestination();
          synth.triggerAttackRelease(audio.freq ?? 440, "2n");
          refs.current.synth = synth;
        } else {
          const synth = new Tone.Synth({
            oscillator: {
              type: (audio.type ?? "sine"),
            },
            envelope: { attack: 0.05, decay: 0, sustain: 1, release: 0.5 },
            volume: Tone.gainToDb(audio.amp ?? 0.3),
          }).toDestination();
          synth.triggerAttack(audio.freq ?? 440);
          refs.current.synth = synth;
        }
      } catch (e) {
        console.error(e);
      }
    },
    [stop],
  );

  return { play, stop };
}
