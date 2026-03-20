"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ThemeName, ThemeContextType } from "@/types";

const ThemeContext = createContext<ThemeContextType | null>(null);

function getInitialTheme(): ThemeName {
  if (typeof window === "undefined") return "phosphor"
  return (localStorage.getItem("sc_theme") as ThemeName) ?? "phosphor";
}

function applyThemeToDom(th: ThemeName) {
  document.documentElement.setAttribute("data-theme", th);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme);

  useEffect(() => {
    applyThemeToDom(theme);
    localStorage.setItem("sc_theme", theme);
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