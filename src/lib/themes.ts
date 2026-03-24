import type { ThemeName, ThemeOption } from "@/types";
import { THEMES } from "@/data/themes";

const STORAGE_KEY = "sc_theme";

export function getInitialTheme(): ThemeName {
  if (typeof window === "undefined") return "paper";
  return (localStorage.getItem(STORAGE_KEY) as ThemeName) ?? "paper";
}

export function getCurrentTheme(selectedTheme: ThemeName): ThemeOption {
  return THEMES.find((th) => th.name === selectedTheme) ?? THEMES[0];
}

export function applyThemeToDom(theme: ThemeName): void {
  document.documentElement.setAttribute("data-theme", theme);
}

export function saveTheme(theme: ThemeName): void {
  localStorage.setItem(STORAGE_KEY, theme);
}
