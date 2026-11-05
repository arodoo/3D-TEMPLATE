/**
 * File location: src/application/service/list-services.use-case.ts
 * File function:
 * Caso de uso que obtiene el catalogo de servicios publicados y lo proyecta a
 * una vista de presentacion estable, desacoplando la forma de la entidad de
 * dominio del contrato que consumen los componentes de la landing.
 * All Rights Reserved arodoo
 */
import type { ServiceRepository } from "@/domain/service/service.repository";

export interface ServiceView {
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly icon: string;
  readonly priceFrom: number | null;
  readonly currency: string;
}

export class ListServicesUseCase {
  constructor(private readonly serviceRepository: ServiceRepository) {}

  async execute(): Promise<ServiceView[]> {
    const services = await this.serviceRepository.listPublished();

    return services.map((service) => ({
      slug: service.slug,
      title: service.title,
      tagline: service.tagline,
      description: service.description,
      icon: service.icon,
      priceFrom: service.priceFrom,
      currency: service.currency,
    }));
  }
}
