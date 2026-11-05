/**
 * File location: src/infrastructure/prisma/lead-prisma.repository.ts
 * File function:
 * Adaptador del puerto LeadRepository sobre Prisma Client, que traduce las
 * filas de la tabla leads a la entidad de dominio Lead y gestiona el mapeo de
 * los enums de estado y presupuesto entre ambos mundos.
 * All Rights Reserved arodoo
 */
import "server-only";
import type { LeadRepository } from "@/domain/lead/lead.repository";
import {
  Lead,
  type BudgetRange,
  type LeadStatus,
} from "@/domain/lead/lead.entity";
import type { PrismaClient } from "@/generated/prisma/client";
import type { Lead as LeadRow } from "@/generated/prisma/client";

export class LeadPrismaRepository implements LeadRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async save(lead: Lead): Promise<void> {
    await this.prisma.lead.create({
      data: {
        id: lead.id,
        name: lead.name,
        email: lead.email,
        company: lead.company,
        phone: lead.phone,
        message: lead.message,
        budgetRange: lead.budgetRange,
        status: lead.status,
        source: lead.source,
      },
    });
  }

  async findByEmail(email: string): Promise<Lead | null> {
    const row = await this.prisma.lead.findUnique({ where: { email } });
    return row ? this.toDomain(row) : null;
  }

  async findById(id: string): Promise<Lead | null> {
    const row = await this.prisma.lead.findUnique({ where: { id } });
    return row ? this.toDomain(row) : null;
  }

  async list(status?: LeadStatus, limit = 50): Promise<Lead[]> {
    const rows = await this.prisma.lead.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return rows.map((row) => this.toDomain(row));
  }

  private toDomain(row: LeadRow): Lead {
    return Lead.restore({
      id: row.id,
      name: row.name,
      email: row.email,
      company: row.company,
      phone: row.phone,
      message: row.message,
      budgetRange: row.budgetRange as BudgetRange,
      status: row.status as LeadStatus,
      source: row.source,
      createdAt: row.createdAt,
    });
  }
}
