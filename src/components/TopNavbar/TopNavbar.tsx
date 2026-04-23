"use client";

import styles from "./TopNavbar.module.css";
import Link from "next/link";
import ThemeSelector from "../ThemeSelector/ThemeSelector";
import { TopNavbarTab } from "@/types";
import { usePathname } from "next/navigation";

export default function TopNavbar() {
  const path = usePathname();

  const tabs: TopNavbarTab[] = [
    { id: "home", path: "/", label: "Inicio" },
    { id: "about", path: "/about", label: "Acerca de" },
    { id: "exercises", path: "/exercises", label: "Ejercicios" },
    { id: "progress", path: "/progress", label: "Progreso" },
    { id: "ugens", path: "/ugens", label: "UGens comunes" },
    { id: "glossary", path: "/glossary", label: "Glosario" },
  ];

  return (
    <nav className={styles.topbar}>
      <div>
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
      <div>
        <ThemeSelector />
      </div>
    </nav>
  );
}
