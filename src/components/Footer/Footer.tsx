"use client";

import { FooterLink } from "@/types";
import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const navLinks: FooterLink[] = [
    { label: "Inicio", href: "/" },
    { label: "Acerca de", href: "/about" },
    { label: "Ejercicios", href: "/exercises" },
    { label: "Progreso", href: "/progress" },
    { label: "UGens comunes", href: "/ugens" },
    { label: "Glosario", href: "/glossary" },
  ];

  const resourceLinks: FooterLink[] = [
    { label: "SuperCollider oficial", href: "https://supercollider.github.io" },
    { label: "Documentación SC", href: "https://docs.supercollider.online/" },
    { label: "GitHub del proyecto", href: "https://github.com/" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_top}>
        <div className={styles.footer_brand}>
          <div className={styles.footer_logo}>SC·Learn</div>
          <p className={styles.footer_tagline}>
            Aprende síntesis de audio
            <br />
            escribiendo código SuperCollider
            <br />
            directo en tu navegador.
          </p>
        </div>

        <nav aria-label="Recursos">
          <h2 className={styles.footer_col_title}>Recursos</h2>
          <ul className={styles.footer_link_list}>
            {resourceLinks.map((link, i) => (
              <li key={i}>
                <a
                  className={styles.footer_ext_link}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (abre en nueva pestaña)`}
                >
                  {link.label}
                  <span aria-hidden="true" className={styles.ext_icon}>
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Navegación">
          <h2 className={styles.footer_col_title}>Navegación</h2>
          <ul className={styles.footer_link_list}>
            {navLinks.map((link, i) => (
              <li key={i}>
                <Link href={link.href} className={styles.footer_nav_btn}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.footer_bottom}>
        <p className={styles.footer_copy}>
          © {year} <strong>SC·Learn</strong>. Proyecto de código abierto.
        </p>

      </div>
    </footer>
  );
}
