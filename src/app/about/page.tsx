import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca de",
  description:
    "SC Learn es una plataforma para aprender SuperCollider desde el navegador. Aquí se encuentran diversos ejercicios que te ayudarán a progresar en ese programa.",
};

export default function About() {
  return (
    <div>
      <h1 className="text-4xl">About Page</h1>
    </div>
  );
}
