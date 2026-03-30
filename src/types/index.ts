import * as Tone from "tone";

type NoiseColor = "white" | "pink" | "brown";
type LFOShape = "sine" | "sawtooth" | "square" | "triangle";

type LFOValues = {
  rate: number;
  depth: number;
  shape?: LFOShape;
  target?: "frequency" | "amplitude";
};

export type AudioConfig = {
  freq?: number;
  amp?: number;
  type?: OscillatorType | "noise" | "dtmf";
  lfo?: LFOValues;
  freqs?: number[];
  env?: boolean;
  color?: NoiseColor;
  pan?: boolean;
};

export type ValidationResult = {
  ok: boolean;
  tips: string[];
  audio: AudioConfig;
};

export type Exercise = {
  id: string;
  level: 1 | 2 | 3;
  title: string;
  tag: string;
  goal: string;
  theory: string;
  starter: string;
  validate: (code: string) => ValidationResult;
};

// Progress
export type ProgressEntry = {
  completed: boolean;
  code: string;
};

export type Progress = Record<string, ProgressEntry>;

export type LevelStats = {
  level: number;
  total: number;
  done: number;
};

export type ProgressStats = {
  total: number;
  completed: number;
  percentage: number;
  byLevel: LevelStats[];
};

// Contexts
export type ExercisesContextType = {
  activeId: string;
  setActiveId: (id: string) => void;
};

export type ProgressContextType = {
  progress: Progress;
  markCompleted: (id: string, code: string) => void;
  resetProgress: () => void;
};

export type ThemeName = "paper" | "phosphor" | "warm" | "cold";

export type ThemeOption = {
  name: ThemeName;
  label: string;
  accent: string;
  bg: string;
};

export type ThemeContextType = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
};

// Ugens
export type UGen = {
  name: string;
  category: string;
  signature: string;
  description: string;
  args: UGenArgument[];
  example: string;
  sound: AudioConfig;
};

type UGenArgument = {
  name: string;
  default: string;
  desc: string;
};

// Components
export interface TerminalHeaderProps {
  title: string;
  desc?: string;
}

export interface CopyToClipboardProps {
  scCode: string;
}

// Hooks
export type AudioRefs = {
  synth?: Tone.Synth | Tone.Oscillator;
  synth2?: Tone.Oscillator;
  lfo?: Tone.LFO;
  noise?: Tone.Noise;
  panner?: Tone.Panner;
};
