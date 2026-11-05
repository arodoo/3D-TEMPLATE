/**
 * File location: src/application/lead/list-leads.use-case.ts
 * File function:
 * Caso de uso que lista las solicitudes de contacto almacenadas, aplicando los
 * filtros de estado y limite de resultados sobre el puerto de repositorio, para
 * alimentar el panel interno de seguimiento de los prospectos.
 * All Rights Reserved arodoo
 */
import type { LeadStatus } from "@/domain/lead/lead.entity";
import type { LeadRepository } from "@/domain/lead/lead.repository";

export interface ListLeadsInput {
  readonly status?: LeadStatus;
  readonly limit?: number;
}

export interface LeadSummary {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly company: string | null;
  readonly message: string;
  readonly budgetRange: string;
  readonly status: LeadStatus;
  readonly createdAt: Date;
}

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 200;

export class ListLeadsUseCase {
  constructor(private readonly leadRepository: LeadRepository) {}

  async execute(input: ListLeadsInput = {}): Promise<LeadSummary[]> {
    const limit = Math.min(input.limit ?? DEFAULT_LIMIT, MAX_LIMIT);
    const leads = await this.leadRepository.list(input.status, limit);

    return leads.map((lead) => ({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      message: lead.message,
      budgetRange: lead.budgetRange,
      status: lead.status,
      createdAt: lead.createdAt,
    }));
  }
}
