import { Metadata } from "next";
import { Suspense } from "react";
import ExercisesClient from "./ExercisesClient";

export const metadata: Metadata = {
  title: "Exercises",
  description:
    "Interactive, progressive exercises to learn how to program in SuperCollider.",
};

export default function ExercisesPage() {
  return (
    <Suspense>
      <ExercisesClient />
    </Suspense>
  );
}
