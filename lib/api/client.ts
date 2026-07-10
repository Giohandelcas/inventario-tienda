import "server-only";

/**
 * `inventario-api` corre en un proceso/host separado (repo hermano, ver
 * requerimientos.md sección 2.1). Todo el fetching pasa por Server
 * Components/Actions, así que la variable de entorno no lleva prefijo
 * `NEXT_PUBLIC_`.
 *
 * A diferencia de `inventario-app`, todavía no hay ningún concepto de sesión
 * acá: el login de clientes (RF-19) no está implementado en el backend, así
 * que este cliente nunca adjunta `Authorization` — todo lo que llama es
 * PUBLICO o CLIENTE-invitado (POST /orders, POST /customers/register). El
 * día que exista JWT de cliente, este es el lugar para adjuntarlo (ver
 * lib/auth/session.ts en inventario-app como referencia del patrón).
 */
const API_URL = process.env.API_URL ?? "http://localhost:3001";

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiFetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  next?: NextFetchRequestConfig;
}

export async function apiFetch<T>(
  path: string,
  { body, headers, next, ...init }: ApiFetchOptions = {},
): Promise<T> {
  const requestHeaders = new Headers(headers);
  requestHeaders.set("Content-Type", "application/json");

  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    next,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new ApiError(
      `${init.method ?? "GET"} ${path} → ${response.status}`,
      response.status,
      errorBody,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
