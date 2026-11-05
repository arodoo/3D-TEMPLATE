/**
 * File location: src/infrastructure/logger.ts
 * File function:
 * Expone una instancia de Pino para el registro estructurado de logs del
 * servidor, con el nivel controlado por la variable de entorno y un transporte
 * legible durante el desarrollo local para no perder legibilidad.
 * All Rights Reserved arodoo
 */
import "server-only";
import { pino } from "pino";
import { serverEnv } from "./env";

const isProduction = process.env.NODE_ENV === "production";

export const logger = pino({
  level: serverEnv.LOG_LEVEL,
  base: isProduction ? undefined : { service: "landing" },
  redact: {
    paths: ["req.headers.authorization", "password", "*.password"],
    remove: true,
  },
  transport: isProduction
    ? undefined
    : { target: "pino-pretty", options: { colorize: true } },
});
