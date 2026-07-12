"use server";

import { ApiError, apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import type { Customer } from "@/types/api";

export interface RegisterState {
  success?: boolean;
  error?: string;
}

/**
 * POST /customers/register (RF-19) — PUBLICO. Si el email ya existe como
 * guest (creado por un checkout invitado anterior, sin password), completa
 * esa fila en vez de duplicar.
 */
export async function registerAction(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const phone = formData.get("phone");

  if (!email || !password || !name) {
    return { error: "Nombre, email y contraseña son obligatorios." };
  }

  try {
    await apiFetch<Customer>(endpoints.customers.register(), {
      method: "POST",
      body: { email, password, name, phone: phone || undefined },
    });
    return { success: true };
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      return { error: "Revisá los datos: el email o la contraseña no son válidos." };
    }
    return {
      error:
        "No se pudo conectar con inventario-api. Verificá que esté corriendo y que API_URL apunte a él.",
    };
  }
}
