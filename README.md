# 3D-TEMPLATE

Plantilla base para landing de un estudio que ofrece servicios de **páginas web
animadas e interactivas**. Este repositorio contiene el esqueleto completo:
arquitectura, base de datos, motor de animación 3D y cadena de pruebas. El
diseño visual y los contenidos definitivos se implementan despues sobre esta
base.

Para empezar: `git clone`, `pnpm install`, `cp .env.example .env`, `pnpm
db:generate`, `pnpm db:deploy`, `pnpm db:seed`, `pnpm dev`. La guia completa
esta en [`docs/how-to/local-setup.md`](docs/how-to/local-setup.md).

## Stack

| Capa          | Tecnologia                                                        |
| ------------- | ----------------------------------------------------------------- |
| Framework     | Next.js 16.4.5 (App Router, Turbopack, React 19.3.1)              |
| Lenguaje      | TypeScript 6.0.3 en modo estricto                                 |
| Estilos       | Tailwind CSS 4.3.4 con tokens `@theme`                            |
| 3D            | three.js 0.187 + React Three Fiber 9 + drei                       |
| Animacion     | GSAP 3.15 con ScrollTrigger + Lenis                               |
| Base de datos | PostgreSQL 18                                                     |
| ORM           | Prisma 7.10.1 con generador `prisma-client` y driver adapter `pg` |
| Validacion    | Zod 4 en el borde HTTP, `@t3-oss/env-nextjs` para el entorno      |
| Pruebas       | Vitest 5 (unitarias) + Playwright 1.64 (end to end)               |
| Calidad       | ESLint 10, Prettier 3, Husky, lint-staged, commitlint             |
| Paquetes      | pnpm 11 sobre Node.js 24 LTS                                      |

Detalle completo y motivos de eleccion: [`docs/reference/technology-stack.md`](docs/reference/technology-stack.md).

## Inicio rapido

```bash
pnpm install
cp .env.example .env
docker compose up -d postgres
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

La landing queda en <http://localhost:3000>.

Guia detallada con solucion de problemas:
[`docs/how-to/local-setup.md`](docs/how-to/local-setup.md).

## Comandos

### Desarrollo

| Comando        | Descripcion                                     |
| -------------- | ----------------------------------------------- |
| `pnpm dev`     | Servidor de desarrollo con Turbopack            |
| `pnpm build`   | Construccion de produccion (incluye typecheck)  |
| `pnpm start`   | Sirve la construccion de produccion             |
| `pnpm analyze` | Construccion con el analizador de bundle activo |

### Calidad

| Comando             | Descripcion                      |
| ------------------- | -------------------------------- |
| `pnpm typecheck`    | `tsc --noEmit` en modo estricto  |
| `pnpm lint`         | ESLint sobre todo el repositorio |
| `pnpm lint:fix`     | ESLint con correccion automatica |
| `pnpm format`       | Prettier escribe el formato      |
| `pnpm format:check` | Prettier verifica sin escribir   |

### Pruebas

| Comando              | Descripcion                         |
| -------------------- | ----------------------------------- |
| `pnpm test`          | Pruebas unitarias (Vitest)          |
| `pnpm test:watch`    | Modo watch de Vitest                |
| `pnpm test:coverage` | Pruebas con informe de cobertura    |
| `pnpm test:e2e`      | Pruebas end to end (Playwright)     |
| `pnpm test:e2e:ui`   | Playwright en modo interfaz grafica |

### Base de datos

| Comando            | Descripcion                                          |
| ------------------ | ---------------------------------------------------- |
| `pnpm db:generate` | Regenera el cliente tipado en `src/generated/prisma` |
| `pnpm db:migrate`  | Crea y aplica una migracion                          |
| `pnpm db:deploy`   | Aplica migraciones existentes (no interactivo)       |
| `pnpm db:seed`     | Carga la semilla de datos                            |
| `pnpm db:studio`   | Abre Prisma Studio                                   |
| `pnpm db:reset`    | Resetea la base de datos (destructivo)               |

## Estructura

```
.
├── docs/                    Documentacion en estandar Diataxis
│   ├── explanation/         Por que se decidio cada cosa
│   ├── how-to/             Como se hace cada tarea
│   ├── reference/          Que es exactamente cada elemento
│   └── tutorials/          Recorridos de aprendizaje
├── e2e/                     Pruebas end to end de Playwright
├── prisma/
│   ├── schema/             Modelos Prisma separados por agregado
│   │   └── migrations/      Migraciones SQL versionadas
│   ├── seed/               Datos de referencia de la semilla
│   └── seed.ts              Ejecutor de la semilla
├── src/
│   ├── app/                Enrutado de Next.js y handlers HTTP
│   ├── application/        Casos de uso
│   ├── domain/             Entidades, value objects y puertos
│   ├── infrastructure/      Adaptadores Prisma, logger, entorno
│   └── presentation/       Componentes React, escena 3D y animacion
├── docker-compose.yml       PostgreSQL local reproducible
└── prisma.config.ts         Configuracion de la CLI de Prisma
```

Las dependencias apuntan hacia dentro: el dominio no importa nada de la
infraestructura, y la infraestructura no conoce React. La razon completa esta
en [`docs/explanation/architecture.md`](docs/explanation/architecture.md).

## Convenciones

Todo archivo de codigo lleva un encabezado:

```ts
/**
 * File location: src/domain/lead/lead.entity.ts
 * File function: Descripcion de al menos 100 caracteres explicando la
 * responsabilidad del archivo y por que existe.
 * All Rights Reserved arodoo
 */
```

Limites estructurales, aplicados por ESLint:

- Maximo **120 lineas** por archivo.
- Maximo **80 caracteres** por linea.
- Maximo **6 archivos** por carpeta.
- Ningun `any` explicito.

## Git y commits

Los hooks de Husky se instalan automaticamente con `pnpm install`:

- **pre-commit**: ejecuta `lint-staged` (Prettier y ESLint) sobre los archivos
  modificados.
- **commit-msg**: valida el mensaje con `commitlint`.

Los mensajes siguen Conventional Commits con los tipos y alcances definidos en
`commitlint.config.mjs`:

```bash
git commit -m "feat(presentation): anade la seccion de proceso"
git commit -m "fix(infrastructure): corrige el mapeo del enum de presupuesto"
```

## Verificacion local

Este repositorio no incluye integracion continua en la nube: la verificacion
se ejecuta en local con un unico comando y con el mismo orden que usan los
scripts de `package.json`.

```bash
pnpm format:check     # Prettier + prisma format
pnpm lint             # ESLint sin errores ni avisos
pnpm typecheck        # tsc --noEmit
pnpm check:structure  # Limites de lineas, ancho y archivos por carpeta
pnpm test:coverage    # Vitest con umbrales de cobertura
pnpm build            # Compilacion de produccion
pnpm test:e2e         # Playwright sobre Chromium, Firefox y WebKit
```

Los hooks de Husky ejecutan Prettier, ESLint y commitlint sobre cada commit,
de modo que un commit que llega al repositorio ya pasa formato y lint.

## Documentacion

| Modo        | Pregunta              | Carpeta                                           |
| ----------- | --------------------- | ------------------------------------------------- |
| Explanation | Por que es asi?       | [`docs/explanation/`](docs/explanation/)          |
| How-to      | Como hago X?          | [`docs/how-to/`](docs/how-to/)                    |
| Reference   | Que es exactamente Y? | [`docs/reference/`](docs/reference/)              |
| Tutorial    | Como aprendo?         | Reservado, ver [indice](docs/README.md#tutorials) |

Las reglas de redaccion estan en [`docs/README.md`](docs/README.md).

## Licencia

Todos los derechos reservados.
