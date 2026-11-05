/**
 * File location: src/domain/lead/lead.entity.test.ts
 * File function:
 * Pruebas unitarias de las invariantes del agregado Lead, verificando la
 * validacion del email, la longitud minima y maxima del mensaje, la
 * normalizacion de los campos de texto y los valores por defecto del
 * presupuesto y del estado comercial de la solicitud.
 * All Rights Reserved arodoo
 */
import { describe, expect, it } from "vitest";
import { Lead } from "./lead.entity";
import { ValidationError } from "../shared/errors";

const VALID_INPUT = {
  name: "Marta Alvarez",
  email: "Marta.Alvarez@Example.com",
  message:
    "Necesitamos una landing animada con escena 3D para nuestra nueva marca.",
};

describe("Lead.create", () => {
  it("normaliza el email a minusculas y recorta los espacios", () => {
    const lead = Lead.create({ ...VALID_INPUT, email: "  MARTA@EXAMPLE.COM " });

    expect(lead.email).toBe("marta@example.com");
    expect(lead.name).toBe("Marta Alvarez");
  });

  it("asigna el estado NEW y el presupuesto UNKNOWN por defecto", () => {
    const lead = Lead.create(VALID_INPUT);

    expect(lead.status).toBe("NEW");
    expect(lead.budgetRange).toBe("UNKNOWN");
    expect(lead.source).toBe("website");
  });

  it("convierte los campos opcionales vacios en null", () => {
    const lead = Lead.create({ ...VALID_INPUT, company: "   ", phone: "" });

    expect(lead.company).toBeNull();
    expect(lead.phone).toBeNull();
  });

  it("rechaza un email con formato invalido", () => {
    expect(() =>
      Lead.create({ ...VALID_INPUT, email: "no-es-un-email" }),
    ).toThrow(ValidationError);
  });

  it("rechaza un nombre demasiado corto", () => {
    expect(() => Lead.create({ ...VALID_INPUT, name: "A" })).toThrow(
      ValidationError,
    );
  });

  it("rechaza un mensaje por debajo de la longitud minima", () => {
    expect(() => Lead.create({ ...VALID_INPUT, message: "Corto" })).toThrow(
      /al menos 20 caracteres/,
    );
  });

  it("rechaza un mensaje por encima de la longitud maxima", () => {
    const message = "a".repeat(4001);

    expect(() => Lead.create({ ...VALID_INPUT, message })).toThrow(
      /no puede superar 4000 caracteres/,
    );
  });
});
