/**
 * Avis clients — **vrais avis publiés sur la fiche Google Business Profile**
 * de H24 Transports, relevés le 2026-08-28 depuis le panneau « Avis » du
 * compte (fiche `cid=17328366922060589648`, 33 avis, note 5,0/5).
 *
 * ⚠️ Historique à connaître avant de toucher à ce fichier : jusqu'au
 * 2026-08-28, cette liste contenait **douze témoignages inventés**, attribués
 * à des personnes fictives chez des marques réelles (Sézane, Live Nation,
 * Festival de Cannes…), et balisés en `schema.org/Review` comme s'il
 * s'agissait d'avis authentiques. C'était un risque juridique direct
 * (pratiques commerciales trompeuses, art. L121-2 du Code de la consommation ;
 * directive Omnibus, qui impose de pouvoir justifier qu'un avis émane d'un
 * vrai client) et une violation des règles Google sur les données
 * structurées. Ils ont été remplacés par les avis ci-dessous.
 *
 * **Règle de contribution : on n'ajoute ici QUE des avis réellement publiés
 * sur la fiche Google, reproduits mot pour mot, sans reformulation ni
 * correction orthographique.** La sélection (12 avis sur 33) privilégie ceux
 * qui parlent des métiers du site — audiovisuel, matériel fragile, récurrence,
 * suivi de course — plutôt que les « super service » génériques. Sélectionner
 * est permis, réécrire ne l'est pas : le texte affiché doit rester
 * confrontable à la fiche Google, sinon on retombe dans l'invérifiable.
 *
 * Les sauts de ligne sont ceux des auteurs ; ils sont rendus tels quels via
 * `white-space: pre-line` sur `.t-quote`.
 */

export type Testimonial = {
  /** Nom de l'auteur, tel qu'affiché publiquement sur Google. */
  name: string;
  /** Initiales pour l'avatar. */
  initials: string;
  /** Note laissée par l'auteur, sur 5. */
  rating: number;
  /** Mois de publication, libellé affiché sur la carte. */
  date: string;
  /**
   * Date ISO pour le balisage `schema.org`. Volontairement au mois
   * (`YYYY-MM`, valide en ISO 8601) : Google n'expose qu'une ancienneté
   * relative (« il y a 37 semaines »), pas une date exacte. Inventer un jour
   * précis serait une donnée structurée fausse.
   */
  datePublished: string;
  /** Texte de l'avis, reproduit sans aucune modification. */
  body: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Studio Rouchon",
    initials: "SR",
    rating: 5,
    date: "Décembre 2025",
    datePublished: "2025-12",
    body: "Vous êtes les Meilleurs !!",
  },
  {
    name: "Thomas GACHE",
    initials: "TG",
    rating: 5,
    date: "Décembre 2025",
    datePublished: "2025-12",
    body: "Depuis maintenant nous utilisons les services de H24.\nSérieux, équipe de confiance.\nNous recommandons.\nSTE THB LOC FILMS",
  },
  {
    name: "Louis VALLET",
    initials: "LV",
    rating: 5,
    date: "Décembre 2025",
    datePublished: "2025-12",
    body: "Notre transporteur favori depuis bientôt deux ans. La ponctualité est toujours au rendez-vous, les notifications de suivi de courses sont un outil précieux. Les équipes sont toujours souriantes.\n\nUn partenaire de qualité que nous recommandons.",
  },
  {
    name: "Pauline Primard",
    initials: "PP",
    rating: 5,
    date: "Décembre 2025",
    datePublished: "2025-12",
    body: "Cela fait des années que nous travaillons avec H24 Transports et nous en sommes toujours pleinement satisfaits. Les équipes sont au top, tout comme les transporteurs : très professionnels, toujours gentils, serviables et prêts à aider bien au-delà de leur fonction première. Une collaboration exemplaire que nous recommandons vivement !",
  },
  {
    name: "soraja cehic",
    initials: "SC",
    rating: 5,
    date: "Décembre 2025",
    datePublished: "2025-12",
    body: "Love these guys. They made the impossible possible. Always polite and smart and kind dispatcher , and always lovely drivers with a lot of understanding for fragile items. Keep the good work you are the best!",
  },
  {
    name: "Clara Giudicelli",
    initials: "CG",
    rating: 5,
    date: "Décembre 2025",
    datePublished: "2025-12",
    body: "H24 est une entreprise sérieuse et les personnes qui composent ses équipes sont toujours ponctuelles, professionnelles et à l’écoute. Merci de nous accompagner dans toute notre logistique ! La confiance est là lorsqu’on fait appel à H24.",
  },
  {
    name: "Mélodie Balan",
    initials: "MB",
    rating: 5,
    date: "Décembre 2025",
    datePublished: "2025-12",
    body: "Entreprise super avec qui je travaille régulièrement.\nToujours super pro, à l’heure, super réactif et arrangeant !",
  },
  {
    name: "Marie Bourdin",
    initials: "MB",
    rating: 5,
    date: "Décembre 2025",
    datePublished: "2025-12",
    body: "Plusieurs années de collaboration et toujours un très bon service. Ils sont disponible, rapide et arrangeant.",
  },
  {
    name: "Camille Bolloré",
    initials: "CB",
    rating: 5,
    date: "Décembre 2025",
    datePublished: "2025-12",
    body: "Toujours efficaces et très compétents. Les gars sont toujours super sympathiques 🙂",
  },
  {
    name: "Kévin HAMARD",
    initials: "KH",
    rating: 5,
    date: "Décembre 2025",
    datePublished: "2025-12",
    body: "Toujours un plaisir de travailler avec H24. Des interlocuteurs toujours agréables, un travail bien fait et ponctuels. Je recommande",
  },
  {
    name: "irvin",
    initials: "IR",
    rating: 5,
    date: "Décembre 2025",
    datePublished: "2025-12",
    body: "Je recommande H24, une équipe professionnelle, disponible et à l’écoute. Un vrai partenaire de confiance pour le transport.",
  },
  {
    name: "Greg Besse",
    initials: "GB",
    rating: 5,
    date: "Décembre 2025",
    datePublished: "2025-12",
    body: "À recommander les yeux fermés\nQualité de service et suivi exceptionnel",
  },
];

/**
 * Statistiques de la fiche Google, relevées le 2026-08-28.
 *
 * Ces valeurs remplacent trois chiffres qui n'étaient sourcés nulle part :
 * « 4.9/5 · 657 clients », « 98 % de taux de recommandation » et une base de
 * 657 clients. La note réelle est meilleure (5,0) — c'est le volume qui était
 * gonflé. À remettre à jour à la main en même temps que `TESTIMONIALS`.
 */
export const GOOGLE_REVIEWS = {
  rating: "5,0",
  count: 33,
  /** Date du relevé, pour savoir quand ces chiffres ont vieilli. */
  checkedOn: "2026-08-28",
} as const;
