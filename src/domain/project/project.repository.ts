/**
 * File location: src/domain/project/project.repository.ts
 * File function:
 * Declara el contrato del puerto de lectura del portfolio de proyectos,
 * exponiendo las operaciones de listado y detalle que la landing necesita sin
 * exponer detalles del repositorio de persistencia utilizado.
 * All Rights Reserved arodoo
 */
import type { Project } from "./project.entity";

export interface ProjectRepository {
  listPublished(): Promise<Project[]>;
  listFeatured(): Promise<Project[]>;
  findBySlug(slug: string): Promise<Project | null>;
}
