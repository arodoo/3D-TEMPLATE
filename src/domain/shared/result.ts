/**
 * File location: src/domain/shared/result.ts
 * File function:
 * Define el tipo Result discriminated union con sus variantes de exito y error,
 * usado por el dominio y la capa de aplicacion para modelar operaciones que
 * pueden fallar sin lanzar excepciones,ottes permitiendose componer de forma
 * segura en los casos de uso.
 * All Rights Reserved arodoo
 */
export interface Success<T> {
  readonly ok: true;
  readonly value: T;
}

export interface Failure<E> {
  readonly ok: false;
  readonly error: E;
}

export type Result<T, E> = Success<T> | Failure<E>;

export function ok<T>(value: T): Success<T> {
  return { ok: true, value };
}

export function fail<E>(error: E): Failure<E> {
  return { ok: false, error };
}

export function isOk<T, E>(result: Result<T, E>): result is Success<T> {
  return result.ok;
}

export function isFail<T, E>(result: Result<T, E>): result is Failure<E> {
  return !result.ok;
}

export function mapResult<T, U, E>(
  result: Result<T, E>,
  transform: (value: T) => U,
): Result<U, E> {
  return result.ok ? ok(transform(result.value)) : result;
}
