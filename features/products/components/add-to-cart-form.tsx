"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart/cart-context";
import type { Product } from "@/types/api";

const currency = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

function variantLabel(attributes: Record<string, unknown>): string {
  const entries = Object.entries(attributes);
  if (entries.length === 0) return "Estándar";
  return entries.map(([, value]) => String(value)).join(" / ");
}

export function AddToCartForm({ product }: { product: Product }) {
  const variants = product.variants ?? [];
  const [variantId, setVariantId] = useState(variants[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const variant = variants.find((v) => v.id === variantId);
  const price = variant?.priceOverride ?? product.basePrice;
  const outOfStock = !variant || variant.stock <= 0;

  function handleAddToCart() {
    if (!variant) return;
    addItem({
      productVariantId: variant.id,
      productId: product.id,
      productName: product.name,
      variantLabel: variantLabel(variant.attributes),
      unitPrice: price,
      image: product.images?.[0]?.url,
      quantity,
    });
    toast.success(`${product.name} agregado al carrito`);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="font-heading text-2xl font-semibold text-primary">
        {currency.format(Number(price))}
      </p>

      {variants.length > 1 && (
        <NativeSelect
          value={variantId}
          onChange={(event) => setVariantId(event.target.value)}
          aria-label="Variante"
        >
          {variants.map((v) => (
            <NativeSelectOption key={v.id} value={v.id} disabled={v.stock <= 0}>
              {variantLabel(v.attributes)}
              {v.stock <= 0 ? " (agotado)" : ""}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      )}

      <div className="flex items-center gap-3">
        <Input
          type="number"
          min={1}
          max={variant?.stock ?? 1}
          value={quantity}
          onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
          className="w-20"
          aria-label="Cantidad"
        />
        <Button
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="flex-1 bg-cta text-cta-foreground hover:bg-cta/90"
        >
          {outOfStock ? "Agotado" : "Agregar al carrito"}
        </Button>
      </div>
    </div>
  );
}
