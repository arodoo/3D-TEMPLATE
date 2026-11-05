/**
 * File location: src/presentation/motion/reveal.tsx
 * File function:
 * Componente que implementa la aparicion progresiva de sus hijos mediante
 * ScrollTrigger de GSAP, aplicando el desplazamiento vertical inicial solo
 * cuando el usuario no ha solicitado movimiento reducido y respetando el ciclo
 * de vida de React para limpiar la animacion al desmontar.
 * All Rights Reserved arodoo
 */
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";
import { useAnimation } from "@/presentation/providers/animation-provider";

interface RevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useAnimation();

  useEffect(() => {
    const element = containerRef.current;

    if (!element || prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, element);

    return () => context.revert();
  }, [delay, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
