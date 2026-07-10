import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Pedido" };

/**
 * GET /orders/:id exige actor ADMIN/VENDEDOR/BODEGA/CLIENTE — un invitado no
 * puede consultar acá su pedido después del checkout (ver
 * app/checkout/order-confirmation.tsx, que muestra el resumen una sola vez
 * con la respuesta directa de POST /orders). Esta ruta queda lista para
 * cuando exista login de clientes (RF-19).
 */
export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Pedido {id}</CardTitle>
          <CardDescription>
            Consultar el detalle de un pedido requiere haber iniciado sesión
            (RF-19), todavía no disponible. Si compraste como invitado, guardá
            el resumen que te mostramos justo después de confirmar.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
