import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError } from "@/lib/api/client";
import { requireSession } from "@/lib/auth/dal";
import { ORDER_STATUS_LABELS } from "@/lib/order-status";
import { getOrder } from "@/features/orders/api";

export const metadata = { title: "Pedido" };

const currency = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

/**
 * Requiere sesión (RF-19): GET /orders/:id exige actor CLIENTE (o
 * ADMIN/VENDEDOR/BODEGA) y 403 si el pedido no es propio. Un invitado que
 * acaba de pagar no puede volver a entrar acá — ver
 * app/checkout/order-confirmation.tsx, que muestra el resumen una sola vez.
 */
export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSession();
  const { id } = await params;

  const order = await getOrder(id).catch((error: unknown) => {
    if (error instanceof ApiError && (error.status === 404 || error.status === 403)) {
      notFound();
    }
    throw error;
  });

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="font-mono text-base">{order.id}</CardTitle>
          <Badge variant="secondary">{ORDER_STATUS_LABELS[order.status]}</Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {order.items?.map((item) => (
            <div key={item.productVariantId} className="flex justify-between text-sm">
              {/* GET /orders/:id no incluye el nombre del producto, solo productVariantId */}
              <span className="font-mono text-xs text-muted-foreground">
                {item.productVariantId} × {item.quantity}
              </span>
              <span className="tabular-nums">{currency.format(Number(item.subtotal))}</span>
            </div>
          ))}
          <div className="flex justify-between border-t pt-3 font-medium">
            <span>Total</span>
            <span className="tabular-nums">{currency.format(Number(order.total))}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
