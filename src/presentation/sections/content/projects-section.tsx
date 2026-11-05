/**
 * File location: src/presentation/sections/content/projects-section.tsx
 * File function:
 * Seccion de portfolio que muestra los casos de exito del estudio con su ficha
 * tecnica y stack, destacando los proyectos destacados mediante el listado de
 * casos de uso alimentado desde PostgreSQL en el servidor.
 * All Rights Reserved arodoo
 */
import { Reveal } from "@/presentation/motion/reveal";
import {
  FEATURED_CARD_CLASS,
  SECTION_CONTAINER_CLASS,
  SECTION_EYEBROW_CLASS,
  SECTION_TITLE_CLASS,
  TAG_CLASS,
} from "@/presentation/ui/section-classes";
import type { ProjectView } from "@/application/project/list-projects.use-case";

interface ProjectsSectionProps {
  readonly projects: readonly ProjectView[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="trabajos" className={SECTION_CONTAINER_CLASS}>
      <Reveal>
        <p className={SECTION_EYEBROW_CLASS}>Trabajos</p>
        <h2 className={SECTION_TITLE_CLASS}>
          Proyectos que ya estan en manos de sus usuarios
        </h2>
      </Reveal>

      <div className="mt-16 space-y-6">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.1}>
            <article className={FEATURED_CARD_CLASS}>
              <div>
                <p className="text-sm text-accent">{project.client}</p>
                <h3 className="mt-2 text-2xl font-semibold text-ink">
                  {project.title}
                </h3>
                <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">
                  {project.summary}
                </p>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <ul className="flex flex-wrap gap-2">
                  {project.stack.map((technology) => (
                    <li key={technology} className={TAG_CLASS}>
                      {technology}
                    </li>
                  ))}
                </ul>

                {project.metrics?.conversionLift ? (
                  <p className="text-sm text-ink-muted">
                    Conversion{" "}
                    <span className="font-semibold text-accent">
                      +{project.metrics.conversionLift}%
                    </span>
                  </p>
                ) : null}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
