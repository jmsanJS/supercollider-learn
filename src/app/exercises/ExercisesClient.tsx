"use client";

import { useSearchParams } from "next/navigation";
import { ExercisesProvider } from "@/context/ExercisesContext";
import ExercisesSidebar from "./components/ExercisesSidebar/ExercisesSidebar";
import styles from "./page.module.css";
import MainEditor from "./components/MainEditor/MainEditor";

export default function ExercisesClient() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") ?? "ex0";

  return (
    <ExercisesProvider initialId={initialId}>
      <div className={styles.section_wrap}>
        <div className={styles.ex_layout}>
          <ExercisesSidebar />
          <MainEditor />
        </div>
      </div>
    </ExercisesProvider>
  );
}
