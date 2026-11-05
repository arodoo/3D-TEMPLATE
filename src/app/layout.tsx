/**
 * File location: src/app/layout.tsx
 * File function:
 * Layout raiz del App Router que declara el documento HTML, los metadatos de
 * SEO y Open Graph de la landing, las tipografias Geist optimizadas por Next.js
 * y el montaje de los proveedores globales de tema, consulta y animacion que
 * requieres toda la aplicacion.
 * All Rights Reserved arodoo
 */
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppProviders } from "@/presentation/providers/app-providers";
import { serverEnv } from "@/infrastructure/env";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(serverEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Estudio Vector | Paginas web animadas e interactivas",
    template: "%s | Estudio Vector",
  },
  description:
    "Estudio especializado en paginas web animadas e interactivas: " +
    "experiencias WebGL, narrativa de scroll y landing de alto rendimiento.",
  keywords: [
    "desarrollo web",
    "webgl",
    "three.js",
    "animacion web",
    "gsap",
    "landing page",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Estudio Vector",
    title: "Estudio Vector | Paginas web animadas e interactivas",
    description:
      "Experiencias 3D y animadas de alto rendimiento para marcas que " +
      "necesitan destacar en internet.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estudio Vector",
    description:
      "Paginas web animadas e interactivas construidas con WebGL y GSAP.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05060a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fontVariables = `${geistSans.variable} ${geistMono.variable}`;

  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="min-h-full bg-surface text-ink">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
