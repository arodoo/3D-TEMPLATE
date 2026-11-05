/**
 * File location: src/infrastructure/prisma/project-prisma.repository.ts
 * File function:
 * Adaptador del puerto ProjectRepository sobre Prisma Client que recupera los
 * casos de exito publicados o destacados, convirtiendo la columna JSON de
 * metricas en la estructura tipada que expone la entidad Project.
 * All Rights Reserved arodoo
 */
import "server-only";
import type { ProjectRepository } from "@/domain/project/project.repository";
import { Project, type ProjectMetrics } from "@/domain/project/project.entity";
import type { PrismaClient } from "@/generated/prisma/client";
import type { Project as ProjectRow } from "@/generated/prisma/client";

export class ProjectPrismaRepository implements ProjectRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async listPublished(): Promise<Project[]> {
    const rows = await this.prisma.project.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });

    return rows.map((row) => this.toDomain(row));
  }

  async listFeatured(): Promise<Project[]> {
    const rows = await this.prisma.project.findMany({
      where: { isPublished: true, isFeatured: true },
      orderBy: { sortOrder: "asc" },
    });

    return rows.map((row) => this.toDomain(row));
  }

  async findBySlug(slug: string): Promise<Project | null> {
    const row = await this.prisma.project.findUnique({ where: { slug } });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: ProjectRow): Project {
    return Project.restore({
      id: row.id,
      slug: row.slug,
      title: row.title,
      client: row.client,
      summary: row.summary,
      description: row.description,
      coverUrl: row.coverUrl,
      liveUrl: row.liveUrl,
      repoUrl: row.repoUrl,
      stack: row.stack,
      metrics: this.toMetrics(row.metrics),
      sortOrder: row.sortOrder,
      isFeatured: row.isFeatured,
      isPublished: row.isPublished,
    });
  }

  private toMetrics(raw: unknown): ProjectMetrics | null {
    if (typeof raw !== "object" || raw === null) {
      return null;
    }

    return raw as ProjectMetrics;
  }
}
