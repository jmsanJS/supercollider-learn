"use client";

import { createContext, useContext, useState } from "react";
import type { Progress } from "@/types";
import { loadProgress, saveProgress, clearProgress } from "@/lib/progress";

type ProgressContextType = {
  progress: Progress;
  markCompleted: (id: string, code: string) => void;
  resetProgress: () => void;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
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
    <ProgressContext.Provider
      value={{ progress, markCompleted, resetProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress used out of ProgressProvider");
  return ctx;
}
