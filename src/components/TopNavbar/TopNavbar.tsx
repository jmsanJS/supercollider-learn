"use client";

import { useState } from "react";
import styles from "./TopNavbar.module.css";
import Link from "next/link";
import ThemeSelector from "../ThemeSelector/ThemeSelector";

export default function TopNavbar() {
  const [tab, setTab] = useState("home");

  const tabs = [
    { id: "home", path: "/", label: "Inicio" },
    { id: "about", path: "/about", label: "Acerca de" },
    { id: "exercises", path: "/exercises", label: "Ejercicios" },
    { id: "progress", path: "/progress", label: "Progreso" },
    { id: "ugens", path: "/ugens", label: "UGens comunes" },
  ];

  return (
    <>
      <nav className={styles.topbar}>
        <div>
          <Link href="/" className={styles.logo_mark}>
            SC·Learn
          </Link>
          {tabs.map((t) => (
            <Link
              key={t.id}
              href={t.path}
              className={`${styles.tab_btn} ${tab === t.id ? "active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </Link>
          ))}
        </div>
        <div>
          <ThemeSelector />
        </div>
      </nav>
    </>
  );
}
