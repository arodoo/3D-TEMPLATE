/**
 * File location: prisma.config.ts
 * File function:
 * Configuracion de la CLI de Prisma 7 para el proyecto de la landing,
 * registrando la ubicacion del esquema, la carpeta de migraciones, el comando
 * de semilla de datos y la URL del datasource de PostgreSQL leida desde el
 * entorno de ejecucion, con un valor de reserva explicito para que los comandos
 * que no necesitan conexion, como generate o format, funcionen sin .env.
 * All Rights Reserved arodoo
 */
import "dotenv/config";
import { defineConfig } from "prisma/config";

const PLACEHOLDER_DATABASE_URL =
  "postgresql://postgres:CHANGE_ME@localhost:5432/CHANGE_ME?schema=public";

export default defineConfig({
  schema: "prisma/schema",
  migrations: {
    path: "prisma/schema/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL ?? PLACEHOLDER_DATABASE_URL,
  },
});
