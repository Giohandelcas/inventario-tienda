"use server";

import { redirect } from "next/navigation";
import { ApiError, apiFetch } from "@/lib/api/client";
import { endpoints } from "@/lib/api/endpoints";
import { createSession } from "@/lib/auth/session";

export interface LoginState {
  error?: string;
}

interface LoginResponse {
  accessToken: string;
  customer: { id: string; name: string; email: string };
}

/** POST /customers/login (RF-19) — ver API-CONTRACTS.md. */
export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { error: "Email y contraseña son obligatorios." };
  }

  let response: LoginResponse;
  try {
    response = await apiFetch<LoginResponse>(endpoints.customers.login(), {
      method: "POST",
      body: { email, password },
      withAuth: false,
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return { error: "Email o contraseña incorrectos." };
    }
    return {
      error:
        "No se pudo conectar con inventario-api. Verificá que esté corriendo y que API_URL apunte a él.",
    };
  }

  await createSession({
    customerId: response.customer.id,
    name: response.customer.name,
    email: response.customer.email,
    token: response.accessToken,
  });

  redirect("/cuenta");
}
