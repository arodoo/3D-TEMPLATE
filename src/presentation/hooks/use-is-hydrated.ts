/**
 * File location: src/presentation/hooks/use-is-hydrated.ts
 * File function:
 * Expone un indicador de si el componente ya se ha hidratado en el cliente,
 * necesario para evitar que el usuario interactue con controles que dependen de
 * React antes de que los manejadores de evento esten registrados, y para que
 * las pruebas end to end puedan esperar al estado interactivo real.
 * All Rights Reserved arodoo
 */
"use client";

import { useSyncExternalStore } from "react";

function subscribeToNothing(): () => void {
  return () => undefined;
}

function getClientSnapshot(): boolean {
  return true;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToNothing,
    getClientSnapshot,
    getServerSnapshot,
  );
}
