/**
 * File location: src/presentation/sections/layout/site-header.tsx
 * File function:
 * Cabecera fija de la landing con el logotipo del estudio, el menu de
 * navegacion principal y el acceso al formulario de presupuesto, que se oculta
 * al desplazarse hacia abajo y vuelve a aparecer al subir para no robar espacio
 * a la escena 3D del encabezado.
 * All Rights Reserved arodoo
 */
"use client";

import { useEffect, useState } from "react";

const NAVIGATION = [
  { label: "Servicios", href: "#servicios" },
  { label: "Trabajos", href: "#trabajos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Testimonios", href: "#testimonios" },
] as const;

const HEADER_CLASS =
  "fixed inset-x-0 top-0 z-50 transition-transform duration-300";

const VISIBLE_CLASS = "translate-y-0";
const HIDDEN_CLASS = "-translate-y-full";

const NAV_LIST_CLASS = "hidden items-center gap-8 md:flex";
const NAV_LINK_CLASS =
  "text-sm text-ink-muted transition-colors hover:text-ink";
const CTA_CLASS =
  "rounded-full bg-accent px-5 py-2 text-sm font-medium text-ink " +
  "transition-opacity hover:opacity-90";

const SCROLL_THRESHOLD = 80;

export function SiteHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = (): void => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY;

      setIsVisible(!isScrollingDown || currentScrollY < SCROLL_THRESHOLD);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`${HEADER_CLASS} ${isVisible ? VISIBLE_CLASS : HIDDEN_CLASS}`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#inicio"
          className="text-lg font-semibold tracking-tight text-ink"
        >
          Estudio<span className="text-accent">.</span>Vector
        </a>

        <ul className={NAV_LIST_CLASS}>
          {NAVIGATION.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={NAV_LINK_CLASS}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contacto" className={CTA_CLASS}>
          Cuentame tu proyecto
        </a>
      </nav>
    </header>
  );
}
