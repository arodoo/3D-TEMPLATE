/**
 * File location: src/presentation/sections/content/testimonials-section.tsx
 * File function:
 * Seccion de confianzas que muestra las citas de clientes almacenadas en
 * PostgreSQL, con su autor, cargo y valoracion en estrellas, recorriendo el
 * contenido desde la vista del caso de uso de testimonios.
 * All Rights Reserved arodoo
 */
import { Reveal } from "@/presentation/motion/reveal";
import {
  BLOCKQUOTE_CLASS,
  FIGURE_CLASS,
  SECTION_CONTAINER_CLASS,
  SECTION_EYEBROW_CLASS,
  SECTION_TITLE_CLASS,
} from "@/presentation/ui/section-classes";
import type { TestimonialView } from "@/application/testimonial/list-testimonials.use-case";

interface TestimonialsSectionProps {
  readonly testimonials: readonly TestimonialView[];
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section id="testimonios" className={SECTION_CONTAINER_CLASS}>
      <Reveal>
        <p className={SECTION_EYEBROW_CLASS}>Testimonios</p>
        <h2 className={SECTION_TITLE_CLASS}>
          Lo que dicen quienes ya trabajaron con el estudio
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.author} delay={index * 0.12}>
            <figure className={FIGURE_CLASS}>
              <div
                aria-label={`${testimonial.rating} de 5 estrellas`}
                className="text-accent"
              >
                {"★".repeat(testimonial.rating)}
              </div>
              <blockquote className={BLOCKQUOTE_CLASS}>
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-8 text-sm text-ink-muted">
                <span className="font-medium text-ink">
                  {testimonial.author}
                </span>
                <span className="mx-2 text-white/20">|</span>
                {testimonial.role}, {testimonial.company}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
