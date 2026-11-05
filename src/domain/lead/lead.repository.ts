/**
 * File location: src/domain/lead/lead.repository.ts
 * File function:
 * Declara el contrato del puerto de persistencia del agregado Lead, abstraendo
 * por completo el motor de base de datos para que la capa de aplicacion dependa
 * solo de esta interfaz y no de Prisma ni de PostgreSQL.
 * All Rights Reserved arodoo
 */
import type { Lead, LeadStatus } from "./lead.entity";

export interface LeadRepository {
  save(lead: Lead): Promise<void>;
  findByEmail(email: string): Promise<Lead | null>;
  findById(id: string): Promise<Lead | null>;
  list(status?: LeadStatus, limit?: number): Promise<Lead[]>;
}
