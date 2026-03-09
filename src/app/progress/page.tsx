import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Progreso",
  description: "Registro del progreso de los ejercicios de SC Learn.",
};

export default function Progress() {
  return (
    <div>
      <h1 className="text-4xl">Progress Page</h1>
    </div>
  );
}
