"use client";

import { ExercisesProvider } from "@/context/ExercisesContext";
import ExercisesSidebar from "./components/ExercisesSidebar/ExercisesSidebar";
import styles from "./page.module.css";
import MainEditor from "./components/MainEditor/MainEditor";

export default function ExercisesClient() {
  return (
    <ExercisesProvider>
      <div className={styles.section_wrap}>
        <div className={styles.ex_layout}>
          <ExercisesSidebar />
          <MainEditor />
        </div>
      </div>
    </ExercisesProvider>
  );
}
