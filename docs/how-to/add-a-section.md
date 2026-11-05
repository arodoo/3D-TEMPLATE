# File location: docs/how-to/add-a-section.md

# File function: Guia de como anadir una nueva seccion a la landing, detallando

# los pasos de creacion del componente, su registro en la pagina principal, el

# cumplimiento de los limites de tamano de archivo y carpeta, y la adicion de

# las pruebas correspondientes para la nueva seccion.

# All Rights Reserved arodoo

# Anadir una seccion a la landing

## Antes de empezar

Revisa los limites del proyecto en `AGENTS.md`:

- Maximo **6 archivos por carpeta**.
- Maximo **120 lineas por archivo** y **80 caracteres por linea**.
- Todo archivo de codigo lleva un encabezado con ubicacion, funcion y
  `All Rights Reserved`.
- Las secciones de la landing viven en `src/presentation/sections/`, agrupadas
  por subcarpeta tematica (`content/`, `hero/`, `contact/`, `layout/`).

## 1. Decide si necesita datos

Si la seccion muestra contenido de la base de datos, el flujo es:

```
Dominio      → entidad + puerto de repositorio
Aplicación   → caso de uso que proyecta a una vista
Infra        → adaptador Prisma
Presentación → componente que consume la vista
```

Si la seccion es puramente decorativa, no necesita ninguna de esas capas.

## 2. Crea el componente

```bash
# Para una seccion de contenido estatico
src/presentation/sections/content/nueva-seccion.tsx
```

Si el componente supera las 120 lineas, extrae subcomponentes a su propia
carpeta. No subas el limite.

Ejemplo minimo:

```tsx
/**
 * File location: src/presentation/sections/content/nueva-seccion.tsx
 * File function: Descripcion de al menos 100 caracteres explicando que hace
 * el componente, cual es su responsabilidad y por que existe.
 * All Rights Reserved arodoo
 */
import { Reveal } from "@/presentation/motion/reveal";

interface NuevaSeccionProps {
  readonly titulo: string;
}

export function NuevaSeccion({ titulo }: NuevaSeccionProps) {
  return (
    <section id="nueva-seccion" className="mx-auto max-w-6xl px-6 py-32">
      <Reveal>
        <h2 className="text-4xl font-semibold tracking-tight text-ink">
          {titulo}
        </h2>
      </Reveal>
    </section>
  );
}
```

## 3. Registrala en la pagina

Edita `src/app/page.tsx` e importa el componente. La pagina ya se queda cerca
del limite de lineas: si la adicion lo desborda, extrae un componente
`<Secciones />` que agrupe las secciones de contenido.

## 4. Anade el enlace de navegacion

Las anclas del menu se declaran en dos sitios:

- `src/presentation/sections/layout/site-header.tsx` (constante `NAVIGATION`)
- `src/presentation/sections/layout/site-footer.tsx` (constante `NAVIGATION`)

Anade el `href` con el mismo `id` que usaste en la seccion.

## 5. Aplica el color del tema

Usa exclusivamente los tokens definidos en `src/app/globals.css`:

| Token             | Uso                          |
| ----------------- | ---------------------------- |
| `bg-surface`      | Fondo de la pagina           |
| `bg-white/[0.03]` | Superficie de tarjeta        |
| `text-ink`        | Texto principal              |
| `text-ink-muted`  | Texto secundario             |
| `text-accent`     | Acentos y estados de enfasis |
| `border-white/10` | Bordes sutiles               |

No introduzcas colores hexadecimales sueltos. Los tokens son el unico contrato
visual entre componentes.

## 6. Aplica la animacion de entrada

Envuelve el contenido en `<Reveal>`. El componente ya respeta
`prefers-reduced-motion`, por lo que no necesitas condicionarlo manualmente.

Para un grupo de elementos con retardo escalonado:

```tsx
<Reveal delay={index * 0.12}>
  <article>{/* ... */}</article>
</Reveal>
```

## 7. Anade las pruebas

Si la seccion muestra datos de la base de datos, comprueba en las pruebas
end to end que el contenido aparece:

```ts
test("muestra la nueva seccion con datos reales", async ({ page }) => {
  await page.goto("/");
  await page.locator("#nueva-seccion").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("heading", { name: "Titulo esperado" }),
  ).toBeVisible();
});
```

El `scrollIntoViewIfNeeded()` es necesario: las secciones con animacion de
scroll empiezan con `opacity: 0` y no son visibles hasta que entran en el
viewport.

## 8. Verifica

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm test:e2e
pnpm build
```

## Checklist

- [ ] El componente esta en la subcarpeta tematica correcta.
- [ ] La carpeta no supera los 6 archivos.
- [ ] El archivo no supera las 120 lineas ni los 80 caracteres por linea.
- [ ] El encabezado del archivo esta completo.
- [ ] Solo se usan tokens de color del tema.
- [ ] La animacion respeta `prefers-reduced-motion`.
- [ ] La seccion es accesible con teclado y lector de pantalla.
- [ ] Existe una prueba que cubre la nueva seccion.
