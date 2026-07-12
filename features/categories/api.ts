import { apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { Category } from "@/types/api";

/** GET /categories — RF-06/14, PUBLICO. Incluye `children`. */
export function listCategories() {
  return apiFetch<Category[]>(endpoints.categories.list(), {
    next: { revalidate: 300, tags: ["categories"] },
  });
}
