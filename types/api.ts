/**
 * Tipos compartidos que reflejan `inventario-api/prisma/schema.prisma` y los
 * contratos documentados en `inventario-api/docs/API-CONTRACTS.md`, desde la
 * perspectiva del storefront (actor PUBLICO o CLIENTE — nunca ADMIN/BODEGA).
 *
 * Repo hermano separado (requerimientos.md sección 2.1): no se importa nada
 * de `inventario-app`, se mantiene este archivo a mano en paralelo. `cost`
 * directamente no existe acá — el storefront nunca lo recibe (matriz de
 * permisos, sección 9).
 */

export type OrderStatus =
  | "PENDIENTE"
  | "CONFIRMADO"
  | "PAGADO"
  | "ENVIADO"
  | "ENTREGADO"
  | "CANCELADO";

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// ─── Catálogo (RF-13/14/15) ─────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  parent?: Category | null;
  children?: Category[];
}

export interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  position: number;
}

/** `attributes` es JSON abierto (talla/color/presentación, etc. según categoría). */
export interface ProductVariant {
  id: string;
  sku: string;
  attributes: Record<string, unknown>;
  priceOverride: string | null;
  stock: number;
  active: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string | null;
  categoryId: string;
  category?: Category;
  basePrice: string;
  active: boolean;
  images?: ProductImage[];
  variants?: ProductVariant[];
}

// ─── Cliente (RF-19) ────────────────────────────────────────────────────────

export interface Customer {
  id: string;
  email: string;
  name: string;
  phone: string | null;
}

// ─── Pedidos (RF-10, RF-17, RF-18) ─────────────────────────────────────────

export interface OrderItem {
  productVariantId: string;
  productVariant?: ProductVariant & { product?: Pick<Product, "id" | "name" | "sku"> };
  quantity: number;
  unitPrice: string;
  subtotal: string;
}

export interface Order {
  id: string;
  status: OrderStatus;
  subtotal: string;
  total: string;
  contactEmail: string;
  contactPhone: string | null;
  shippingAddress: Record<string, unknown> | null;
  notes: string | null;
  items?: OrderItem[];
  createdAt: string;
}
