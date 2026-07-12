"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { useCart } from "@/lib/cart/cart-context";
import { createOrderAction, type CheckoutResult } from "./actions";
import { OrderConfirmation } from "./order-confirmation";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<CheckoutResult | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);

    const response = await createOrderAction({
      items: items.map((item) => ({
        productVariantId: item.productVariantId,
        quantity: item.quantity,
      })),
      contactName: String(formData.get("contactName") ?? ""),
      contactEmail: String(formData.get("contactEmail") ?? ""),
      contactPhone: String(formData.get("contactPhone") ?? ""),
      addressLine: String(formData.get("addressLine") ?? ""),
      addressCity: String(formData.get("addressCity") ?? ""),
      notes: String(formData.get("notes") ?? ""),
    });

    setPending(false);
    setResult(response);
    if (response.order) clear();
  }

  if (result?.order) {
    return <OrderConfirmation order={result.order} />;
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 text-center">
        <h1 className="font-heading text-3xl font-bold">Checkout</h1>
        <p className="mt-4 text-muted-foreground">
          Tu carrito está vacío.{" "}
          <Link href="/productos" className="text-primary underline">
            Ver catálogo
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-heading text-3xl font-bold">Checkout</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Sin pago en línea (RF-17) — el pedido queda pendiente de pago y coordinamos
        la entrega por email.
      </p>

      <form onSubmit={handleSubmit} className="mt-6">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="contactName">Nombre</FieldLabel>
            <Input id="contactName" name="contactName" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="contactEmail">Email</FieldLabel>
            <Input id="contactEmail" name="contactEmail" type="email" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="contactPhone">Teléfono (opcional)</FieldLabel>
            <Input id="contactPhone" name="contactPhone" type="tel" />
          </Field>
          <Field orientation="responsive">
            <Field>
              <FieldLabel htmlFor="addressLine">Dirección (opcional)</FieldLabel>
              <Input id="addressLine" name="addressLine" />
            </Field>
            <Field>
              <FieldLabel htmlFor="addressCity">Ciudad (opcional)</FieldLabel>
              <Input id="addressCity" name="addressCity" />
            </Field>
          </Field>
          <Field>
            <FieldLabel htmlFor="notes">Notas (opcional)</FieldLabel>
            <Input id="notes" name="notes" />
          </Field>

          {result?.error && <FieldError>{result.error}</FieldError>}

          <Button
            type="submit"
            disabled={pending}
            className="bg-cta text-cta-foreground hover:bg-cta/90"
          >
            {pending ? "Confirmando…" : `Confirmar pedido — S/ ${subtotal.toFixed(2)}`}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
