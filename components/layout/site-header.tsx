"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart/cart-context";
import { CartSheet } from "@/components/cart/cart-sheet";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

export function SiteHeader({ customerName }: { customerName: string | null }) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="font-heading text-xl font-bold text-primary">
          Inventario
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
          <Link href="/productos" className="hover:text-primary">
            Catálogo
          </Link>
          <Link href="/cuenta" className="hover:text-primary">
            {customerName ? `Hola, ${customerName.split(" ")[0]}` : "Ingresar"}
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="outline" size="icon" aria-label="Ver carrito" className="relative" />
            }
          >
            <ShoppingCart />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 min-w-5 justify-center rounded-full px-1">
                {totalItems}
              </Badge>
            )}
          </SheetTrigger>
          <CartSheet />
        </Sheet>
      </div>
    </header>
  );
}
