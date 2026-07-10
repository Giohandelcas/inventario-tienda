import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistroForm } from "./registro-form";

export const metadata = { title: "Crear cuenta" };

export default function RegistroPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Crear cuenta</CardTitle>
          <CardDescription>RF-19 — opcional, para ver tu historial de pedidos.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegistroForm />
        </CardContent>
      </Card>
    </div>
  );
}
