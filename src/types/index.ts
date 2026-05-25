import * as Tone from "tone";
import type { ReactNode } from "react";

export type Locale = "en" | "es" | "fr";
export type LocalizedString = Record<Locale, string>;

export type OscillatorMix = {
  type: "sine" | "sawtooth" | "square" | "triangle" | "pulse" | "white" | "pink" | "brown";
  freq?: number;
  pulseWidth?: number;
  amp?: number;
  phase?: number; // degrees (0–360), converted from SC units at parse time
};

export type AudioConfig = {
  freq?: number;
  amp?: number;
  type?: OscillatorType | "noise" | "mix";
  pulseWidth?: number;
  sample?: string;
  lfo?: LFOConfig;
  oscillators?: OscillatorMix[];
  env?: EnvConfig;
  color?: NoiseColor;
  pan?: boolean;
  filter?: FilterConfig;
  reverb?: ReverbConfig;
  delay?: boolean;
  stereo?: boolean;
  sweep?: SweepConfig;
};

export type SweepConfig = {
  start: number;
  end: number;
  duration: number;
  curve?: "linear" | "exponential";
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
  shape?: LFOShape;
  target?: LFOTarget;
  phase?: number;
  width?: number;
};

export type ReverbConfig = {
  mix: number;
  room: number;
};

// Hooks
export type AudioRefs = {
  synth?: Tone.Synth | Tone.Oscillator;
  oscillators?: Tone.Oscillator[];
  sample?: Tone.Player;
  lfo?: Tone.LFO | Tone.Oscillator;
  noise?: Tone.Noise;
  panner?: Tone.Panner;
  filter?: Tone.Filter;
  reverb?: Tone.Reverb;
  delay?: Tone.Delay;
};

export type ValidationResult = {
  ok: boolean;
  tips: LocalizedString[];
};

export type Exercise = {
  id: string;
  level: 1 | 2 | 3;
  title: LocalizedString;
  tag: string;
  goal: LocalizedString;
  theory: LocalizedString;
  starter: LocalizedString;
  answer: LocalizedString;
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

// Lang
export type LangContextType = {
  lang: Locale;
  setLang: (lang: Locale) => void;
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
  label: LocalizedString;
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
  description: LocalizedString;
  args: UGenArgument[];
  example: string;
  note?: LocalizedString[];
  sound: AudioConfig;
};

type UGenArgument = {
  name: string;
  default: string;
  desc: LocalizedString;
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
  term: LocalizedString;
  category: Exclude<GlossaryCategory, "all">;
  definition: LocalizedString;
  related?: string[];
};

// Highlight
export type HighlightResult = {
  html: string;
  endsInBlockComment: boolean;
};

// SC Code Parser lib

export type SCCodeValidation = {
  ok: boolean;
  errors: LocalizedString[];
};