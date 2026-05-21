import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "SC Learn is a platform to learn SuperCollider from the browser without any installation.",
};

export default function AboutPage() {
  return <AboutClient />;
}
