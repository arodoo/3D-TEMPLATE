/**
 * File location: src/domain/lead/lead.entity.ts
 * File function:
 * Define la entidad Lead del dominio de la landing, que representa una
 * solicitud de contacto recibida desde el formulario de presupuesto, con sus
 * invariantes de negocio sobre email, longitud del mensaje y ciclo de vida
 * comercial del prospecto.
 * All Rights Reserved arodoo
 */
import { ValidationError } from "../shared/errors";

export const LEAD_STATUSES = [
  "NEW",
  "IN_REVIEW",
  "CONTACTED",
  "QUALIFIED",
  "WON",
  "LOST",
  "SPAM",
] as const;

export const BUDGET_RANGES = [
  "UNDER_5K",
  "FROM_5K_TO_15K",
  "FROM_15K_TO_50K",
  "OVER_50K",
  "UNKNOWN",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type BudgetRange = (typeof BUDGET_RANGES)[number];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_MESSAGE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 4000;

export interface LeadProps {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly company: string | null;
  readonly phone: string | null;
  readonly message: string;
  readonly budgetRange: BudgetRange;
  readonly status: LeadStatus;
  readonly source: string;
  readonly createdAt: Date;
}

export class Lead {
  private constructor(private readonly props: LeadProps) {}

  static create(input: {
    name: string;
    email: string;
    message: string;
    company?: string | null;
    phone?: string | null;
    budgetRange?: BudgetRange;
    source?: string;
  }): Lead {
    const name = input.name.trim();
    const email = input.email.trim().toLowerCase();
    const message = input.message.trim();

    if (name.length < 2) {
      throw new ValidationError("El nombre debe tener al menos 2 caracteres");
    }

    if (!EMAIL_PATTERN.test(email)) {
      throw new ValidationError("El email no tiene un formato valido");
    }

    if (message.length < MIN_MESSAGE_LENGTH) {
      throw new ValidationError(
        `El mensaje debe tener al menos ${MIN_MESSAGE_LENGTH} caracteres`,
        { minimum: MIN_MESSAGE_LENGTH },
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      throw new ValidationError(
        `El mensaje no puede superar ${MAX_MESSAGE_LENGTH} caracteres`,
        { maximum: MAX_MESSAGE_LENGTH },
      );
    }

    return new Lead({
      id: crypto.randomUUID(),
      name,
      email,
      company: input.company?.trim() || null,
      phone: input.phone?.trim() || null,
      message,
      budgetRange: input.budgetRange ?? "UNKNOWN",
      status: "NEW",
      source: input.source ?? "website",
      createdAt: new Date(),
    });
  }

  static restore(props: LeadProps): Lead {
    return new Lead(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get company(): string | null {
    return this.props.company;
  }

  get phone(): string | null {
    return this.props.phone;
  }

  get message(): string {
    return this.props.message;
  }

  get budgetRange(): BudgetRange {
    return this.props.budgetRange;
  }

  get status(): LeadStatus {
    return this.props.status;
  }

  get source(): string {
    return this.props.source;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
