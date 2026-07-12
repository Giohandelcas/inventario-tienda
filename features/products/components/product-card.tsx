import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/api";

const currency = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

export function ProductCard({ product }: { product: Product }) {
  const totalStock = (product.variants ?? []).reduce(
    (sum, variant) => sum + variant.stock,
    0,
  );
  const image = product.images?.[0];

  return (
    <Link href={`/productos/${product.id}`}>
      <Card className="h-full overflow-hidden py-0 transition-shadow hover:shadow-md">
        <div className="relative aspect-square bg-muted">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText ?? product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Sin imagen
            </div>
          )}
          {totalStock === 0 && (
            <Badge variant="secondary" className="absolute top-2 left-2">
              Agotado
            </Badge>
          )}
        </div>
        <CardContent className="flex flex-col gap-1 pb-4">
          <p className="line-clamp-2 text-sm font-medium">{product.name}</p>
          <p className="font-heading text-lg font-semibold text-primary">
            {currency.format(Number(product.basePrice))}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
