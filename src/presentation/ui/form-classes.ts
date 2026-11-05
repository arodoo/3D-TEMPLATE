/**
 * File location: src/presentation/ui/form-classes.ts
 * File function:
 * Centraliza las clases de Tailwind de los controles de formulario del sistema
 * de diseno, evitando repetir cadenas largas en cada componente y garantizando
 * que el formulario de contacto, sus campos y el resto de controles compartan
 * exactamente el mismo aspecto visual.
 * All Rights Reserved arodoo
 */
export const FIELD_CLASS =
  "rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-ink " +
  "transition-colors outline-none focus:border-accent";

export const FIELD_AREA_CLASS = `resize-y ${FIELD_CLASS}`;

export const FIELD_LABEL_CLASS = "flex flex-col gap-2 text-sm";

export const FIELD_LABEL_TEXT_CLASS = "text-ink-muted";

export const SUBMIT_BUTTON_CLASS =
  "w-full rounded-full bg-accent px-7 py-3 font-medium text-ink " +
  "transition-transform hover:scale-[1.02] " +
  "disabled:cursor-not-allowed disabled:opacity-60";
export const STATUS_MESSAGE_CLASS = "text-sm";

const STATUS_ERROR_TONE = "text-red-400";
const STATUS_OK_TONE = "text-accent";

export const STATUS_MESSAGE_ERROR_CLASS =
  STATUS_MESSAGE_CLASS + " " + STATUS_ERROR_TONE;

export const STATUS_MESSAGE_OK_CLASS =
  STATUS_MESSAGE_CLASS + " " + STATUS_OK_TONE;
