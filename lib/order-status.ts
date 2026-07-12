import type { OrderStatus } from "@/types/api";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDIENTE: "Pendiente de pago",
  CONFIRMADO: "Confirmado",
  PAGADO: "Pagado",
  ENVIADO: "Enviado",
  ENTREGADO: "Entregado",
  CANCELADO: "Cancelado",
};
