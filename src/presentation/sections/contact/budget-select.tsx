/**
 * File location: src/presentation/sections/contact/budget-select.tsx
 * File function: Selector del rango de presupuesto del formulario de contacto
 * de la landing, que expone las opciones normalizadas del dominio y reutiliza
 * los estilos del sistema de diseno para los controles de formulario.
 * All Rights Reserved arodoo
 */
import {
  FIELD_CLASS,
  FIELD_LABEL_CLASS,
  FIELD_LABEL_TEXT_CLASS,
} from "@/presentation/ui/form-classes";

const BUDGET_OPTIONS = [
  { value: "UNKNOWN", label: "Aun no lo tengo claro" },
  { value: "UNDER_5K", label: "Menos de 5.000 EUR" },
  { value: "FROM_5K_TO_15K", label: "5.000 - 15.000 EUR" },
  { value: "FROM_15K_TO_50K", label: "15.000 - 50.000 EUR" },
  { value: "OVER_50K", label: "Mas de 50.000 EUR" },
] as const;

export function BudgetSelect() {
  return (
    <label className={FIELD_LABEL_CLASS}>
      <span className={FIELD_LABEL_TEXT_CLASS}>Presupuesto estimado</span>
      <select name="budgetRange" defaultValue="UNKNOWN" className={FIELD_CLASS}>
        {BUDGET_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
