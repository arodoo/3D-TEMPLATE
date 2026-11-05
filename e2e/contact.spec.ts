/**
 * File location: e2e/contact.spec.ts
 * File function:
 * Pruebas end to end del formulario de solicitud de presupuesto, que validan el
 * rechazo de datos invalidos, el registro correcto de una solicitud valida
 * contra PostgreSQL y la devolucion de un conflicto cuando se repite el mismo
 * email, cubriendo el camino critico de conversion del sitio.
 * All Rights Reserved arodoo
 */
import { expect, test } from "@playwright/test";

const VALID_MESSAGE =
  "Queremos una landing con escena 3D y animacion de scroll para nuestra marca.";

async function fillContactForm(
  page: import("@playwright/test").Page,
  email: string,
  message = VALID_MESSAGE,
): Promise<void> {
  await page.getByLabel("Nombre").fill("Marta Alvarez");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Tu proyecto").fill(message);
  await page.getByRole("button", { name: "Enviar solicitud" }).click();
}

test.describe("Formulario de contacto", () => {
  test("rechaza un mensaje demasiado corto", async ({ page }) => {
    await page.goto("/#contacto");

    await fillContactForm(page, "corto@estudiovector.dev", "Corto");

    await expect(page.getByRole("status")).toContainText(
      "Los datos enviados no son validos",
    );
  });

  test("registra una solicitud valida y confirma el envio", async ({
    page,
    request,
  }) => {
    const email = `e2e-ok-${Date.now()}@estudiovector.dev`;
    await page.goto("/#contacto");

    await fillContactForm(page, email);

    await expect(page.getByRole("status")).toContainText(
      "Gracias. Responderemos en menos de 24 horas laborables.",
    );

    const health = await request.get("/api/health");
    expect(health.status()).toBe(200);
  });

  test("devuelve conflicto al repetir el mismo email", async ({
    page,
    request,
  }) => {
    const email = `e2e-dup-${Date.now()}@estudiovector.dev`;

    const created = await request.post("/api/leads", {
      data: {
        name: "Marta Alvarez",
        email,
        message: VALID_MESSAGE,
      },
    });
    expect(created.status()).toBe(201);

    await page.goto("/#contacto");
    await fillContactForm(page, email);

    await expect(page.getByRole("status")).toContainText(
      "Ya existe una solicitud registrada con ese email",
    );
  });
});
