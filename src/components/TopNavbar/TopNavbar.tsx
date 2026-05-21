"use client";

import styles from "./TopNavbar.module.css";
import Link from "next/link";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import { TopNavbarTab } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TopNavbar() {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setMenuOpen(false);
  }, [path]);

  const tabs: TopNavbarTab[] = [
    { id: "home", path: "/", label: "Inicio" },
    { id: "about", path: "/about", label: "Acerca de" },
    { id: "exercises", path: "/exercises", label: "Ejercicios" },
    { id: "progress", path: "/progress", label: "Progreso" },
    { id: "ugens", path: "/ugens", label: "UGens comunes" },
    { id: "glossary", path: "/glossary", label: "Glosario" },
  ];

  return (
    <>
      <nav className={styles.topbar}>
        <div className={styles.tabs_wrap}>
          <Link href="/" className={styles.logo_mark}>
            SC·Learn
          </Link>
          {tabs.map((t) => (
            <Link
              key={t.id}
              href={t.path}
              className={`${styles.tab_btn} ${path === t.path ? styles.active : ""}`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        <div className={styles.actions_wrap}>
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
          {tabs.map((t) => (
            <Link
              key={t.id}
              href={t.path}
              className={`${styles.mobile_tab} ${path === t.path ? styles.mobile_tab_active : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className={styles.mobile_tab_sym}>▸</span>
              {t.label}
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
