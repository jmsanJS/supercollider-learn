import { Metadata } from "next";
import ProgressClient from "./ProgressClient"

export const metadata: Metadata = {
  title: "Progress",
  description: "Track your SC Learn exercise progress.",
};

export default function ProgressPage() {
  return <ProgressClient />;
}
