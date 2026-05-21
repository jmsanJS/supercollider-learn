import type { Metadata } from "next";
import GlossaryClient from "./GlossaryClient";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "SuperCollider, audio, music and programming terms clearly explained.",
};

export default function GlossaryPage() {
  return <GlossaryClient />;
}
