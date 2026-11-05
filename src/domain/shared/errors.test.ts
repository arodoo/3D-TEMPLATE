/**
 * File location: src/domain/shared/errors.test.ts
 * File function:
 * Pruebas unitarias de la jerarquia de errores del dominio, verificando que
 * cada subtipo conserva su codigo estable, su nombre de clase y el detalle
 * asociado, y que un error de dominio genérico se distingue de una validacion,
 * un conflicto y un recurso inexistente.
 * All Rights Reserved arodoo
 */
import { describe, expect, it } from "vitest";
import {
  ConflictError,
  DomainError,
  NotFoundError,
  ValidationError,
} from "./errors";

describe("errores de dominio", () => {
  it("DomainError expone su codigo y su detalle", () => {
    const error = new DomainError("FORBIDDEN", "Acceso denegado", {
      resource: "lead",
    });

    expect(error).toBeInstanceOf(Error);
    expect(error.code).toBe("FORBIDDEN");
    expect(error.message).toBe("Acceso denegado");
    expect(error.details).toEqual({ resource: "lead" });
    expect(error.name).toBe("DomainError");
  });

  it("ValidationError hereda el codigo de validacion", () => {
    const error = new ValidationError("Email invalido");

    expect(error).toBeInstanceOf(DomainError);
    expect(error.code).toBe("VALIDATION_ERROR");
    expect(error.name).toBe("ValidationError");
  });

  it("ConflictError hereda el codigo de conflicto", () => {
    const error = new ConflictError("Email duplicado");

    expect(error).toBeInstanceOf(DomainError);
    expect(error.code).toBe("CONFLICT");
    expect(error.name).toBe("ConflictError");
  });

  it("NotFoundError compone el mensaje con el recurso y el identificador", () => {
    const error = new NotFoundError("Lead", "abc-123");

    expect(error).toBeInstanceOf(DomainError);
    expect(error.code).toBe("NOT_FOUND");
    expect(error.name).toBe("NotFoundError");
    expect(error.message).toBe("Lead not found: abc-123");
    expect(error.details).toEqual({ resource: "Lead" });
  });

  it("el detalle por defecto es un objeto vacio", () => {
    expect(new ValidationError("Error").details).toEqual({});
  });
});
