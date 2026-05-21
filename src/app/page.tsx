"use client";

import HomeInfoCard from "@/components/HomeInfoCard/HomeInfoCard";
import styles from "./page.module.css";
import TerminalHeader from "@/components/TerminalHeader/TerminalHeader";
import { useLang } from "@/context/LangContext";
import { t } from "@/i18n/ui";

export default function Home() {
  const { lang } = useLang();

  const cards = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="icon">
          <path d="M7.557 2.066A.75.75 0 0 1 8 2.75v10.5a.75.75 0 0 1-1.248.56L3.59 11H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.59l3.162-2.81a.75.75 0 0 1 .805-.124ZM12.95 3.05a.75.75 0 1 0-1.06 1.06 5.5 5.5 0 0 1 0 7.78.75.75 0 1 0 1.06 1.06 7 7 0 0 0 0-9.9Z" />
          <path d="M10.828 5.172a.75.75 0 1 0-1.06 1.06 2.5 2.5 0 0 1 0 3.536.75.75 0 1 0 1.06 1.06 4 4 0 0 0 0-5.656Z" />
        </svg>
      ),
      label: t(lang, "home_card_sound_label"),
      desc: t(lang, "home_card_sound_desc"),
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="icon">
          <path d="M7.25 3.688a8.035 8.035 0 0 0-4.872-.523A.48.48 0 0 0 2 3.64v7.994c0 .345.342.588.679.512a6.02 6.02 0 0 1 4.571.81V3.688ZM8.75 12.956a6.02 6.02 0 0 1 4.571-.81c.337.075.679-.167.679-.512V3.64a.48.48 0 0 0-.378-.475 8.034 8.034 0 0 0-4.872.523v9.268Z" />
        </svg>
      ),
      label: t(lang, "home_card_prog_label"),
      desc: t(lang, "home_card_prog_desc"),
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="icon">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
      ),
      label: t(lang, "home_card_noacc_label"),
      desc: t(lang, "home_card_noacc_desc"),
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="icon">
          <path d="M12 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-1ZM6.5 6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V6ZM2 9a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9Z" />
        </svg>
      ),
      label: t(lang, "home_card_prog2_label"),
      desc: t(lang, "home_card_prog2_desc"),
    },
  ];

  return (
    <div className={styles.section_wrap}>
      <TerminalHeader title="sound" desc={t(lang, "home_title")} />

      <div className={styles.terminal_section}>
        <div className={styles.t_prompt}>
          <span className={styles.prompt_sym}>~$</span>
          <p className={styles.t_title}>
            SuperCollider
            <br />
            <span className={styles.typewriter}>{t(lang, "home_subtitle")}</span>
          </p>
        </div>
        <p className={styles.t_sub}>
          {t(lang, "home_tagline")}
          <br />
          {t(lang, "home_tagline2")}
        </p>
      </div>

      <div className={styles.cards_grid}>
        {cards.map((c, i) => (
          <HomeInfoCard key={i} icon={c.icon} label={c.label} desc={c.desc} />
        ))}
      </div>

      <div className={styles.about_sc}>
        <div className={styles.section_label}>{t(lang, "home_what_is_sc")}</div>
        <div className={styles.code_block}>
          <pre>
            {`
${t(lang, "home_sc_comment1")}
${t(lang, "home_sc_comment2")}

${t(lang, "home_sc_comment3")}

${t(lang, "home_sc_comment4")}

${t(lang, "home_sc_comment5")}
            `}
          </pre>
        </div>
      </div>
    </div>
  );
}
