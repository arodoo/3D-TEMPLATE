/**
 * File location: src/infrastructure/prisma/testimonial-prisma.repository.ts
 * File function:
 * Adaptador del puerto TestimonialRepository sobre Prisma Client que recupera
 * las citas de clientes habilitadas para su publicacion, ordenadas por el orden
 * de aparicion previsto en la seccion de confianzas de la landing.
 * All Rights Reserved arodoo
 */
import "server-only";
import type { TestimonialRepository } from "@/domain/testimonial/testimonial.repository";
import { Testimonial } from "@/domain/testimonial/testimonial.entity";
import type { PrismaClient } from "@/generated/prisma/client";
import type { Testimonial as TestimonialRow } from "@/generated/prisma/client";

export class TestimonialPrismaRepository implements TestimonialRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async listShown(): Promise<Testimonial[]> {
    const rows = await this.prisma.testimonial.findMany({
      where: { isShown: true },
      orderBy: { sortOrder: "asc" },
    });

    return rows.map((row) => this.toDomain(row));
  }

  private toDomain(row: TestimonialRow): Testimonial {
    return Testimonial.restore({
      id: row.id,
      author: row.author,
      role: row.role,
      company: row.company,
      quote: row.quote,
      avatarUrl: row.avatarUrl,
      rating: row.rating,
      sortOrder: row.sortOrder,
      isShown: row.isShown,
    });
  }
}
