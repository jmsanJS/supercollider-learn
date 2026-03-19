import { UGENS } from "@/data/ugens";
import type { UGen } from "@/types";

export function getFilteredUGens(filter: string): UGen[] {
  return filter === "All" ? UGENS : UGENS.filter((u) => u.category === filter);
}

export function getUGensCategories(): string[] {
  return ["All", ...new Set(UGENS.map(u => u.category))];
}

export function getActiveUGen(ugen: string): UGen | undefined {
  return UGENS.find((u) => u.name === ugen);
}
