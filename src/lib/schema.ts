/**
 * Données structurées schema.org — graphe d'entités du site.
 *
 * Pourquoi un `@graph` plutôt qu'un bloc JSON-LD par page : les moteurs
 * génératifs (AI Overviews / AI Mode de Google, ChatGPT Search, Perplexity)
 * ne se contentent plus de lire une page, ils reconstruisent une **entité**
 * « H24 Transports » et lui rattachent des faits. Des `@id` stables et
 * réutilisés d'une page à l'autre disent explicitement « c'est la même
 * entreprise », au lieu de laisser le moteur le deviner.
 *
 * Règle de contribution : on ne déclare ici QUE des faits déjà affichés
 * publiquement sur le site. Une donnée structurée qui contredit la page
 * visible est une violation des règles Google sur les données structurées.
 */

import { LEGAL, SITE, ZONES } from "@/data/site";

export type JsonLd = Record<string, unknown>;

/* ------------------------------------------------------------------ */
/* Identifiants stables du graphe                                      */
/* ------------------------------------------------------------------ */

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;
export const LOGO_ID = `${SITE.url}/#logo`;

/** Référence légère vers l'organisation, à réutiliser partout. */
export const ORG_REF = { "@id": ORG_ID } as const;

const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/** 24h/24, 7j/7 — l'argument central de la marque, donc balisé partout. */
const OPEN_24_7 = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ALL_DAYS,
  opens: "00:00",
  closes: "23:59",
};

/**
 * Zones desservies, typées finement (`City` / `AdministrativeArea` /
 * `Country`) : une simple chaîne « Paris » force le moteur à désambiguïser
 * lui-même entre la ville, le département et la région.
 */
export const AREA_SERVED = [
  { "@type": "City", name: "Paris" },
  { "@type": "AdministrativeArea", name: "Île-de-France" },
  { "@type": "Country", name: "France" },
];

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: SITE.address.street,
  postalCode: SITE.address.postalCode,
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  addressCountry: SITE.address.country,
};

/* ------------------------------------------------------------------ */
/* Entités racines                                                     */
/* ------------------------------------------------------------------ */

/**
 * Le logo, déclaré comme nœud de premier niveau du graphe plutôt qu'imbriqué
 * dans l'organisation : imbriqué, il reste du JSON-LD valide, mais les
 * consommateurs qui se contentent de parcourir le premier niveau du `@graph`
 * ne résolvent pas la référence `{"@id": ".../#logo"}`.
 */
export function logoImage(): JsonLd {
  return {
    "@type": "ImageObject",
    "@id": LOGO_ID,
    url: `${SITE.url}/opengraph-image`,
    contentUrl: `${SITE.url}/opengraph-image`,
    caption: SITE.name,
  };
}

/**
 * L'entreprise. `knowsAbout` est le champ le plus sous-estimé pour la
 * recherche générative : il énumère explicitement les domaines d'expertise
 * que le moteur peut rattacher à l'entité, au lieu de les inférer du texte.
 */
export function organization(): JsonLd {
  return {
    "@type": "LocalBusiness",
    "@id": ORG_ID,
    name: SITE.name,
    legalName: LEGAL.denomination,
    alternateName: "H24",
    slogan: SITE.tagline,
    description: SITE.description,
    url: SITE.url,
    /**
     * Identifiants officiels. C'est ce qui permet à un moteur de rapprocher
     * l'entité du site de son enregistrement au registre du commerce, au lieu
     * de traiter « H24 Transports, depuis 2014 » et la société immatriculée en
     * 2020 comme deux entités possiblement distinctes.
     */
    identifier: [
      { "@type": "PropertyValue", propertyID: "SIREN", value: LEGAL.siren },
      { "@type": "PropertyValue", propertyID: "SIRET", value: LEGAL.siret },
    ],
    vatID: LEGAL.vatNumber,
    taxID: LEGAL.siren,
    logo: { "@id": LOGO_ID },
    image: { "@id": LOGO_ID },
    telephone: SITE.phoneE164,
    email: SITE.email,
    foundingDate: String(SITE.founded),
    address: POSTAL_ADDRESS,
    areaServed: AREA_SERVED,
    openingHoursSpecification: OPEN_24_7,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: SITE.phoneE164,
        email: SITE.email,
        availableLanguage: ["fr", "en"],
        areaServed: "FR",
        hoursAvailable: OPEN_24_7,
      },
      {
        "@type": "ContactPoint",
        contactType: "emergency",
        name: "Dispatch 24/7",
        telephone: SITE.phoneE164,
        availableLanguage: ["fr", "en"],
        hoursAvailable: OPEN_24_7,
      },
    ],
    knowsAbout: [
      "Transport audiovisuel",
      "Logistique événementielle",
      "Transport de matériel caméra et lumière",
      "Transport urgent exclusif",
      "Coursier express Paris",
      "Livraison de plis, colis et palettes",
      "Transport dédié sans groupage",
      "Suivi de course en temps réel",
    ],
    ...(SITE.sameAs.length > 0 ? { sameAs: SITE.sameAs } : {}),
  };
}

/** Le site lui-même — rattaché à l'éditeur, ce que Google attend. */
export function website(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "fr-FR",
    publisher: ORG_REF,
  };
}

/* ------------------------------------------------------------------ */
/* Entités par page                                                    */
/* ------------------------------------------------------------------ */

export type Crumb = { name: string; path: string };

/**
 * Fil d'Ariane. Utile même sans breadcrumb visible : il donne au moteur la
 * position de la page dans l'arborescence, ce qui pèse dans le choix de la
 * page à citer.
 */
export function breadcrumb(path: string, trail: Crumb[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE.url}${path}#breadcrumb`,
    itemListElement: [{ name: "Accueil", path: "/" }, ...trail].map(
      (crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${SITE.url}${crumb.path === "/" ? "" : crumb.path}`,
      }),
    ),
  };
}

export function webPage(opts: {
  path: string;
  name: string;
  description: string;
  /** Date ISO de dernière révision éditoriale du contenu. */
  dateModified: string;
  hasBreadcrumb?: boolean;
}): JsonLd {
  const url = `${SITE.url}${opts.path === "/" ? "" : opts.path}`;
  return {
    "@type": "WebPage",
    "@id": `${SITE.url}${opts.path}#webpage`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: "fr-FR",
    isPartOf: { "@id": WEBSITE_ID },
    about: ORG_REF,
    publisher: ORG_REF,
    dateModified: opts.dateModified,
    primaryImageOfPage: { "@id": LOGO_ID },
    ...(opts.hasBreadcrumb === false
      ? {}
      : { breadcrumb: { "@id": `${SITE.url}${opts.path}#breadcrumb` } }),
  };
}

/**
 * Un service commercialisé. `Service` + `provider` est la forme que les
 * moteurs génératifs savent restituer en réponse à « qui fait X à Paris ».
 */
export function service(opts: {
  path: string;
  name: string;
  serviceType: string;
  description: string;
  /** Prestations concrètes — deviennent un `OfferCatalog`. */
  offers?: string[];
}): JsonLd {
  return {
    "@type": "Service",
    "@id": `${SITE.url}${opts.path}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    provider: ORG_REF,
    areaServed: AREA_SERVED,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE.url}${opts.path}`,
      servicePhone: SITE.phoneE164,
      availableLanguage: ["fr", "en"],
    },
    hoursAvailable: OPEN_24_7,
    ...(opts.offers && opts.offers.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: opts.name,
            itemListElement: opts.offers.map((label) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: label },
            })),
          },
        }
      : {}),
  };
}

export type FaqItem = { question: string; answer: string };

/**
 * FAQ balisée. Les rich results FAQ ne s'affichent plus dans les SERP
 * classiques depuis 2023 (Google les a restreints), mais le balisage reste
 * consommé pour l'ancrage des réponses génératives — et surtout, le contenu
 * visible correspondant est ce que les moteurs citent réellement.
 */
export function faqPage(path: string, items: FaqItem[]): JsonLd {
  return {
    "@type": "FAQPage",
    "@id": `${SITE.url}${path}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/**
 * Un avis client. Les données proviennent d'avis réellement publiés sur la
 * fiche Google Business Profile (cf. `src/data/testimonials.ts`) — auteur,
 * note et texte sont ceux de l'auteur, jamais reformulés.
 *
 * Toujours SANS `aggregateRating`, mais pour une autre raison qu'avant :
 * Google ignore — et décourage — une note agrégée qu'une entreprise publie
 * sur son propre site à propos d'elle-même (« self-serving reviews »). La
 * note globale 5,0/5 est donc affichée visuellement, avec un lien vers la
 * fiche où elle est vérifiable, mais pas déclarée en données structurées.
 *
 * Historique : jusqu'au 2026-08-28, ce bloc balisait douze témoignages
 * **inventés** en `Review`, ce que le commentaire d'origine décrivait à tort
 * comme « des verbatims authentiques ».
 */
export function review(opts: {
  body: string;
  authorName: string;
  /** Note laissée par l'auteur, sur 5. */
  rating: number;
  /** Date ISO de publication (`YYYY-MM` accepté : Google n'expose que le mois). */
  datePublished: string;
}): JsonLd {
  return {
    "@type": "Review",
    reviewBody: opts.body,
    reviewRating: {
      "@type": "Rating",
      ratingValue: opts.rating,
      bestRating: 5,
      worstRating: 1,
    },
    datePublished: opts.datePublished,
    author: { "@type": "Person", name: opts.authorName },
    itemReviewed: ORG_REF,
  };
}

/* ------------------------------------------------------------------ */
/* Assemblage                                                          */
/* ------------------------------------------------------------------ */

/** Enveloppe finale. Les `null`/`undefined` sont filtrés pour rester lisible. */
export function graph(...nodes: (JsonLd | null | undefined)[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean) as JsonLd[],
  };
}

/** Phrase de délais réutilisable — garde FAQ et balisage synchronisés. */
export const ZONES_SENTENCE = ZONES.map(
  (z) => `${z.label} en ${z.hours} heure${z.hours > 1 ? "s" : ""} (${z.time})`,
).join(", ");
