# File location: docs/reference/api.md

# File function: Referencia de los endpoints HTTP expuestos por la landing,

# detallando el metodo, la peticion, la respuesta, los codigos de estado y los

# errores de cada ruta, para poder integrar el formulario con otras sistemas.

# All Rights Reserved arodoo

# API HTTP

Todos los endpoints devuelven JSON. Las respuestas de error incluyen siempre
un campo `message` legible y, cuando procede, un `code` de dominio.

## `POST /api/leads`

Registra una solicitud de contacto del formulario de presupuesto.

### Peticion

```json
{
  "name": "Marta Alvarez",
  "email": "marta@example.com",
  "message": "Queremos una landing con escena 3D y animacion de scroll.",
  "company": "Atlas Capital",
  "phone": "+34 600 000 000",
  "budgetRange": "FROM_15K_TO_50K",
  "source": "website"
}
```

| Campo         | Tipo     | Obligatorio | Restricciones                                 |
| ------------- | -------- | ----------- | --------------------------------------------- |
| `name`        | `string` | Si          | 2 a 120 caracteres                            |
| `email`       | `string` | Si          | Formato de email valido, hasta 180 caracteres |
| `message`     | `string` | Si          | 20 a 4000 caracteres                          |
| `company`     | `string` | No          | Hasta 120 caracteres                          |
| `phone`       | `string` | No          | Hasta 40 caracteres                           |
| `budgetRange` | `string` | No          | Uno de los valores del enum `BudgetRange`     |
| `source`      | `string` | No          | Hasta 60 caracteres                           |

### Valores de `budgetRange`

| Valor             | Significado                         |
| ----------------- | ----------------------------------- |
| `UNDER_5K`        | Menos de 5.000 EUR                  |
| `FROM_5K_TO_15K`  | Entre 5.000 y 15.000 EUR            |
| `FROM_15K_TO_50K` | Entre 15.000 y 50.000 EUR           |
| `OVER_50K`        | Mas de 50.000 EUR                   |
| `UNKNOWN`         | Sin especificar (valor por defecto) |

El enum se acepta en cualquier caja: `under_5k` se normaliza a `UNDER_5K`.

### Respuestas

| Codigo | Situacion                             | Cuerpo                                                                |
| ------ | ------------------------------------- | --------------------------------------------------------------------- |
| `201`  | Lead creado                           | `{ "message": "Solicitud recibida", "id": "uuid" }`                   |
| `400`  | El cuerpo no es JSON valido           | `{ "message": "El cuerpo de la peticion no es JSON valido" }`         |
| `409`  | Ya existe una solicitud con ese email | `{ "message": "...", "code": "CONFLICT" }`                            |
| `422`  | Los datos no superan la validacion    | `{ "message": "Los datos enviados no son validos", "issues": [...] }` |

El cuerpo del error `422` incluye el detalle campo a campo:

```json
{
  "message": "Los datos enviados no son validos",
  "issues": [
    {
      "path": "message",
      "message": "Too small: expected string to have >=20 characters"
    }
  ]
}
```

### Restricciones de negocio

- El email se normaliza a minusculas antes de compararse.
- Un email duplicado devuelve `409` y **no** sobrescribe la solicitud
  existente.
- El `name` debe tener al menos 2 caracteres tras recortar espacios.
- El `budgetRange` se valida contra el enum; un valor desconocido devuelve
  `422`.

### Ejemplo

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Marta Alvarez",
    "email": "marta@example.com",
    "message": "Queremos una landing con escena 3D y animacion de scroll."
  }'
```

## `GET /api/health`

Comprueba la conectividad del servidor con PostgreSQL. Pensado para el
orquestador de despliegue y el balanceador de carga.

### Respuestas

| Codigo | Situacion                 | Cuerpo                                                             |
| ------ | ------------------------- | ------------------------------------------------------------------ |
| `200`  | Base de datos accesible   | `{ "status": "ok", "database": "up", "timestamp": "..." }`         |
| `503`  | Base de datos inaccesible | `{ "status": "degraded", "database": "down", "timestamp": "..." }` |

La ruta es dinamica (`force-dynamic`): nunca se cachea.

```bash
curl http://localhost:3000/api/health
```

## Rutas de la pagina

| Ruta                | Tipo   | Descripcion                                                                      |
| ------------------- | ------ | -------------------------------------------------------------------------------- |
| `/`                 | Pagina | Landing completa. Renderizada de forma estatica con revalidacion cada 5 minutos. |
| `/ruta-inexistente` | 404    | Pagina de error con enlace de vuelta al inicio.                                  |

## Notas de implementacion

- Ambos endpoints corren en el runtime de Node (`export const runtime = "nodejs"`),
  necesario para el driver adapter de Prisma.
- La validacion de Zod en el borde y la del dominio en la capa de aplicacion
  son independientes y complementarias: la primera da respuestas HTTP
  precisas, la segunda protege las reglas de negocio.
- Los errores se registran con Pino. Las respuestas nunca incluyen trazas ni
  detalles internos.
