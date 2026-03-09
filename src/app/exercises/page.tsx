import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ejercicios",
  description:
    "Ejercicios interactivos y progresivos para entender cómo programar en SuperCollider.",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-4xl">Exercices Page</h1>
    </div>
  );
}
