/**
 * File location: src/app/page.tsx
 * File function:
 * Pagina principal de la landing que compone las secciones de bienvenida,
 * servicios, trabajos, proceso, testimonios y contacto,ademas de obtener los
 * datos dinamicos desde PostgreSQL mediante los casos de uso del contenedor de
 * dependencias con una unica consulta paralela por catalogo.
 * All Rights Reserved arodoo
 */
import {
  getListProjectsUseCase,
  getListServicesUseCase,
  getListTestimonialsUseCase,
} from "@/infrastructure/container";
import { ContactSection } from "@/presentation/sections/contact/contact-section";
import { HeroSection } from "@/presentation/sections/hero/hero-section";
import { ProcessSection } from "@/presentation/sections/content/process-section";
import { ProjectsSection } from "@/presentation/sections/content/projects-section";
import { ServicesSection } from "@/presentation/sections/content/services-section";
import { SiteFooter } from "@/presentation/sections/layout/site-footer";
import { SiteHeader } from "@/presentation/sections/layout/site-header";
import { TestimonialsSection } from "@/presentation/sections/content/testimonials-section";

export const revalidate = 300;

export default async function HomePage() {
  const [services, projects, testimonials] = await Promise.all([
    getListServicesUseCase().execute(),
    getListProjectsUseCase().execute(),
    getListTestimonialsUseCase().execute(),
  ]);

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection services={services} />
        <ProjectsSection projects={projects} />
        <ProcessSection />
        <TestimonialsSection testimonials={testimonials} />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
