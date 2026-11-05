/**
 * File location: prisma/seed/data.ts
 * File function:
 * Define los datos de referencia que la semilla inserta en la base de datos de
 * la landing, incluyendo el catalogo de servicios ofertados, el portfolio de
 * proyectos realizados y los testimonios de clientes publicados.
 * All Rights Reserved arodoo
 */
export interface ServiceSeed {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  priceFrom: number;
  sortOrder: number;
}

export interface ProjectSeed {
  slug: string;
  title: string;
  client: string;
  summary: string;
  description: string;
  stack: string[];
  sortOrder: number;
  isFeatured: boolean;
}

export interface TestimonialSeed {
  author: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  sortOrder: number;
}

export const services: ServiceSeed[] = [
  {
    slug: "webgl-experiences",
    title: "Experiencias WebGL",
    tagline: "Escenas 3D en tiempo real",
    description:
      "Experiencias tridimensionales optimizadas para el navegador, con shaders, " +
      "fisica y navegacion fluida entre dispositivos.",
    icon: "cube",
    priceFrom: 4500,
    sortOrder: 1,
  },
  {
    slug: "scroll-animation",
    title: "Animacion de Scroll",
    tagline: "Narrativa que reacciona al scroll",
    description:
      "Secuencias narrativas orquestadas con GSAP y ScrollTrigger que guian la " +
      "atencion y elevan la percepcion de valor de la marca.",
    icon: "scroll",
    priceFrom: 2800,
    sortOrder: 2,
  },
  {
    slug: "interactive-site",
    title: "Sitio Interactivo",
    tagline: "Landing que responde al usuario",
    description:
      "Landing pages de alto rendimiento con micro interacciones, transiciones de " +
      "pagina y arquitectura orientada a convertir.",
    icon: "cursor",
    priceFrom: 2200,
    sortOrder: 3,
  },
];

export const projects: ProjectSeed[] = [
  {
    slug: "atlas-finance",
    title: "Atlas Finance",
    client: "Atlas Capital",
    summary: "Dashboard 3D de carteras de inversion en tiempo real.",
    description:
      "Visualizacion WebGL de datos de mercado con navegacion orbital y " +
      "transiciones suaves entre carteras.",
    stack: ["Next.js", "Three.js", "GSAP", "PostgreSQL"],
    sortOrder: 1,
    isFeatured: true,
  },
  {
    slug: "nova-mobility",
    title: "Nova Mobility",
    client: "Nova Fleet",
    summary: "Configurador visual de vehiculos electricos.",
    description:
      "Configurador 3D con personalizacion de pintura, llantas y equipajes en " +
      "tiempo real sobre el navegador.",
    stack: ["Next.js", "React Three Fiber", "Zustand"],
    sortOrder: 2,
    isFeatured: true,
  },
];

export const testimonials: TestimonialSeed[] = [
  {
    author: "Marta Alvarez",
    role: "Directora de Marketing",
    company: "Atlas Capital",
    quote:
      "El sitio multiplico la duracion de la sesion y nuestras solicitudes " +
      "cualificadas se triplicaron en el primer trimestre.",
    rating: 5,
    sortOrder: 1,
  },
  {
    author: "Diego Ferrer",
    role: "CEO",
    company: "Nova Fleet",
    quote:
      "La calidad visual supero nuestras expectativas y el equipo entrego a " +
      "tiempo un producto que dispara las conversiones del configurador.",
    rating: 5,
    sortOrder: 2,
  },
];
