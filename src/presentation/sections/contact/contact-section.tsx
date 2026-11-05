/**
 * File location: src/presentation/sections/contact/contact-section.tsx
 * File function:
 * Seccion de contacto de la landing que presenta el mensaje de propuesta
 * comercial junto al formulario de solicitud de presupuesto, de modo que el
 * visitante entienda el compromiso de respuesta antes de escribir.
 * All Rights Reserved arodoo
 */
import {
  SECTION_CONTAINER_CLASS,
  SECTION_EYEBROW_CLASS,
  SECTION_LEAD_CLASS,
  SECTION_PANEL_CLASS,
  SECTION_TITLE_CLASS,
} from "@/presentation/ui/section-classes";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  return (
    <section id="contacto" className={SECTION_CONTAINER_CLASS}>
      <div className={SECTION_PANEL_CLASS}>
        <div>
          <p className={SECTION_EYEBROW_CLASS}>Contacto</p>
          <h2 className={SECTION_TITLE_CLASS}>
            Cuentanos que quieres construir
          </h2>
          <p className={SECTION_LEAD_CLASS}>
            Describe tu proyecto y te responderemos con una propuesta clara, con
            plazos y presupuesto, sin compromiso.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
