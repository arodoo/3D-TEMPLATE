/**
 * File location: vitest.setup.ts
 * File function:
 * Preparacion global del entorno de pruebas unitarias, registrando los matchers
 * accesibles de jest dom y restaurando la implementacion original de matchMedia
 * para que los hooks que detectan preferencias de movimiento reducido puedan
 * ejecutarse de forma determinista en jsdom.
 * All Rights Reserved arodoo
 */
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});
