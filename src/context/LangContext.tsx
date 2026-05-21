"use client";

import { createContext, useContext, useState } from "react";
import type { Locale, LangContextType } from "@/types";

const LangContext = createContext<LangContextType | null>(null);

function getInitialLang(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem("sc_lang");
    if (stored === "en" || stored === "es" || stored === "fr") return stored;
  } catch {}
  return "en";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>(getInitialLang);

  const setLang = (l: Locale) => {
    setLangState(l);
    try {
      localStorage.setItem("sc_lang", l);
    } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang used outside LangProvider");
  return ctx;
}
