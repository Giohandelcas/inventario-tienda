/**
 * Rutas de `inventario-api` que el storefront puede llamar hoy como actor
 * PUBLICO o CLIENTE invitado (ver `inventario-api/docs/API-CONTRACTS.md`).
 *
 * No incluye `orders.list`/`orders.detail`: GET /orders y GET /orders/:id
 * exigen actor ADMIN/VENDEDOR/BODEGA/CLIENTE — un invitado que acaba de
 * pagar (POST /orders, sí PUBLICO) no puede después consultar ese pedido por
 * GET sin loguearse (RF-19, todavía no implementado). Ver
 * app/(shop)/checkout/actions.ts para cómo se maneja la confirmación sin esa
 * ruta.
 */
export const endpoints = {
  products: {
    list: () => `/products`,
    detail: (id: string) => `/products/${id}`,
  },
  categories: {
    list: () => `/categories`,
    detail: (id: string) => `/categories/${id}`,
  },
  customers: {
    register: () => `/customers/register`,
  },
  orders: {
    create: () => `/orders`,
  },
} as const;
