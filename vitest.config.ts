/**
 * File location: vitest.config.ts
 * File function:
 * Configuracion de la suite unitaria de Vitest 5 para la landing, definiendo el
 * entorno jsdom para el renderizado de componentes React, los alias de
 * importacion del proyecto y la inclusion de pruebas unitarias y de
 * componentes, excluyendo los escenarios end to end de Playwright.
 * All Rights Reserved arodoo
 */
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "e2e/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/domain/**", "src/application/**"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
});
