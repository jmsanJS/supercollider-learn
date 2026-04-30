import * as Tone from "tone";
import type { ReactNode } from "react";

export type AudioConfig = {
  freq?: number;
  amp?: number;
  type?: OscillatorType | "noise" | "dtmf";
  sample?: string;
  lfo?: LFOConfig;
  freqs?: number[];
  env?: EnvConfig;
  color?: NoiseColor;
  pan?: boolean;
  filter?: FilterConfig;
  reverb?: ReverbConfig;
  delay?: boolean;
};

type NoiseColor = "white" | "pink" | "brown";

type EnvConfig = {
  attack?: number;
  decay?: number;
  sustain?: number;
  release?: number;
  attackCurve?: Tone.EnvelopeCurve;
  decayCurve?: "linear" | "exponential"
}

type FilterType = "lowpass" | "highpass" | "bandpass";

export type FilterConfig = {
  type: FilterType;
  freq: number;
  Q?: number;
};

type LFOShape = "sine" | "sawtooth" | "square" | "triangle";
type LFOTarget = "frequency" | "amplitude";

type LFOConfig = {
  rate: number;
  depth: number;
  shape?: LFOShape
  target?: LFOTarget;
};

export type ReverbConfig = {
  mix: number;
  room: number;
};

// Hooks
export type AudioRefs = {
  synth?: Tone.Synth | Tone.Oscillator;
  synth2?: Tone.Oscillator;
  sample?: Tone.Player;
  lfo?: Tone.LFO;
  noise?: Tone.Noise;
  panner?: Tone.Panner;
  filter?: Tone.Filter;
  reverb?: Tone.Reverb;
  delay?: Tone.Delay;
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

export interface ReminderModalProps {
  onConfirm: (remindNextSession: boolean) => void;
  onCancel?: () => void;
  title?: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  headerTitle?: string;
  showRemindOption?: boolean;
  remindLabel?: string;
  initialRemindNextSession?: boolean;
  icon?: "volume" | "warning";
}

export type TopNavbarTab = {
  id: string;
  path: string;
  label: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

// Glossary
export type GlossaryCategory =
  | "all"
  | "programming"
  | "audio"
  | "music"
  | "supercollider";

export type GlossaryTerm = {
  id: string;
  term: string;
  category: Exclude<GlossaryCategory, "all">;
  definition: string;
  related?: string[];  // ids de términos relacionados
};

// Highlight
export type HighlightResult = {
  html: string;
  endsInBlockComment: boolean;
};

// SC Code Parser lib

export type SCCodeValidation = {
  ok: boolean;
  errors: string[];
};