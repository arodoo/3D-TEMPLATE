/**
 * File location: src/domain/project/project.entity.ts
 * File function:
 * Define la entidad Project del dominio, que representa un caso de exito del
 * estudio con su ficha tecnica, stack de tecnologias, metricas de impacto y
 * enlaces publicos, con las invariantes de slug y metrica nonnegative.
 * All Rights Reserved arodoo
 */
import { ValidationError } from "../shared/errors";

export interface ProjectMetrics {
  readonly loadTimeMs?: number;
  readonly conversionLift?: number;
  readonly engagementLift?: number;
}

export interface ProjectProps {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly client: string;
  readonly summary: string;
  readonly description: string;
  readonly coverUrl: string | null;
  readonly liveUrl: string | null;
  readonly repoUrl: string | null;
  readonly stack: readonly string[];
  readonly metrics: ProjectMetrics | null;
  readonly sortOrder: number;
  readonly isFeatured: boolean;
  readonly isPublished: boolean;
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export class Project {
  private constructor(private readonly props: ProjectProps) {}

  static create(input: {
    slug: string;
    title: string;
    client: string;
    summary: string;
    description: string;
    stack?: readonly string[];
    metrics?: ProjectMetrics | null;
    sortOrder?: number;
  }): Project {
    const slug = input.slug.trim().toLowerCase();

    if (!SLUG_PATTERN.test(slug)) {
      throw new ValidationError("El slug del proyecto no es valido", { slug });
    }

    if (input.title.trim().length < 3) {
      throw new ValidationError("El titulo del proyecto es demasiado corto");
    }

    return new Project({
      id: crypto.randomUUID(),
      slug,
      title: input.title.trim(),
      client: input.client.trim(),
      summary: input.summary.trim(),
      description: input.description.trim(),
      coverUrl: null,
      liveUrl: null,
      repoUrl: null,
      stack: input.stack ?? [],
      metrics: input.metrics ?? null,
      sortOrder: input.sortOrder ?? 0,
      isFeatured: false,
      isPublished: true,
    });
  }

  static restore(props: ProjectProps): Project {
    return new Project(props);
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

  get client(): string {
    return this.props.client;
  }

  get summary(): string {
    return this.props.summary;
  }

  get description(): string {
    return this.props.description;
  }

  get coverUrl(): string | null {
    return this.props.coverUrl;
  }

  get liveUrl(): string | null {
    return this.props.liveUrl;
  }

  get repoUrl(): string | null {
    return this.props.repoUrl;
  }

  get stack(): readonly string[] {
    return this.props.stack;
  }

  get metrics(): ProjectMetrics | null {
    return this.props.metrics;
  }

  get sortOrder(): number {
    return this.props.sortOrder;
  }

  get isFeatured(): boolean {
    return this.props.isFeatured;
  }

  get isPublished(): boolean {
    return this.props.isPublished;
  }
}
