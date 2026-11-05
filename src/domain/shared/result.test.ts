/**
 * File location: src/domain/shared/result.test.ts
 * File function:
 * Pruebas unitarias de la utilidad Result usada por el dominio y la capa de
 * aplicacion, verificando la construccion de estados de exito y error, las
 * comprobaciones de tipo, y la transformacion segura de valores que preserva la
 * rama de error sin ejecutar la funcion de transformacion.
 * All Rights Reserved arodoo
 */
import { describe, expect, it, vi } from "vitest";
import { fail, isFail, isOk, mapResult, ok } from "./result";

describe("Result", () => {
  it("construye un resultado correcto con su valor", () => {
    const result = ok("valor");

    expect(result).toEqual({ ok: true, value: "valor" });
    expect(isOk(result)).toBe(true);
    expect(isFail(result)).toBe(false);
  });

  it("construye un resultado de error con su causa", () => {
    const result = fail("boom");

    expect(result).toEqual({ ok: false, error: "boom" });
    expect(isFail(result)).toBe(true);
    expect(isOk(result)).toBe(false);
  });

  it("transforma el valor de un resultado correcto", () => {
    const result = mapResult(ok(2), (value) => value * 21);

    expect(result).toEqual({ ok: true, value: 42 });
  });

  it("conserva el error sin ejecutar la transformacion", () => {
    const transform = vi.fn((value: number) => value * 2);
    const result = mapResult(fail<string>("error"), transform);

    expect(result).toEqual({ ok: false, error: "error" });
    expect(transform).not.toHaveBeenCalled();
  });
});
