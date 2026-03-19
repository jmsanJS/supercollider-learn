import type { TerminalHeaderProps } from "@/types";
import styles from "./TerminalHeader.module.css";

export default function TerminalHeader({ title="sound", desc }: TerminalHeaderProps) {
  return (
    <header className={styles.terminal_header} aria-hidden="true">
      <span className={`${styles.th_dot} ${styles.r}`} />
      <span className={`${styles.th_dot} ${styles.y}`} />
      <span className={`${styles.th_dot} ${styles.g}`} />
      <h2 className={styles.th_title}>
        {title}.sc {desc ? `- ${desc}` : ""}
      </h2>
    </header>
  );
}
