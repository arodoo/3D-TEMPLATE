/**
 * File location: commitlint.config.mjs
 * File function:
 * Configuracion de las reglas de Conventional Commits para validar los mensajes
 * de commit del repositorio, exigiendo un tipo y un alcance coherentes con el
 * area tocada y limitando la longitud del encabezado para mantener un historial
 * legible y navegable.
 * All Rights Reserved arodoo
 */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "scope-enum": [
      2,
      "always",
      [
        "app",
        "domain",
        "application",
        "infrastructure",
        "presentation",
        "prisma",
        "config",
        "ci",
        "deps",
        "docs",
      ],
    ],
    "header-max-length": [2, "always", 100],
    "subject-case": [0],
  },
};

export default config;
