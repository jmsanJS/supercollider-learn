"use client";

import styles from "./ExercisesSidebar.module.css";
import {
  getExercisesByLevel,
  getLevels,
  getTotalExercises,
} from "@/lib/exercises";
import { useExercises } from "@/context/ExercisesContext";
import { useProgress } from "@/context/ProgressContext";
import { useAudio } from "@/hooks/useAudio";
import { useLang } from "@/context/LangContext";
import { t } from "@/i18n/ui";

export default function ExercisesSidebar() {
  const { activeId, setActiveId } = useExercises();
  const { progress } = useProgress();
  const { stop } = useAudio();
  const { lang } = useLang();

  const levels = getLevels();
  const totalExercises = getTotalExercises();
  const completedCount = Object.values(progress).filter((p) => p.completed).length;

  const handleClick = (id: string) => {
    if (activeId !== id) stop();
    setActiveId(id);
  };

  return (
    <aside className={styles.ex_sidebar}>
      <div className={styles.sidebar_header}>
        <span className={styles.section_label} style={{ marginBottom: 0 }}>
          {t(lang, "exercises_sidebar_label")}
        </span>
        <span className={styles.ex_count}>{completedCount}/{totalExercises}</span>
      </div>
      {levels.map((lv) => (
        <div key={lv} className={styles.level_group}>
          <div className={styles.level_label}>{t(lang, "exercises_level")} {lv}</div>
          {getExercisesByLevel(lv).map((e) => {
            const p = progress[e.id];
            const completed = p?.completed ?? false;
            return (
              <button
                key={e.id}
                className={`${styles.ex_item} ${activeId === e.id ? styles.active : ""}`}
                onClick={() => handleClick(e.id)}
              >
                <span className={styles.ex_check}>{completed ? "✓" : "○"}</span>
                <span className={styles.ex_name}>{e.title[lang]}</span>
                <span className={styles.ex_tag}>{e.tag}</span>
              </button>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
