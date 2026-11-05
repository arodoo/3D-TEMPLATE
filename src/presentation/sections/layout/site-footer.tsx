/**
 * File location: src/presentation/sections/layout/site-footer.tsx
 * File function:
 * Pie de pagina de la landing, con la identidad del estudio, los enlaces de
 * navegacion principal, los datos de contacto y los enlaces sociales, cerrando
 * el documento con la informacion legal minima del sitio.
 * All Rights Reserved arodoo
 */
const NAVIGATION = [
  { label: "Servicios", href: "#servicios" },
  { label: "Trabajos", href: "#trabajos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
] as const;

const SOCIALS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X", href: "https://x.com" },
] as const;

const COLUMN_TITLE_CLASS =
  "text-sm font-medium tracking-widest text-ink uppercase";

const LINK_CLASS = "text-sm text-ink-muted transition-colors hover:text-ink";

const FOOTER_LEGAL_CLASS = "mx-auto max-w-6xl px-6 py-6 text-xs text-ink-muted";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-ink">
            Estudio<span className="text-accent">.</span>Vector
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            Paginas web animadas e interactivas para marcas que quieren destacar
            en internet.
          </p>
        </div>

        <nav aria-label="Navegacion del pie de pagina">
          <h2 className={COLUMN_TITLE_CLASS}>Navegacion</h2>
          <ul className="mt-4 space-y-2">
            {NAVIGATION.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={LINK_CLASS}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={COLUMN_TITLE_CLASS}>Contacto</h2>
          <a
            href="mailto:hola@estudiovector.dev"
            className={`${LINK_CLASS} mt-4 block`}
          >
            hola@estudiovector.dev
          </a>
          <ul className="mt-6 flex gap-5">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_CLASS}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className={FOOTER_LEGAL_CLASS}>
          Todos los derechos reservados. Construido con Next.js, Three.js y
          GSAP.
        </p>
      </div>
    </footer>
  );
}
