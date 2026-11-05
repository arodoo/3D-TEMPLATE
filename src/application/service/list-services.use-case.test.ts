/**
 * File location: src/application/service/list-services.use-case.test.ts
 * File function:
 * Pruebas unitarias del caso de uso de listado de servicios, con un repositorio
 * en memoria, verificando el ordenamiento por posicion, el filtrado de los
 * servicios no publicados y la forma exacta de la vista de presentacion
 * proyectada hacia los componentes de la landing.
 * All Rights Reserved arodoo
 */
import { describe, expect, it } from "vitest";
import { ListServicesUseCase } from "./list-services.use-case";
import type { ServiceRepository } from "@/domain/service/service.repository";
import { Service } from "@/domain/service/service.entity";

function buildService(
  slug: string,
  sortOrder: number,
  isPublished = true,
): Service {
  return Service.restore({
    id: crypto.randomUUID(),
    slug,
    title: `Servicio ${slug}`,
    tagline: "Tagline",
    description: "Descripcion del servicio",
    icon: "cube",
    priceFrom: 1000,
    currency: "EUR",
    sortOrder,
    isPublished,
  });
}

class InMemoryServiceRepository implements ServiceRepository {
  constructor(private readonly services: Service[]) {}

  async listPublished(): Promise<Service[]> {
    return this.services
      .filter((service) => service.isPublished)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async findBySlug(slug: string): Promise<Service | null> {
    return this.services.find((service) => service.slug === slug) ?? null;
  }
}

describe("ListServicesUseCase", () => {
  it("devuelve solo los servicios publicados ordenados por sortOrder", async () => {
    const repository = new InMemoryServiceRepository([
      buildService("segundo", 2),
      buildService("primero", 1),
      buildService("oculto", 0, false),
    ]);
    const useCase = new ListServicesUseCase(repository);

    const result = await useCase.execute();

    expect(result.map((service) => service.slug)).toEqual([
      "primero",
      "segundo",
    ]);
  });

  it("proyecta la entidad de dominio a la vista de presentacion", async () => {
    const repository = new InMemoryServiceRepository([
      buildService("webgl", 1),
    ]);
    const useCase = new ListServicesUseCase(repository);

    const [service] = await useCase.execute();

    expect(service).toEqual({
      slug: "webgl",
      title: "Servicio webgl",
      tagline: "Tagline",
      description: "Descripcion del servicio",
      icon: "cube",
      priceFrom: 1000,
      currency: "EUR",
    });
  });

  it("devuelve una lista vacia cuando no hay servicios publicados", async () => {
    const repository = new InMemoryServiceRepository([]);
    const useCase = new ListServicesUseCase(repository);

    await expect(useCase.execute()).resolves.toEqual([]);
  });
});
