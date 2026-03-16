"use client";

import styles from "./page.module.css";

export default function ProgressClient() {
  const handleReset = () => {};

  return (
    <div className={styles.section_wrap}>
      <div className={styles.terminal_header}>
        <span className={`${styles.th_dot} ${styles.r}`} />
        <span className={`${styles.th_dot} ${styles.y}`} />
        <span className={`${styles.th_dot} ${styles.g}`} />
        <span className={styles.th_title}>progreso.sc</span>
      </div>

      <div className={styles.progress_hero}>
        <div className={styles.big_pct}>
          50
          <span className={styles.pct_sym}>%</span>
        </div>
        <div className={styles.big_label}>1 de 2 ejercicios completados</div>
        <div className={styles.main_bar}>
          <div className={styles.main_bar_fill} style={{ width: "50%" }} />
        </div>
      </div>

      <div className={styles.level_progress_grid}>
        <div className={styles.lp_card}>
          <div className={styles.lp_level}>Nivel 1</div>
          <div className={styles.lp_nums}>1/2</div>
          <div className={styles.lp_bar}>
            <div className={styles.lp_bar_fill} style={{ width: "50%" }} />
          </div>
          <div className={styles.lp_label}>✓ Completado</div>
        </div>
        <div className={styles.lp_card}>
          <div className={styles.lp_level}>Nivel 1</div>
          <div className={styles.lp_nums}>1/2</div>
          <div className={styles.lp_bar}>
            <div className={styles.lp_bar_fill} style={{ width: "50%" }} />
          </div>
          <div className={styles.lp_label}>En progreso</div>
        </div>
      </div>

      <div className={styles.ex_detail_list}>
        <div className={styles.section_label}>Detalle por ejercicio</div>

        <div className={`${styles.ex_detail_row} ${styles.ex_done}`}>
          <span className={styles.edr_check}>✓</span>
          <span className={styles.edr_title}>Tono puro</span>
          <span className={styles.edr_tag}>SinOsc</span>
          <span className={styles.edr_level}>Nv.1</span>
          <span className={styles.edr_status}>completado</span>
        </div>

        <div className={styles.ex_detail_row}>
          <span className={styles.edr_check}>○</span>
          <span className={styles.edr_title}>Tono puro</span>
          <span className={styles.edr_tag}>SinOsc</span>
          <span className={styles.edr_level}>Nv.1</span>
          <span className={styles.edr_status}>pendiente</span>
        </div>
      </div>

      <button className={styles.reset_btn} onClick={handleReset}>
        Borrar progreso
      </button>
    </div>
  );
}
