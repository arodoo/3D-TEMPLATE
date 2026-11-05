/**
 * File location: src/application/lead/create-lead.use-case.ts
 * File function:
 * Caso de uso que registra una solicitud de contacto en la landing, delegando
 * la validacion al agregado Lead, comprobando duplicados por email a traves del
 * puerto de repositorio y traduciendo el fallo del dominio a un resultado
 * tipado que la capa HTTP pueda transformar en una respuesta.
 * All Rights Reserved arodoo
 */
import {
  ConflictError,
  DomainError,
  ValidationError,
} from "@/domain/shared/errors";
import { fail, ok, type Result } from "@/domain/shared/result";
import {
  BUDGET_RANGES,
  Lead,
  type BudgetRange,
} from "@/domain/lead/lead.entity";
import type { LeadRepository } from "@/domain/lead/lead.repository";

export interface CreateLeadInput {
  readonly name: string;
  readonly email: string;
  readonly message: string;
  readonly company?: string | null;
  readonly phone?: string | null;
  readonly budgetRange?: string;
  readonly source?: string;
  readonly userAgent?: string | null;
}

export interface CreateLeadOutput {
  readonly id: string;
  readonly createdAt: Date;
}

export class CreateLeadUseCase {
  constructor(private readonly leadRepository: LeadRepository) {}

  async execute(
    input: CreateLeadInput,
  ): Promise<Result<CreateLeadOutput, DomainError>> {
    try {
      const budgetRange = this.parseBudgetRange(input.budgetRange);

      const lead = Lead.create({
        name: input.name,
        email: input.email,
        message: input.message,
        company: input.company ?? null,
        phone: input.phone ?? null,
        budgetRange,
        source: input.source ?? "website",
      });

      const existing = await this.leadRepository.findByEmail(lead.email);

      if (existing) {
        return fail(
          new ConflictError(
            "Ya existe una solicitud registrada con ese email",
            { email: lead.email },
          ),
        );
      }

      await this.leadRepository.save(lead);

      return ok({ id: lead.id, createdAt: lead.createdAt });
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        return fail(error);
      }

      if (error instanceof DomainError) {
        return fail(error);
      }

      throw error;
    }
  }

  private parseBudgetRange(value: string | undefined): BudgetRange {
    if (!value) {
      return "UNKNOWN";
    }

    const normalized = value.toUpperCase();

    if (!BUDGET_RANGES.includes(normalized as BudgetRange)) {
      throw new ValidationError("El rango de presupuesto no es valido", {
        value,
        allowed: BUDGET_RANGES,
      });
    }

    return normalized as BudgetRange;
  }
}
