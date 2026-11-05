/**
 * File location: e2e/landing.spec.ts
 * File function:
 * Pruebas end to end del recorrido principal de la landing, que verifican la
 * carga de la pagina, la presencia de las secciones clave, la navegacion por el
 * menu ancla y el estado de salud del endpoint de comprobacion contra la base
 * de datos PostgreSQL.
 * All Rights Reserved arodoo
 */
import { expect, test } from "@playwright/test";

test.describe("Landing principal", () => {
  test("carga la pagina con el mensaje principal y las secciones clave", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Paginas web que",
    );

    await expect(page.locator("#servicios")).toBeVisible();
    await expect(page.locator("#trabajos")).toBeVisible();
    await expect(page.locator("#proceso")).toBeVisible();
    await expect(page.locator("#testimonios")).toBeVisible();
    await expect(page.locator("#contacto")).toBeVisible();
  });

  test("muestra los servicios cargados desde la base de datos", async ({
    page,
  }) => {
    await page.goto("/");

    const services = page.locator("#servicios");
    await services.scrollIntoViewIfNeeded();

    await expect(
      page.getByRole("heading", { name: "Experiencias WebGL" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Animacion de Scroll" }),
    ).toBeVisible();
  });

  test("navega a la seccion de contacto desde el menu", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Contacto" }).first().click();

    await expect(page).toHaveURL(/#contacto$/);
  });

  test("responde correctamente el endpoint de salud", async ({ request }) => {
    const response = await request.get("/api/health");

    expect(response.status()).toBe(200);
    expect(await response.json()).toMatchObject({
      status: "ok",
      database: "up",
    });
  });

  test("devuelve 404 en una ruta inexistente", async ({ page }) => {
    const response = await page.goto("/ruta-que-no-existe");

    expect(response?.status()).toBe(404);
  });
});
