import type { Metadata, Viewport } from "next";
import "./globals.css";
import { expressway, inter, jetbrainsMono } from "@/lib/fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/data/site";
import { graph, logoImage, organization, website } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  keywords: [
    "transport audiovisuel",
    "transport événementiel",
    "course urgente Paris",
    "transport exclusif",
    "logistique cinéma",
    "transport 24/7",
    "Île-de-France",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  /**
   * `max-snippet: -1` autorise Google à extraire un extrait de longueur
   * illimitée. C'est la condition technique pour être éligible à une citation
   * dans les AI Overviews et l'AI Mode : ces réponses sont construites à
   * partir de l'index de recherche classique, et une page qui limite ses
   * snippets (`nosnippet`, `max-snippet:0`) s'en exclut elle-même.
   */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0908",
  width: "device-width",
  initialScale: 1,
};

/**
 * Socle du graphe schema.org, présent sur toutes les pages : l'entreprise et
 * le site. Chaque page y ajoute ses propres nœuds (WebPage, Service, FAQPage…)
 * qui référencent ces `@id` — voir `src/lib/schema.ts`.
 */
const siteGraph = graph(organization(), website(), logoImage());

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${expressway.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <JsonLd data={siteGraph} />
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
