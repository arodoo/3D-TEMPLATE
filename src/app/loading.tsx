/**
 * File location: src/app/loading.tsx
 * File function:
 * Estado de carga de la ruta principal de la landing, mostrado mientras el
 * servidor obtiene el catalogo de servicios, el portfolio y los testimonios
 * desde PostgreSQL, con un esqueleto que conserva la estructura visual de la
 * pagina para evitar saltos de maquetacion en la carga.
 * All Rights Reserved arodoo
 */
export default function Loading() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-32 pb-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="h-6 w-40 animate-pulse rounded-full bg-white/10" />
          <div className="h-14 w-full animate-pulse rounded-2xl bg-white/10" />
          <div className="h-14 w-4/5 animate-pulse rounded-2xl bg-white/10" />
          <div className="h-5 w-full animate-pulse rounded-xl bg-white/5" />
        </div>
        <div className="aspect-square animate-pulse rounded-3xl bg-white/5" />
      </div>
    </main>
  );
}
