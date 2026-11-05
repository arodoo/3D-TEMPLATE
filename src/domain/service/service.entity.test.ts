/**
 * File location: src/domain/service/service.entity.test.ts
 * File function:
 * Pruebas unitarias de las invariantes del agregado Service, verificando la
 * normalizacion del slug a kebab-case, el rechazo de slugs con caracteres no
 * permitidos y de titulos demasiado cortos, y la conservacion del precio
 * orientativo y de la divisa por defecto en la entidad construida.
 * All Rights Reserved arodoo
 */
import { describe, expect, it } from "vitest";
import { Service } from "./service.entity";
import { ValidationError } from "../shared/errors";

const VALID_INPUT = {
  slug: "webgl-experiences",
  title: "Experiencias WebGL",
  tagline: "Escenas 3D en tiempo real",
  description: "Experiencias tridimensionales optimizadas para el navegador.",
  icon: "cube",
};

describe("Service.create", () => {
  it("normaliza el slug a minusculas", () => {
    const service = Service.create({
      ...VALID_INPUT,
      slug: "WebGL-Experiences",
    });

    expect(service.slug).toBe("webgl-experiences");
  });

  it("asigna la divisa y la visibilidad por defecto", () => {
    const service = Service.create(VALID_INPUT);

    expect(service.currency).toBe("EUR");
    expect(service.isPublished).toBe(true);
    expect(service.sortOrder).toBe(0);
  });

  it("conserva el precio orientativo cuando se proporciona", () => {
    const service = Service.create({ ...VALID_INPUT, priceFrom: 4500 });

    expect(service.priceFrom).toBe(4500);
  });

  it("deja el precio orientativo en null cuando no se proporciona", () => {
    const service = Service.create(VALID_INPUT);

    expect(service.priceFrom).toBeNull();
  });

  it("rechaza un slug con caracteres no permitidos", () => {
    expect(() =>
      Service.create({ ...VALID_INPUT, slug: "WebGL Experiences" }),
    ).toThrow(ValidationError);
  });

  it("rechaza un titulo demasiado corto", () => {
    expect(() => Service.create({ ...VALID_INPUT, title: "A" })).toThrow(
      ValidationError,
    );
  });
});
