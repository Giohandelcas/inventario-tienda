import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center">
      <h1 className="font-heading text-4xl font-bold sm:text-5xl">
        Todo lo que necesitás, en un solo lugar
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        Catálogo actualizado en tiempo real con el inventario del backoffice.
      </p>
      <Button
        render={<Link href="/productos" />}
        size="lg"
        className="bg-cta text-cta-foreground hover:bg-cta/90"
      >
        Ver catálogo
      </Button>
    </div>
  );
}
