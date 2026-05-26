"use client";

import TerminalHeader from "@/components/TerminalHeader/TerminalHeader";
import styles from "./page.module.css";
import { useLang } from "@/context/LangContext";
import { t, tSetupAreas, tSetupSteps } from "@/i18n/ui";

const AREA_TAGS = ["editor", "post", "help"];

export default function SetupClient() {
  const { lang } = useLang();
  const areas = tSetupAreas(lang);
  const steps = tSetupSteps(lang);

  const shortcuts = [
    { action: t(lang, "setup_sc_eval"), desc: t(lang, "setup_sc_eval_desc"), mac: "Cmd + Return", win: "Ctrl + Return" },
    { action: t(lang, "setup_sc_line"), mac: "Shift + Return", win: "Shift + Return" },
    { action: t(lang, "setup_sc_stop"), desc: t(lang, "setup_sc_stop_desc"), mac: "Cmd + .", win: "Ctrl + ." },
    { action: t(lang, "setup_sc_docs"), desc: t(lang, "setup_sc_docs_desc"), mac: "Cmd + D", win: "Ctrl + D" },
  ];

  return (
    <div className={styles.wrap}>
      <TerminalHeader title="setup" desc={t(lang, "setup_desc")} />

      <div className={styles.hero}>
        <div className={styles.hero_prompt}>
          <span className={styles.prompt_sym}>~$</span>
          <h1 className={styles.hero_title}>{t(lang, "setup_hero_title")}</h1>
        </div>
        <p className={styles.hero_sub}>{t(lang, "setup_hero_sub")}</p>
      </div>

      <div className={styles.section}>
        <div className={styles.section_label}>{t(lang, "setup_download_label")}</div>
        <div
          className={styles.notice}
          dangerouslySetInnerHTML={{ __html: t(lang, "setup_download_body") }}
        />
        <a
          href="https://supercollider.github.io"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.download_btn}
        >
          <span>{t(lang, "setup_download_btn")}</span>
          <span className={styles.ext_arrow}>↗</span>
        </a>
      </div>

      <div className={styles.section}>
        <div className={styles.section_label}>{t(lang, "setup_ide_label")}</div>
        <p className={styles.section_body}>{t(lang, "setup_ide_intro")}</p>
        <div className={styles.steps}>
          {areas.map((area, i) => (
            <div key={i} className={styles.step}>
              <span className={styles.step_tag}>{AREA_TAGS[i]}</span>
              <div className={styles.step_content}>
                <div className={styles.step_title}>{area.title}</div>
                <div
                  className={styles.step_desc}
                  dangerouslySetInnerHTML={{ __html: area.desc }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.section_label}>{t(lang, "setup_start_label")}</div>
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={i} className={styles.step}>
              <span className={styles.step_num}>{String(i + 1).padStart(2, "0")}</span>
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
        <div className={styles.section_label}>{t(lang, "setup_shortcuts_label")}</div>
        <div className={styles.shortcut_list}>
          {shortcuts.map((sc, i) => (
            <div key={i} className={styles.shortcut_row}>
              <div className={styles.shortcut_text}>
                <span className={styles.shortcut_action}>{sc.action}</span>
                {sc.desc && (
                  <span
                    className={styles.shortcut_desc}
                    dangerouslySetInnerHTML={{ __html: sc.desc }}
                  />
                )}
              </div>
              <div className={styles.shortcut_keys}>
                <div className={styles.key_group}>
                  <span className={styles.platform_label}>Mac</span>
                  <span className={styles.key_badge}>{sc.mac}</span>
                </div>
                <div className={styles.key_group}>
                  <span className={styles.platform_label}>Win / Linux</span>
                  <span className={styles.key_badge}>{sc.win}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
