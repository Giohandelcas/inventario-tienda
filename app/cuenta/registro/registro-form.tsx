"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { registerAction, type RegisterState } from "./actions";

const initialState: RegisterState = {};

export function RegistroForm() {
  const [state, action, pending] = useActionState(registerAction, initialState);

  if (state.success) {
    return (
      <p className="text-sm text-muted-foreground">
        Cuenta creada. El login de clientes todavía no está implementado
        (RF-19) — por ahora podés seguir comprando como invitado.
      </p>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Nombre</FieldLabel>
          <Input id="name" name="name" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" name="email" type="email" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Contraseña</FieldLabel>
          <Input id="password" name="password" type="password" minLength={8} required />
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">Teléfono (opcional)</FieldLabel>
          <Input id="phone" name="phone" type="tel" />
        </Field>
        {state.error && <FieldError>{state.error}</FieldError>}
        <Button type="submit" disabled={pending}>
          {pending ? "Creando cuenta…" : "Crear cuenta"}
        </Button>
      </FieldGroup>
    </form>
  );
}
