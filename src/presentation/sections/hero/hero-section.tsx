/**
 * File location: src/presentation/sections/hero/hero-section.tsx
 * File function:
 * Seccion de bienvenida de la landing, que presenta la promesa comercial del
 * estudio junto al lienzo tridimensional con three.js, animando la entrada de
 * los textos con GSAP cuando la preferencia de movimiento reducido no esta
 * activa en el sistema del visitante.
 * All Rights Reserved arodoo
 */
"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { useAnimation } from "@/presentation/providers/animation-provider";
import { HeroCanvas } from "@/presentation/three/hero-canvas";

const BADGE_CLASS =
  "inline-flex items-center gap-2 rounded-full border border-white/10 " +
  "bg-white/5 px-4 py-1.5 text-xs tracking-wide text-ink-muted";

const HEADLINE_CLASS =
  "text-balance text-5xl font-semibold leading-[1.05] tracking-tight " +
  "text-ink md:text-7xl";

const ACCENT_TEXT_CLASS =
  "bg-linear-to-r from-accent to-accent-soft bg-clip-text text-transparent";

const LEAD_CLASS = "max-w-xl text-lg leading-relaxed text-ink-muted";

const PRIMARY_ACTION_CLASS =
  "rounded-full bg-accent px-7 py-3 font-medium text-ink " +
  "transition-transform hover:scale-105";

const SECONDARY_ACTION_CLASS =
  "rounded-full border border-white/15 px-7 py-3 font-medium text-ink " +
  "transition-colors hover:bg-white/5";

const CANVAS_FRAME_CLASS =
  "relative aspect-square w-full overflow-hidden rounded-3xl " +
  "border border-white/10 bg-black/20";

const GLOW_CLASS =
  "pointer-events-none absolute inset-0 -z-10 opacity-20 " +
  "bg-[radial-gradient(ellipse_at_top,var(--color-accent)_0%,transparent_55%)]";

const HERO_LAYOUT_CLASS =
  "mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-2";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { prefersReducedMotion } = useAnimation();

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.from("[data-hero-item]", {
        opacity: 0,
        y: 32,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, section);

    return () => context.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div className={GLOW_CLASS} />

      <div className={HERO_LAYOUT_CLASS}>
        <div className="space-y-8">
          <p data-hero-item className={BADGE_CLASS}>
            <span className="size-1.5 animate-pulse rounded-full bg-accent" />
            Disponibles para nuevos proyectos
          </p>

          <h1 data-hero-item className={HEADLINE_CLASS}>
            Paginas web que <span className={ACCENT_TEXT_CLASS}>se mueven</span>{" "}
            y respiran.
          </h1>

          <p data-hero-item className={LEAD_CLASS}>
            Construimos experiencias 3D y animadas con WebGL, GSAP y React Three
            Fiber, pensadas para convertir visitas en oportunidades de negocio.
          </p>

          <div data-hero-item className="flex flex-wrap gap-4">
            <a href="#contacto" className={PRIMARY_ACTION_CLASS}>
              Solicitar presupuesto
            </a>
            <a href="#trabajos" className={SECONDARY_ACTION_CLASS}>
              Ver trabajos
            </a>
          </div>
        </div>

        <div data-hero-item className={CANVAS_FRAME_CLASS}>
          <HeroCanvas />
        </div>
      </div>
    </section>
  );
}
