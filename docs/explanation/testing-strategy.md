# File location: docs/explanation/testing-strategy.md

# File function: Explica el enfoque de pruebas del proyecto, justificando la

# division entre pruebas unitarias y end to end, los criterios de seleccion de

# cada escenario, el tratamiento de la base de datos real y las reglas de

# cobertura para evitar la prolificidad de pruebas sin valor.

# All Rights Reserved arodoo

# Estrategia de pruebas

## Principio rector

> Prioriza el alcance. Cubre los caminos criticos y lo que un usuario real
> hace, no cada rama interna del codigo.

Una suite que sube la cobertura sin detectar un solo fallo real es ruido con
coste de mantenimiento. Por eso el proyecto divide el esfuerzo en dos niveles
con criterios de entrada distintos.

## Pruebas unitarias (Vitest)

**Que cubren**: el dominio y la capa de aplicacion.

**Por que aqui**: las reglas de negocio son donde un error cuesta dinero. Un
presupuesto mal validado, un email duplicado que sobrescribe una solicitud
anterior o un slug mal formado se traducen en problemas reales.

**Como**: los casos de uso se prueban con repositorios en memoria que
implementan los puertos del dominio. No hay base de datos, ni red, ni esperas.
Cada test corre en milisegundos.

```ts
const repository = new InMemoryLeadRepository();
const useCase = new CreateLeadUseCase(repository);
const result = await useCase.execute(input);
expect(result.ok).toBe(false);
```

**Que se verifica**:

- Las invariantes de cada entidad (validaciones, normalizacion, valores por
  defecto).
- Las transiciones de estado del caso de uso (exito, conflicto, validacion).
- La proyeccion de la entidad de dominio a la vista de presentacion.
- Las funciones utilitarias puras (`Result`, reloj).

**Que NO se verifica aqui**: la interaccion con el DOM. Un componente que
renderiza una lista de servicios con un repositorio en memoria no aporta
confianza sobre si el click llega al servidor.

## Pruebas end to end (Playwright)

**Que cubren**: los recorridos que solo fallan con el sistema completo.

**Por que aqui**: hay al menos cuatro capas donde un fallo puede ser invisible
para los tests unitarios:

1. **La hidratacion**. Un HTML renderizado en servidor sin JavaScript funciona
   en el curl pero no en el navegador.
2. **La serializacion RSC**. Los Server Components cruzan un limite de red
   con un formato propio.
3. **La validacion del endpoint**. Zod en el servidor puede diferir de las
   reglas del dominio.
4. **La persistencia real**. La restriccion `UNIQUE` sobre `leads.email` es la
   ultima linea de defensa del duplicado y solo existe en PostgreSQL.

**Escenarios cubiertos**:

| Escenario                        | Que valida                                               |
| -------------------------------- | -------------------------------------------------------- |
| Carga de la pagina               | Las seis secciones se renderizan con datos reales        |
| Servicios desde la base de datos | El contenido llega del servidor a la vista               |
| Navegacion por anclas            | El menu funciona tras la hidratacion                     |
| Endpoint de salud                | La conectividad con PostgreSQL esta viva                 |
| Ruta inexistente                 | El 404 se renderiza correctamente                        |
| Mensaje invalido                 | El endpoint devuelve 422 con el detalle de la incidencia |
| Solicitud valida                 | Se escribe en PostgreSQL y se confirma al usuario        |
| Email duplicado                  | Se devuelve 409 en lugar de sobrescribir                 |

**Navegadores**: Chromium, Firefox y WebKit. El motor de renderizado cambia el
comportamiento de WebGL, del scroll y de las animaciones; probar en los tres
es la unica forma de detectar regresiones de renderizado.

## Base de datos en las pruebas

Las pruebas end to end usan una **base de datos real**, no un mock. Es
deliberado:

- Un mock de repositorio no puede detectar un error de SQL, un indice mal
  definido o una diferencia en el mapeo de enums.
- La migracion se aplica de forma no interactiva (`prisma migrate deploy`)
  sobre la misma version de PostgreSQL que se usara en produccion.

La semilla de datos (`prisma/seed.ts`) se ejecuta antes de la suite para que
el catalogo de servicios, el portfolio y los testimonios esten disponibles.

## Aislamiento de las pruebas

Cada test end to end que escribe en la base de datos usa un **email unico
generado con `Date.now()`**. Esto evita que un test dependa del estado que
dejo otro y permite ejecutarlos en paralelo sin conflictos.

La prueba de duplicado crea primero el registro mediante una peticion `POST`
directa a la API y luego comprueba que el formulario recibe el conflicto. De
esa forma el test es autosuficiente y no depende del orden de ejecucion.

## Cobertura

El umbral de cobertura se aplica **solo** a `src/domain` y `src/application`:

```json
"thresholds": { "lines": 80, "functions": 80, "branches": 75, "statements": 80 }
```

No se mide la cobertura de los componentes React. La justificacion es que un
componente de presentacion correctamente renderizado tiene un valor de prueba
muy inferior a su coste, y que medirlo empuja a escribir tests que verifican
detalles de implementacion en lugar de comportamiento.

Cuando el codigo de la capa de presentacion contenga logica de negocio real
(un formateador, un calculo, una maquina de estados), ese codigo debe moverse
al dominio y entrar en el ambito de cobertura.

## Anti-patrones avoided

| Anti-patron                            | Por que se evita                                                |
| -------------------------------------- | --------------------------------------------------------------- |
| Test que comprueba la implementacion   | Un refactor legitimo lo rompe sin que cambie el comportamiento. |
| Mock de la base de datos completa      | Oculta los errores de SQL y de esquema.                         |
| Snapshots de HTML completos            | Son ilegibles y fallan con cualquier cambio cosmético.          |
| Test que espera un tiempo fijo         | Introduce flakes. Se espera por condicion, no por reloj.        |
| Test unitario de un componente trivial | Duplica lo que un test end to end ya cubre mejor.               |
