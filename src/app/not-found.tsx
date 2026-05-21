"use client";

import Link from "next/link";
import TerminalHeader from "@/components/TerminalHeader/TerminalHeader";
import styles from "./not-found.module.css";
import { useLang } from "@/context/LangContext";
import { t } from "@/i18n/ui";

export default function NotFound() {
  const { lang } = useLang();

  return (
    <div className={styles.wrap}>
      <TerminalHeader title="error" desc={t(lang, "not_found_desc")} />

      <div className={styles.terminal}>
        <div className={styles.error_block}>
          <span className={styles.error_code}>404</span>
          <div className={styles.error_lines}>
            <p className={styles.error_msg}>
              <span className={styles.keyword}>Error:</span>{" "}
              {t(lang, "not_found_error")}
            </p>
            <p className={styles.error_detail}>
              <span className={styles.comment}>
                {t(lang, "not_found_comment")}
              </span>
            </p>
          </div>
        </div>

        <div className={styles.suggestion}>
          <p className={styles.output_line}>
            <span className={styles.prompt}>~$</span>
            <span className={styles.cmd}>{t(lang, "not_found_cmd")}</span>
          </p>
          <p className={styles.suggestion_text}>
            {t(lang, "not_found_suggestion")}
          </p>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.btn_primary}>
            {t(lang, "not_found_home")}
          </Link>
          <Link href="/exercises" className={styles.btn_secondary}>
            {t(lang, "not_found_exercises")}
          </Link>
        </div>
      </div>
    </div>
  );
}
