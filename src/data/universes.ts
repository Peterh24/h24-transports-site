/** Les trois univers / pôles métier de H24 Transports. */

export type Universe = {
  id: string;
  href: string;
  num: string;
  name: string;
  headline: string;
  text: string;
  tags: string[];
};

export const UNIVERSES: Universe[] = [
  {
    id: "event",
    href: "/evenementiel",
    num: "01",
    name: "Événementiel",
    headline: "Audiovisuel & événementiel",
    text: "Caméra, lumière, décor. Pour Pub & Cinéma, Mode & Luxe, Concert & Salon — un transport spécialisé pour les enjeux les plus sensibles.",
    tags: ["Pub & Cinéma", "Mode & Luxe", "Concert & Salon"],
  },
  {
    id: "express",
    href: "/express",
    num: "02",
    name: "Express",
    headline: "Urgent exclusif",
    text: "L'urgence comme métier. Un véhicule entièrement dédié à votre course, du Point A au Point B, sans escale, traçabilité en temps réel.",
    tags: ["H-1 Paris", "H-3 IDF", "H-12 France"],
  },
  {
    id: "colis",
    href: "/colis",
    num: "03",
    name: "Colis",
    headline: "Pli, colis & palette",
    text: "Du pli urgent à la palette : messagerie et coursier dédié, en express ou planifié — avec la même exigence de fiabilité et de traçabilité que nos autres métiers.",
    tags: ["Pli & documents", "Colis & palette", "Coursier dédié"],
  },
  {
    id: "app",
    href: "/application",
    num: "04",
    name: "Application",
    headline: "Pilotez votre flotte",
    text: "Notre application mobile. Créez vos demandes, suivez vos transports en temps réel, accédez à vos factures — clients existants ou nouveaux.",
    tags: ["Suivi live", "Multi-utilisateurs", "Facturation"],
  },
];
