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
  progress: Progress;
  markCompleted: (id: string, code: string) => void;
  resetProgress: () => void;
};
