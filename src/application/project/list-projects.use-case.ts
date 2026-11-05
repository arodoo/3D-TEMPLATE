/**
 * File location: src/application/project/list-projects.use-case.ts
 * File function:
 * Caso de uso que obtiene el portfolio de proyectos publicado y opcionalmente
 * filtrado por los destacados, proyectando cada caso de exito a una vista de
 * presentacion con su stack tecnologico y metricas de impacto.
 * All Rights Reserved arodoo
 */
import type { ProjectRepository } from "@/domain/project/project.repository";

export interface ProjectView {
  readonly slug: string;
  readonly title: string;
  readonly client: string;
  readonly summary: string;
  readonly description: string;
  readonly coverUrl: string | null;
  readonly liveUrl: string | null;
  readonly stack: readonly string[];
  readonly metrics: {
    readonly loadTimeMs?: number;
    readonly conversionLift?: number;
    readonly engagementLift?: number;
  } | null;
  readonly isFeatured: boolean;
}

export interface ListProjectsInput {
  readonly featuredOnly?: boolean;
}

export class ListProjectsUseCase {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async execute(input: ListProjectsInput = {}): Promise<ProjectView[]> {
    const projects = input.featuredOnly
      ? await this.projectRepository.listFeatured()
      : await this.projectRepository.listPublished();

    return projects.map((project) => ({
      slug: project.slug,
      title: project.title,
      client: project.client,
      summary: project.summary,
      description: project.description,
      coverUrl: project.coverUrl,
      liveUrl: project.liveUrl,
      stack: project.stack,
      metrics: project.metrics,
      isFeatured: project.isFeatured,
    }));
  }
}
