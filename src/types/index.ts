export type AudioConfig = {
  freq?: number;
  amp?: number;
  type?: OscillatorType | "noise" | "dtmf";
  lfo?: { rate: number; depth: number };
  freqs?: number[];
  env?: boolean;
  color?: "white" | "pink";
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

// Contexts
export type ExercisesContextType = {
  activeId: string;
  setActiveId: (id: string) => void;
};