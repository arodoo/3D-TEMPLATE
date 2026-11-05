/**
 * File location: src/app/error.tsx
 * File function:
 * Limite de error de la landing, que captura los fallos del renderizado en el
 * cliente y ofrece al visitante una accion para reintentar la operacion,
 * mostrando un mensaje de error sin exponer detalles internos de la aplicacion
 * ni registrar datos sensibles en la consola del navegador.
 * All Rights Reserved arodoo
 */
"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

const TITLE_CLASS =
  "text-5xl font-semibold tracking-tight text-ink md:text-6xl";

const RETRY_BUTTON_CLASS =
  "rounded-full bg-accent px-7 py-3 font-medium text-ink " +
  "transition-transform hover:scale-105";

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm font-medium tracking-widest text-accent uppercase">
        Error inesperado
      </p>
      <h1 className={TITLE_CLASS}>Algo no ha ido bien</h1>
      <p className="max-w-md text-ink-muted">
        Se ha producido un fallo al preparar el contenido. Vuelve a intentarlo o
        contacta con nosotros si el problema persiste.
      </p>
      <button type="button" onClick={reset} className={RETRY_BUTTON_CLASS}>
        Reintentar
      </button>
    </main>
  );
}
