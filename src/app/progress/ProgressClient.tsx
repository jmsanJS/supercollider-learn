"use client";

import { useState } from "react";
import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { EXERCISES } from "@/data/exercises";
import { getProgressStats } from "@/lib/progress";
import styles from "./page.module.css";
import TerminalHeader from "@/components/TerminalHeader/TerminalHeader";
import ReminderModal from "@/components/ReminderModal/ReminderModal";
import { useLang } from "@/context/LangContext";
import { t } from "@/i18n/ui";

export default function ProgressClient() {
  const { progress, resetProgress } = useProgress();
  const { lang } = useLang();
  const [showResetModal, setShowResetModal] = useState(false);
  const progressStats = getProgressStats(progress);

  const handleReset = () => {
    setShowResetModal(true);
  };

  const handleResetConfirm = () => {
    resetProgress();
    setShowResetModal(false);
  };

  const handleResetCancel = () => {
    setShowResetModal(false);
  };

  return (
    <section className={styles.section_wrap} aria-label={t(lang, "progress_aria")}>
      <TerminalHeader title="progress" />

      <div
        className={styles.progress_hero}
        role="status"
        aria-label={`${progressStats.percentage}%`}
      >
        <p className={styles.big_pct} aria-hidden="true">
          {progressStats.percentage}
          <span className={styles.pct_sym}>%</span>
        </p>
        <p className={styles.big_label}>
          {progressStats.completed} {t(lang, "progress_of")} {progressStats.total}{" "}
          {t(lang, "progress_exercises_completed")}
        </p>
        <div
          className={styles.main_bar}
          role="progressbar"
          aria-valuenow={progressStats.percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t(lang, "progress_total_aria")}
        >
          <div
            className={styles.main_bar_fill}
            style={{ width: `${progressStats.percentage}%` }}
          />
        </div>
      </div>

      <ul
        className={styles.level_progress_grid}
        aria-label={t(lang, "progress_by_level_aria")}
      >
        {progressStats.byLevel.map(({ level, total, done }) => (
          <li key={level} className={styles.lp_card}>
            <h3 className={styles.lp_level}>{t(lang, "progress_level")} {level}</h3>
            <p className={styles.lp_nums}>
              {done}/{total}
            </p>
            <div
              className={styles.lp_bar}
              role="progressbar"
              aria-valuenow={done}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label={`${t(lang, "progress_level")} ${level}: ${done} / ${total}`}
            >
              <div
                className={styles.lp_bar_fill}
                style={{ width: `${(done / total) * 100}%` }}
              />
            </div>
            <p className={styles.lp_label}>
              {done === total
                ? t(lang, "progress_done")
                : done === 0
                  ? t(lang, "progress_not_started")
                  : t(lang, "progress_in_progress")}
            </p>
          </li>
        ))}
      </ul>

      <section aria-label={t(lang, "progress_detail_label")}>
        <h2 className={styles.section_label}>{t(lang, "progress_detail_label")}</h2>
        <ul className={styles.ex_detail_list}>
          {EXERCISES.map((ex) => {
            const p = progress[ex.id];
            const completed = p?.completed ?? false;
            return (
              <li key={ex.id}>
                <Link
                  href={`/exercises?id=${ex.id}`}
                  className={`${styles.ex_detail_row} ${completed ? styles.ex_done : ""}`}
                  aria-label={`${ex.title[lang]} — ${completed ? t(lang, "progress_completed") : t(lang, "progress_pending")}`}
                >
                  <span className={styles.edr_check} aria-hidden="true">
                    {completed ? "✓" : "○"}
                  </span>
                  <span className={styles.edr_title}>{ex.title[lang]}</span>
                  <span className={styles.edr_tag}>{ex.tag}</span>
                  <span className={styles.edr_level}>{t(lang, "progress_lv")}{ex.level}</span>
                  <span className={styles.edr_status}>
                    {completed ? t(lang, "progress_completed") : t(lang, "progress_pending")}
                  </span>
                  <span className={styles.edr_arrow} aria-hidden="true">→</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.progress_footer}>
        <button
          className={styles.reset_btn}
          onClick={handleReset}
          aria-label={t(lang, "progress_reset_btn")}
        >
          {t(lang, "progress_reset_btn")}
        </button>
      </section>

      {showResetModal && (
        <ReminderModal
          onConfirm={handleResetConfirm}
          onCancel={handleResetCancel}
          headerTitle="confirm"
          icon="warning"
          title={t(lang, "progress_reset_modal_title")}
          description={t(lang, "progress_reset_modal_desc")}
          confirmLabel={t(lang, "progress_reset_modal_confirm")}
          cancelLabel={t(lang, "progress_cancel")}
          showRemindOption={false}
        />
      )}
    </section>
  );
}
