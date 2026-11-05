# Docs

Documentación técnica del proyecto. Sigue el estándar **Diátaxis** para
organización y nomenclatura: cada documento vive en **un solo modo**,
agrupado por la intención del lector, no por tema.

## Estándar Diátaxis (obligatorio para todo archivo en `**/docs/`)

| Modo            | Carpeta        | Pregunta que responde    | Estilo                                            |
| --------------- | -------------- | ------------------------ | ------------------------------------------------- |
| **Explanation** | `explanation/` | "¿Por qué es así?"       | Discusión, decisiones, historia, trade-offs.      |
| **How-to**      | `how-to/`      | "¿Cómo hago X?"          | Pasos numerados, recetas, comandos.               |
| **Reference**   | `reference/`   | "¿Qué es exactamente Y?" | Lookup puro, tablas, definiciones. Sin narrativa. |
| **Tutorial**    | `tutorials/`   | "¿Cómo aprendo?"         | Learning paths guidos.                            |

### Reglas de nomenclatura y estilo

1. **Un modo por archivo.** Si un doc mezcla explanation + reference,
   partirlo. Cada archivo debe poder leerse sin leer los otros.
2. **Nombre estable, ruta explícita.** El nombre del archivo describe el tema.
3. **Idioma.** Español, con los terminos tecnicos en ingles cuando son el
   nombre real de la API o del comando.
4. **Encabezado.** Los archivos `.md` de `docs/` no llevan el bloque de
   copyright reservado al codigo fuente.

## Indice

### Explanation

| Documento                                                | Contenido                                                |
| -------------------------------------------------------- | -------------------------------------------------------- |
| [`architecture.md`](explanation/architecture.md)         | Capas, decisiones tecnicas y sus trade-offs.             |
| [`testing-strategy.md`](explanation/testing-strategy.md) | Por que hay dos niveles de pruebas y que cubre cada uno. |

### How-to

| Documento                                                       | Contenido                                         |
| --------------------------------------------------------------- | ------------------------------------------------- |
| [`local-setup.md`](how-to/local-setup.md)                       | Preparar el entorno de desarrollo desde cero.     |
| [`add-a-section.md`](how-to/add-a-section.md)                   | Anadir una seccion nueva a la landing.            |
| [`change-database-schema.md`](how-to/change-database-schema.md) | Modificar modelos, migraciones y capas afectadas. |

### Reference

| Documento                                                        | Contenido                                       |
| ---------------------------------------------------------------- | ----------------------------------------------- |
| [`technology-stack.md`](reference/technology-stack.md)           | Versiones exactas de cada dependencia y motivo. |
| [`environment-variables.md`](reference/environment-variables.md) | Variables de entorno, tipos y consecuencias.    |
| [`api.md`](reference/api.md)                                     | Endpoints HTTP, contratos y codigos de estado.  |

### Tutorials

Carpeta reservada para recorridos de aprendizaje guiados. Se poblara cuando
exista contenido didactico que lo justifique; un tutorial vacio es peor que
ninguno.
