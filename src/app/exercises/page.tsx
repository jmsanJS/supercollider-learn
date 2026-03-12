import { Metadata } from "next";
import styles from "./page.module.css";
import { getTotalExercises } from "@/lib/exercises";

export const metadata: Metadata = {
  title: "Ejercicios",
  description:
    "Ejercicios interactivos y progresivos para entender cómo programar en SuperCollider.",
};

export default function ExercisesPage() {
  const totalExercises = getTotalExercises();

  return (
    <div className={styles.section_wrap}>
      <div className={styles.ex_layout}>
        {/* Sidebar */}
        <aside className={styles.ex_sidebar}>
          <div className={styles.sidebar_header}>
            <span className={styles.section_label} style={{ marginBottom: 0 }}>
              Ejercicios
            </span>
            <span className={styles.ex_count}>0/{totalExercises}</span>
          </div>

          <div className={styles.level_group}>
            <div className={styles.level_label}>Nivel 1</div>
            <button className={styles.ex_item}>
              <span className={styles.ex_check}>○</span>
              <span className={styles.ex_name}>Exercise title</span>
              <span className={styles.ex_tag}>Sinusoidal</span>
            </button>
            <button className={styles.ex_item}>
              <span className={styles.ex_check}>○</span>
              <span className={styles.ex_name}>Exercise title</span>
              <span className={styles.ex_tag}>Sinusoidal</span>
            </button>
            <button className={styles.ex_item}>
              <span className={styles.ex_check}>○</span>
              <span className={styles.ex_name}>Exercise title</span>
              <span className={styles.ex_tag}>Sinusoidal</span>
            </button>
          </div>
          <div className={styles.level_group}>
            <div className={styles.level_label}>Nivel 2</div>
            <button className={styles.ex_item}>
              <span className={styles.ex_check}>○</span>
              <span className={styles.ex_name}>Exercise title</span>
              <span className={styles.ex_tag}>Sinusoidal</span>
            </button>
            <button className={styles.ex_item}>
              <span className={styles.ex_check}>○</span>
              <span className={styles.ex_name}>Exercise title</span>
              <span className={styles.ex_tag}>Sinusoidal</span>
            </button>
          </div>
        </aside>

        {/* Main editor */}
        <div className={styles.ex_main}>
          <div className={styles.terminal_header}>
            <span className={`${styles.th_dot} ${styles.r}`} />
            <span className={`${styles.th_dot} ${styles.y}`} />
            <span className={`${styles.th_dot} ${styles.g}`} />
            <span className={styles.th_title}>ex1.sc — Sinusoidal</span>
          </div>

          <div className={styles.ex_goal_bar}>
            <span className={styles.goal_sym}>⊙</span>
            <span className={styles.goal_text}>Genera un tono de 440 Hz</span>
          </div>

          <div className={styles.ex_body}>
            <div className={styles.theory_pane}>
              <div className={styles.pane_label}>// teoría</div>
              <pre className={styles.theory_pre}>
                {`
SinOsc genera una onda sinusoidal pura. Sintaxis: \n
SinOsc.ar(freq, phase, mul) El bloque {}.play envía el audio a
los altavoces.
                `}
              </pre>
            </div>

            <div className={styles.editor_pane}>
              <div className={styles.pane_label}>// editor</div>
              <div className={styles.editor_wrap}>
                <div className={styles.line_nums}>
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                  <div>4</div>
                  <div>5</div>
                  <div>6</div>
                </div>
                <div className={styles.editor_inner}>
                  <div className={styles.hl_layer} />
                  <textarea className={styles.code_ta} />
                </div>
              </div>

              <div className={styles.ex_controls}>
                <button className={styles.btn_run}>▶ Ejecutar</button>
                <button className={styles.btn_stop}>■ Stop</button>
                <button className={styles.btn_reset}>↺</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
