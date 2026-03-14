"use client";

import { createContext, useContext, useState } from "react";
import { ExercisesContextType } from "@/types";
import { clearProgress, loadProgress, saveProgress } from "@/lib/progress";

const ExercisesContext = createContext<ExercisesContextType | null>(null);

export function ExercisesProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState("ex1");
  const [progress, setProgress] = useState(loadProgress);

  const markCompleted = (id: string, code: string) => {
    setProgress((prev) => {
      const updated = { ...prev, [id]: { completed: true, code } };
      saveProgress(updated);
      return updated;
    });
  };

  const resetProgress = () => {
    setProgress({});
    clearProgress();
  };

  return (
    <ExercisesContext.Provider
      value={{ activeId, setActiveId, progress, markCompleted, resetProgress }}
    >
      {children}
    </ExercisesContext.Provider>
  );
}

export function useExercises() {
  const ctx = useContext(ExercisesContext);
  if (!ctx) throw new Error("useExercises used out of ExercisesProvider");
  return ctx;
}
