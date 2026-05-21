"use client";

import { useLang } from "@/context/LangContext";
import type { Locale } from "@/types";
import styles from "./LangSwitcher.module.css";

const LOCALES: Locale[] = ["en", "es", "fr"];

export default function LangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className={styles.switcher} role="group" aria-label="Language">
      {LOCALES.map((l) => (
        <button
          key={l}
          className={`${styles.lang_btn} ${lang === l ? styles.active : ""}`}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
