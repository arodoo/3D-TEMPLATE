/**
 * File location: src/presentation/ui/section-classes.ts
 * File function:
 * Centraliza las clases de Tailwind de los elementos comunes a todas las
 * secciones de la landing, como el encabezado de seccion, el titulo principal y
 * el texto secundario, para que el ritmo visual sea identico en cada bloque y
 * no dependa de copiar cadenas largas de forma manual.
 * All Rights Reserved arodoo
 */
export const SECTION_CONTAINER_CLASS = "mx-auto max-w-6xl px-6 py-32";

export const SECTION_PANEL_CLASS =
  "grid gap-12 rounded-3xl border border-white/10 bg-white/[0.03] p-10 " +
  "md:grid-cols-2 md:p-16";

export const SECTION_EYEBROW_CLASS =
  "text-sm font-medium tracking-widest text-accent uppercase";

export const SECTION_TITLE_CLASS =
  "mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-ink " +
  "md:text-5xl";

export const SECTION_LEAD_CLASS =
  "mt-6 max-w-md leading-relaxed text-ink-muted";

export const CARD_CLASS =
  "group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 " +
  "transition-colors hover:border-accent/40 hover:bg-white/[0.06]";

export const CARD_TITLE_CLASS = "mt-6 text-xl font-semibold text-ink";

export const CARD_ACCENT_CLASS = "mt-2 text-sm text-accent";

export const CARD_BODY_CLASS = "mt-4 leading-relaxed text-ink-muted";

export const FEATURED_CARD_CLASS =
  "group grid gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-8 " +
  "transition-colors hover:border-accent/40 md:grid-cols-[2fr_1fr]";

export const FIGURE_CLASS =
  "h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8";

export const BLOCKQUOTE_CLASS = "mt-6 text-lg leading-relaxed text-ink";

export const TAG_CLASS =
  "rounded-full border border-white/10 px-3 py-1 text-xs text-ink-muted";

export const STEP_CLASS = "relative border-t border-white/15 pt-6";
