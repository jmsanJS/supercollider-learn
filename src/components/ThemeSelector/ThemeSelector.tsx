"use client";

import { useTheme } from "@/context/ThemeContext";
import { useEffect, useRef, useState } from "react";
import styles from "./ThemeSelector.module.css";
import type { ThemeName } from "@/types";
import { getCurrentTheme } from "@/lib/themes";
import { THEMES } from "@/data/themes";
import { useLang } from "@/context/LangContext";
import { t } from "@/i18n/ui";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = getCurrentTheme(theme);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (name: ThemeName): void => {
    setTheme(name);
    setOpen(false);
  };

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t(lang, "theme_select_aria")}
      >
        <span
          className={styles.swatch}
          style={{ background: current.bg, borderColor: current.accent }}
        >
          <span className={styles.dot} style={{ background: current.accent }} />
        </span>
        <span className={styles.trigger_label}>{current.label[lang]}</span>
        <span className={`${styles.chevron} ${open ? styles.open : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <ul
          className={styles.dropdown}
          role="listbox"
          aria-label={t(lang, "theme_list_aria")}
        >
          {THEMES.map((th) => (
            <li
              key={th.name}
              role="option"
              aria-selected={theme === th.name}
              className={`${styles.option} ${theme === th.name ? styles.active : ""}`}
              onClick={() => handleSelect(th.name)}
            >
              <span
                className={styles.swatch}
                style={{ background: th.bg, borderColor: th.accent }}
              >
                <span
                  className={styles.dot}
                  style={{ background: th.accent }}
                />
              </span>
              <span className={styles.option_label}>{th.label[lang]}</span>
              {theme === th.name && (
                <span className={styles.check} aria-hidden="true">
                  ✓
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
