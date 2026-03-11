"use client"

import { ReactNode } from "react";
import styles from "./HomeInfoCard.module.css";

type HomeInfoCardProps = {
  label: string,
  icon: ReactNode,
  desc: string
}

export default function HomeInfoCard({label, icon, desc}: HomeInfoCardProps) {
  return (
    <div className={styles.info_card} key={label}>
      <div className={styles.card_icon}>{icon}</div>
      <div className={styles.card_label}>{label}</div>
      <div className={styles.card_desc}>{desc}</div>
    </div>
  );
}
