"use client";

import { useExercises } from "@/context/ExercisesContext";
import styles from "./MainEditor.module.css";
import { getExerciseById, getInitialCodes } from "@/lib/exercises";
import { useRef, useState } from "react";
import { highlight } from "@/lib/highlight";

export default function MainEditor() {
  const { activeId, markCompleted } = useExercises();
  const exercise = getExerciseById(activeId);

  const [codes, setCodes] = useState(getInitialCodes);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const textarea = useRef<HTMLTextAreaElement>(null);

  const code = codes[activeId] ?? exercise?.starter ?? "";
  const onChange = (newCode: string) => {
    setCodes((prev) => ({ ...prev, [activeId]: newCode }));
  };

  const lines = code.split("\n");

  const handleTabPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const s = target.selectionStart;
      const usersCode = code.slice(0, s) + "  " + code.slice(target.selectionEnd);

      onChange(usersCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = s + 2;
      }, 0);
    }
  };

  const handleRun = () => {
    if (!exercise) return;
    const result = exercise.validate(code);
    if (result.ok) {
      setPlayingId(activeId);
      markCompleted(activeId, code)
    } else {
      setPlayingId(null);
    }
  };

  const handleStop = () => setPlayingId(null);

  const handleReset = () => {
    onChange(exercise?.starter ?? "");
    setPlayingId(null);
  };

  return (
    <div className={styles.ex_main}>
      <header className={styles.terminal_header}>
        <span className={`${styles.th_dot} ${styles.r}`} />
        <span className={`${styles.th_dot} ${styles.y}`} />
        <span className={`${styles.th_dot} ${styles.g}`} />
        <h2 className={styles.th_title}>
          {exercise?.id}.sc — {exercise?.title}
        </h2>
      </header>

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
  );
}
