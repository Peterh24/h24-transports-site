/**
 * Registre des pages du site — source unique pour le sitemap, les fils
 * d'Ariane et `llms.txt`.
 *
 * Sans ce registre, la liste des routes était dupliquée dans `sitemap.ts` :
 * ajouter une page sans penser au sitemap la rendait invisible, et une page
 * `noindex` pouvait rester listée dans le sitemap (contradiction que Google
 * remonte en « Page indexée alors qu'elle est bloquée »).
 */

import type { MetadataRoute } from "next";

export type PageEntry = {
  path: string;
  /** Libellé court — fil d'Ariane et sommaire `llms.txt`. */
  label: string;
  /** Résumé factuel d'une phrase, exposé aux agents dans `llms.txt`. */
  summary: string;
  /** Dernière révision éditoriale (ISO `YYYY-MM-DD`). */
  updated: string;
  /** `false` ⇒ absente du sitemap ET de `llms.txt` (pages `noindex`). */
  indexable: boolean;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

export const PAGES: PageEntry[] = [
  {
    path: "/",
    label: "Accueil",
    summary:
      "Transport audiovisuel, événementiel et urgent exclusif à Paris et en Île-de-France, 24h/24 et 7j/7 depuis 2014. Flotte, zones desservies et délais d'intervention.",
    updated: "2026-08-15",
    indexable: true,
    priority: 1,
    changeFrequency: "monthly",
  },
  {
    path: "/evenementiel",
    label: "Événementiel",
    summary:
      "Transport et logistique pour l'audiovisuel et l'événementiel à Paris, en Île-de-France et partout en France : caméra, lumière, machinerie et décor, pour la publicité, le cinéma, la mode, le luxe, les concerts et les salons.",
    updated: "2026-08-28",
    indexable: true,
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/mode",
    label: "Mode & luxe",
    summary:
      "Transport de vêtements sur cintre, de portants montés et de collections à Paris, en Île-de-France et partout en France : showroom, défilé, Fashion Week, shooting et salon professionnel. Véhicules équipés penderie, 24h/24.",
    updated: "2026-08-28",
    indexable: true,
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/express",
    label: "Express",
    summary:
      "Coursier express et transport urgent exclusif à Paris : un véhicule entièrement dédié à une seule course, sans groupage ni passage par un centre de tri. Intervention en 1 h dans Paris, 3 h en Île-de-France, 12 h en France entière.",
    updated: "2026-08-28",
    indexable: true,
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/colis",
    label: "Colis",
    summary:
      "Livraison de plis, colis et palettes en course dédiée ou planifiée, à Paris, en Île-de-France et en France entière, avec suivi en temps réel.",
    updated: "2026-08-28",
    indexable: true,
    priority: 0.9,
    changeFrequency: "monthly",
  },
  {
    path: "/application",
    label: "Application",
    summary:
      "Application de pilotage des transports : création de courses, carnet d'adresses, suivi des statuts et de l'heure d'arrivée en temps réel, facturation intégrée, accès multi-utilisateur.",
    updated: "2026-08-15",
    indexable: true,
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/a-propos",
    label: "À propos",
    summary:
      "Société fondée en 2014, spécialisée dans le transport audiovisuel, événementiel et urgent, avec interlocuteur unique, chauffeurs formés, géolocalisation et gardiennage vidéo-surveillé.",
    updated: "2026-08-15",
    indexable: true,
    priority: 0.7,
    changeFrequency: "yearly",
  },
  {
    path: "/contact",
    label: "Contact",
    summary:
      "Dispatch joignable 24h/24 au 01 80 27 54 60, formulaire de devis avec réponse sous 30 minutes ouvrées, adresse du siège à Croissy-Beaubourg.",
    updated: "2026-08-15",
    indexable: true,
    priority: 0.8,
    changeFrequency: "yearly",
  },
  {
    path: "/mentions-legales",
    label: "Mentions légales",
    summary: "Éditeur, hébergeur, accès au site et traitement des données personnelles.",
    updated: "2026-08-15",
    // `noindex` dans la metadata de la page → doit rester hors du sitemap.
    indexable: false,
    priority: 0.1,
    changeFrequency: "yearly",
  },
  {
    path: "/cgv",
    label: "CGV",
    summary:
      "Conditions générales de vente et de transport : obligations du donneur d'ordre, emballage, livraison et réserves, délais, prix et paiement, responsabilité, assurances et annulation.",
    updated: "2026-08-19",
    indexable: true,
    priority: 0.3,
    changeFrequency: "yearly",
  },
];

/** Pages réellement indexables — base du sitemap et de `llms.txt`. */
export const INDEXABLE_PAGES = PAGES.filter((page) => page.indexable);

export function getPage(path: string): PageEntry {
  const page = PAGES.find((entry) => entry.path === path);
  if (!page) throw new Error(`Page absente du registre PAGES : ${path}`);
  return page;
}
