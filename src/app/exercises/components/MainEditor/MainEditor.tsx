"use client";

import { useExercises } from "@/context/ExercisesContext";
import styles from "./MainEditor.module.css";
import { getExerciseById, getInitialCodes } from "@/lib/exercises";
import { useRef, useState } from "react";
import { highlight } from "@/lib/highlight";

export default function MainEditor() {
  const { activeId } = useExercises();
  const exercise = getExerciseById(activeId);

  const [codes, setCodes] = useState(getInitialCodes);

  const textarea = useRef<HTMLTextAreaElement>(null);

  const value = codes[activeId] ?? exercise?.starter ?? "";
  const onChange = (newValue: string) => {
    setCodes((prev) => ({ ...prev, [activeId]: newValue }));
  };

  const lines = value.split("\n");

  const handleTabPress = () => {};

  const handleRun = () => {};
  const handleStop = () => {};
  const handleReset = () => {};

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
                dangerouslySetInnerHTML={{ __html: highlight(value) }}
              />
              <textarea
                ref={textarea}
                className={styles.code_ta}
                value={value}
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
            <button className={styles.btn_stop} onClick={handleStop}>
              ■ Stop
            </button>
            <button className={styles.btn_reset} onClick={handleReset}>
              ↺
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
