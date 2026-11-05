# File location: docs/reference/technology-stack.md

# File function: Tabla de referencia de todas las dependencias del proyecto con

# su version exacta, su proposito y el motivo de haberlas elegido, permitiendo

# consultar el estado del stack sin recorrer el arbol de dependencias.

# All Rights Reserved arodoo

# Stack tecnologico

## Runtime y herramientas

| Herramienta | Version | Motivo                                                                     |
| ----------- | ------- | -------------------------------------------------------------------------- |
| Node.js     | 24.18.0 | Version LTS actual. `engines` lo exige en `package.json`.                  |
| pnpm        | 11.10.0 | Instalaciones rapidas, store deduplicado y arbol estricto.                 |
| TypeScript  | 6.0.3   | Version maxima compatible con `typescript-eslint` 8.x, que exige `<6.1.0`. |
| ESLint      | 10.14.0 | Ultima major, con configuracion plana nativa.                              |
| Prettier    | 3.9.10  | Formato consistente sin opinions sobre el codigo.                          |
| Husky       | 9.1.7   | Hooks de Git gestionados por el propio repositorio.                        |
| lint-staged | 17.6.0  | Ejecuta comprobaciones solo sobre los archivos modificados.                |
| commitlint  | 21.2.4  | Valida el formato Conventional Commits.                                    |

## Framework y UI

| Paquete                | Version | Motivo                                                                                 |
| ---------------------- | ------- | -------------------------------------------------------------------------------------- |
| Next.js                | 16.4.5  | App Router, Server Components y Turbopack. `middleware` esta obsoleto: usa `proxy.ts`. |
| React                  | 19.3.1  | Requerido por Next.js 16 y `@react-three/fiber` 9.                                     |
| React DOM              | 19.3.1  | Renderizador de React para el navegador.                                               |
| Tailwind CSS           | 4.3.4   | Motor basado en tokens CSS con `@theme`. Sin `tailwind.config.js`.                     |
| @tailwindcss/turbopack | 4.3.4   | Integracion nativa de Tailwind con el bundler Turbopack.                               |
| next-themes            | 0.4.6   | Tema claro y oscuro sin parpadeo en la carga.                                          |
| @tanstack/react-query  | 5.106.1 | Estado remoto en el cliente con cache y revalidacion.                                  |
| clsx                   | 2.1.1   | Composicion condicional de clases.                                                     |
| tailwind-merge         | 3.7.0   | Resolucion de conflictos entre utilidades de Tailwind.                                 |

## Animacion y 3D

| Paquete                     | Version | Motivo                                                         |
| --------------------------- | ------- | -------------------------------------------------------------- |
| three                       | 0.187.0 | Motor 3D.                                                      |
| @react-three/fiber          | 9.8.2   | Capa declarativa de React sobre three.js.                      |
| @react-three/drei           | 10.7.9  | Utilidades de escena: `Float`, `OrbitControls`, `Environment`. |
| @react-three/postprocessing | 3.2.2   | Efectos de postprocesado (bloom, DOF).                         |
| postprocessing              | 6.39.6  | Motor de efectos, dependencia de la anterior.                  |
| gsap                        | 3.15.1  | Motor de animacion con linea de tiempo y `ScrollTrigger`.      |
| @gsap/react                 | 2.1.2   | Hook `useGSAP` con limpieza automatica del contexto.           |
| lenis                       | 1.3.27  | Desplazamiento suave conectado a `ScrollTrigger`.              |

## Datos y backend

| Paquete            | Version | Motivo                                                          |
| ------------------ | ------- | --------------------------------------------------------------- |
| prisma             | 7.10.1  | CLI y generador. Version **estable**; la 8 estaba en RC.        |
| @prisma/client     | 7.10.1  | Cliente tipado generado.                                        |
| @prisma/adapter-pg | 7.10.1  | Driver adapter para PostgreSQL.                                 |
| pg                 | 8.23.1  | Driver nativo de PostgreSQL.                                    |
| zod                | 4.6.7   | Validacion de entrada en el limite HTTP.                        |
| @t3-oss/env-nextjs | 0.13.11 | Validacion de variables de entorno tipadas.                     |
| pino               | 10.4.0  | Logging estructurado.                                           |
| dotenv             | 18.0.9  | Carga del `.env` para la CLI de Prisma y la semilla.            |
| server-only        | 0.0.1   | Error de compilacion si un modulo de servidor llega al cliente. |

## Pruebas

| Paquete                     | Version | Motivo                                                    |
| --------------------------- | ------- | --------------------------------------------------------- |
| vitest                      | 5.1.0   | Runner compatible con Vite, rapido y con watcher nativo.  |
| @vitejs/plugin-react        | 6.2.1   | Transformacion JSX para Vitest.                           |
| @vitest/coverage-v8         | 5.1.0   | Cobertura mediante V8, sin instrumentacion adicional.     |
| jsdom                       | 31.0.0  | Entorno DOM para el renderizado de componentes.           |
| @testing-library/react      | 16.3.3  | Consultas orientadas a la experiencia del usuario.        |
| @testing-library/jest-dom   | 7.0.1   | Matchers accesibles (`toBeVisible`, `toBeInTheDocument`). |
| @testing-library/user-event | 14.6.8  | Simulacion realista de interacciones.                     |
| @playwright/test            | 1.64.1  | Pruebas end to end en Chromium, Firefox y WebKit.         |

## Versiones excluidas y el motivo

| Paquete    | Version descartada | Motivo                                                              |
| ---------- | ------------------ | ------------------------------------------------------------------- |
| TypeScript | 7.0.2              | `typescript-eslint` 8.x declara `typescript <6.1.0`. Rompe el lint. |
| Prisma     | 8.0.0-rc.30        | Release candidate. Un esqueleto no debe depender de una RC.         |
| ESLint     | 9.x                | Funciona, pero la 10 es la actual y ya se usa.                      |

## Compatibilidad verificada

| Combinacion                                    | Estado                                      |
| ---------------------------------------------- | ------------------------------------------- |
| Next.js 16.4.5 + React 19.3.1                  | Verificado                                  |
| Next.js 16.4.5 + TypeScript 6.0.3              | Verificado (`next build` incluye typecheck) |
| Next.js 16.4.5 + Tailwind 4.3.4 + Turbopack    | Verificado                                  |
| Next.js 16.4.5 + ESLint 10.14.0                | Verificado                                  |
| Prisma 7.10.1 + PostgreSQL 18                  | Verificado                                  |
| Prisma 7.10.1 + Node 24                        | Verificado                                  |
| React 19.3.1 + `@react-three/fiber` 9.8.2      | Verificado (peer `>=19 <19.4`)              |
| Vitest 5.1.0 + Vite 8.3.6 + plugin-react 6.2.1 | Verificado                                  |
| Playwright 1.64.1 + Chromium, Firefox, WebKit  | Verificado                                  |
