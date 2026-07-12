import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { requireSession } from "@/lib/auth/dal";
import { ORDER_STATUS_LABELS } from "@/lib/order-status";
import { listOrders } from "@/features/orders/api";

export const metadata = { title: "Mis pedidos" };

const currency = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

export default async function OrderHistoryPage() {
  await requireSession();
  const { data: orders } = await listOrders();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-heading text-3xl font-bold">Mis pedidos</h1>

      {orders.length === 0 ? (
        <p className="mt-4 text-muted-foreground">
          Todavía no hiciste ningún pedido.{" "}
          <Link href="/productos" className="text-primary underline">
            Ver catálogo
          </Link>
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {orders.map((order) => (
            <Link key={order.id} href={`/pedidos/${order.id}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-mono text-xs text-muted-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("es-PE")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium tabular-nums">
                      {currency.format(Number(order.total))}
                    </span>
                    <Badge variant="secondary">{ORDER_STATUS_LABELS[order.status]}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
