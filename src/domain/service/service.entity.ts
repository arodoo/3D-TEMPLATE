/**
 * File location: src/domain/service/service.entity.ts
 * File function:
 * Define la entidad Service del dominio, que representa una linea de servicio
 * ofrecida por el estudio con su nombre, descripcion, icono y precio
 * orientativo, encapsulate las reglas de presentacion y ordenacion del catalogo
 * de servicios de la landing.
 * All Rights Reserved arodoo
 */
import { ValidationError } from "../shared/errors";

export interface ServiceProps {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly icon: string;
  readonly priceFrom: number | null;
  readonly currency: string;
  readonly sortOrder: number;
  readonly isPublished: boolean;
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class Service {
  private constructor(private readonly props: ServiceProps) {}

  static create(input: {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    icon: string;
    priceFrom?: number | null;
    currency?: string;
    sortOrder?: number;
  }): Service {
    const slug = input.slug.trim().toLowerCase();

    if (!SLUG_PATTERN.test(slug)) {
      throw new ValidationError(
        "El slug debe estar en kebab-case y solo contener letras y digitos",
        { slug },
      );
    }

    if (input.title.trim().length < 3) {
      throw new ValidationError("El titulo del servicio es demasiado corto");
    }

    return new Service({
      id: crypto.randomUUID(),
      slug,
      title: input.title.trim(),
      tagline: input.tagline.trim(),
      description: input.description.trim(),
      icon: input.icon.trim(),
      priceFrom: input.priceFrom ?? null,
      currency: input.currency ?? "EUR",
      sortOrder: input.sortOrder ?? 0,
      isPublished: true,
    });
  }

  static restore(props: ServiceProps): Service {
    return new Service(props);
  }

  get id(): string {
    return this.props.id;
  }

  get slug(): string {
    return this.props.slug;
  }

  get title(): string {
    return this.props.title;
  }

  get tagline(): string {
    return this.props.tagline;
  }

  get description(): string {
    return this.props.description;
  }

  get icon(): string {
    return this.props.icon;
  }

  get priceFrom(): number | null {
    return this.props.priceFrom;
  }

  get currency(): string {
    return this.props.currency;
  }

  get sortOrder(): number {
    return this.props.sortOrder;
  }

  get isPublished(): boolean {
    return this.props.isPublished;
  }
}
