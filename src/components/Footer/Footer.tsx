"use client";

import { FooterLink } from "@/types";
import styles from "./Footer.module.css";
import Link from "next/link";
import { useLang } from "@/context/LangContext";
import { t } from "@/i18n/ui";

export default function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useLang();

  const navLinks: FooterLink[] = [
    { label: t(lang, "nav_home"), href: "/" },
    { label: t(lang, "nav_about"), href: "/about" },
    { label: t(lang, "nav_exercises"), href: "/exercises" },
    { label: t(lang, "nav_progress"), href: "/progress" },
    { label: t(lang, "nav_ugens"), href: "/ugens" },
    { label: t(lang, "nav_glossary"), href: "/glossary" },
  ];

  const resourceLinks: FooterLink[] = [
    { label: t(lang, "footer_sc_official"), href: "https://supercollider.github.io" },
    { label: t(lang, "footer_sc_docs"), href: "https://docs.supercollider.online/" },
    { label: t(lang, "footer_gh"), href: "https://github.com/jmsanJS/sc-learn" },
  ];

  const taglineLines = t(lang, "footer_tagline").split("\n");

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_top}>
        <div className={styles.footer_brand}>
          <div className={styles.footer_logo}>SC·Learn</div>
          <p className={styles.footer_tagline}>
            {taglineLines.map((line, i) => (
              <span key={i}>{line}{i < taglineLines.length - 1 && <br />}</span>
            ))}
          </p>
        </div>

        <nav aria-label={t(lang, "footer_resources")}>
          <h2 className={styles.footer_col_title}>{t(lang, "footer_resources")}</h2>
          <ul className={styles.footer_link_list}>
            {resourceLinks.map((link, i) => (
              <li key={i}>
                <a
                  className={styles.footer_ext_link}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (${t(lang, "footer_opens_tab")})`}
                >
                  {link.label}
                  <span aria-hidden="true" className={styles.ext_icon}>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t(lang, "footer_navigation")}>
          <h2 className={styles.footer_col_title}>{t(lang, "footer_navigation")}</h2>
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
          © {year} <strong>SC·Learn</strong>. {t(lang, "footer_copy")}
        </p>
      </div>
    </footer>
  );
}
