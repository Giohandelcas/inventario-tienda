import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";

/**
 * A diferencia de `inventario-app` (todo el dashboard requiere sesión), acá
 * la mayoría de las páginas son públicas — usar `getSession()` directo
 * (lib/auth/session.ts) para chequeos opcionales (header, checkout). Esta
 * función es solo para las pocas páginas que sí exigen estar logueado
 * (RF-19), como el historial de pedidos.
 */
export const requireSession = cache(async () => {
  const session = await getSession();
  if (!session) {
    redirect("/cuenta/login");
  }
  return session;
});
