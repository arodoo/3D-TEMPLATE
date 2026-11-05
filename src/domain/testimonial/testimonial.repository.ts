/**
 * File location: src/domain/testimonial/testimonial.repository.ts
 * File function:
 * Declara el contrato del puerto de lectura de los testimonios publicados, para
 * que la seccion de confianzas de la landing consuma un puerto abstracto en
 * lugar de depender directamente de la base de datos.
 * All Rights Reserved arodoo
 */
import type { Testimonial } from "./testimonial.entity";

export interface TestimonialRepository {
  listShown(): Promise<Testimonial[]>;
}
