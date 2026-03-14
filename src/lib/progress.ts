import { Progress } from "@/types";

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