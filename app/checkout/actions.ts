"use server";

import { ApiError, apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { getSession } from "@/lib/auth/session";
import type { Order } from "@/types/api";

export interface CheckoutItemInput {
  productVariantId: string;
  quantity: number;
}

export interface CheckoutInput {
  items: CheckoutItemInput[];
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  addressLine?: string;
  addressCity?: string;
  notes?: string;
}

export interface CheckoutResult {
  order?: Order;
  /** Si estaba logueado, el pedido queda en su historial (/cuenta/pedidos). */
  loggedIn?: boolean;
  error?: string;
}

/**
 * POST /orders (RF-17/18) — CLIENTE o PUBLICO (checkout invitado). Si hay
 * sesión de cliente, `apiFetch` adjunta el Bearer automáticamente (default
 * `withAuth: true`) y el pedido queda asociado a esa cuenta en vez de crear
 * un guest nuevo (ver `OrdersService.resolveCustomerId` en inventario-api).
 * El precio y subtotal los calcula inventario-api a partir de
 * `productVariantId`, no se confía en nada que venga del carrito del
 * cliente. Decrementa stock de inmediato en la misma transacción (decisión
 * documentada en requerimientos.md sección 6), no hay "reserva" con
 * expiración.
 */
export async function createOrderAction(input: CheckoutInput): Promise<CheckoutResult> {
  if (input.items.length === 0) {
    return { error: "Tu carrito está vacío." };
  }

  try {
    const order = await apiFetch<Order>(endpoints.orders.create(), {
      method: "POST",
      body: {
        items: input.items,
        contactName: input.contactName,
        contactEmail: input.contactEmail,
        contactPhone: input.contactPhone || undefined,
        shippingAddress: input.addressLine
          ? { line1: input.addressLine, city: input.addressCity }
          : undefined,
        notes: input.notes || undefined,
      },
    });
    const session = await getSession();
    return { order, loggedIn: !!session };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        error: "No se pudo confirmar el pedido. Revisá los datos e intentá de nuevo.",
      };
    }
    return {
      error:
        "No se pudo conectar con inventario-api. Verificá que esté corriendo y que API_URL apunte a él.",
    };
  }
}
