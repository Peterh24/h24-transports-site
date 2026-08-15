/** Témoignages clients pour le marquee 3D. */

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  body: string;
  initials: string;
  tag: string;
};

export const TESTIMONIALS: Testimonial[] = [
  { name: "Camille D.", role: "Régisseuse générale", company: "Production cinéma", body: "H24 a sauvé un tournage à 3h du matin quand un boîtier RED nous a lâché. Camion sur place en 40 min avec le remplacement.", initials: "CD", tag: "Cinéma" },
  { name: "Marc T.", role: "Producteur", company: "Agence pub Paris", body: "Onze ans qu'on bosse avec eux sur les shootings Sézane. Zéro retard, zéro casse, des chauffeurs qui comprennent le métier.", initials: "MT", tag: "Pub" },
  { name: "Léa B.", role: "Tour manager", company: "Live nation", body: "Tournée 2024, 38 dates, 0 incident. Le briefing technique avant chaque date faisait toute la différence.", initials: "LB", tag: "Concert" },
  { name: "Antoine R.", role: "DOP", company: "Indépendant", body: "L'app permet de tracer la caisse caméra en temps réel — première fois que je dors tranquille la veille d'un tournage.", initials: "AR", tag: "Cinéma" },
  { name: "Sophie K.", role: "Directrice événementiel", company: "Maison de luxe", body: "Défilé à Milan, retour Paris en 11h avec deux camions dédiés. Rien à dire — exécution parfaite.", initials: "SK", tag: "Mode" },
  { name: "Julien V.", role: "Régisseur plateau", company: "Studios Pin Up", body: "Notre prestataire historique. Quand je dis \"urgent\", ils comprennent vraiment urgent.", initials: "JV", tag: "Studio" },
  { name: "Nadia P.", role: "Coordinatrice", company: "Festival Cannes", body: "Logistique impossible gérée comme une formalité. Pendant le festival, ils sont notre dispatch officieux.", initials: "NP", tag: "Événement" },
  { name: "Thomas L.", role: "Chef décorateur", company: "Pub & Cinéma", body: "Pour les courses dédiées sur les déménagements de décors, personne ne joue dans la même cour qu'eux.", initials: "TL", tag: "Cinéma" },
  { name: "Élise M.", role: "Production manager", company: "Maison de couture", body: "Show de 22h à Athènes, livraison J-1 à 14h. Personne d'autre ne nous aurait dit oui.", initials: "EM", tag: "Mode" },
  { name: "Pierre H.", role: "Régie son", company: "Tournée internationale", body: "Le suivi GPS partagé en temps réel a remplacé 50% de mes appels paniqués au transporteur.", initials: "PH", tag: "Concert" },
  { name: "Inès G.", role: "Productrice exécutive", company: "Agence digitale", body: "Facturation propre, devis en 2h, intervention en 1h dans Paris. Zéro friction sur 4 ans.", initials: "IG", tag: "Pub" },
  { name: "Mathieu A.", role: "Régisseur général", company: "Salon professionnel", body: "Pour Maison&Objet, ils gèrent 6 stands en parallèle. Calme olympien des chauffeurs en conditions extrêmes.", initials: "MA", tag: "Salon" },
];
