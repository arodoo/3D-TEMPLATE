/**
 * File location: src/presentation/sections/content/services-section.tsx
 * File function:
 * Seccion de servicios que presenta el catalogo de ofertas del estudio,
 * consumiendo la vista de casos de uso alimentada desde PostgreSQL a traves de
 * una Server Component, con la animacion de entrada delegada al componente de
 * revelacion progresiva basado en ScrollTrigger.
 * All Rights Reserved arodoo
 */
import { Reveal } from "@/presentation/motion/reveal";
import {
  CARD_ACCENT_CLASS,
  CARD_BODY_CLASS,
  CARD_CLASS,
  CARD_TITLE_CLASS,
  SECTION_CONTAINER_CLASS,
  SECTION_EYEBROW_CLASS,
  SECTION_TITLE_CLASS,
} from "@/presentation/ui/section-classes";
import type { ServiceView } from "@/application/service/list-services.use-case";

interface ServicesSectionProps {
  readonly services: readonly ServiceView[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="servicios" className={SECTION_CONTAINER_CLASS}>
      <Reveal>
        <p className={SECTION_EYEBROW_CLASS}>Servicios</p>
        <h2 className={SECTION_TITLE_CLASS}>
          Tres formas de convertir una visita en una venta
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={index * 0.12}>
            <article className={CARD_CLASS}>
              <span className="text-xs font-medium text-ink-muted">
                0{index + 1}
              </span>
              <h3 className={CARD_TITLE_CLASS}>{service.title}</h3>
              <p className={CARD_ACCENT_CLASS}>{service.tagline}</p>
              <p className={CARD_BODY_CLASS}>{service.description}</p>
              {service.priceFrom ? (
                <p className="mt-6 text-sm text-ink-muted">
                  Desde{" "}
                  <span className="font-medium text-ink">
                    {service.priceFrom.toLocaleString("es-ES")}{" "}
                    {service.currency}
                  </span>
                </p>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
