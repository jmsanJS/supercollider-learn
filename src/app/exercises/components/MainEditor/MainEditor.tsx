/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useExercises } from "@/context/ExercisesContext";
import styles from "./MainEditor.module.css";
import { getExerciseById, getInitialCodes } from "@/lib/exercises";
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

export default function MainEditor() {
  const { activeId } = useExercises();
  const { markCompleted } = useProgress();
  const { play, stop } = useAudio();

  const [codes, setCodes] = useState(getInitialCodes);
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

  const code: string = codes[activeId] ?? exercise.starter ?? "";
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
      audio: result.audio,
    };
    setResults((prev) => ({ ...prev, [exercise.id]: feedbackResult }));
    const canPlayCode = scValidation.ok;

    if (canPlayCode) {
      const stereo = /!\s*2/.test(code);
      const audioConfig = result.ok ? result.audio : parseSCCode(code);
      play({ ...audioConfig, stereo });
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
    onChange(exercise.starter ?? "");
    setResults((prev) => ({ ...prev, [activeId]: null }));
    setPlayingId(null);
    stop();
  };

  const handleShowAnswer = (): void => {
    setShowAnswerModal(true);
  };

  const handleShowAnswerConfirm = (): void => {
    setShowAnswerModal(false);
    onChange(exercise.answer ?? "");
    setPlayingId(null);
    stop();
  };

  const handleShowAnswerCancel = (): void => {
    setShowAnswerModal(false);
  };

  return (
    <section>
      <TerminalHeader title={exercise?.id} desc={exercise?.title} />

      <div className={styles.ex_main}>
        <p className={styles.ex_goal_bar}>
          <span className={styles.goal_label}>Ejercicio:</span>
          <span className={styles.goal_text}>{exercise?.goal}</span>
        </p>

        <div className={styles.ex_body}>
          <div className={styles.theory_pane}>
            <div className={styles.pane_label}>// teoría</div>
            <pre className={styles.theory_pre}>{exercise?.theory}</pre>
          </div>

          <div className={styles.editor_pane}>
            <div className={styles.pane_label}>// editor</div>
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
                title="Mostrar respuesta"
                description="Si confirmas, se cargará la solución del ejercicio actual en el editor."
                confirmLabel="Mostrar"
                cancelLabel="Cancelar"
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
                ▶ Ejecutar
              </button>
              {playingId === activeId && (
                <button className={styles.btn_stop} onClick={handleStop}>
                  ■ Stop
                </button>
              )}
              <button className={styles.btn_reset} onClick={handleReset}>
                ↺ Reiniciar
              </button>
              <button className={styles.btn_reset} onClick={handleShowAnswer}>
                💡 Mostrar respuesta
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
                    <span className={styles.fb_icon}>✓</span> ¡Correcto! El
                    sonido se está generando.
                  </>
                ) : (
                  <>
                    <div className={styles.fb_icon_err}>
                      ✗ Revisa tu código:
                    </div>
                    {(activeResult.tips.length
                      ? activeResult.tips
                      : [
                          "La solución no cumple aún los requisitos del ejercicio.",
                        ]
                    ).map((t, i) => (
                      <div key={i} className={styles.fb_tip}>
                        ▸ {t}
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
