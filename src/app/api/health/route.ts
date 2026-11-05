/**
 * File location: src/app/api/health/route.ts
 * File function:
 * Endpoint de comprobacion de salud que verifica la conectividad del servidor
 * con la base de datos PostgreSQL mediante una consulta trivial, exponiendo el
 * resultado en formato JSON para ser usado por el orquestador de despliegue, el
 * balanceador de carga y las pruebas end to end.
 * All Rights Reserved arodoo
 */
import { NextResponse } from "next/server";
import { prisma } from "@/infrastructure/prisma/prisma.client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json(
      { status: "ok", database: "up", timestamp: new Date().toISOString() },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      {
        status: "degraded",
        database: "down",
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}
