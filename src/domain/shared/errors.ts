/**
 * File location: src/domain/shared/errors.ts
 * File function:
 * Define la jerarquia de errores de dominio y aplicacion de la landing, con
 * codigos estables y mensaje orientado al usuario final, para que las capas
 * superiores puedan mapear cada fallo a una respuesta HTTP concreta sin conocer
 * los detalles internos de la persistencia.
 * All Rights Reserved arodoo
 */
export type DomainErrorCode =
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "CONFLICT"
  | "FORBIDDEN"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";

export class DomainError extends Error {
  readonly code: DomainErrorCode;
  readonly details: Readonly<Record<string, unknown>>;

  constructor(
    code: DomainErrorCode,
    message: string,
    details: Readonly<Record<string, unknown>> = {},
  ) {
    super(message);
    this.name = "DomainError";
    this.code = code;
    this.details = details;
  }
}

export class ValidationError extends DomainError {
  constructor(
    message: string,
    details: Readonly<Record<string, unknown>> = {},
  ) {
    super("VALIDATION_ERROR", message, details);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends DomainError {
  constructor(resource: string, identifier: string) {
    super("NOT_FOUND", `${resource} not found: ${identifier}`, { resource });
    this.name = "NotFoundError";
  }
}

export class ConflictError extends DomainError {
  constructor(
    message: string,
    details: Readonly<Record<string, unknown>> = {},
  ) {
    super("CONFLICT", message, details);
    this.name = "ConflictError";
  }
}
