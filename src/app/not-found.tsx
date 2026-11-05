/**
 * File location: src/app/not-found.tsx
 * File function:
 * Pagina de error 404 de la landing, que ofrece una experiencia coherente con
 * el diseno del sitio e incluye enlaces de retour hacia las secciones
 * principales y la pagina de inicio para no perder al visitante.
 * All Rights Reserved arodoo
 */
import Link from "next/link";

const TITLE_CLASS =
  "text-5xl font-semibold tracking-tight text-ink md:text-6xl";

const BACK_LINK_CLASS =
  "rounded-full bg-accent px-7 py-3 font-medium text-ink " +
  "transition-transform hover:scale-105";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm font-medium tracking-widest text-accent uppercase">
        Error 404
      </p>
      <h1 className={TITLE_CLASS}>Esta pagina no existe</h1>
      <p className="max-w-md text-ink-muted">
        El enlace puede estar roto o la pagina se ha movido. Vuelve al inicio
        para seguir explorando el estudio.
      </p>
      <Link href="/" className={BACK_LINK_CLASS}>
        Volver al inicio
      </Link>
    </main>
  );
}
