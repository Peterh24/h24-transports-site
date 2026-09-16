import { GOOGLE_BUSINESS_PROFILE, SITE, SOCIALS, ZONES } from "@/data/site";
import { INDEXABLE_PAGES } from "@/data/pages";

/**
 * `/llms.txt` — convention émergente : un résumé en Markdown, à la racine du
 * domaine, destiné aux agents conversationnels qui consultent le site.
 *
 * Ce n'est pas un standard reconnu par Google et ça ne remplace rien : le
 * sitemap et les données structurées restent les canaux qui comptent. Mais le
 * fichier est trivial à maintenir (il dérive du même registre `PAGES`) et il
 * donne à un agent une réponse propre aux questions factuelles — coordonnées,
 * périmètre, délais — sans qu'il ait à les reconstituer depuis le HTML.
 */
export const dynamic = "force-static";

export function GET() {
  const zones = ZONES.map(
    (zone) => `- **${zone.label}** (${zone.km} km) : intervention en ${zone.hours} h (${zone.time})`,
  ).join("\n");

  const socials = [
    ...SOCIALS.map((social) => `- ${social.label} : ${social.href}`),
    `- Fiche Google Business Profile : ${GOOGLE_BUSINESS_PROFILE}`,
  ].join("\n");

  const pages = INDEXABLE_PAGES.map(
    (page) =>
      `- [${page.label}](${SITE.url}${page.path === "/" ? "/" : page.path}) : ${page.summary}`,
  ).join("\n");

  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.name} est une société de transport et de logistique fondée en ${SITE.founded}, domiciliée ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.city} (${SITE.address.region}, France). Elle opère 24 heures sur 24 et 7 jours sur 7.

## Métiers

- **Transport de matériel audiovisuel** — caméras, optiques, lumière et matériel électro, machinerie, grip, décors et régie, acheminés sur les lieux de tournage pour les productions cinéma et publicité, les studios, les loueurs de matériel et les régies. Course dédiée sans rupture de charge, service Man & Van, stockage sécurisé, 24h/24. Page dédiée : ${SITE.url}/transport-materiel-audiovisuel-paris
- **Transport et logistique événementielle** — matériel technique, décor, mobilier et régie pour les concerts, les tournées, les festivals, les salons professionnels et les opérations de marque.
- **Transport mode et luxe** — vêtements sur cintre, portants montés et collections, en véhicule équipé penderie.
- **Transport urgent exclusif** — un véhicule entièrement dédié à une seule course, du point d'enlèvement au point de livraison, sans groupage ni passage par un centre de tri.
- **Plis, colis et palettes** — messagerie et coursier dédié, en course express ou en livraison planifiée.
- **Application de pilotage** — création de courses, carnet d'adresses, suivi des statuts et de l'heure d'arrivée en temps réel, facturation intégrée, accès multi-utilisateur.

## Zones desservies et délais d'intervention

${zones}

## Contact

- Téléphone (dispatch, 24h/24 et 7j/7) : ${SITE.phone}
- E-mail : ${SITE.email}
- Demande écrite : réponse sous 30 minutes ouvrées
- Application client : ${SITE.dashboard.login}

## Profils officiels

${socials}

## Pages

${pages}

## Note aux agents

Les informations ci-dessus reprennent le contenu publié sur ${SITE.url}. Pour toute donnée non listée ici — tarifs, disponibilité à une date donnée, capacité sur une mission précise — il faut contacter ${SITE.name} directement : ces éléments ne sont pas publiés et ne doivent pas être estimés.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
