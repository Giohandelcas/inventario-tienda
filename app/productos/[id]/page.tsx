import Image from "next/image";
import { notFound } from "next/navigation";

import { ApiError } from "@/lib/api/client";
import { getProduct } from "@/features/products/api";
import { AddToCartForm } from "@/features/products/components/add-to-cart-form";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProduct(id).catch((error: unknown) => {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  });

  const image = product.images?.[0];

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:grid-cols-2">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText ?? product.name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Sin imagen
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{product.category?.name}</p>
          <h1 className="font-heading text-3xl font-bold">{product.name}</h1>
        </div>
        {product.description && (
          <p className="text-muted-foreground">{product.description}</p>
        )}
        <AddToCartForm product={product} />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const product = await getProduct(id);
    return { title: product.name };
  } catch {
    return { title: "Producto" };
  }
}
