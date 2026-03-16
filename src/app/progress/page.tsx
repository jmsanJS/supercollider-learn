import { Metadata } from "next";
import ProgressClient from "./ProgressClient"

export const metadata: Metadata = {
  title: "Progreso",
  description: "Registro del progreso de los ejercicios de SC Learn.",
};

export default function ProgressPage() {
  return <ProgressClient />;
}
