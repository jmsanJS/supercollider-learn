import type { GlossaryCategory, GlossaryTerm, Locale } from "@/types";
import { GLOSSARY } from "@/data/glossary";

function getTermById(id: string): GlossaryTerm | undefined {
  return GLOSSARY.find(t => t.id === id);
}

function getAllTermsSorted(lang: Locale = "en"): GlossaryTerm[] {
  return [...GLOSSARY].sort((a, b) => a.term[lang].localeCompare(b.term[lang]));
}

export function getTermsByCategory(category: GlossaryCategory, lang: Locale = "en"): GlossaryTerm[] {
  if (category === "all") return getAllTermsSorted(lang);
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