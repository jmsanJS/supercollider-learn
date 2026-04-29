"use client";

import styles from "./ExercisesSidebar.module.css";
import {
  getExercisesByLevel,
  getLevels,
  getTotalExercises,
} from "@/lib/exercises";
import { useExercises } from "@/context/ExercisesContext";
import { useProgress } from "@/context/ProgressContext";

export default function ExercisesSidebar() {
  const { setActiveId } = useExercises();
  const { progress } = useProgress();

  const levels = getLevels();
  const totalExercises = getTotalExercises();

  return (
    <aside className={styles.ex_sidebar}>
      <div className={styles.sidebar_header}>
        <span className={styles.section_label} style={{ marginBottom: 0 }}>
          Ejercicios
        </span>
        <span className={styles.ex_count}>0/{totalExercises}</span>
      </div>
      {levels.map((lv) => (
        <div key={lv} className={styles.level_group}>
          <div className={styles.level_label}>Nivel {lv}</div>
          {getExercisesByLevel(lv).map((e) => {
            const p = progress[e.id];
            const completed = p?.completed ?? false;
            return (
              <button
                key={e.id}
                className={styles.ex_item}
                onClick={() => setActiveId(e.id)}
              >
                <span className={styles.ex_check}>{completed ? "✓" : "○"}</span>
                <span className={styles.ex_name}>{e.title}</span>
                <span className={styles.ex_tag}>{e.tag}</span>
              </button>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
