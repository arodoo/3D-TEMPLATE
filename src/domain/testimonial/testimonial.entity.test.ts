/**
 * File location: src/domain/testimonial/testimonial.entity.test.ts
 * File function:
 * Pruebas unitarias de las invariantes del agregado Testimonial, verificando la
 * longitud minima de la cita, el rango valido de la valoracion en estrellas, el
 * recorte de los campos de texto y los valores por defecto de publicacion y
 * orden de aparicion.
 * All Rights Reserved arodoo
 */
import { describe, expect, it } from "vitest";
import { Testimonial } from "./testimonial.entity";
import { ValidationError } from "../shared/errors";

const VALID_INPUT = {
  author: "Marta Alvarez",
  role: "Directora de Marketing",
  company: "Atlas Capital",
  quote: "El sitio multiplico la duracion de la sesion de nuestros usuarios.",
};

describe("Testimonial.create", () => {
  it("recorta los espacios de los campos de texto", () => {
    const testimonial = Testimonial.create({
      ...VALID_INPUT,
      author: "  Marta Alvarez  ",
    });

    expect(testimonial.author).toBe("Marta Alvarez");
  });

  it("asigna la valoracion maxima y la visibilidad por defecto", () => {
    const testimonial = Testimonial.create(VALID_INPUT);

    expect(testimonial.rating).toBe(5);
    expect(testimonial.isShown).toBe(true);
    expect(testimonial.sortOrder).toBe(0);
  });

  it("rechaza una cita demasiado corta", () => {
    expect(() =>
      Testimonial.create({ ...VALID_INPUT, quote: "Muy bien" }),
    ).toThrow(/al menos 30 caracteres/);
  });

  it("rechaza una valoracion fuera del rango de estrellas", () => {
    expect(() => Testimonial.create({ ...VALID_INPUT, rating: 6 })).toThrow(
      ValidationError,
    );

    expect(() => Testimonial.create({ ...VALID_INPUT, rating: 0 })).toThrow(
      /entre 1 y 5 estrellas/,
    );
  });

  it("acepta una valoracion valida dentro del rango", () => {
    const testimonial = Testimonial.create({ ...VALID_INPUT, rating: 3 });

    expect(testimonial.rating).toBe(3);
  });
});
