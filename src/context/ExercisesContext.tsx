"use client";

import { ExercisesContextType } from "@/types";
import { createContext, useContext, useState } from "react";

const ExercisesContext = createContext<ExercisesContextType | null>(null);

export function ExercisesProvider({ children }: { children: React.ReactNode }) {
  const [activeId, setActiveId] = useState("ex1");

  return (
    <ExercisesContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </ExercisesContext.Provider>
  );
}

export function useExercises() {
  const ctx = useContext(ExercisesContext);
  if (!ctx) throw new Error("useExercises used out of ExercisesProvider");
  return ctx;
}