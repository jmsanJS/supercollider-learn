import { Metadata } from "next";

export const metadata: Metadata = {
  title: "UGens",
  description:
    "Lista de los UGens más comunes y utilizados en SuperCollider. Los UGens son componentes básicos para la creación y modifica sonido.",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-4xl">UGens Page</h1>
    </div>
  );
}
