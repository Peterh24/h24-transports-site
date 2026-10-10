import type { Metadata, Viewport } from "next";
import "./globals.css";
import { expressway, inter, jetbrainsMono } from "@/lib/fonts";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics } from "@/components/analytics/Analytics";
import { SITE } from "@/data/site";
import { graph, logoImage, organization, website } from "@/lib/schema";

/**
 * Libellé d'environnement résolu au build (voir `next.config.ts`) : vide en
 * production. Ailleurs, pastille visible, préfixe dans le titre de l'onglet
 * et barre d'état orange.
 */
const ENV_LABEL = process.env.NEXT_PUBLIC_ENV_LABEL ?? "";
const TITLE_PREFIX = ENV_LABEL ? "[DEV] " : "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${TITLE_PREFIX}${SITE.name} — ${SITE.tagline}`,
    template: `${TITLE_PREFIX}%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  /**
   * Pas de `keywords` : Google ne l'exploite plus depuis 2009 et l'a confirmé
   * publiquement. Les mots-clés qui comptent sont ceux du contenu visible, des
   * titres et du `knowsAbout` de l'organisation (cf. `src/lib/schema.ts`).
   */
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
  themeColor: ENV_LABEL ? "#E8590C" : "#0A0908",
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
        <Analytics />
        {ENV_LABEL && (
          <div className="env-badge" role="status" data-testid="env-badge">
            {ENV_LABEL}
          </div>
        )}
      </body>
    </html>
  );
}
