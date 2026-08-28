/**
 * Chiffres d'activité affichés sur le site.
 *
 * **Source : l'API Dashdoc de H24** (TMS de l'entreprise), relevée le
 * 2026-08-28. Ce sont les seuls chiffres d'activité affichés publiquement :
 * tout nombre ajouté ici doit pouvoir être ressorti de Dashdoc.
 *
 * ⚠️ Portée de Dashdoc — à connaître avant de citer ces chiffres :
 * l'outil est utilisé **depuis janvier 2023** (transport le plus ancien :
 * 2023-01-02). Il ne contient donc rien de 2014 à 2022. En revanche, sur la
 * période couverte le compte est **exhaustif** : Peter a confirmé le
 * 2026-08-28 que même une course demandée par mail ou par téléphone est
 * saisie dans Dashdoc par un opérateur. `courses` est donc un total réel sur
 * la période, pas une estimation — d'où le libellé « depuis 2023 », qui doit
 * rester affiché avec le chiffre.
 *
 * Historique : ces valeurs remplacent trois chiffres sans source affichés
 * jusqu'au 2026-08-28 — « 657 clients récurrents », « 12K clients
 * satisfaits » et « 35K courses réalisées ». Le « 12K » était en réalité le
 * nombre de **courses** (12 268), recopié sous un libellé de clients ; le
 * « 35K » n'a jamais pu être rattaché à une source.
 */

export const ACTIVITY = {
  /** Sociétés au carnet d'adresses Dashdoc. */
  clients: 664,
  /** Transports enregistrés du 2023-01-02 au 2026-08-28. */
  courses: 12268,
  /** Première année couverte par Dashdoc — à afficher avec `courses`. */
  coursesDepuis: 2023,
  /** Année de démarrage de l'activité (≠ immatriculation, cf. `LEGAL`). */
  fondation: 2014,
  /** Date du relevé, pour savoir quand ces chiffres ont vieilli. */
  checkedOn: "2026-08-28",
} as const;

/**
 * Détail par année, relevé le 2026-08-28. Non affiché aujourd'hui, conservé
 * pour justifier `courses` si on nous demande d'où il sort.
 *
 * 2023 est **déduit par soustraction** (total − 2024 − 2025 − 2026) : l'API
 * Dashdoc tombe systématiquement en timeout sur les filtres de date couvrant
 * 2023. Les trois autres années sont mesurées directement.
 */
export const COURSES_PAR_AN = {
  2023: 3103,
  2024: 3824,
  2025: 3506,
  /** Année en cours, arrêtée au 2026-08-28 — incomplète par nature. */
  2026: 1835,
} as const;

/** Ancienneté en années révolues, dérivée pour ne jamais être périmée. */
export const anneesExperience = (
  now: Date = new Date(),
): number => now.getFullYear() - ACTIVITY.fondation;
