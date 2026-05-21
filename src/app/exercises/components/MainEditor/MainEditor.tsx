"use client";

import { useExercises } from "@/context/ExercisesContext";
import styles from "./MainEditor.module.css";
import { getExerciseById } from "@/lib/exercises";
import { useEffect, useRef, useState } from "react";
import { highlight } from "@/lib/highlight";
import { useProgress } from "@/context/ProgressContext";
import TerminalHeader from "@/components/TerminalHeader/TerminalHeader";
import { parseSCCode, validateSCCode } from "@/lib/scCodeParser";
import CopyToClipboard from "@/components/CopyToClipboard/CopyToClipboard";
import { hasSeenVolumeReminder, markVolumeReminderSeen } from "@/lib/reminder";
import ReminderModal from "@/components/ReminderModal/ReminderModal";
import { useAudio } from "@/hooks/useAudio";
import type { ValidationResult } from "@/types";
import { useLang } from "@/context/LangContext";
import { t } from "@/i18n/ui";

export default function MainEditor() {
  const { activeId } = useExercises();
  const { markCompleted } = useProgress();
  const { play, stop } = useAudio();
  const { lang } = useLang();

  const [codes, setCodes] = useState<Record<string, string>>({});
  const [results, setResults] = useState<
    Record<string, ValidationResult | null>
  >({});
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showVolumeModal, setShowVolumeModal] = useState<boolean>(false);
  const [showAnswerModal, setShowAnswerModal] = useState<boolean>(false);

  const textarea = useRef<HTMLTextAreaElement>(null);
  const hlLayer = useRef<HTMLDivElement>(null);

  const syncScroll = () => {
    if (!textarea.current || !hlLayer.current) return;
    hlLayer.current.scrollTop = textarea.current.scrollTop;
    hlLayer.current.scrollLeft = textarea.current.scrollLeft;
  };

  useEffect(() => {
    stop();
  }, [activeId, stop]);

  const exercise = getExerciseById(activeId);
  if (!exercise) return null;

  const code: string = codes[activeId] ?? exercise.starter[lang];
  const activeResult = results[exercise.id] ?? null;

  const onChange = (newCode: string): void => {
    setCodes((prev) => ({ ...prev, [activeId]: newCode }));
    setResults((prev) => ({ ...prev, [activeId]: null }));
  };

  const lines = code.split("\n");

  const handleTabPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ): void => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const s = target.selectionStart;
      const usersCode =
        code.slice(0, s) + "  " + code.slice(target.selectionEnd);

      onChange(usersCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = s + 2;
      }, 0);
    }
  };

  const handleRun = (): void => {
    if (!exercise) return;

    if (!hasSeenVolumeReminder()) {
      setShowVolumeModal(true);
      return;
    }

    const scValidation = validateSCCode(code);
    const result = exercise.validate(code);
    const mergedTips = [
      ...scValidation.errors,
      ...(result.ok ? [] : result.tips),
    ];

    const feedbackResult: ValidationResult = {
      ok: scValidation.ok && result.ok,
      tips: mergedTips,
    };
    setResults((prev) => ({ ...prev, [exercise.id]: feedbackResult }));

    if (scValidation.ok) {
      play(parseSCCode(code));
      setPlayingId(activeId);
    } else {
      setPlayingId(null);
    }

    if (result.ok && scValidation.ok) {
      markCompleted(activeId, code);
    }
  };

  const handleVolumeConfirm = (remindNextSession: boolean): void => {
    markVolumeReminderSeen(remindNextSession);
    setShowVolumeModal(false);
  };

  const handleStop = (): void => {
    setPlayingId(null);
    stop();
  };

  const handleReset = (): void => {
    onChange(exercise.starter[lang]);
    setResults((prev) => ({ ...prev, [activeId]: null }));
    setPlayingId(null);
    stop();
  };

  const handleShowAnswer = (): void => {
    setShowAnswerModal(true);
  };

  const handleShowAnswerConfirm = (): void => {
    setShowAnswerModal(false);
    onChange(exercise.answer[lang]);
    setPlayingId(null);
    stop();
  };

  const handleShowAnswerCancel = (): void => {
    setShowAnswerModal(false);
  };

  return (
    <section>
      <TerminalHeader title={exercise?.id} desc={exercise?.title[lang]} />

      <div className={styles.ex_main}>
        <p className={styles.ex_goal_bar}>
          <span className={styles.goal_label}>{t(lang, "exercises_goal_label")}</span>
          <span className={styles.goal_text}>{exercise?.goal[lang]}</span>
        </p>

        <div className={styles.ex_body}>
          <div className={styles.theory_pane}>
            <div className={styles.pane_label}>{t(lang, "exercises_theory_label")}</div>
            <pre className={styles.theory_pre}>{exercise?.theory[lang]}</pre>
          </div>

          <div className={styles.editor_pane}>
            <div className={styles.pane_label}>{t(lang, "exercises_editor_label")}</div>
            <div className={styles.editor_wrap}>
              <div className={styles.line_nums}>
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div className={styles.editor_inner}>
                <CopyToClipboard scCode={code} />
                <div
                  ref={hlLayer}
                  className={styles.hl_layer}
                  dangerouslySetInnerHTML={{ __html: highlight(code) }}
                />
                <textarea
                  ref={textarea}
                  className={styles.code_ta}
                  value={code}
                  onChange={(e) => onChange(e.target.value)}
                  onKeyDown={handleTabPress}
                  onScroll={syncScroll}
                  spellCheck={false}
                />
              </div>
            </div>

            {showVolumeModal && (
              <ReminderModal onConfirm={handleVolumeConfirm} />
            )}

            {showAnswerModal && (
              <ReminderModal
                onConfirm={handleShowAnswerConfirm}
                onCancel={handleShowAnswerCancel}
                title={t(lang, "exercises_answer_modal_title")}
                description={t(lang, "exercises_answer_modal_desc")}
                confirmLabel={t(lang, "exercises_answer_modal_confirm")}
                cancelLabel={t(lang, "exercises_cancel")}
                headerTitle="show-the-answer"
                showRemindOption={false}
                icon="warning"
              />
            )}

            <div className={styles.ex_controls}>
              <button
                className={styles.btn_run}
                onClick={handleRun}
                disabled={playingId === activeId}
              >
                {t(lang, "exercises_run")}
              </button>
              {playingId === activeId && (
                <button className={styles.btn_stop} onClick={handleStop}>
                  {t(lang, "exercises_stop")}
                </button>
              )}
              <button className={styles.btn_reset} onClick={handleReset}>
                {t(lang, "exercises_reset")}
              </button>
              <button className={styles.btn_reset} onClick={handleShowAnswer}>
                {t(lang, "exercises_show_answer")}
              </button>
            </div>

            {activeResult && (
              <div
                className={`${styles.feedback} ${activeResult.ok ? styles.fb_ok : styles.fb_err}`}
                role="status"
                aria-live="polite"
              >
                {activeResult.ok ? (
                  <>
                    <span className={styles.fb_icon}>✓</span>{" "}
                    {t(lang, "exercises_correct")}
                  </>
                ) : (
                  <>
                    <div className={styles.fb_icon_err}>
                      {t(lang, "exercises_error")}
                    </div>
                    {(activeResult.tips.length
                      ? activeResult.tips.map((tip) => tip[lang])
                      : [t(lang, "exercises_fallback_tip")]
                    ).map((msg, i) => (
                      <div key={i} className={styles.fb_tip}>
                        ▸ {msg}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
