/**
 * File location: src/presentation/sections/content/process-section.tsx
 * File function:
 * Seccion de proceso que explica las cuatro fases de trabajo del estudio
 * mediante una linea de tiempo visual, desde el descubrimiento del proyecto
 * hasta la entrega y el mantenimiento posterior de la landing.
 * All Rights Reserved arodoo
 */
import { Reveal } from "@/presentation/motion/reveal";
import {
  SECTION_CONTAINER_CLASS,
  SECTION_EYEBROW_CLASS,
  SECTION_TITLE_CLASS,
  STEP_CLASS,
} from "@/presentation/ui/section-classes";

const STEPS = [
  {
    title: "Descubrimiento",
    description:
      "Definimos objetivos, audiencia y metricas de exito antes de disenar una " +
      "sola pantalla.",
  },
  {
    title: "Concepto",
    description:
      "Definimos direccion visual, interacciones y la narrativa de scroll que " +
      "sostendra la experiencia.",
  },
  {
    title: "Construccion",
    description:
      "Desarrollamos con React, Three.js y GSAP, con revisiones semanales sobre " +
      "entornos reales.",
  },
  {
    title: "Entrega",
    description:
      "Publicamos, medimos el impacto real y acompanamos las iteraciones " +
      "posteriores.",
  },
] as const;

export function ProcessSection() {
  return (
    <section id="proceso" className={SECTION_CONTAINER_CLASS}>
      <Reveal>
        <p className={SECTION_EYEBROW_CLASS}>Proceso</p>
        <h2 className={SECTION_TITLE_CLASS}>
          Un metodo claro, sin sorpresas en la facturacion
        </h2>
      </Reveal>

      <ol className="mt-16 grid gap-10 md:grid-cols-4">
        {STEPS.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.1}>
            <li className={STEP_CLASS}>
              <span className="text-xs font-medium text-accent">
                0{index + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {step.description}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
