import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Sesión local del storefront, distinta del JWT que emite `POST
 * /customers/login` en `inventario-api`. `token` guarda ese JWT tal cual,
 * para reenviarlo como `Authorization: Bearer` en `lib/api/client.ts` (así
 * un checkout logueado se asocia a la cuenta en vez de crear un guest —
 * ver `OrdersService` en inventario-api); `customerId`/`name`/`email` son
 * un espejo de solo-lectura para no decodificar el JWT en cada página.
 */
export interface SessionPayload {
  customerId: string;
  name: string;
  email: string;
  token: string;
  expiresAt: number;
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = secretKey ? new TextEncoder().encode(secretKey) : null;

async function encrypt(payload: SessionPayload) {
  if (!encodedKey) {
    throw new Error("SESSION_SECRET no está configurado (ver .env.example).");
  }
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

async function decrypt(session: string | undefined) {
  if (!session || !encodedKey) return null;
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(
  customer: Pick<SessionPayload, "customerId" | "name" | "email" | "token">,
) {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const session = await encrypt({ ...customer, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(expiresAt),
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const session = await decrypt(cookieStore.get(COOKIE_NAME)?.value);
  if (!session || session.expiresAt < Date.now()) return null;
  return session;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
