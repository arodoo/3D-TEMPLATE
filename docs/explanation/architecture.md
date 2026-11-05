# File location: docs/explanation/architecture.md

# File function: Documenta las decisiones de arquitectura del proyecto, sus

# razonamientos y los trade-offs asumidos, cubriendo el esquema por capas, el

# uso de Prisma, el motor de animaciones y la estrategia de pruebas para que

# cualquier miembro del equipo entienda el porque de cada eleccion.

# All Rights Reserved arodoo

# Arquitectura del proyecto

Este documento explica **por qué** la landing está construida así. Para saber
**cómo** ejecutar cada tarea, consulta `docs/how-to/`. Para consultar **qué**
significa cada elemento, consulta `docs/reference/`.

## Contexto

La landing vende un servicio de páginas web animadas e interactivas. Eso
implica dos exigencias que rara vez conviven bien:

1. **Rendimiento visual**: la escena 3D y las animaciones de scroll deben ser
   fluidas a 60 fps en un portátil de gama media, no solo en un portátil gaming.
2. **Contenido real**: los servicios, los casos de éxito y los testimonios
   cambian con frecuencia y no deben requerir un despliegue para actualizarse.

El esqueleto resuelve las dos cosas: React Server Components para el contenido
estático vindo de PostgreSQL, y una isla cliente mínima (la escena 3D y el
motor de animación) para todo lo que necesita JavaScript.

## Capas

El proyecto sigue una organización por capas inspired en Domain Driven Design.
La regla que gobierna el diseño es: **las dependencias apuntan hacia dentro**.
El dominio no importa nada de la infraestructura.

```
src/
├── domain/          Entidades, value objects y puertos. Cero dependencias.
├── application/     Casos de uso que orquestan el dominio.
├── infrastructure/  Adaptadores concretos: Prisma, logger, variables de env.
└── presentation/    Componentes React, escena 3D y motor de animación.
```

`src/app/` es la capa de composición de Next.js: enruta, invoca casos de uso y
renderiza. No contiene lógica de negocio.

### Por qué el dominio usa `Result` en lugar de excepciones

Los casos de uso devuelven `Result<T, DomainError>` en lugar de lanzar
excepciones. Motivos:

- El flujo de error queda **explícito en la firma**: quien llama sabe que
  puede fallar y debe manejarlo.
- Un `throw` dentro de un `try/catch` con varios tipos de error se convierte
  rápido en un bloque de `instanceof` difícil de leer.
- El adaptor HTTP traduce el `Result` a un código de estado sin conocer los
  detalles del dominio.

Ver `src/domain/shared/result.ts` y `src/domain/shared/errors.ts`.

### Por qué los puertos viven en el dominio

`LeadRepository` está declarado en `src/domain/lead/lead.repository.ts` y su
implementación en `src/infrastructure/prisma/lead-prisma.repository.ts`. El
dominio no conoce Prisma; la infraestructura no conoce React. Esto permite
probar los casos de uso con repositorios en memoria, sin base de datos.

## Capa de infraestructura

### Por qué Prisma 7 con el generador `prisma-client`

Prisma ofrece dos generadores. El proyecto usa `prisma-client`, no el
antiguo `prisma-client-js`, por una razón concreta: genera **TypeScript
plano** dentro del repositorio en vez de un binario dentro de `node_modules`.

Consecuencias prácticas:

- El cliente se depura con el debugger y se lee como código normal.
- `pnpm` no necesita `node-linker=hoisted` para que Prisma funcione.
- El código generado queda excluido de ESLint, de Prettier y del typecheck
  (`src/generated`).

El precio es que el cliente generado **no lee `.env` por sí mismo**. La URL de
conexión se pasa explícitamente mediante el driver adapter `PrismaPg`, y la
carga del `.env` es responsabilidad de `prisma.config.ts` en la CLI y de
`src/infrastructure/env.ts` en la aplicación.

### Por qué un driver adapter

Prisma 7 usa _driver adapters_: el pool de conexiones y el protocolo los
gestiona `pg` directamente en lugar de un motor Rust intermedio. Beneficios:

- Latencia de conexión menor en entornos serverless.
- Control explícito del pool (`max`, `idleTimeoutMillis`).
- Se elimina el binario nativo que rompia despliegues en plataformas serverless.

Configuración en `src/infrastructure/prisma/prisma.client.ts`.

### Por qué el contenedor de dependencias

`src/infrastructure/container.ts` instancia los adaptadores una sola vez. Sin
él, cada petición abriría un pool nuevo contra PostgreSQL. El patrón también
centraliza el cableado: si mañana el repositorio de leads pasa a llamarse
`LeadRepository` en otro motor, solo cambia ese archivo.

## Capa de presentación

### Por qué la escena 3D se carga sin renderizado en servidor

WebGL no existe en Node. `src/presentation/three/hero-canvas.tsx` usa
`next/dynamic` con `ssr: false` para que el módulo que importa `three.js` solo
se descargue en el navegador. Sin esto, el build falla y la página inicial
bloquea el hilo principal del servidor mientras se serializa la escena.

### Por qué GSAP y Lenis viven en un proveedor

El motor de animación tiene estado global: un único `ScrollTrigger`, un único
`Lenis` y una única suscripción al evento `scroll`. Si cada componente
creara su propia instancia, habría N listeners compitiendo por el scroll y
las animaciones se desincronizarían.

`AnimationProvider` centraliza ese estado y expone el contexto.

### Por qué `prefers-reduced-motion` se respeta en tres niveles

La accesibilidad no es un interruptor único. El proyecto lo aplica en:

1. **CSS** (`src/app/globals.css`): reduce las animaciones a 0.01 ms.
2. **Animación** (`AnimationProvider`): no instancia Lenis ni GSAP.
3. **Componente** (`Reveal`, `HeroSection`): no ejecuta el `fromTo`.

El resultado es que un visitante que activa la preferencia del sistema obtiene
la página completa, navegable y legible, sin movimiento.

### Por qué `useSyncExternalStore` para la preferencia de movimiento

`useEffect` + `useState` provoca un segundo renderizado en cada carga y la
regla `react-hooks/set-state-in-effect` de React 19 lo prohíbe.
`useSyncExternalStore` lee el valor durante el render, no después, y mantiene
la suscripción al evento `change` de `matchMedia`.

### Por qué el botón de envío se deshabilita hasta hidratar

Un formulario renderizado en servidor que se envía antes de la hidratación
hace un `GET` nativo con los datos en la URL. `useIsHydrated` evita ese
escenario deshabilitando el botón hasta que los manejadores de React están
registrados.

## Estrategia de pruebas

Dos niveles, con responsabilidades distintas:

| Nivel      | Herramienta              | Cubre                         | Requiere base de datos |
| ---------- | ------------------------ | ----------------------------- | ---------------------- |
| Unitario   | Vitest + Testing Library | Dominio y casos de uso        | No                     |
| End to end | Playwright               | Recorridos reales del usuario | Sí                     |

El nivel unitario usa repositorios en memoria. Es rápido, determinista y cubre
las reglas de negocio, que es donde viven los bugs caros.

El nivel end to end existe para los caminos que solo fallan con el sistema
completo: la hidratación, la serialización RSC, la validación Zod en el
endpoint, la escritura real en PostgreSQL y la detección de duplicados.

Ver `docs/explanation/testing-strategy.md`.

## Decisiones descartadas

| Alternativa                        | Por qué no                                                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Drizzle ORM                        | Tipado excelente pero requiere mas glue manual y tiene menos oferta de empleo que Prisma.                        |
| Prisma 8 RC                        | Es una release candidate. Un esqueleto no debe apoyar su estabilidad en una RC.                                  |
| Motion One / Framer Motion         | Excelente para animaciones de interfaz, inferior para las secuencias narrativas de scroll que son el producto.   |
| React Three Fiber vs three.js puro | R3F aporta declaratividad y el ecosistema de drei. El three.js puro se reserva para escenas de alta complejidad. |
| CSS Modules en vez de Tailwind     | Tailwind 4 con tokens `@theme` reduce la superficie de diseño a un solo archivo de variables.                    |
