export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Inventario</p>
        <p>Pagos contra entrega / coordinación posterior — sin pago en línea (v1).</p>
      </div>
    </footer>
  );
}
