/**
 * File location: src/presentation/sections/contact/text-field.tsx
 * File function:
 * Campo de texto reutilizable del formulario de contacto de la landing, que
 * encapsula el marcado accesible de la etiqueta y el control de formulario con
 * los estilos del sistema de diseno y sus limites de longitud.
 * All Rights Reserved arodoo
 */
import {
  FIELD_CLASS,
  FIELD_LABEL_CLASS,
  FIELD_LABEL_TEXT_CLASS,
} from "@/presentation/ui/form-classes";

interface TextFieldProps {
  readonly name: string;
  readonly label: string;
  readonly type?: string;
  readonly required?: boolean;
  readonly minLength?: number;
  readonly maxLength?: number;
}

export function TextField({
  name,
  label,
  type = "text",
  required = false,
  minLength,
  maxLength,
}: TextFieldProps) {
  return (
    <label className={FIELD_LABEL_CLASS}>
      <span className={FIELD_LABEL_TEXT_CLASS}>{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className={FIELD_CLASS}
      />
    </label>
  );
}
