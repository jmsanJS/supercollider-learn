/* eslint-disable react/jsx-no-comment-textnodes */
"use client";

import { useExercises } from "@/context/ExercisesContext";
import styles from "./MainEditor.module.css";
import { getExerciseById, getInitialCodes } from "@/lib/exercises";
import { useRef, useState } from "react";
import { highlight } from "@/lib/highlight";
import { useProgress } from "@/context/ProgressContext";
import TerminalHeader from "@/components/TerminalHeader/TerminalHeader";
import CopyToClipboard from "@/components/CopyToClipboard/CopyToClipboard";
import { hasSeenVolumeReminder, markVolumeReminderSeen } from "@/lib/reminder";
import ReminderModal from "@/components/ReminderModal/ReminderModal";

export default function MainEditor() {
  const { activeId } = useExercises();
  const { markCompleted } = useProgress();

  const [codes, setCodes] = useState(getInitialCodes);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showVolumeModal, setShowVolumeModal] = useState<boolean>(false);

  const textarea = useRef<HTMLTextAreaElement>(null);

  const exercise = getExerciseById(activeId);
  if (!exercise) return null;

  const code: string = codes[activeId] ?? exercise.starter ?? "";
  const onChange = (newCode: string): void => {
    setCodes((prev) => ({ ...prev, [activeId]: newCode }));
  };

  const lines = code.split("\n");

  const handleTabPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
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

    const result = exercise.validate(code);
    if (result.ok) {
      setPlayingId(activeId);
      markCompleted(activeId, code);
    } else {
      setPlayingId(null);
    }
  };

  const handleVolumeConfirm = (remindNextSession: boolean): void => {
    markVolumeReminderSeen(remindNextSession);
    setShowVolumeModal(false);
  };

  const handleStop = (): void => setPlayingId(null);

  const handleReset = (): void => {
    onChange(exercise.starter ?? "");
    setPlayingId(null);
  };

  return (
    <section>
      <TerminalHeader title={exercise?.id} desc={exercise?.title} />

      <div className={styles.ex_main}>
        <p className={styles.ex_goal_bar}>
          <span className={styles.goal_sym}>⊙</span>
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
                  className={styles.hl_layer}
                  dangerouslySetInnerHTML={{ __html: highlight(code) }}
                />
                <textarea
                  ref={textarea}
                  className={styles.code_ta}
                  value={code}
                  onChange={(e) => onChange(e.target.value)}
                  onKeyDown={handleTabPress}
                  spellCheck={false}
                />
              </div>
            </div>

            {showVolumeModal && (
              <ReminderModal onConfirm={handleVolumeConfirm} />
            )}

            <div className={styles.ex_controls}>
              <button className={styles.btn_run} onClick={handleRun}>
                ▶ Ejecutar
              </button>
              {playingId === activeId && (
                <button className={styles.btn_stop} onClick={handleStop}>
                  ■ Stop
                </button>
              )}
              <button className={styles.btn_reset} onClick={handleReset}>
                ↺
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
