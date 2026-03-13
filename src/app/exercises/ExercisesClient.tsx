"use client";

import { ExercisesProvider } from "@/context/ExercisesContext";
import ExercisesSidebar from "./components/ExercisesSidebar/ExercisesSidebar";
import styles from "./page.module.css";

export default function ExercisesClient() {
  return (
    <ExercisesProvider>
      <div className={styles.section_wrap}>
        <div className={styles.ex_layout}>
          <ExercisesSidebar />
        </div>
      </div>
    </ExercisesProvider>
  );
}
