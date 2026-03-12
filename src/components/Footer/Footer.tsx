"use client";

import { useState } from "react";
import styles from "./Footer.module.css";
import FooterLinkList from "./components/FooterLinkList";

export default function Footer() {
  const [year] = useState(new Date().getFullYear());

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Acerca de", href: "/about" },
    { label: "Ejercicios", href: "/exercises" },
    { label: "Progreso", href: "/progress" },
    { label: "UGens comunes", href: "/ugens" },
  ];

  const resourceLinks = [
    {
      label: "SuperCollider oficial",
      href: "https://supercollider.github.io",
      external: true,
    },
    {
      label: "Documentación SC",
      href: "https://doc.sccode.org",
      external: true,
    },
    { label: "Tone.js docs", href: "https://tonejs.github.io", external: true },
    {
      label: "GitHub del proyecto",
      href: "https://github.com/",
      external: true,
    },
  ];

  const legalLinks = [
    { href: "#", label: "Términos de uso" },
    { href: "#", label: "Política de privacidad" },
    { href: "#", label: "Cookies" },
    { href: "#", label: "Licencia MIT" },
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

        <FooterLinkList title="Navegación" links={navLinks} />
        <FooterLinkList title="Recursos" links={resourceLinks} />
      </div>

      <div className={styles.footer_bottom}>
        <p className={styles.footer_copy}>
          © {year} <strong>SC·Learn</strong>. Proyecto de código abierto.
        </p>

        <nav aria-label="Legal">
          <ul className={styles.footer_legal} style={{ listStyle: "none" }}>
            {legalLinks.map((link, i) => (
              <li key={i}>
                <a className={styles.legal_link} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
