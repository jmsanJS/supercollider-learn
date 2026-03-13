import { Metadata } from "next";
import ExercisesClient from "./ExercisesClient";

export const metadata: Metadata = {
  title: "Ejercicios",
  description:
    "Ejercicios interactivos y progresivos para entender cómo programar en SuperCollider.",
};

export default function ExercisesPage() {
  return <ExercisesClient />;
}
