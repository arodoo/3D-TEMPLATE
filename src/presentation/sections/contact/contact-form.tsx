/**
 * File location: src/presentation/sections/contact/contact-form.tsx
 * File function: Formulario de solicitud de presupuesto de la landing, que
 * valida los campos en el navegador, envia la peticion al endpoint de la API y
 * comunica el estado de envio, exito o error de forma accesible mediante una
 * region viva para lectores de pantalla.
 * All Rights Reserved arodoo
 */
"use client";

import { useState, type FormEvent } from "react";
import { useIsHydrated } from "@/presentation/hooks/use-is-hydrated";
import {
  FIELD_AREA_CLASS,
  FIELD_LABEL_CLASS,
  FIELD_LABEL_TEXT_CLASS,
  STATUS_MESSAGE_CLASS,
  STATUS_MESSAGE_ERROR_CLASS,
  STATUS_MESSAGE_OK_CLASS,
  SUBMIT_BUTTON_CLASS,
} from "@/presentation/ui/form-classes";
import { BudgetSelect } from "./budget-select";
import { TextField } from "./text-field";

interface ContactFormState {
  readonly status: "idle" | "submitting" | "success" | "error";
  readonly message: string;
}

const INITIAL_STATE: ContactFormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, setState] = useState<ContactFormState>(INITIAL_STATE);
  const isHydrated = useIsHydrated();

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setState({ status: "submitting", message: "" });

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState({
          status: "error",
          message: data.message ?? "No pudimos enviar tu solicitud.",
        });
        return;
      }

      form.reset();
      setState({
        status: "success",
        message: "Gracias. Responderemos en menos de 24 horas laborables.",
      });
    } catch {
      setState({
        status: "error",
        message: "Error de conexion. Intentalo de nuevo en unos segundos.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          name="name"
          label="Nombre"
          required
          minLength={2}
          maxLength={120}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          required
          maxLength={180}
        />
      </div>

      <TextField name="company" label="Empresa (opcional)" maxLength={120} />

      <BudgetSelect />

      <label className={FIELD_LABEL_CLASS}>
        <span className={FIELD_LABEL_TEXT_CLASS}>Tu proyecto</span>
        <textarea
          name="message"
          required
          minLength={20}
          maxLength={4000}
          rows={5}
          className={FIELD_AREA_CLASS}
        />
      </label>

      <button
        type="submit"
        disabled={!isHydrated || state.status === "submitting"}
        className={SUBMIT_BUTTON_CLASS}
      >
        {state.status === "submitting" ? "Enviando..." : "Enviar solicitud"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`${STATUS_MESSAGE_CLASS} ${
          state.status === "error"
            ? STATUS_MESSAGE_ERROR_CLASS
            : STATUS_MESSAGE_OK_CLASS
        }`}
      >
        {state.message}
      </p>
    </form>
  );
}
