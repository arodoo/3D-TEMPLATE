/**
 * File location: src/domain/project/project.entity.test.ts
 * File function:
 * Pruebas unitarias de las invariantes del agregado Project, verificando la
 * normalizacion del slug a formato kebab-case, el rechazo de slugs invalidos y
 * de titulos demasiado cortos, y la conservacion del stack tecnologico y de las
 * metricas de impacto en la entidad construida.
 * All Rights Reserved arodoo
 */
import { describe, expect, it } from "vitest";
import { Project } from "./project.entity";
import { ValidationError } from "../shared/errors";

const VALID_INPUT = {
  slug: "atlas-finance",
  title: "Atlas Finance",
  client: "Atlas Capital",
  summary: "Dashboard 3D de carteras de inversion en tiempo real.",
  description: "Visualizacion WebGL de datos de mercado con navegacion.",
  stack: ["Next.js", "Three.js"],
  metrics: { conversionLift: 40 },
};

describe("Project.create", () => {
  it("normaliza el slug a minusculas", () => {
    const project = Project.create({ ...VALID_INPUT, slug: "Atlas-Finance" });

    expect(project.slug).toBe("atlas-finance");
  });

  it("conserva el stack tecnologico y las metricas", () => {
    const project = Project.create(VALID_INPUT);

    expect(project.stack).toEqual(["Next.js", "Three.js"]);
    expect(project.metrics?.conversionLift).toBe(40);
  });

  it("marca el proyecto como publicado y no destacado por defecto", () => {
    const project = Project.create(VALID_INPUT);

    expect(project.isPublished).toBe(true);
    expect(project.isFeatured).toBe(false);
  });

  it("rechaza un slug que no cumple el formato kebab-case", () => {
    expect(() =>
      Project.create({ ...VALID_INPUT, slug: "Atlas Finance!" }),
    ).toThrow(ValidationError);
  });

  it("rechaza un titulo demasiado corto", () => {
    expect(() => Project.create({ ...VALID_INPUT, title: "A" })).toThrow(
      ValidationError,
    );
  });
});
