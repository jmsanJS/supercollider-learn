"use client";

import styles from "./page.module.css";

export default function UGensClient() {
  const handlePlay = () => {};
  const handleStop = () => {};

  return (
    <section className={styles.section_wrap}>
      <header className={styles.terminal_header} aria-hidden="true">
        <span className={`${styles.th_dot} ${styles.r}`} />
        <span className={`${styles.th_dot} ${styles.y}`} />
        <span className={`${styles.th_dot} ${styles.g}`} />
        <span className={styles.th_title}>ugens.sc — Unit Generators</span>
      </header>

      <div className={styles.ugen_layout}>
        <div className={styles.ugen_list}>
          <div className={styles.cat_filter}>
            <button className={`${styles.cat_btn} ${styles.active}`}>
              Oscilador
            </button>
            <button className={`${styles.cat_btn}`}>
              Ruido
            </button>
            <button className={`${styles.cat_btn}`}>
              Filtro
            </button>
          </div>

          <button className={`${styles.ugen_item} ${styles.active}`}>
            <span className={styles.ui_name}>SinOsc</span>
            <span className={styles.ui_cat}>Oscilador</span>
          </button>
          <button className={`${styles.ugen_item}`}>
            <span className={styles.ui_name}>WhiteNoise</span>
            <span className={styles.ui_cat}>Ruido</span>
          </button>
          <button className={`${styles.ugen_item}`}>
            <span className={styles.ui_name}>LPF</span>
            <span className={styles.ui_cat}>Filtro</span>
          </button>
        </div>

        <div className={styles.ugen_detail}>
          <div className={styles.ud_name}>SinOsc</div>
          <div className={styles.ud_cat}>Oscilador</div>
          <div className={styles.ud_sig}>Saw.ar(freq, phase, mul, add)</div>
          <p className={styles.ud_desc}>Esto es una onda sinusoidal</p>

          <div className={styles.ud_args}>
            <div className={styles.pane_label} style={{ marginBottom: 8 }}>
              // argumentos
            </div>

            <div className={styles.arg_row}>
              <span className={styles.arg_name}>freq</span>
              <span className={styles.arg_default}>440</span>
              <span className={styles.arg_desc}>Frequencia en Hz</span>
            </div>
            <div className={styles.arg_row}>
              <span className={styles.arg_name}>phase</span>
              <span className={styles.arg_default}>0</span>
              <span className={styles.arg_desc}>Fase inicial 0 a 2pi</span>
            </div>
          </div>

          <div className={styles.ud_example}>
            <div className={styles.pane_label} style={{ marginBottom: 8 }}>
              // ejemplo
            </div>
            <div className={styles.example_block}>
              <pre>{`{ SinOsc.ar(440, 0, 0.3) }.play`}</pre>
            </div>
          </div>

          <div className={styles.ud_controls}>
            <button className={styles.btn_run} onClick={handlePlay}>
              ▶ Escuchar
            </button>

            <button className={styles.btn_stop} onClick={handleStop}>
              ■ Stop
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
