import type { Exercise, LevelStats, Progress, ProgressStats } from "@/types";
import { getExercisesByLevel, getLevels, getTotalExercises } from "@/lib/exercises";
import { EXERCISES } from "@/data/exercices";

const STORAGE_KEY = "sc_learn";

export function loadProgress(): Progress {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") || {};
  } catch {
    return {};
  }
}

export function saveProgress(data: Progress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function getProgressStats(progress: Progress): ProgressStats {
  const total = getTotalExercises();
  const completed = completedExercises(EXERCISES, progress);
  const percentage = progressPercentage(completed, total);
  const levels = getLevels();

  const byLevel: LevelStats[] = levels.map((level) => {
    const exs = getExercisesByLevel(level);
    const done = completedExercises(exs, progress);
    return { level, total: exs.length, done };
  });

  return { total, completed, percentage, byLevel };
}

function progressPercentage(completed: number, total: number) {
  return Math.round((completed / total) * 100);
}

function completedExercises(exercises: Exercise[], progress: Progress) {
  return exercises.filter((e) => progress[e.id]?.completed).length;
}
