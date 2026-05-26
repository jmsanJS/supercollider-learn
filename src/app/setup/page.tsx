import { Metadata } from "next";
import SetupClient from "./SetupClient";

export const metadata: Metadata = {
  title: "Setup",
  description:
    "How to download, install, and get started with SuperCollider on your computer.",
};

export default function SetupPage() {
  return <SetupClient />;
}
