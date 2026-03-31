"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ReminderModal.module.css";
import type { ReminderModalProps } from "@/types";
import TerminalHeader from "../TerminalHeader/TerminalHeader";

export default function ReminderModal({ onConfirm }: ReminderModalProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [remindNextSession, setRemindNextSession] = useState<boolean>(true);

  useEffect(() => {
    btnRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === "Escape") onConfirm(remindNextSession);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onConfirm, remindNextSession]);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="volume-title"
      aria-describedby="volume-desc"
    >
      <div className={styles.modal}>
        <TerminalHeader title="volume" />

        <div className={styles.modal_body}>
          <div className={styles.icon_wrap} aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              width={32}
              height={32}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          </div>

          <h2 id="volume-title" className={styles.title}>
            Antes de continuar
          </h2>

          <p id="volume-desc" className={styles.desc}>
            Los sonidos generados pueden ser intensos.
            <br />
            <strong>Baja el volumen a los mínimos</strong> antes de escuchar.
          </p>

          <button
            ref={btnRef}
            className={styles.confirm_btn}
            onClick={() => onConfirm(remindNextSession)}
          >
            Entendido
          </button>

          <label className={styles.remind_label}>
            <input
              type="checkbox"
              className={styles.remind_checkbox}
              checked={remindNextSession}
              onChange={(e) => setRemindNextSession(e.target.checked)}
            />
            <span>Recordarme la próxima sesión</span>
          </label>
        </div>
      </div>
    </div>
  );
}
