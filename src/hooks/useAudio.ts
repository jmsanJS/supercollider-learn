"use client";

import { useCallback } from "react";
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

let refs: AudioRefs = {};

export function useAudio() {
  const stop = useCallback(() => {
    try {
      if (refs.synth instanceof Tone.Synth) {
        refs.synth.triggerRelease();
      } else {
        refs.synth?.stop();
      }
      refs.synth?.dispose();
      refs.synth2?.stop();
      refs.synth2?.dispose();
      refs.lfo?.stop();
      refs.lfo?.dispose();
      refs.noise?.stop();
      refs.noise?.dispose();
      refs.panner?.dispose();
      refs.filter?.dispose();
      refs.reverb?.dispose();
      refs.delay?.dispose();
    } catch {}
    refs = {};
  }, []);

  const play = useCallback(
    async (audio: AudioConfig) => {
      stop();
      await Tone.start();

      try {
        if (audio.type === "noise" && audio.filter) {
          refs = createFilteredNoise(audio);
        } else if (audio.type === "noise") {
          refs = createNoise(audio);
        } else if (audio.type === "dtmf") {
          refs = createDTMF(audio);
        } else if (audio.pan) {
          refs = createPanner(audio);
        } else if (audio.lfo) {
          refs = createLFOSynth(audio);
        } else if (audio.reverb) {
          refs = createReverbSynth(audio);
        } else if (audio.delay) {
          refs = createDelay(audio);
        } else if (audio.env) {
          refs = createEnvSynth(audio);
        } else if (audio.filter) {
          refs = createFilteredSynth(audio);
        } else {
          refs = createSynth(audio);
          console.log(audio);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [stop],
  );

  return { play, stop };
}
