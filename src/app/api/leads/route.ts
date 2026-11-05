/**
 * File location: src/app/api/leads/route.ts
 * File function:
 * Endpoint HTTP que recibe las solicitudes de contacto de la landing, valida el
 * cuerpo de la peticion con Zod, ejecuta el caso de uso de creacion de lead y
 * traduce el resultado del dominio a una respuesta JSON con el codigo de estado
 * y los cabeceras de seguridad correspondientes.
 * All Rights Reserved arodoo
 */
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getCreateLeadUseCase } from "@/infrastructure/container";
import { logger } from "@/infrastructure/logger";

export const runtime = "nodejs";

const leadPayloadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(180),
  message: z.string().min(20).max(4000),
  company: z.string().max(120).optional(),
  phone: z.string().max(40).optional(),
  budgetRange: z.string().optional(),
  source: z.string().max(60).optional(),
});

export async function POST(request: NextRequest): Promise<NextResponse> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "El cuerpo de la peticion no es JSON valido" },
      { status: 400 },
    );
  }

  const parsed = leadPayloadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Los datos enviados no son validos",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 422 },
    );
  }

  const useCase = getCreateLeadUseCase();
  const result = await useCase.execute({
    ...parsed.data,
    source: parsed.data.source ?? request.headers.get("referer") ?? "website",
  });

  if (!result.ok) {
    const status = result.error.code === "CONFLICT" ? 409 : 422;

    logger.warn(
      { code: result.error.code, email: parsed.data.email },
      "Rechazo de lead",
    );

    return NextResponse.json(
      { message: result.error.message, code: result.error.code },
      { status },
    );
  }

  logger.info({ leadId: result.value.id }, "Lead registrado correctamente");

  return NextResponse.json(
    { message: "Solicitud recibida", id: result.value.id },
    { status: 201 },
  );
}
