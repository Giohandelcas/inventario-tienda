import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/heroVideoInventario.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-24 text-center text-white">
        <h1 className="font-heading text-4xl font-bold sm:text-5xl">
          Todo lo que necesitás, en un solo lugar
        </h1>
        <p className="max-w-xl text-lg text-white/80">
          Catálogo actualizado en tiempo real con el inventario del backoffice.
        </p>
        <Button
          render={<Link href="/productos" />}
          nativeButton={false}
          size="lg"
          className="bg-cta text-cta-foreground hover:bg-cta/90"
        >
          Ver catálogo
        </Button>
      </div>
    </div>
  );
}
