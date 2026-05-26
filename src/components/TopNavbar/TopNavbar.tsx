"use client";

import styles from "./TopNavbar.module.css";
import Link from "next/link";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import { TopNavbarTab } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState, startTransition } from "react";
import { useLang } from "@/context/LangContext";
import { t } from "@/i18n/ui";

export default function TopNavbar() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    startTransition(() => setMenuOpen(false));
  }, [path]);

  const tabs: TopNavbarTab[] = [
    { id: "home", path: "/", label: t(lang, "nav_home") },
    { id: "about", path: "/about", label: t(lang, "nav_about") },
    { id: "setup", path: "/setup", label: t(lang, "nav_setup") },
    { id: "exercises", path: "/exercises", label: t(lang, "nav_exercises") },
    { id: "progress", path: "/progress", label: t(lang, "nav_progress") },
    { id: "ugens", path: "/ugens", label: t(lang, "nav_ugens") },
    { id: "glossary", path: "/glossary", label: t(lang, "nav_glossary") },
  ];

  return (
    <>
      <nav className={styles.topbar}>
        <div className={styles.tabs_wrap}>
          <Link href="/" className={styles.logo_mark}>
            SC·Learn
          </Link>
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.path}
              className={`${styles.tab_btn} ${path === tab.path ? styles.active : ""}`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className={styles.actions_wrap}>
          <LangSwitcher />
          <ThemeSelector />
          <button
            className={`${styles.burger} ${menuOpen ? styles.burger_open : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className={`${styles.mobile_menu} ${menuOpen ? styles.mobile_menu_open : ""}`}>
          {tabs.map((tab) => (
            <Link
              key={tab.id}
              href={tab.path}
              className={`${styles.mobile_tab} ${path === tab.path ? styles.mobile_tab_active : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className={styles.mobile_tab_sym}>▸</span>
              {tab.label}
            </Link>
          ))}
        </div>
      </nav>

      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}
