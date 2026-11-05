/**
 * File location: src/application/testimonial/list-testimonials.use-case.ts
 * File function:
 * Caso de uso que obtiene los testimonios visibles para la seccion de
 * confianzas, exponiendo unicamente la cita, su autor y el cargo asociado,
 * evitando filtrar datos internos del modelo de persistencia.
 * All Rights Reserved arodoo
 */
import type { TestimonialRepository } from "@/domain/testimonial/testimonial.repository";

export interface TestimonialView {
  readonly author: string;
  readonly role: string;
  readonly company: string;
  readonly quote: string;
  readonly avatarUrl: string | null;
  readonly rating: number;
}

export class ListTestimonialsUseCase {
  constructor(private readonly testimonialRepository: TestimonialRepository) {}

  async execute(): Promise<TestimonialView[]> {
    const testimonials = await this.testimonialRepository.listShown();

    return testimonials.map((testimonial) => ({
      author: testimonial.author,
      role: testimonial.role,
      company: testimonial.company,
      quote: testimonial.quote,
      avatarUrl: testimonial.avatarUrl,
      rating: testimonial.rating,
    }));
  }
}
