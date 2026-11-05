/**
 * File location: src/domain/shared/clock.test.ts
 * File function:
 * Pruebas unitarias del puerto de reloj del dominio, verificando que el reloj
 * del sistema devuelve una marca temporal cercana al instante actual y que el
 * reloj fijo devuelve siempre el mismo instante, permitiendo escribir pruebas
 * deterministas de los casos de uso dependientes del tiempo.
 * All Rights Reserved arodoo
 */
import { describe, expect, it } from "vitest";
import { fixedClock, systemClock } from "./clock";

describe("clock", () => {
  it("el reloj del sistema devuelve una marca temporal actual", () => {
    const before = Date.now();
    const now = systemClock.now().getTime();
    const after = Date.now();

    expect(now).toBeGreaterThanOrEqual(before);
    expect(now).toBeLessThanOrEqual(after);
  });

  it("el reloj fijo devuelve siempre el mismo instante", () => {
    const instant = new Date("2026-03-15T10:30:00.000Z");
    const clock = fixedClock(instant);

    expect(clock.now()).toBe(instant);
    expect(clock.now()).toBe(instant);
    expect(clock.now().getTime()).toBe(instant.getTime());
  });
});
