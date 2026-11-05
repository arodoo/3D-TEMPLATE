/**
 * File location: src/application/project/list-projects.use-case.test.ts
 * File function:
 * Pruebas unitarias del caso de uso de listado de proyectos con un repositorio
 * en memoria, verificando el filtrado de los destacados, la proyeccion de la
 * vista de presentacion con su stack y sus metricas, y la exclusion de los
 * proyectos que no estan publicados.
 * All Rights Reserved arodoo
 */
import { describe, expect, it } from "vitest";
import { ListProjectsUseCase } from "./list-projects.use-case";
import type { ProjectRepository } from "@/domain/project/project.repository";
import { Project, type ProjectMetrics } from "@/domain/project/project.entity";

function buildProject(
  slug: string,
  isFeatured: boolean,
  isPublished = true,
  metrics: ProjectMetrics | null = null,
): Project {
  return Project.restore({
    id: crypto.randomUUID(),
    slug,
    title: `Proyecto ${slug}`,
    client: "Cliente",
    summary: "Resumen del proyecto",
    description: "Descripcion del proyecto",
    coverUrl: null,
    liveUrl: null,
    repoUrl: null,
    stack: ["Next.js"],
    metrics,
    sortOrder: 0,
    isFeatured,
    isPublished,
  });
}

class InMemoryProjectRepository implements ProjectRepository {
  constructor(private readonly projects: Project[]) {}

  async listPublished(): Promise<Project[]> {
    return this.projects.filter((project) => project.isPublished);
  }

  async listFeatured(): Promise<Project[]> {
    return this.projects.filter(
      (project) => project.isPublished && project.isFeatured,
    );
  }

  async findBySlug(slug: string): Promise<Project | null> {
    return this.projects.find((project) => project.slug === slug) ?? null;
  }
}

describe("ListProjectsUseCase", () => {
  it("devuelve todos los proyectos publicados", async () => {
    const repository = new InMemoryProjectRepository([
      buildProject("a", true),
      buildProject("b", false),
      buildProject("oculto", true, false),
    ]);
    const useCase = new ListProjectsUseCase(repository);

    const result = await useCase.execute();

    expect(result.map((project) => project.slug)).toEqual(["a", "b"]);
  });

  it("devuelve solo los destacados cuando se solicita el filtro", async () => {
    const repository = new InMemoryProjectRepository([
      buildProject("a", true),
      buildProject("b", false),
    ]);
    const useCase = new ListProjectsUseCase(repository);

    const result = await useCase.execute({ featuredOnly: true });

    expect(result.map((project) => project.slug)).toEqual(["a"]);
  });

  it("proyecta las metricas de impacto en la vista de presentacion", async () => {
    const repository = new InMemoryProjectRepository([
      buildProject("a", true, true, { conversionLift: 35 }),
    ]);
    const useCase = new ListProjectsUseCase(repository);

    const [project] = await useCase.execute();

    expect(project?.metrics?.conversionLift).toBe(35);
    expect(project?.stack).toEqual(["Next.js"]);
  });
});
