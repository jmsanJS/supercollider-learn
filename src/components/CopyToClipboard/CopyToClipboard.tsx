import { useState } from "react";
import styles from "./CopyToClipboard.module.css";
import { CopyToClipboardProps } from "@/types";

export default function CopyToClipboard({ scCode }: CopyToClipboardProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(scCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copying text", err);
    }
  };

  return (
    <button
      className={styles.copy_btn}
      onClick={handleCopy}
      aria-label="Copiar código"
      title={copied ? "¡Copiado!" : "Copiar"}
    >
      {copied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          width={13}
          height={13}
        >
          <path
            fillRule="evenodd"
            d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          width={13}
          height={13}
        >
          <path
            fillRule="evenodd"
            d="M11.986 3H12a2 2 0 0 1 2 2v6a2 2 0 0 1-1.5 1.937V7A2.5 2.5 0 0 0 10 4.5H4.063A2 2 0 0 1 6 3h.014A2.25 2.25 0 0 1 8.25 1h1.5a2.25 2.25 0 0 1 2.236 2ZM10.5 4v-.175a2.25 2.25 0 0 0-.75-1.69V4h.75Z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M2 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7Zm2 2a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5H4Zm0 2.5a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5H4Z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
}
