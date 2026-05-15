import { Metadata } from "next";
import { Suspense } from "react";
import ExercisesClient from "./ExercisesClient";

export const metadata: Metadata = {
  title: "Ejercicios",
  description:
    "Ejercicios interactivos y progresivos para entender cómo programar en SuperCollider.",
};

export default function ExercisesPage() {
  return (
    <Suspense>
      <ExercisesClient />
    </Suspense>
  );
}
