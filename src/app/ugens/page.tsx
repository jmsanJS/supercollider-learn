import { Metadata } from "next";
import { Suspense } from "react";
import UGensClient from "./UGensClient";

export const metadata: Metadata = {
  title: "Common UGens",
  description:
    "A reference for the most commonly used UGens in SuperCollider — the building blocks for creating and shaping sound.",
};

export default function Page() {
  return (
    <Suspense>
      <UGensClient />
    </Suspense>
  );
}
