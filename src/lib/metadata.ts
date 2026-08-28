/**
 * Métadonnées de page — fabrique commune.
 *
 * Pourquoi un helper plutôt qu'un objet écrit à la main dans chaque page :
 * Next.js **hérite** l'objet `openGraph` du layout parent quand une page ne le
 * redéfinit pas. Tant qu'aucune page ne le faisait, les six pages internes
 * partageaient donc la carte de prévisualisation de l'accueil — sur LinkedIn,
 * Slack ou WhatsApp, partager `/evenementiel` affichait « H24 Transports — Le
 * transport qui ne dort jamais » et la description de l'accueil.
 *
 * Le piège est silencieux : rien ne casse, rien n'apparaît dans un lint, et le
 * `<title>` de la page reste correct — seule la carte partagée est fausse.
 * D'où cette fabrique : `title` et `description` ne peuvent plus être renseignés
 * pour le `<head>` sans l'être aussi pour les réseaux sociaux.
 *
 * ⚠️ Les images doivent être redéclarées ici, et c'est contre-intuitif.
 * `src/app/opengraph-image.tsx` alimente bien toutes les pages **tant qu'elles
 * n'ont pas leur propre bloc `openGraph`** : dès qu'une page en déclare un,
 * Next remplace le bloc hérité en entier et n'y réinjecte pas l'image du
 * segment parent. Ajouter `openGraph` sans `images` supprime donc l'aperçu
 * visuel — vérifié sur `/evenementiel`, qui perdait son `og:image` alors qu'il
 * en avait un avant. D'où les deux blocs `images` ci-dessous, qui pointent vers
 * les mêmes routes générées que celles utilisées par l'accueil.
 */

import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { OG_ALT, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export function pageMetadata(opts: {
  /** Chemin de la route, tel qu'il figure dans le registre `PAGES`. */
  path: string;
  /** Titre de la page, sans le suffixe de marque. */
  title: string;
  description: string;
  /** `false` pour les pages `noindex` (mentions légales). */
  index?: boolean;
}): Metadata {
  const url = `${SITE.url}${opts.path === "/" ? "" : opts.path}`;

  /**
   * Le `template: "%s · H24 Transports"` du layout ne s'applique qu'au
   * `<title>` du document — `openGraph.title` et `twitter.title` ne le
   * traversent pas. On compose donc le titre complet explicitement, pour que
   * la carte partagée et l'onglet du navigateur affichent la même chose.
   */
  const brandedTitle = `${opts.title} · ${SITE.name}`;

  /** Image de marque générée — mêmes routes que celles servies à l'accueil. */
  const ogImage = {
    url: `${SITE.url}/opengraph-image`,
    alt: OG_ALT,
    type: OG_CONTENT_TYPE,
    ...OG_SIZE,
  };
  const twitterImage = {
    url: `${SITE.url}/twitter-image`,
    alt: OG_ALT,
    type: OG_CONTENT_TYPE,
    ...OG_SIZE,
  };

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: SITE.name,
      url,
      title: brandedTitle,
      description: opts.description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description: opts.description,
      images: [twitterImage],
    },
    ...(opts.index === false ? { robots: { index: false, follow: true } } : {}),
  };
}
