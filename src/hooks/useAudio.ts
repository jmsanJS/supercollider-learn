"use client";

import { useCallback, useRef } from "react";
import * as Tone from "tone";
import type { AudioConfig, AudioRefs } from "@/types";
import {
  createNoise,
  createDTMF,
  createLFOSynth,
  createEnvSynth,
  createSynth,
  createPanner,
  createFilteredSynth,
  createFilteredNoise,
  createReverbSynth,
  createDelay,
} from "@/lib/audio";

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
      refs.current.panner?.dispose();
      refs.current.filter?.dispose();
      refs.current.reverb?.dispose();
      refs.current.delay?.dispose()
    } catch {}
    refs.current = {};
  }, []);

  const play = useCallback(
    async (audio: AudioConfig) => {
      stop();
      await Tone.start();

      try {
        if (audio.type === "noise" && audio.filter) {
          refs.current = createFilteredNoise(audio);
        } else if (audio.type === "noise") {
          refs.current = createNoise(audio);
        } else if (audio.type === "dtmf") {
          refs.current = createDTMF(audio);
        } else if (audio.pan) {
          refs.current = createPanner(audio);
        } else if (audio.lfo) {
          refs.current = createLFOSynth(audio);
        } else if (audio.reverb) {
          refs.current = createReverbSynth(audio);
        } else if (audio.delay) {
          refs.current = createDelay(audio);
        } else if (audio.env) {
          refs.current = createEnvSynth(audio);
        } else if (audio.filter) {
          refs.current = createFilteredSynth(audio);
        } else {
          refs.current = createSynth(audio);
          console.log(audio)
        }
      } catch (e) {
        console.error(e);
      }
    },
    [stop],
  );

  return { play, stop };
}
