import type { Metadata } from "next";
import GlossaryClient from "./GlossaryClient";

export const metadata: Metadata = {
  title: "Glosario",
  description:
    "Términos de SuperCollider, audio, música y programación explicados de forma clara.",
};

export default function GlossaryPage() {
  return <GlossaryClient />;
}
