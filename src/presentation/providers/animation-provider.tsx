/**
 * File location: src/presentation/providers/animation-provider.tsx
 * File function:
 * Proveedor de animaciones que registra de forma global los plugins de GSAP y
 * configura el desplazamiento suave con Lenis conectado a ScrollTrigger,
 * desactivando ambas integraciones cuando el usuario prefiere movimiento
 * reducido para respetar la preferencia de accesibilidad del sistema.
 * All Rights Reserved arodoo
 */
"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
gsap.registerPlugin(ScrollTrigger);

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

interface AnimationContextValue {
  readonly prefersReducedMotion: boolean;
}

const AnimationContext = createContext<AnimationContextValue>({
  prefersReducedMotion: false,
});

export function useAnimation(): AnimationContextValue {
  return useContext(AnimationContext);
}

function subscribeToReducedMotion(onChange: () => void): () => void {
  const mediaQuery = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQuery.addEventListener("change", onChange);
  return () => mediaQuery.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

interface AnimationProviderProps {
  readonly children: ReactNode;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (value: number) => Math.min(1, 1.001 - Math.pow(2, -10 * value)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number): void => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  const value = useMemo(
    () => ({ prefersReducedMotion }),
    [prefersReducedMotion],
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}
