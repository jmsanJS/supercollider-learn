/* eslint-disable react/jsx-no-comment-textnodes */
import Link from "next/link";
import TerminalHeader from "@/components/TerminalHeader/TerminalHeader";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <TerminalHeader title="error" desc="página no encontrada" />

      <div className={styles.terminal}>
        <div className={styles.error_block}>
          <span className={styles.error_code}>404</span>
          <div className={styles.error_lines}>
            <p className={styles.error_msg}>
              <span className={styles.keyword}>Error:</span> Ruta no encontrada
            </p>
            <p className={styles.error_detail}>
              <span className={styles.comment}>// La página que buscas no existe o fue movida.</span>
            </p>
          </div>
        </div>

        <div className={styles.suggestion}>
          <p className={styles.output_line}>
            <span className={styles.prompt}>~$</span>
            <span className={styles.cmd}>sugerencia --inicio || --ejercicios</span>
          </p>
          <p className={styles.suggestion_text}>
            Vuelve para seguir aprendiendo SuperCollider.
          </p>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.btn_primary}>
            inicio
          </Link>
          <Link href="/exercises" className={styles.btn_secondary}>
            ejercicios
          </Link>
        </div>
      </div>
    </div>
  );
}
