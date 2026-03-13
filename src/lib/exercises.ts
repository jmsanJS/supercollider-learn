import { EXERCISES } from "@/data/exercices";
import { Exercise } from "@/types";

export function getLevels(): number[] {
  return [...new Set(EXERCISES.map(ex => ex.level))].sort();
}

export function getExercisesByLevel(level: number): Exercise[] {
  return EXERCISES.filter(ex => ex.level === level);
}

export function getExerciseById(id: string): Exercise | undefined {
  return EXERCISES.find(ex => ex.id === id);
}

export function getTotalExercises(): number {
  return EXERCISES.length;
}

export function getInitialCodes(): Record<string, string> {
  return Object.fromEntries(EXERCISES.map(e => [e.id, e.starter]));
}