/**
 * Temps forts saisonniers affichés sur l'accueil, juste sous le hero.
 *
 * Le bloc n'existe que pour relayer sur le site ce qui est annoncé au même
 * moment sur LinkedIn (cf. `communication/planning-edito/`) : même période,
 * même code promo, mêmes conditions. Deux versions différentes d'une offre
 * sur deux canaux, c'est une réclamation qui arrive.
 *
 * **Une campagne = une entrée ici, rien d'autre à toucher.** Le composant
 * `Campaign` choisit celle dont la fenêtre d'affichage couvre la date du
 * rendu et ne rend rien quand aucune ne s'applique — le bloc s'éteint donc
 * tout seul, sans redéploiement (l'accueil est revalidée toutes les heures,
 * cf. `src/app/page.tsx`).
 *
 * ⚠️ En ajoutant une campagne, penser à bumper `updated` de l'entrée `/` dans
 * `src/data/pages.ts` : c'est ce champ qui alimente le `dateModified` des
 * données structurées et le `lastModified` du sitemap. Rien ne le fait
 * automatiquement — le contenu de l'accueil aurait changé sans le dire.
 *
 * Règle de contenu : aucun chiffre qui ne soit pas sourçable (`source` est
 * affiché), et les conditions affichées doivent être exactement celles que
 * l'API applique au code — la fenêtre de validité de FW27 a été vérifiée en
 * base de production le 2026-09-15 (28/09 et 06/10 acceptés, 27/09 et 07/10
 * refusés).
 */

export type CampaignFact = {
  /** Chiffre mis en avant. */
  value: string;
  label: string;
};

export type CampaignPromo = {
  /** Code tel qu'il doit être saisi. Normalisé en majuscules côté API. */
  code: string;
  /** Avantage, en une expression courte. */
  headline: string;
  /** Conditions réelles du code, dans l'ordre de lecture. */
  conditions: string[];
};

export type CampaignEntry = {
  id: string;
  /** Étiquette de contexte, au-dessus du titre. */
  eyebrow: string;
  title: string;
  /** Seconde ligne du titre, en accent. */
  titleAccent: string;
  /** Période de l'événement, en clair. */
  window: string;
  intro: string;
  facts: CampaignFact[];
  /** D'où sortent les `facts` — affiché sous les chiffres. */
  source: string;
  promo?: CampaignPromo;
  /**
   * Fond d'ambiance du bloc, servi depuis `public/`.
   *
   * Purement décoratif : rendu avec un `alt` vide, désaturé et très assombri
   * derrière le texte — le sens est porté par les mots, jamais par l'image.
   * `position` règle le cadrage (`object-position`) quand le sujet n'est pas
   * au centre. Une campagne sans image reste parfaitement valable.
   */
  image?: { src: string; position?: string };
  /** Page du site qui traite le sujet en détail. */
  link: { href: string; label: string };
  /**
   * Fenêtre d'affichage du bloc. Décalage horaire **explicite** : le serveur
   * tourne en UTC, une date sans fuseau ferait basculer le bloc à 2 h du
   * matin heure de Paris, un jour trop tôt ou trop tard.
   *
   * ⚠️ L'offset de Paris change dans l'année : `+02:00` en heure d'été,
   * `+01:00` du dernier dimanche d'octobre au dernier dimanche de mars. Une
   * campagne d'hiver copiée depuis celle-ci doit corriger l'offset.
   */
  showFrom: string;
  showUntil: string;
};

export const CAMPAIGNS: CampaignEntry[] = [
  {
    id: "fashion-week-2026-09",
    eyebrow: "Temps fort · Paris",
    title: "La Fashion Week arrive.",
    titleAccent: "Vos collections aussi.",
    window: "Fashion Week · 28 septembre → 6 octobre 2026",
    intro:
      "Showroom, studio, lieu de défilé : nos véhicules équipés penderie relient Paris intra-muros sur des créneaux serrés, de jour comme de nuit.",
    facts: [
      { value: "101", label: "Maisons au calendrier" },
      { value: "68", label: "Défilés" },
      { value: "33", label: "Présentations" },
    ],
    source: "// Calendrier officiel FHCM — prêt-à-porter femme, printemps-été 2027",
    promo: {
      code: "FW27",
      headline: "−10 %",
      conditions: [
        "Enlèvement et livraison entre le 28 septembre et le 6 octobre 2026",
        "Code à saisir lors de votre demande en ligne",
        "Usage unique par client",
      ],
    },
    /* Podium vide en perspective, audience à contre-jour : dit « défilé » en
       une seconde, sans visage identifiable ni marque dans le cadre (l'écran
       sponsor de la photo d'origine est hors recadrage). */
    image: { src: "/images/campagnes/fashion-week-podium.webp" },
    link: { href: "/mode", label: "Notre offre mode & luxe" },
    showFrom: "2026-09-15T00:00:00+02:00",
    showUntil: "2026-10-06T23:59:59+02:00",
  },
];

/**
 * Contrôle d'intégrité du registre, joué à l'import — donc au build.
 *
 * Sans lui, une date malformée (offset oublié, mois inversé) donnerait un
 * `NaN` dont toutes les comparaisons valent `false` : le bloc ne s'afficherait
 * jamais, sans la moindre erreur, pendant que LinkedIn annonce l'offre. Même
 * posture que `getPage` dans `pages.ts` : on tombe au build, pas en silence
 * devant le visiteur.
 */
const FORMAT_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/;

for (const [i, c] of CAMPAIGNS.entries()) {
  // Le format est vérifié AVANT le parsing, parce que `new Date` accepte
  // beaucoup trop : `new Date("le 15 septembre")` ne vaut pas `NaN`, il vaut
  // le 15 septembre 2001. Et une date sans offset serait lue dans le fuseau
  // de la machine — donc décalée de deux heures sur un serveur en UTC.
  for (const [champ, valeur] of [
    ["showFrom", c.showFrom],
    ["showUntil", c.showUntil],
  ] as const) {
    if (!FORMAT_DATE.test(valeur)) {
      throw new Error(
        `Campagne « ${c.id} » : ${champ} = "${valeur}" n'est pas au format attendu 2026-09-15T00:00:00+02:00 (offset obligatoire).`,
      );
    }
  }

  const from = new Date(c.showFrom).getTime();
  const until = new Date(c.showUntil).getTime();
  if (Number.isNaN(from) || Number.isNaN(until)) {
    throw new Error(
      `Campagne « ${c.id} » : showFrom/showUntil au bon format mais impossible (${c.showFrom} → ${c.showUntil}).`,
    );
  }
  if (until <= from) {
    throw new Error(
      `Campagne « ${c.id} » : showUntil (${c.showUntil}) n'est pas après showFrom (${c.showFrom}).`,
    );
  }
  const chevauche = CAMPAIGNS.slice(0, i).find(
    (autre) =>
      from <= new Date(autre.showUntil).getTime() &&
      until >= new Date(autre.showFrom).getTime(),
  );
  if (chevauche) {
    throw new Error(
      `Campagnes « ${chevauche.id} » et « ${c.id} » se chevauchent : une seule serait affichée.`,
    );
  }
}

/**
 * Campagne à afficher à l'instant `now`, ou `undefined` s'il n'y en a pas.
 * La première qui correspond gagne — le contrôle ci-dessus garantit qu'il n'y
 * en a jamais deux en concurrence.
 */
export const activeCampaign = (
  now: Date = new Date(),
): CampaignEntry | undefined => {
  const t = now.getTime();
  return CAMPAIGNS.find(
    (c) =>
      t >= new Date(c.showFrom).getTime() && t <= new Date(c.showUntil).getTime(),
  );
};
