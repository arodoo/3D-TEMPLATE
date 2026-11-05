/**
 * File location: src/presentation/three/hero-canvas.tsx
 * File function:
 * Envoltura diferida del lienzo 3D principal que carga la escena de React Three
 * Fiber unicamente en el navegador mediante un import dinamico sin renderizado
 * en servidor, evitando que WebGL rompa la generacion estatica de la pagina y
 * manteniendo el primer pintado rapido para el usuario.
 * All Rights Reserved arodoo
 */
"use client";

import dynamic from "next/dynamic";
import { useAnimation } from "@/presentation/providers/animation-provider";

const FALLBACK_CLASS =
  "size-full animate-pulse rounded-3xl bg-linear-to-br from-indigo-500/20 " +
  "via-transparent to-fuchsia-500/20";

const HeroScene = dynamic(
  () => import("./hero-scene").then((module) => module.HeroScene),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  },
);

function SceneFallback() {
  return <div aria-hidden="true" className={FALLBACK_CLASS} />;
}

export function HeroCanvas() {
  const { prefersReducedMotion } = useAnimation();

  return (
    <div className="relative size-full">
      {prefersReducedMotion ? <SceneFallback /> : <HeroScene />}
    </div>
  );
}
