import type { ThemeOption } from "@/types";

export const THEMES: ThemeOption[] = [
  {
    name: "paper",
    label: { en: "Paper", es: "Papel", fr: "Papier" },
    accent: "#1a1a1a",
    bg: "#f5f5f0",
  },
  {
    name: "warm",
    label: { en: "Warm", es: "Cálido", fr: "Chaud" },
    accent: "#b97500",
    bg: "#fdf8f0",
  },
  {
    name: "phosphor",
    label: { en: "Phosphor", es: "Fósforo", fr: "Phosphore" },
    accent: "#4ade80",
    bg: "#060d06",
  },
  {
    name: "cold",
    label: { en: "Cold", es: "Frío", fr: "Froid" },
    accent: "#38bdf8",
    bg: "#0f1117",
  },
];
