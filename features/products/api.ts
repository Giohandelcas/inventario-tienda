import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { PaginatedResult, Product } from "@/types/api";

export interface ListProductsParams {
  page?: number;
  pageSize?: number;
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}

/** GET /products — RF-13/14, PUBLICO. Nunca incluye `cost`. */
export function listProducts(params: ListProductsParams = {}) {
  const query = new URLSearchParams(
    Object.entries(params).flatMap(([key, value]) =>
      value === undefined ? [] : [[key, String(value)]],
    ),
  ).toString();

  return apiFetch<PaginatedResult<Product>>(
    `${endpoints.products.list()}${query ? `?${query}` : ""}`,
    { next: { revalidate: 60, tags: ["products"] } },
  );
}

/** GET /products/:id — RF-15, incluye `images`, `variants`, `category`. */
export function getProduct(id: string) {
  return apiFetch<Product>(endpoints.products.detail(id), {
    next: { revalidate: 60, tags: [`product:${id}`] },
  });
}
