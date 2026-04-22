import type { GlossaryCategory, GlossaryTerm } from "@/types";
import { GLOSSARY } from "@/data/glossary";

function getTermById(id: string): GlossaryTerm | undefined {
  return GLOSSARY.find(t => t.id === id);
}

function getAllTermsSorted(): GlossaryTerm[] {
  return GLOSSARY.sort((a, b) => a.term.localeCompare(b.term));
}

export function getTermsByCategory(category: GlossaryCategory): GlossaryTerm[] {
  if (category === "all") return getAllTermsSorted();
  return GLOSSARY.filter(t => t.category === category);
}

export function getRelatedTerms(term: GlossaryTerm): GlossaryTerm[] {
  return (term.related ?? [])
    .map(id => getTermById(id))
    .filter((t): t is GlossaryTerm => t !== undefined);
}

export function getTotalByCategory(): Record<GlossaryCategory, number> {
  return {
    all: GLOSSARY.length,
    programming: GLOSSARY.filter(t => t.category === "programming").length,
    audio: GLOSSARY.filter(t => t.category === "audio").length,
    music: GLOSSARY.filter(t => t.category === "music").length,
    supercollider: GLOSSARY.filter(t => t.category === "supercollider").length,
  };
}