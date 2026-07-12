import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Order } from "@/types/api";

const currency = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

export function OrderConfirmation({ order }: { order: Order }) {
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>¡Pedido confirmado!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">
            Pedido <span className="font-mono">{order.id}</span> — Total{" "}
            {currency.format(Number(order.total))}
          </p>
          <p className="text-sm text-muted-foreground">
            Guardá este número: sin una cuenta (RF-19, todavía no disponible),
            no vas a poder volver a consultarlo desde acá. Te contactamos a{" "}
            {order.contactEmail} para coordinar pago y entrega.
          </p>
          <Button render={<Link href="/productos" />} className="mt-2">
            Seguir comprando
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
