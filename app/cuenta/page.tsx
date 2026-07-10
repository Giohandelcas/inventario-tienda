import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Mi cuenta" };

/**
 * `inventario-api` no tiene login de clientes todavía (RF-19, sí tiene
 * POST /customers/register — ver /cuenta/registro). No hay JWT que emitir
 * para actor `customer`, así que esta pantalla es honesta sobre el estado
 * real en vez de simular un login que no puede funcionar.
 */
export default function AccountPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Mi cuenta</CardTitle>
          <CardDescription>
            El login de clientes todavía no está disponible (RF-19). Podés
            comprar como invitado sin necesidad de cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button render={<Link href="/cuenta/registro" />}>Crear cuenta</Button>
          <Button variant="outline" render={<Link href="/productos" />}>
            Seguir comprando
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
