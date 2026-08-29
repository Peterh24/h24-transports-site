/**
 * Configuration globale du site H24 Transports.
 * Source unique de vérité : coordonnées, navigation, URLs externes.
 */

/**
 * URL canonique. Pilotée par `NEXT_PUBLIC_SITE_URL` pour que les preview
 * deployments ne déclarent pas des canonicals pointant vers la prod.
 * Le slash final est retiré : tout le code concatène `${SITE.url}${path}`.
 */
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://h24transports.com"
).replace(/\/+$/, "");

/**
 * Profils officiels de l'entreprise.
 *
 * Source unique : alimente à la fois les liens visibles du footer et le
 * `sameAs` de schema.org. Le `sameAs` est un signal d'entité fort pour la
 * recherche générative — c'est ce qui permet à un moteur de relier le site,
 * la page LinkedIn et le compte Instagram à une seule et même organisation
 * au lieu de trois entités distinctes.
 *
 * `icon` correspond à une clé de rendu dans `Footer.tsx`.
 */
export const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/h24transports",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/h24transports/",
    icon: "instagram",
  },
] as const;

/**
 * Fiche Google Business Profile.
 *
 * Déclarée en `sameAs` mais volontairement absente du footer : ce n'est pas un
 * réseau social, et un lien Maps au milieu de LinkedIn/Instagram brouille la
 * lecture. Si on veut la mettre en avant, la bonne forme est un lien
 * « Voir nos avis Google » près des témoignages, pas ici.
 *
 * Forme `?cid=` et non une URL `maps/place/...` ni un lien court
 * `maps.app.goo.gl` : le CID est l'identifiant **canonique et stable** de la
 * fiche. Les URLs `maps/place/` embarquent des coordonnées et un libellé qui
 * changent quand la fiche est modifiée ; les liens courts sont des
 * redirections. CID obtenu en décodant le `ftid` de la fiche
 * (`0x47e603e24c176d9f:0xf07ab9e7ef0cea50` → `0xf07ab9e7ef0cea50` en décimal).
 */
export const GOOGLE_BUSINESS_PROFILE =
  "https://www.google.com/maps?cid=17328366922060589648";

/**
 * Identité légale de l'entreprise.
 *
 * Source : API publique `recherche-entreprises.api.gouv.fr` (base SIRENE /
 * RNE), interrogée le 2026-08-15. Sert à deux choses :
 *
 * 1. **Les mentions légales**, où ces informations sont obligatoires
 *    (art. 6-III de la LCEN pour l'éditeur, art. R.123-237 du Code de commerce
 *    pour les identifiants).
 * 2. **Les données structurées** (`identifier`, `vatID`, `taxID`), qui relient
 *    explicitement l'entité du site à son enregistrement officiel. Sans ça,
 *    rien ne dit à un moteur que « H24 Transports depuis 2014 » et la société
 *    immatriculée en 2020 sont la même chose — l'activité a démarré en 2014,
 *    la structure actuelle a été immatriculée en 2020 (arbitrage Peter,
 *    2026-08-15 : on garde 2014 comme date de référence côté marque).
 */
export const LEGAL = {
  /** Dénomination sociale telle qu'enregistrée (en majuscules au registre). */
  denomination: "H24 TRANSPORTS",
  /** Catégorie juridique INSEE 54xx + dirigeant qualifié « Gérant » ⇒ SARL. */
  legalForm: "SARL",
  legalFormLong: "Société à responsabilité limitée",
  /** Montant communiqué par Peter le 2026-08-15. */
  capital: "50 000 €",
  /** Greffe d'immatriculation — confirmé par Peter le 2026-08-15. */
  rcsCity: "Meaux",
  /** Représentant légal, également directeur de la publication du site. */
  director: "Abdelrani Rahou",
  directorRole: "Gérant",
  siren: "883295248",
  /** SIRET du siège social. */
  siret: "88329524800032",
  /** Confirmé par l'API ET par la formule de calcul de la clé. */
  vatNumber: "FR83883295248",
  /** Code NAF/APE — 49.41B : transports routiers de fret de proximité. */
  naf: "49.41B",
  nafLabel: "Transports routiers de fret de proximité",
  /** Convention collective applicable (IDCC 0016). */
  idcc: "0016",
  idccLabel: "Transports routiers et activités auxiliaires du transport",
  /** Immatriculation de la société au registre (≠ début d'activité, 2014). */
  registeredSince: "2020-02-01",
} as const;

/** Mise en forme lisible du SIREN : 883 295 248. */
export const SIREN_FORMATTED = LEGAL.siren.replace(
  /(\d{3})(\d{3})(\d{3})/,
  "$1 $2 $3",
);

export const SITE = {
  name: "H24 Transports",
  tagline: "Le transport qui ne dort jamais",
  description:
    "Transport audiovisuel, événementiel et urgent exclusif. Disponibles 24h/24 et 7j/7 depuis 2014. Paris & Île-de-France.",
  url: SITE_URL,
  phone: "+33 1 80 27 54 60",
  phoneHref: "tel:+33180275460",
  /** Format E.164 — requis par schema.org / Google Business. */
  phoneE164: "+33180275460",
  email: "contact@h24transports.com",
  emailHref: "mailto:contact@h24transports.com",
  location: "Paris · Île-de-France",
  coords: "48.8566° N · 2.3522° E",
  founded: 2014,
  /** Siège social — repris des mentions légales (article 1). */
  address: {
    street: "4 boulevard de Beaubourg",
    postalCode: "77183",
    city: "Croissy-Beaubourg",
    region: "Île-de-France",
    country: "FR",
  },
  /**
   * `sameAs` schema.org — dérivé de `SOCIALS` pour qu'ajouter un profil au
   * footer le déclare automatiquement aux moteurs, plus la fiche Google
   * Business Profile, qui n'est pas affichée dans le footer mais reste le
   * signal d'entité le plus déterminant pour le référencement local.
   */
  sameAs: [
    ...SOCIALS.map((social) => social.href),
    GOOGLE_BUSINESS_PROFILE,
  ] as string[],
  dashboard: {
    // App client H24 — toute commande/devis passe par là (stratégie : forcer l'usage de l'app).
    login: "https://dashboard.h24transports.com/auth",
  },
  /**
   * Endpoint de réception des demandes de contact.
   *
   * C'est celui qu'utilisait déjà le site Angular, appelé **depuis le
   * navigateur du visiteur** — et c'est volontairement ce fonctionnement qui
   * est conservé : la même requête partie du conteneur serveur n'aboutit pas
   * (constaté en prod le 2026-08-21, échec immédiat avant même que l'API ne
   * soit atteinte). L'API autorise le CORS pour les origines du site
   * (`h24transports.com`, `www`, `develop`, `localhost`), donc l'appel navigateur
   * passe. Ne pas rebasculer côté serveur sans avoir d'abord réparé la sortie
   * réseau du conteneur.
   *
   * `NEXT_PUBLIC_` est indispensable : la valeur doit être inlinée dans le
   * bundle client. Ne renseigner la variable que si le back déménage.
   */
  contactApi:
    process.env.NEXT_PUBLIC_CONTACT_API_URL ||
    "https://api.h24transports.com/api/send-email",
} as const;

/**
 * Délais d'intervention par zone — source unique partagée entre la section
 * « Zones » de l'accueil, les FAQ et les données structurées, pour qu'un
 * moteur génératif ne trouve jamais deux chiffres contradictoires sur le site.
 */
export const ZONES = [
  { label: "Paris", km: "0–20", time: "H-1", hours: 1 },
  { label: "Île-de-France", km: "20–80", time: "H-3", hours: 3 },
  { label: "France entière", km: "80+", time: "H-12", hours: 12 },
] as const;

/** Lien simple, ou groupe déroulant (label sans href + enfants). */
export type NavItem = {
  href?: string;
  label: string;
  children?: { href: string; label: string }[];
};

/**
 * Mesure d'audience. L'identifiant est celui qui tournait sur l'ancien site
 * Angular : le conserver preserve la continuite de l'historique GA4 d'avant
 * le 2026-08-19, au lieu de repartir d'une propriete vide.
 */
export const ANALYTICS = {
  ga4: "G-LKKLCZHQSD",
  /**
   * 13 mois, plafond recommande par la CNIL pour un cookie de mesure
   * d'audience. Sans ce reglage, gtag pose un cookie de 2 ans par defaut —
   * et les mentions legales annonceraient une duree fausse.
   */
  cookieMaxAgeSeconds: 34_164_000,
  cookieMaxAgeLabel: "13 mois",
} as const;

/** Liens de navigation principaux (vraies routes Next). */
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Accueil" },
  {
    label: "Services",
    children: [
      { href: "/evenementiel", label: "Événementiel" },
      { href: "/mode", label: "Mode & luxe" },
      { href: "/express", label: "Express" },
      { href: "/colis", label: "Colis" },
    ],
  },
  { href: "/application", label: "Application" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];
