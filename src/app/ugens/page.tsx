import { Metadata } from "next";
import { Suspense } from "react";
import UGensClient from "./UGensClient";

export const metadata: Metadata = {
  title: "UGens comunes",
  description:
    "Lista de los UGens más comunes y utilizados en SuperCollider. Los UGens son componentes básicos para la creación y modifica sonido.",
};

export default function Page() {
  return (
    <Suspense>
      <UGensClient />
    </Suspense>
  );
}
