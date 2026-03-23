import type { ThemeName, ThemeOption } from "@/types";

export function currentTheme(themes: ThemeOption[], selectedTheme: ThemeName) {
  return themes.find((th) => th.name === selectedTheme) ?? themes[0];
}