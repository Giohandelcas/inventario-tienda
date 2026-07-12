/**
 * Rutas de `inventario-api` que el storefront llama (ver
 * `inventario-api/docs/API-CONTRACTS.md`). `orders.list`/`orders.detail`
 * exigen sesión de cliente (RF-19) — un invitado no logueado no puede
 * consultarlas; ver `app/checkout/order-confirmation.tsx` para cómo se
 * muestra la confirmación de un checkout de invitado sin depender de ellas.
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
    login: () => `/customers/login`,
  },
  orders: {
    create: () => `/orders`,
    list: () => `/orders`,
    detail: (id: string) => `/orders/${id}`,
  },
} as const;
