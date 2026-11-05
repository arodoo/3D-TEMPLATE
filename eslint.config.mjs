/**
 * File location: eslint.config.mjs
 * File function:
 * Configuracion plana de ESLint 10 para la landing, integrando las reglas de
 * Next.js 16 con core-web-vitals y typescript, mas las restricciones
 * estructurales del proyecto como limite de lineas por archivo, ancho maximo de
 * linea y prohibicion de any implicito para asegurar la calidad del codigo.
 * All Rights Reserved arodoo
 */
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import tseslint from "typescript-eslint";

const structuralRules = {
  "max-lines": [
    "error",
    { max: 120, skipBlankLines: true, skipComments: true },
  ],
  "max-len": ["error", { code: 80, ignoreUrls: true, ignoreStrings: true }],
  "no-console": ["warn", { allow: ["warn", "error"] }],
  eqeqeq: ["error", "always"],
  "prefer-const": "error",
  "no-var": "error",
};

const config = defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.recommended,
  {
    rules: {
      ...tseslint.configs.recommended.rules,
      ...structuralRules,
    },
  },
  {
    files: [
      "**/*.test.ts",
      "**/*.test.tsx",
      "e2e/**/*.ts",
      "prisma/seed.ts",
      "scripts/**/*.mjs",
    ],
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
    "src/generated/**",
    "prisma/schema/migrations/**",
  ]),
]);

export default config;
