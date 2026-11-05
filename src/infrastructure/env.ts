/**
 * File location: src/infrastructure/env.ts
 * File function:
 * Valida y expone las variables de entorno del servidor mediante el esquema de
 * Zod, garantizando que la base de datos, la URL publica del sitio y el nivel
 * de log esten correctamente definidos antes de arrancar la aplicacion y
 * fallando de forma temprana ante configuraciones invalidas.
 * All Rights Reserved arodoo
 */
import "server-only";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z
      .string()
      .min(1)
      .refine((value) => value.startsWith("postgresql://"), {
        message: "DATABASE_URL debe ser una URL de PostgreSQL",
      }),
    LOG_LEVEL: z
      .enum(["trace", "debug", "info", "warn", "error", "fatal"])
      .default("info"),
    AUTH_SECRET: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z
      .url()
      .default("http://localhost:3000")
      .transform((value) => value.replace(/\/$/, "")),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    LOG_LEVEL: process.env.LOG_LEVEL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  skipValidation: process.env.SKIP_ENV_VALIDATION === "true",
  emptyStringAsUndefined: true,
});
