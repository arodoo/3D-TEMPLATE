# File location: docs/reference/environment-variables.md

# File function: Referencia de todas las variables de entorno del proyecto, con

# su tipo, obligatoriedad, valor por defecto, proposito y las consecuencias

# concretas de omitirlas o definirlas mal en cada ambito de ejecucion.

# All Rights Reserved arodoo

# Variables de entorno

Las variables se validan al arrancar mediante `src/infrastructure/env.ts`, que
usa `@t3-oss/env-nextjs` con un esquema de Zod. Un valor invalido detiene el
arranque con un mensaje explicito en lugar de fallar en produccion.

Si necesitas saltar la validacion (por ejemplo, durante un build de
documentacion), define `SKIP_ENV_VALIDATION=true`.

## Servidor

### `DATABASE_URL`

|             |                                                                        |
| ----------- | ---------------------------------------------------------------------- |
| Tipo        | `string` (URL de PostgreSQL)                                           |
| Obligatoria | Si                                                                     |
| Formato     | `postgresql://USUARIO:CONTRASENA@HOST:PUERTO/BASE_DATOS?schema=public` |

Cadena de conexion a PostgreSQL. La validacion comprueba que empiece por
`postgresql://`.

```dotenv
DATABASE_URL="postgresql://postgres:changeme@localhost:5432/threed_template?schema=public"
```

**Donde se usa**: `src/infrastructure/prisma/prisma.client.ts` (driver adapter
`PrismaPg`) y `prisma.config.ts` (CLI de Prisma).

**Si falta**: la aplicacion falla al arrancar con
`Invalid environment variables: DATABASE_URL`.

### `LOG_LEVEL`

|             |                                                    |
| ----------- | -------------------------------------------------- |
| Tipo        | `trace \| debug \| info \| warn \| error \| fatal` |
| Obligatoria | No                                                 |
| Por defecto | `info`                                             |

Nivel de log del servidor. En desarrollo se usa el transporte `pino-pretty`
(legible, con colores); en produccion se emite JSON estructurado.

**Si tiene un valor invalido**: el arranque falla con la lista de valores
aceptados.

### `AUTH_SECRET`

|             |                                                    |
| ----------- | -------------------------------------------------- |
| Tipo        | `string`                                           |
| Obligatoria | No (se vuelve obligatoria al añadir autenticacion) |

Secreto de firma para las Server Actions. Genera uno con:

```bash
openssl rand -base64 32
```

**Si falta**: no hay error hoy, pero cualquier Server Action que necesite
firmar fallara en tiempo de ejecucion. Definelo antes de usar autenticacion.

## Cliente

### `NEXT_PUBLIC_SITE_URL`

|             |                         |
| ----------- | ----------------------- |
| Tipo        | `url`                   |
| Obligatoria | No                      |
| Por defecto | `http://localhost:3000` |

URL base del sitio. Se usa para los metadatos de Open Graph, las URLs
canonicas y el sitemap.

**Como se expone**: al ser `NEXT_PUBLIC_`, su valor se incrusta en el bundle
del navegador. No lo uses para secretos.

**Nota**: se normaliza eliminando la barra final, de modo que
`http://localhost:3000/` y `http://localhost:3000` producen el mismo resultado.

## Variables propias de herramientas

Estas variables las consume cada herramienta por su cuenta y no pasan por el
esquema de Zod.

| Variable              | Consumida por                          | Proposito                                        |
| --------------------- | -------------------------------------- | ------------------------------------------------ |
| `SKIP_ENV_VALIDATION` | `src/infrastructure/env.ts`            | Omite la validacion al arrancar                  |
| `ANALYZE`             | `next.config.ts`                       | Activa el analizador de bundle (`true`)          |
| `NODE_ENV`            | Next.js, Prisma, Pino                  | Modo de ejecucion (`development` / `production`) |
| `CI`                  | Playwright, Playwright report, Next.js | Activa el modo de integracion continua           |

## Ejemplo completo

```dotenv
# Conexion a PostgreSQL
DATABASE_URL="postgresql://postgres:changeme@localhost:5432/threed_template?schema=public"

# URL base del sitio
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Nivel de log del servidor
LOG_LEVEL="info"

# Secreto de firma para Server Actions
AUTH_SECRET=""
```

## Donde vive el archivo

`.env` esta en `.gitignore` y nunca se sube. `.env.example` si se sube y sirve
como plantilla. Para las pruebas, define las variables en el comando o en el
entorno de la shell:

```bash
DATABASE_URL="postgresql://postgres:changeme@localhost:5432/threed_template?schema=public" pnpm test:e2e
```
