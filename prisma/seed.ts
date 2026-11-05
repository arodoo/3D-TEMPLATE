/**
 * File location: prisma/seed.ts
 * File function:
 * Ejecutor de la semilla de datos de la landing, que inserta de forma
 * idempotente el catalogo de servicios, el portfolio de proyectos, los
 * testimonios de clientes y los ajustes de configuracion del sitio, cerrando
 * siempre la conexion con el pool de PostgreSQL al finalizar la ejecucion.
 * All Rights Reserved arodoo
 */
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { projects, services, testimonials } from "./seed/data";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });

const settings = [
  { key: "brand.name", value: { text: "Estudio Vector" }, group: "brand" },
  {
    key: "contact.email",
    value: { text: "hola@estudiovector.dev" },
    group: "contact",
  },
  {
    key: "social.links",
    value: { links: ["https://github.com", "https://linkedin.com"] },
    group: "social",
  },
];

async function seedServices(): Promise<void> {
  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }
}

async function seedProjects(): Promise<void> {
  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
}

async function seedTestimonials(): Promise<void> {
  for (const testimonial of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: {
        author: testimonial.author,
        company: testimonial.company,
      },
    });

    if (!existing) {
      await prisma.testimonial.create({ data: testimonial });
    }
  }
}

async function seedSettings(): Promise<void> {
  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: setting,
      create: setting,
    });
  }
}

async function main(): Promise<void> {
  await seedServices();
  await seedProjects();
  await seedTestimonials();
  await seedSettings();
  console.info("Seed completado: servicios, proyectos, testimonios y ajustes.");
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
