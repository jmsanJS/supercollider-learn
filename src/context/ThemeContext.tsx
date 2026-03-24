"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ThemeName, ThemeContextType } from "@/types";
import { applyThemeToDom, getInitialTheme, saveTheme } from "@/lib/themes";

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme);

  useEffect(() => {
    applyThemeToDom(theme);
    saveTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme used out of ThemeProvider");
  return ctx;
}
