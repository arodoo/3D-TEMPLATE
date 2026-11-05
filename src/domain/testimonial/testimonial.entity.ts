/**
 * File location: src/domain/testimonial/testimonial.entity.ts
 * File function:
 * Define la entidad Testimonial del dominio, que representa una cita de cliente
 * mostrada en la seccion de confianzas, con su autor, cargo, valoracion y el
 * control de publicacion que decide si aparece en la landing.
 * All Rights Reserved arodoo
 */
import { ValidationError } from "../shared/errors";

export interface TestimonialProps {
  readonly id: string;
  readonly author: string;
  readonly role: string;
  readonly company: string;
  readonly quote: string;
  readonly avatarUrl: string | null;
  readonly rating: number;
  readonly sortOrder: number;
  readonly isShown: boolean;
}

const MIN_QUOTE_LENGTH = 30;
const MAX_RATING = 5;

export class Testimonial {
  private constructor(private readonly props: TestimonialProps) {}

  static create(input: {
    author: string;
    role: string;
    company: string;
    quote: string;
    rating?: number;
    sortOrder?: number;
  }): Testimonial {
    const quote = input.quote.trim();
    const rating = input.rating ?? MAX_RATING;

    if (quote.length < MIN_QUOTE_LENGTH) {
      throw new ValidationError(
        `La cita debe tener al menos ${MIN_QUOTE_LENGTH} caracteres`,
        { minimum: MIN_QUOTE_LENGTH },
      );
    }

    if (rating < 1 || rating > MAX_RATING) {
      throw new ValidationError(
        `La valoracion debe estar entre 1 y ${MAX_RATING} estrellas`,
        { rating },
      );
    }

    return new Testimonial({
      id: crypto.randomUUID(),
      author: input.author.trim(),
      role: input.role.trim(),
      company: input.company.trim(),
      quote,
      avatarUrl: null,
      rating,
      sortOrder: input.sortOrder ?? 0,
      isShown: true,
    });
  }

  static restore(props: TestimonialProps): Testimonial {
    return new Testimonial(props);
  }

  get id(): string {
    return this.props.id;
  }

  get author(): string {
    return this.props.author;
  }

  get role(): string {
    return this.props.role;
  }

  get company(): string {
    return this.props.company;
  }

  get quote(): string {
    return this.props.quote;
  }

  get avatarUrl(): string | null {
    return this.props.avatarUrl;
  }

  get rating(): number {
    return this.props.rating;
  }

  get sortOrder(): number {
    return this.props.sortOrder;
  }

  get isShown(): boolean {
    return this.props.isShown;
  }
}
