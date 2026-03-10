import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.section_wrap}>
      <div className={styles.terminal_header}>
        <span className={`${styles.th_dot} ${styles.r}`} />
        <span className={`${styles.th_dot} ${styles.y}`} />
        <span className={`${styles.th_dot} ${styles.g}`} />
        <span className={styles.th_title}>sound.sc</span>
      </div>
      <div className={styles.terminal_section}>
        <div className={styles.t_prompt}>
          <span className={styles.prompt_sym}>~$</span>
          <p className={styles.t_title}>
            SuperCollider
            <br />
            <span className={styles.typewriter}>Interactivo</span>
          </p>
        </div>
        <p className={styles.t_sub}>
          Aprende síntesis de audio escribiendo código real.
          <br />
          Sin instalaciones. Directo en tu navegador.
        </p>
      </div>
    </div>
  );
}
