import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { Order, PaginatedResult } from "@/types/api";

/** GET /orders — CLIENTE, filtrado a los propios por inventario-api (OrdersService). */
export function listOrders() {
  return apiFetch<PaginatedResult<Order>>(endpoints.orders.list());
}

/** GET /orders/:id — CLIENTE, 403 si el pedido no es propio. */
export function getOrder(id: string) {
  return apiFetch<Order>(endpoints.orders.detail(id));
}
