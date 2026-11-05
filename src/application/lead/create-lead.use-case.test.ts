/**
 * File location: src/application/lead/create-lead.use-case.test.ts
 * File function:
 * Pruebas unitarias del caso de uso de creacion de lead, con un repositorio en
 * memoria que simula PostgreSQL, verificando el alta correcta, el rechazo de
 * emails duplicados, la validacion del rango de presupuesto y la traduccion de
 * los errores de dominio a un resultado tipado sin excepciones.
 * All Rights Reserved arodoo
 */
import { describe, expect, it, vi } from "vitest";
import { CreateLeadUseCase } from "./create-lead.use-case";
import type { LeadRepository } from "@/domain/lead/lead.repository";
import type { Lead, LeadStatus } from "@/domain/lead/lead.entity";
import { ConflictError, ValidationError } from "@/domain/shared/errors";

class InMemoryLeadRepository implements LeadRepository {
  readonly leads: Lead[] = [];

  async save(lead: Lead): Promise<void> {
    this.leads.push(lead);
  }

  async findByEmail(email: string): Promise<Lead | null> {
    return this.leads.find((lead) => lead.email === email) ?? null;
  }

  async findById(id: string): Promise<Lead | null> {
    return this.leads.find((lead) => lead.id === id) ?? null;
  }

  async list(status?: LeadStatus): Promise<Lead[]> {
    return status
      ? this.leads.filter((lead) => lead.status === status)
      : [...this.leads];
  }
}

const VALID_INPUT = {
  name: "Diego Ferrer",
  email: "diego@novafleet.com",
  message:
    "Queremos un configurador 3D de vehiculos electricos para nuestro sitio.",
};

describe("CreateLeadUseCase", () => {
  it("registra el lead y devuelve su identificador", async () => {
    const repository = new InMemoryLeadRepository();
    const useCase = new CreateLeadUseCase(repository);

    const result = await useCase.execute(VALID_INPUT);

    expect(result.ok).toBe(true);
    expect(repository.leads).toHaveLength(1);
    expect(repository.leads[0]?.email).toBe("diego@novafleet.com");
  });

  it("rechaza un email que ya existe sin lanzar excepciones", async () => {
    const repository = new InMemoryLeadRepository();
    const useCase = new CreateLeadUseCase(repository);

    await useCase.execute(VALID_INPUT);
    const result = await useCase.execute(VALID_INPUT);

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error).toBeInstanceOf(ConflictError);
      expect(result.error.code).toBe("CONFLICT");
    }

    expect(repository.leads).toHaveLength(1);
  });

  it("devuelve un error de validacion cuando el email no es valido", async () => {
    const repository = new InMemoryLeadRepository();
    const useCase = new CreateLeadUseCase(repository);

    const result = await useCase.execute({ ...VALID_INPUT, email: "nope" });

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.error).toBeInstanceOf(ValidationError);
      expect(result.error.code).toBe("VALIDATION_ERROR");
    }

    expect(repository.leads).toHaveLength(0);
  });

  it("normaliza el rango de presupuesto a mayusculas", async () => {
    const repository = new InMemoryLeadRepository();
    const useCase = new CreateLeadUseCase(repository);

    await useCase.execute({ ...VALID_INPUT, budgetRange: "under_5k" });

    expect(repository.leads[0]?.budgetRange).toBe("UNDER_5K");
  });

  it("rechaza un rango de presupuesto desconocido", async () => {
    const repository = new InMemoryLeadRepository();
    const useCase = new CreateLeadUseCase(repository);

    const result = await useCase.execute({
      ...VALID_INPUT,
      budgetRange: "MILLION_DOLLARS",
    });

    expect(result.ok).toBe(false);
    expect(repository.leads).toHaveLength(0);
  });

  it("propaga un fallo inesperado del repositorio como excepcion", async () => {
    const repository = new InMemoryLeadRepository();
    const useCase = new CreateLeadUseCase(repository);

    vi.spyOn(repository, "save").mockRejectedValueOnce(
      new Error("pool de conexiones agotado"),
    );

    await expect(useCase.execute(VALID_INPUT)).rejects.toThrow(
      "pool de conexiones agotado",
    );
  });
});
