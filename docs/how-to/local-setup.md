# File location: docs/how-to/local-setup.md

# File function: Guia paso a paso para preparar el entorno de desarrollo local

# del proyecto, incluyendo la instalacion de Node y pnpm, el arranque de

# PostgreSQL, la generacion del cliente de Prisma, la aplicacion de migraciones

# y la carga de la semilla de datos.

# All Rights Reserved arodoo

# Preparar el entorno local

## Requisitos

| Herramienta | Version         |
| ----------- | --------------- |
| Node.js     | 24 LTS          |
| pnpm        | 11              |
| PostgreSQL  | 18 (o superior) |

Comprueba las versiones:

```bash
node -v
pnpm -v
psql --version
```

## 1. Instalar las dependencias

```bash
pnpm install
```

El hook `prepare` de Husky se instala automaticamente y configura los hooks de
Git para validar los commits.

## 2. Arrancar PostgreSQL

### Opcion A: Docker (recomendado)

```bash
docker compose up -d postgres
```

El servicio expone el puerto `5432` con el usuario `postgres` y la contrasena
`changeme` (configurable con la variable `POSTGRES_PASSWORD`), y crea la base
de datos `threed_template`. La base de datos de pruebas `threed_template_test`
corre en el puerto `5433` como servicio separado.

Verifica que el contenedor esta sano:

```bash
docker compose ps
```

### Opcion B: PostgreSQL local

Si ya tienes PostgreSQL instalado, crea las bases de datos manualmente:

```bash
psql -U postgres -c "CREATE DATABASE threed_template;"
psql -U postgres -c "CREATE DATABASE threed_template_test;"
```

## 3. Configurar las variables de entorno

```bash
cp .env.example .env
```

Comprueba que `.env` contiene la URL correcta:

```dotenv
DATABASE_URL="postgresql://postgres:changeme@localhost:5432/threed_template?schema=public"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

> `.env` esta en `.gitignore`. Nunca se sube al repositorio.

## 4. Generar el cliente de Prisma

```bash
pnpm db:generate
```

Genera el cliente tipado en `src/generated/prisma`. Este directorio esta
excluido de Git, de ESLint y del typecheck: se regenera siempre que cambia el
esquema.

## 5. Aplicar las migraciones

```bash
pnpm db:migrate
```

Crea las tablas y registra la migracion en `prisma/schema/migrations/`. Si la
base de datos ya existe con el esquema correcto, Prisma no generara nada.

Para un entorno que solo necesita el esquema y no debe crear migraciones
nuevas (por ejemplo, un despliegue automatizado):

```bash
pnpm db:deploy
```

## 6. Cargar la semilla de datos

```bash
pnpm db:seed
```

Inserta el catalogo de servicios, dos casos de exito, dos testimonios y los
ajustes basicos del sitio. Es idempotente: puedes ejecutarla las veces que
haga falta.

## 7. Arrancar el servidor

```bash
pnpm dev
```

La landing queda disponible en <http://localhost:3000>.

## 8. Verificar que todo funciona

```bash
pnpm typecheck   # Sin errores de tipos
pnpm lint        # Sin errores de lint
pnpm test        # Pruebas unitarias
pnpm build       # Construccion de produccion
```

Para las pruebas end to end, instala los navegadores la primera vez:

```bash
pnpm exec playwright install chromium firefox webkit
pnpm test:e2e
```

## Solucion de problemas

### `Can't reach database server`

El servidor de PostgreSQL no esta arrancado o el puerto no coincide. Comprueba
con `docker compose ps` y `Test-NetConnection -ComputerName localhost -Port 5432`.

### `Environment variable not found: DATABASE_URL`

Falta el archivo `.env`. Copialo desde `.env.example` y reinicia el servidor.

### `The table public.leads does not exist`

Faltan las migraciones. Ejecuta `pnpm db:migrate`.

### `Error: P3005` al migrar

La base de datos tiene el esquema desactualizado y Prisma pide un reset. En
desarrollo puedes usar `pnpm db:reset` (borra los datos y reaplica todo).

### La pagina carga pero los botones no responden

La hidratacion no ha ocurrido. Comprueba la consola del navegador: si ves
`Blocked cross-origin request to Next.js dev resource`, el origen no esta en
`allowedDevOrigins` dentro de `next.config.ts`. Anade el host y reinicia.
