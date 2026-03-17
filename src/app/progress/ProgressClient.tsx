"use client";

import { useProgress } from "@/context/ProgressContext";
import { EXERCISES } from "@/data/exercices";
import { getProgressStats } from "@/lib/progress";
import styles from "./page.module.css";

export default function ProgressClient() {
  const { progress, resetProgress } = useProgress();
  const progressStats = getProgressStats(progress);

  const handleReset = () => {
    const reset = window.confirm(
      "¿Quieres borrar todo tu progreso? Esta acción no se puede deshacer.",
    );
    if (reset) resetProgress();
  };

  return (
    <section className={styles.section_wrap} aria-label="Progreso del curso">
      <header className={styles.terminal_header} aria-hidden="true">
        <span className={`${styles.th_dot} ${styles.r}`} />
        <span className={`${styles.th_dot} ${styles.y}`} />
        <span className={`${styles.th_dot} ${styles.g}`} />
        <span className={styles.th_title}>progreso.sc</span>
      </header>

      <div
        className={styles.progress_hero}
        role="status"
        aria-label={`${progressStats.percentage}% completado`}
      >
        <p className={styles.big_pct} aria-hidden="true">
          {progressStats.percentage}
          <span className={styles.pct_sym}>%</span>
        </p>
        <p className={styles.big_label}>
          {progressStats.completed} de {progressStats.total} ejercicios
          completados
        </p>
        <div
          className={styles.main_bar}
          role="progressbar"
          aria-valuenow={progressStats.percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progreso total"
        >
          <div
            className={styles.main_bar_fill}
            style={{ width: `${progressStats.percentage}%` }}
          />
        </div>
      </div>

      <ul
        className={styles.level_progress_grid}
        aria-label="Progreso por nivel"
      >
        {progressStats.byLevel.map(({ level, total, done }) => (
          <li key={level} className={styles.lp_card}>
            <h3 className={styles.lp_level}>Nivel {level}</h3>
            <p className={styles.lp_nums}>
              {done}/{total}
            </p>
            <div
              className={styles.lp_bar}
              role="progressbar"
              aria-valuenow={done}
              aria-valuemin={0}
              aria-valuemax={total}
              aria-label={`Nivel ${level}: ${done} de ${total} completados`}
            >
              <div
                className={styles.lp_bar_fill}
                style={{ width: `${(done / total) * 100}%` }}
              />
            </div>
            <p className={styles.lp_label}>
              {done === total
                ? "✓ Completado"
                : done === 0
                  ? "Sin iniciar"
                  : "En progreso"}
            </p>
          </li>
        ))}
      </ul>

      <section aria-label="Detalle por ejercicio">
        <h2 className={styles.section_label}>Detalle por ejercicio</h2>
        <ul className={styles.ex_detail_list}>
          {EXERCISES.map((ex) => {
            const p = progress[ex.id];
            const completed = p?.completed ?? false;
            return (
              <li
                key={ex.id}
                className={`${styles.ex_detail_row} ${completed ? styles.ex_done : ""}`}
                aria-label={`${ex.title} — ${completed ? "completado" : "pendiente"}`}
              >
                <span className={styles.edr_check} aria-hidden="true">
                  {completed ? "✓" : "○"}
                </span>
                <span className={styles.edr_title}>{ex.title}</span>
                <span className={styles.edr_tag}>{ex.tag}</span>
                <span className={styles.edr_level}>Nv.{ex.level}</span>
                <span className={styles.edr_status}>
                  {completed ? "completado" : "pendiente"}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={styles.progress_footer}>
        <button
          className={styles.reset_btn}
          onClick={handleReset}
          aria-label="Borrar todo el progreso del curso"
        >
          Borrar progreso
        </button>
      </section>
    </section>
  );
}
