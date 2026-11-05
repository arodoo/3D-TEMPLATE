/**
 * File location: src/presentation/providers/app-providers.tsx
 * File function:
 * Componente proveedor que agrupa los contextos globales de la
 * aplicacion,namely el gestor de temas claro y oscuro, el cliente de React
 * Query para el estado remoto y el proveedor de animaciones GSAP, garantizando
 * que toda la jerarquia de la landing comparta la misma configuracion base.
 * All Rights Reserved arodoo
 */
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { useState, type ReactNode } from "react";
import { AnimationProvider } from "./animation-provider";

interface AppProvidersProps {
  readonly children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <AnimationProvider>{children}</AnimationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
