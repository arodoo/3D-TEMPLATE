/**
 * File location: src/infrastructure/container.ts
 * File function:
 * Contenedor de dependencias de la aplicacion, que instancia los adaptadores de
 * Prisma y los casos de uso una unica vez y los expone mediante funciones de
 * acceso, evitando duplicar conexiones al pool y centralizando el cableado de
 * las dependencias invertidas del proyecto.
 * All Rights Reserved arodoo
 */
import "server-only";
import { CreateLeadUseCase } from "@/application/lead/create-lead.use-case";
import { ListLeadsUseCase } from "@/application/lead/list-leads.use-case";
import { ListProjectsUseCase } from "@/application/project/list-projects.use-case";
import { ListServicesUseCase } from "@/application/service/list-services.use-case";
import { ListTestimonialsUseCase } from "@/application/testimonial/list-testimonials.use-case";
import { prisma } from "./prisma/prisma.client";
import { LeadPrismaRepository } from "./prisma/lead-prisma.repository";
import { ProjectPrismaRepository } from "./prisma/project-prisma.repository";
import { ServicePrismaRepository } from "./prisma/service-prisma.repository";
import { TestimonialPrismaRepository } from "./prisma/testimonial-prisma.repository";

let leadRepository: LeadPrismaRepository | undefined;
let serviceRepository: ServicePrismaRepository | undefined;
let projectRepository: ProjectPrismaRepository | undefined;
let testimonialRepository: TestimonialPrismaRepository | undefined;

function getLeadRepository(): LeadPrismaRepository {
  leadRepository ??= new LeadPrismaRepository(prisma);
  return leadRepository;
}

export function getCreateLeadUseCase(): CreateLeadUseCase {
  return new CreateLeadUseCase(getLeadRepository());
}

export function getListLeadsUseCase(): ListLeadsUseCase {
  return new ListLeadsUseCase(getLeadRepository());
}

export function getListServicesUseCase(): ListServicesUseCase {
  serviceRepository ??= new ServicePrismaRepository(prisma);
  return new ListServicesUseCase(serviceRepository);
}

export function getListProjectsUseCase(): ListProjectsUseCase {
  projectRepository ??= new ProjectPrismaRepository(prisma);
  return new ListProjectsUseCase(projectRepository);
}

export function getListTestimonialsUseCase(): ListTestimonialsUseCase {
  testimonialRepository ??= new TestimonialPrismaRepository(prisma);
  return new ListTestimonialsUseCase(testimonialRepository);
}
