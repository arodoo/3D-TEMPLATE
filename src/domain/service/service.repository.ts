/**
 * File location: src/domain/service/service.repository.ts
 * File function:
 * Declara el contrato del puerto de lectura del catalogo de servicios,
 * permitiendo a la capa de aplicacion obtener las servicios publicadas sin
 * acoplarse a la tecnologia de persistencia subyacente.
 * All Rights Reserved arodoo
 */
import type { Service } from "./service.entity";

export interface ServiceRepository {
  listPublished(): Promise<Service[]>;
  findBySlug(slug: string): Promise<Service | null>;
}
