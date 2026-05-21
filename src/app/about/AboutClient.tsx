"use client";

import TerminalHeader from "@/components/TerminalHeader/TerminalHeader";
import styles from "./page.module.css";
import { useLang } from "@/context/LangContext";
import { t, tSteps } from "@/i18n/ui";

export default function AboutClient() {
  const { lang } = useLang();
  const steps = tSteps(lang);

  return (
    <div className={styles.wrap}>
      <TerminalHeader title="about" desc={t(lang, "about_desc")} />

      <div className={styles.hero}>
        <div className={styles.hero_prompt}>
          <span className={styles.prompt_sym}>~$</span>
          <h1 className={styles.hero_title}>{t(lang, "about_hero_title")}</h1>
        </div>
        <p
          className={styles.hero_sub}
          dangerouslySetInnerHTML={{ __html: t(lang, "about_hero_sub") }}
        />
      </div>

      <div className={styles.section}>
        <div className={styles.section_label}>{t(lang, "about_path_label")}</div>
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={i} className={styles.step}>
              <span className={styles.step_num}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={styles.step_content}>
                <div className={styles.step_title}>{s.title}</div>
                <div
                  className={styles.step_desc}
                  dangerouslySetInnerHTML={{ __html: s.desc }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.section_label}>{t(lang, "about_note_label")}</div>
        <div
          className={styles.notice}
          dangerouslySetInnerHTML={{ __html: t(lang, "about_note_body") }}
        />
      </div>

      <div className={styles.section}>
        <div className={styles.section_label}>
          {t(lang, "about_resources_label")}
        </div>
        <div className={styles.links}>
          <a
            href="https://supercollider.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ext_link}
          >
            <span className={styles.link_label}>{t(lang, "about_site_label")}</span>
            <span className={styles.link_url}>supercollider.github.io</span>
          </a>
          <a
            href="https://docs.supercollider.online"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ext_link}
          >
            <span className={styles.link_label}>{t(lang, "about_docs_label")}</span>
            <span className={styles.link_url}>docs.supercollider.online</span>
          </a>
          <a
            href="https://github.com/supercollider/supercollider"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ext_link}
          >
            <span className={styles.link_label}>GitHub</span>
            <span className={styles.link_url}>
              github.com/supercollider/supercollider
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
