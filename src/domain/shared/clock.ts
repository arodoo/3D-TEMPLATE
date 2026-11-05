/**
 * File location: src/domain/shared/clock.ts
 * File function:
 * Define el contrato del reloj como puerto de dominio, permitiendo inyectar una
 * implementacion controlada en los tests para verificar los casos de uso que
 * dependen de la marca temporal sin depender del tiempo real del sistema.
 * All Rights Reserved arodoo
 */
export interface Clock {
  now(): Date;
}

export const systemClock: Clock = {
  now: () => new Date(),
};

export function fixedClock(instant: Date): Clock {
  return { now: () => instant };
}
