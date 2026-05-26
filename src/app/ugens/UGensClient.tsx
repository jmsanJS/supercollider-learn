"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./page.module.css";
import { highlight } from "@/lib/highlight";
import {
  getActiveUGen,
  getFilteredUGens,
  getUGensCategories,
} from "@/lib/ugens";
import type { UGen } from "@/types";
import TerminalHeader from "@/components/TerminalHeader/TerminalHeader";
import { useAudio } from "@/hooks/useAudio";
import CopyToClipboard from "@/components/CopyToClipboard/CopyToClipboard";
import { hasSeenVolumeReminder, markVolumeReminderSeen } from "@/lib/reminder";
import ReminderModal from "@/components/ReminderModal/ReminderModal";
import { useLang } from "@/context/LangContext";
import { t } from "@/i18n/ui";

export default function UGensClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { lang } = useLang();
  const [activeUGen, setActiveUGen] = useState<string>(searchParams.get("name") ?? "SinOsc");

  const handleSelectUGen = (name: string) => {
    setActiveUGen(name);
    router.replace(`/ugens?name=${name}`, { scroll: false });
  };
  const [playingName, setPlayingName] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [showVolumeModal, setShowVolumeModal] = useState<boolean>(false);

  const { play, stop } = useAudio();

  const ugen = getActiveUGen(activeUGen);
  if (!ugen) return null;

  const categories = getUGensCategories();
  const filtered = getFilteredUGens(filter);

  const handlePlay = (u: UGen): void => {
    if (!hasSeenVolumeReminder()) {
      setShowVolumeModal(true);
      return;
    }
    play(u.sound);
    setPlayingName(u.name);
  };

  const handleVolumeConfirm = (remindNextSession: boolean): void => {
    markVolumeReminderSeen(remindNextSession);
    setShowVolumeModal(false);
  };

  const handleStop = (): void => {
    stop();
    setPlayingName(null);
  };

  return (
    <section className={styles.section_wrap}>
      <div className={styles.ugen_layout}>
        <div className={styles.ugen_list_container}>
          <div className={styles.sidebar_header}>
            <span className={styles.section_label} style={{ marginBottom: 0 }}>
              {t(lang, "ugens_sidebar_label")}
            </span>
          </div>
          <div className={styles.cat_filter}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.cat_btn} ${filter === category ? styles.active : ""}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className={styles.ugen_list}>
            {filtered.map((ug) => (
              <button
                key={ug.name}
                className={`${styles.ugen_item} ${activeUGen === ug.name ? styles.active : ""}`}
                onClick={() => {
                  handleSelectUGen(ug.name);
                  handleStop();
                }}
              >
                <span className={styles.ui_name}>{ug.name}</span>
                <span className={styles.ui_cat}>{ug.category}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.ugen_main}>
          <TerminalHeader title="ugens" desc="Unit Generators" />

          <div className={styles.ugen_detail}>
            <div className={styles.ud_name}>{ugen.name}</div>
            <div className={styles.ud_cat}>{ugen.category}</div>
            <div className={styles.ud_sig}>{ugen.signature}</div>
            <p className={styles.ud_desc}>{ugen.description[lang]}</p>

            <div className={styles.ud_args}>
              <div className={styles.pane_label} style={{ marginBottom: 8 }}>
                {t(lang, "ugens_args_label")}
              </div>
              <div className={`${styles.arg_row} ${styles.arg_header}`}>
                <span className={styles.arg_name}>{t(lang, "ugens_args_col_name")}</span>
                <span className={styles.arg_default}>{t(lang, "ugens_args_col_default")}</span>
                <span className={styles.arg_desc}>{t(lang, "ugens_args_col_desc")}</span>
              </div>
              {ugen.args.map((arg) => (
                <div key={arg.name} className={styles.arg_row}>
                  <span className={styles.arg_name}>{arg.name}</span>
                  <span className={styles.arg_default}>{arg.default}</span>
                  <span className={styles.arg_desc}>{arg.desc[lang]}</span>
                </div>
              ))}
            </div>

            <div className={styles.ud_example}>
              <div className={styles.pane_label} style={{ marginBottom: 8 }}>
                {t(lang, "ugens_example_label")}
              </div>
              <div className={styles.example_block}>
                <CopyToClipboard scCode={ugen.example} />
                <pre
                  dangerouslySetInnerHTML={{ __html: highlight(ugen.example) }}
                />
              </div>
            </div>

            {ugen.note && (
              <div className={styles.ud_notes}>
                <div className={styles.pane_label} style={{ marginBottom: 8 }}>
                  {t(lang, "ugens_notes_label")}
                </div>
                {ugen.note.map((n, i) => (
                  <p key={i} className={styles.note_item}>{n[lang]}</p>
                ))}
              </div>
            )}

            {showVolumeModal && (
              <ReminderModal onConfirm={handleVolumeConfirm} />
            )}

            <div className={styles.ud_controls}>
              {playingName === ugen.name ? (
                <button className={styles.btn_stop} onClick={handleStop}>
                  ■ Stop
                </button>
              ) : (
                <button className={styles.btn_run} onClick={() => handlePlay(ugen)}>
                  {t(lang, "ugens_listen")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
