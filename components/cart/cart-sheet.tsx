"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";

import {
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart/cart-context";
import { cn } from "@/lib/utils";

const currency = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN",
});

export function CartSheet() {
  const { items, removeItem, setQuantity, subtotal } = useCart();

  return (
    <SheetContent className="flex flex-col gap-0">
      <SheetHeader>
        <SheetTitle>Tu carrito</SheetTitle>
      </SheetHeader>

      {items.length === 0 ? (
        <p className="px-4 text-sm text-muted-foreground">
          Todavía no agregaste productos.
        </p>
      ) : (
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4">
          {items.map((item) => (
            <div key={item.productVariantId} className="flex gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium">{item.productName}</p>
                <p className="text-xs text-muted-foreground">{item.variantLabel}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() =>
                      setQuantity(item.productVariantId, item.quantity - 1)
                    }
                    aria-label="Restar unidad"
                  >
                    <Minus />
                  </Button>
                  <span className="w-6 text-center text-sm tabular-nums">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() =>
                      setQuantity(item.productVariantId, item.quantity + 1)
                    }
                    aria-label="Sumar unidad"
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <span className="text-sm tabular-nums">
                  {currency.format(Number(item.unitPrice) * item.quantity)}
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeItem(item.productVariantId)}
                  aria-label="Quitar del carrito"
                >
                  <X />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Separator />
      <SheetFooter className="gap-3">
        <div className="flex items-center justify-between text-sm font-medium">
          <span>Subtotal</span>
          <span className="tabular-nums">{currency.format(subtotal)}</span>
        </div>
        <SheetClose
          render={<Link href="/checkout" />}
          className={cn(
            buttonVariants(),
            "w-full bg-cta text-cta-foreground hover:bg-cta/90",
            items.length === 0 && "pointer-events-none opacity-50",
          )}
        >
          Ir a pagar
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
