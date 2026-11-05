# File location: docs/how-to/change-database-schema.md

# File function: Documenta el procedimiento para modificar el esquema de la base

# de datos, cubriendo la edicion del modelo Prisma, la generacion y aplicacion

# de la migracion, la actualizacion de las capas de dominio e infraestructura

# y la verificacion del cambio con las pruebas del proyecto.

# All Rights Reserved arodoo

# Cambiar el esquema de la base de datos

## 1. Edita el modelo

Los modelos viven separados por agregado en `prisma/schema/models/`:

```
prisma/schema/
├── schema.prisma          Generador y datasource
├── migrations/            Migraciones generadas
└── models/
    ├── lead.prisma
    ├── project.prisma
    ├── service.prisma
    ├── site-setting.prisma
    └── testimonial.prisma
```

Ejemplo, anadir un campo `phoneVerified` al modelo `Lead`:

```prisma
model Lead {
  // ...campos existentes
  phoneVerified Boolean @default(false)
  // ...
}
```

## 2. Crea la migracion

```bash
pnpm db:migrate
```

Prisma compara el esquema, genera el SQL en
`prisma/schema/migrations/<timestamp>_<nombre>/migration.sql` y lo aplica.

Revisa el SQL generado antes de confirmar. Prisma a veces elige una estrategia
destructiva (borrar y recrear una columna) que no es obvia en el terminal.

## 3. Regenera el cliente

```bash
pnpm db:generate
```

El cliente tipado se actualiza automaticamente con `db:migrate`, pero
executalo explicitamente si has editado el generador o el `output`.

## 4. Actualiza el dominio

El campo nuevo debe existir en la entidad de dominio. Edita
`src/domain/lead/lead.entity.ts`:

```ts
export interface LeadProps {
  // ...campos existentes
  readonly phoneVerified: boolean;
}
```

Y el metodo `restore`, que mapea la fila de la base de datos a la entidad:

```ts
static restore(props: LeadProps): Lead {
  return new Lead(props);
}
```

El `restore` es la frontera de traduccion. Si la base de datos usa un enum y el
dominio usa otro vocabulario, la conversion va aqui, no en la capa de
aplicacion.

## 5. Actualiza el adaptador

`src/infrastructure/prisma/lead-prisma.repository.ts` mapea entre Prisma y el
dominio. Si el campo es de lectura, anadelo al `restore`. Si es de escritura,
anadelo al `save`:

```ts
async save(lead: Lead): Promise<void> {
  await this.prisma.lead.create({
    data: {
      // ...campos existentes
      phoneVerified: lead.phoneVerified,
    },
  });
}
```

## 6. Propaga a las vistas

Si el campo debe mostrarse, actualiza:

- La vista de presentacion en `src/application/lead/list-leads.use-case.ts`.
- El endpoint que la expone, si aplica.

## 7. Verifica

```bash
pnpm db:generate
pnpm typecheck
pnpm lint
pnpm test
pnpm test:e2e
```

## Migraciones en produccion

En produccion y en entornos automatizados se ejecutan migraciones **no
interactivas**:

```bash
pnpm db:deploy
```

`db:deploy` solo aplica migraciones existentes; nunca genera una nueva. Es el
comando correcto para despliegue porque no requiere interaccion.

## Revertir un cambio

Si la migracion todavia no se ha aplicado:

```bash
pnpm db:reset
```

Borra la base de datos, reaplica todas las migraciones y vuelve a ejecutar la
semilla. Es destructivo: nunca lo ejecutes contra produccion.

Si la migracion ya se aplico, crea una nueva migracion que revierta el
cambio. Borrar una migracion aplicada deja el historial inconsistente con el
estado real de la base de datos.
