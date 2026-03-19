"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { highlight } from "@/lib/highlight";
import { getActiveUGen, getFilteredUGens, getUGensCategories } from "@/lib/ugens";
import type { UGen } from "@/types";

export default function UGensClient() {
  const [activeUGen, setActiveUGen] = useState<string>("SinOsc");
  const [playingName, setPlayingName] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const ugen = getActiveUGen(activeUGen);
  const categories = getUGensCategories();
  const filtered = getFilteredUGens(filter);

  const handlePlay = (u: UGen): void => {
    setPlayingName(u.name);
  };

  const handleStop = (): void => {
    setPlayingName(null);
  };

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
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.cat_btn} ${filter === category ? styles.active : ""}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {filtered.map((ug) => (
            <button
              key={ug.name}
              className={`${styles.ugen_item} ${activeUGen === ug.name ? styles.active : ""}`}
              onClick={() => {
                setActiveUGen(ug.name);
                handleStop();
              }}
            >
              <span className={styles.ui_name}>{ug.name}</span>
              <span className={styles.ui_cat}>{ug.category}</span>
            </button>
          ))}
        </div>

        <div className={styles.ugen_detail}>
          <div className={styles.ud_name}>{ugen?.name}</div>
          <div className={styles.ud_cat}>{ugen?.category}</div>
          <div className={styles.ud_sig}>{ugen?.signature}</div>
          <p className={styles.ud_desc}>{ugen?.description}</p>

          <div className={styles.ud_args}>
            <div className={styles.pane_label} style={{ marginBottom: 8 }}>
              // argumentos
            </div>
            {ugen?.args.map((arg) => (
              <div key={arg.name} className={styles.arg_row}>
                <span className={styles.arg_name}>{arg.name}</span>
                <span className={styles.arg_default}>{arg.default}</span>
                <span className={styles.arg_desc}>{arg.desc}</span>
              </div>
            ))}
          </div>

          <div className={styles.ud_example}>
            <div className={styles.pane_label} style={{ marginBottom: 8 }}>
              // ejemplo
            </div>
            <div className={styles.example_block}>
              <pre
                dangerouslySetInnerHTML={{ __html: highlight(ugen.example) }}
              />
            </div>
          </div>

          <div className={styles.ud_controls}>
            <button className={styles.btn_run} onClick={() => handlePlay(ugen)}>
              ▶ Escuchar
            </button>
            {playingName === ugen?.name && (
              <button className={styles.btn_stop} onClick={handleStop}>
                ■ Stop
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
