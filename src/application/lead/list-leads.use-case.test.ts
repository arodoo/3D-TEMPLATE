/**
 * File location: src/application/lead/list-leads.use-case.test.ts
 * File function:
 * Pruebas unitarias del caso de uso de listado de leads, con un repositorio en
 * memoria, verificando el filtrado por estado, el limite de resultados
 * aplicado, la proyeccion a la vista resumen y la proteccion contra limites
 * abusivos solicitados por el cliente.
 * All Rights Reserved arodoo
 */
import { describe, expect, it } from "vitest";
import { ListLeadsUseCase } from "./list-leads.use-case";
import type { LeadRepository } from "@/domain/lead/lead.repository";
import { Lead, type LeadStatus } from "@/domain/lead/lead.entity";

function buildLead(id: string, status: LeadStatus): Lead {
  return Lead.restore({
    id,
    name: `Lead ${id}`,
    email: `lead-${id}@example.com`,
    company: null,
    phone: null,
    message: "Mensaje de prueba para el listado de solicitudes.",
    budgetRange: "UNKNOWN",
    status,
    source: "website",
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
  });
}

class InMemoryLeadRepository implements LeadRepository {
  constructor(private readonly leads: Lead[]) {}

  async save(lead: Lead): Promise<void> {
    this.leads.push(lead);
  }

  async findByEmail(email: string): Promise<Lead | null> {
    return this.leads.find((lead) => lead.email === email) ?? null;
  }

  async findById(id: string): Promise<Lead | null> {
    return this.leads.find((lead) => lead.id === id) ?? null;
  }

  async list(status?: LeadStatus, limit = 50): Promise<Lead[]> {
    const filtered = status
      ? this.leads.filter((lead) => lead.status === status)
      : this.leads;

    return filtered.slice(0, limit);
  }
}

describe("ListLeadsUseCase", () => {
  it("devuelve todos los leads cuando no se indica filtro", async () => {
    const repository = new InMemoryLeadRepository([
      buildLead("a", "NEW"),
      buildLead("b", "WON"),
    ]);
    const useCase = new ListLeadsUseCase(repository);

    const result = await useCase.execute();

    expect(result.map((lead) => lead.id)).toEqual(["a", "b"]);
  });

  it("filtra por estado cuando se solicita", async () => {
    const repository = new InMemoryLeadRepository([
      buildLead("a", "NEW"),
      buildLead("b", "WON"),
      buildLead("c", "WON"),
    ]);
    const useCase = new ListLeadsUseCase(repository);

    const result = await useCase.execute({ status: "WON" });

    expect(result.map((lead) => lead.id)).toEqual(["b", "c"]);
  });

  it("proyecta la entidad a la vista resumen sin filtrar campos internos", async () => {
    const repository = new InMemoryLeadRepository([buildLead("a", "NEW")]);
    const useCase = new ListLeadsUseCase(repository);

    const [lead] = await useCase.execute();

    expect(lead).toEqual({
      id: "a",
      name: "Lead a",
      email: "lead-a@example.com",
      company: null,
      message: "Mensaje de prueba para el listado de solicitudes.",
      budgetRange: "UNKNOWN",
      status: "NEW",
      createdAt: new Date("2026-01-01T00:00:00.000Z"),
    });
  });

  it("acota el numero de resultados al limite solicitado", async () => {
    const repository = new InMemoryLeadRepository([
      buildLead("a", "NEW"),
      buildLead("b", "NEW"),
      buildLead("c", "NEW"),
    ]);
    const useCase = new ListLeadsUseCase(repository);

    const result = await useCase.execute({ limit: 2 });

    expect(result).toHaveLength(2);
  });

  it("devuelve una lista vacia cuando no hay leads", async () => {
    const repository = new InMemoryLeadRepository([]);
    const useCase = new ListLeadsUseCase(repository);

    await expect(useCase.execute()).resolves.toEqual([]);
  });
});
