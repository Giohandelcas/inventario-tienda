import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { listProducts } from "@/features/products/api";
import { listCategories } from "@/features/categories/api";
import { ProductCard } from "@/features/products/components/product-card";
import type { Category, PaginatedResult, Product } from "@/types/api";

export const metadata = { title: "Catálogo" };

interface ProductsPageProps {
  searchParams: Promise<{ search?: string; categoryId?: string; page?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : 1;

  let result: PaginatedResult<Product> | undefined;
  let categories: Category[] = [];
  let connectionError: string | null = null;
  try {
    [result, categories] = await Promise.all([
      listProducts({ search: params.search, categoryId: params.categoryId, page }),
      listCategories(),
    ]);
  } catch {
    connectionError =
      "No se pudo conectar con inventario-api. Verificá que esté corriendo y que API_URL apunte a él.";
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="font-heading text-3xl font-bold">Catálogo</h1>

      {/* RF-14: filtro por nombre y categoría vía GET — funciona sin JS */}
      <form action="/productos" method="get" className="mt-6 flex flex-wrap gap-3">
        <Input
          name="search"
          placeholder="Buscar productos…"
          defaultValue={params.search}
          className="max-w-xs"
        />
        <NativeSelect name="categoryId" defaultValue={params.categoryId ?? ""} className="max-w-xs">
          <NativeSelectOption value="">Todas las categorías</NativeSelectOption>
          {categories.map((category) => (
            <NativeSelectOption key={category.id} value={category.id}>
              {category.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <Button type="submit">Filtrar</Button>
      </form>

      {connectionError ? (
        <Card className="mt-8">
          <CardContent className="py-6 text-sm text-muted-foreground">
            {connectionError}
          </CardContent>
        </Card>
      ) : result!.data.length === 0 ? (
        <p className="mt-8 text-muted-foreground">
          No se encontraron productos con esos filtros.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {result!.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
