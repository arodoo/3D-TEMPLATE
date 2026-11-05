/**
 * File location: src/application/testimonial/list-testimonials.use-case.test.ts
 * File function:
 * Pruebas unitarias del caso de uso de listado de testimonios, con un
 * repositorio en memoria, verificando que solo se exponen los testimonios
 * habilitados para su publicacion y que la vista proyectada contiene la cita,
 * el autor y el cargo sin filtrar campos internos.
 * All Rights Reserved arodoo
 */
import { describe, expect, it } from "vitest";
import { ListTestimonialsUseCase } from "./list-testimonials.use-case";
import type { TestimonialRepository } from "@/domain/testimonial/testimonial.repository";
import { Testimonial } from "@/domain/testimonial/testimonial.entity";

function buildTestimonial(
  author: string,
  isShown: boolean,
  rating = 5,
): Testimonial {
  return Testimonial.restore({
    id: crypto.randomUUID(),
    author,
    role: "Directora de Marketing",
    company: "Atlas Capital",
    quote: "El sitio multiplico la duracion de la sesion del equipo.",
    avatarUrl: null,
    rating,
    sortOrder: 0,
    isShown,
  });
}

class InMemoryTestimonialRepository implements TestimonialRepository {
  constructor(private readonly testimonials: Testimonial[]) {}

  async listShown(): Promise<Testimonial[]> {
    return this.testimonials.filter((testimonial) => testimonial.isShown);
  }
}

describe("ListTestimonialsUseCase", () => {
  it("devuelve solo los testimonios habilitados para publicacion", async () => {
    const repository = new InMemoryTestimonialRepository([
      buildTestimonial("Marta Alvarez", true),
      buildTestimonial("Oculto", false),
    ]);
    const useCase = new ListTestimonialsUseCase(repository);

    const result = await useCase.execute();

    expect(result.map((testimonial) => testimonial.author)).toEqual([
      "Marta Alvarez",
    ]);
  });

  it("proyecta la entidad a la vista de presentacion", async () => {
    const repository = new InMemoryTestimonialRepository([
      buildTestimonial("Marta Alvarez", true, 4),
    ]);
    const useCase = new ListTestimonialsUseCase(repository);

    const [testimonial] = await useCase.execute();

    expect(testimonial).toEqual({
      author: "Marta Alvarez",
      role: "Directora de Marketing",
      company: "Atlas Capital",
      quote: "El sitio multiplico la duracion de la sesion del equipo.",
      avatarUrl: null,
      rating: 4,
    });
  });

  it("devuelve una lista vacia cuando no hay testimonios visibles", async () => {
    const repository = new InMemoryTestimonialRepository([]);
    const useCase = new ListTestimonialsUseCase(repository);

    await expect(useCase.execute()).resolves.toEqual([]);
  });
});
