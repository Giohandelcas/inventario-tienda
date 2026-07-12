import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/auth/session";
import { logoutAction } from "@/lib/auth/actions";

export const metadata = { title: "Mi cuenta" };

export default async function AccountPage() {
  const session = await getSession();

  if (session) {
    return (
      <div className="mx-auto max-w-sm px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Hola, {session.name}</CardTitle>
            <CardDescription>{session.email}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Button render={<Link href="/cuenta/pedidos" />}>Mis pedidos</Button>
            <form action={logoutAction}>
              <Button variant="outline" type="submit" className="w-full">
                Cerrar sesión
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Mi cuenta</CardTitle>
          <CardDescription>
            Iniciá sesión para ver tu historial de pedidos, o comprá como
            invitado sin necesidad de cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button render={<Link href="/cuenta/login" />}>Iniciar sesión</Button>
          <Button variant="outline" render={<Link href="/cuenta/registro" />}>
            Crear cuenta
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
