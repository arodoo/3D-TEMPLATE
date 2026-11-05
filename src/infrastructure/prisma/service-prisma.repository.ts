/**
 * File location: src/infrastructure/prisma/service-prisma.repository.ts
 * File function:
 * Adaptador del puerto ServiceRepository sobre Prisma Client que recupera el
 * catalogo de servicios publicados, ordenados por su posicion en el menu, y
 * traduce cada fila a la entidad de dominio Service.
 * All Rights Reserved arodoo
 */
import "server-only";
import type { ServiceRepository } from "@/domain/service/service.repository";
import { Service } from "@/domain/service/service.entity";
import type { PrismaClient } from "@/generated/prisma/client";
import type { Service as ServiceRow } from "@/generated/prisma/client";

export class ServicePrismaRepository implements ServiceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async listPublished(): Promise<Service[]> {
    const rows = await this.prisma.service.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
    });

    return rows.map((row) => this.toDomain(row));
  }

  async findBySlug(slug: string): Promise<Service | null> {
    const row = await this.prisma.service.findUnique({ where: { slug } });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: ServiceRow): Service {
    return Service.restore({
      id: row.id,
      slug: row.slug,
      title: row.title,
      tagline: row.tagline,
      description: row.description,
      icon: row.icon,
      priceFrom: row.priceFrom,
      currency: row.currency,
      sortOrder: row.sortOrder,
      isPublished: row.isPublished,
    });
  }
}
