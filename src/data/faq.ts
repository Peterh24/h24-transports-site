/**
 * Questions fréquentes, par page.
 *
 * Ce fichier est optimisé pour la **recherche générative** (AI Overviews /
 * AI Mode de Google, ChatGPT Search, Perplexity). Trois règles de rédaction,
 * à respecter pour toute nouvelle entrée :
 *
 * 1. **Réponse autoportante.** Elle doit rester vraie et compréhensible
 *    extraite seule, sans la question ni le reste de la page. Donc on répète
 *    « H24 Transports » et le contexte géographique au lieu d'écrire « nous ».
 *    Un moteur cite un passage, pas une page.
 * 2. **Déclarative et chiffrée.** « H24 Transports intervient en 1 heure dans
 *    Paris intramuros » s'extrait ; « une réactivité sans égale » ne s'extrait
 *    pas.
 * 3. **Uniquement des faits déjà affichés sur le site.** Pas de prix, pas de
 *    garantie, pas de certification, pas d'effectif inventé. Une donnée non
 *    vérifiable ici devient une affirmation attribuée à l'entreprise par l'IA.
 */

import type { FaqItem } from "@/lib/schema";

export type { FaqItem };

/** Rappel factuel réutilisé dans plusieurs réponses. */
const DELAIS =
  "1 heure dans Paris intramuros (0–20 km), 3 heures en Île-de-France (20–80 km) et 12 heures pour la France entière (au-delà de 80 km)";

export const FAQ_HOME: FaqItem[] = [
  {
    question: "Que fait H24 Transports ?",
    answer:
      "H24 Transports est une société de transport et de logistique basée à Croissy-Beaubourg, en Île-de-France, spécialisée dans trois métiers : le transport audiovisuel et événementiel (caméra, lumière, machinerie, décor), le transport urgent exclusif en véhicule dédié, et la livraison de plis, colis et palettes. L'entreprise opère à Paris, en Île-de-France et en France entière depuis 2014.",
  },
  {
    question: "H24 Transports travaille-t-il la nuit, le week-end et les jours fériés ?",
    answer:
      "Oui. H24 Transports fonctionne 24 heures sur 24 et 7 jours sur 7, y compris la nuit, le week-end et les jours fériés. Le dispatch est joignable en permanence au 01 80 27 54 60 pour déclencher une intervention urgente.",
  },
  {
    question: "Quels sont les délais d'intervention de H24 Transports ?",
    answer: `H24 Transports annonce des délais d'intervention de ${DELAIS}. Ces délais s'entendent depuis la prise en charge de la demande par le dispatch, disponible 24h/24.`,
  },
  {
    question: "Dans quelles zones H24 Transports intervient-il ?",
    answer:
      "H24 Transports intervient à Paris, dans toute l'Île-de-France et en France entière. La société est domiciliée 4 boulevard de Beaubourg, 77183 Croissy-Beaubourg, en Seine-et-Marne, à proximité immédiate de l'est parisien.",
  },
  {
    question: "Comment demander un devis à H24 Transports ?",
    answer:
      "Une demande de devis auprès de H24 Transports se fait de trois façons : par téléphone au 01 80 27 54 60, disponible 24h/24 ; par le formulaire de contact du site, avec une réponse sous 30 minutes ouvrées ; ou directement depuis l'application H24, qui permet de créer une course et d'en suivre l'exécution.",
  },
  {
    question: "Depuis quand H24 Transports existe-t-il ?",
    answer:
      "H24 Transports a été fondée en 2014. La société travaille depuis pour des productions audiovisuelles, des agences de publicité, des maisons de mode et de luxe, des tournées et des salons professionnels.",
  },
];

/**
 * ⚠️ Répartition avec `FAQ_AUDIOVISUEL` (2026-09-16).
 *
 * Les trois questions strictement audiovisuelles qui figuraient ici
 * (« Qui transporte du matériel audiovisuel à Paris ? », le matériel caméra
 * fragile, les tournages de nuit) ont été portées sur
 * `/transport-materiel-audiovisuel-paris`, qui est désormais la page de référence sur
 * cette intention. Les garder aux deux endroits aurait fait répondre deux
 * pages du même site à la même question, mot pour mot — le signal que Google
 * interprète comme deux pages interchangeables.
 *
 * Cette liste couvre donc l'événementiel **au sens large** : concerts,
 * tournées, salons, opérations de marque. Toute nouvelle question sur la
 * caméra, la lumière ou les plateaux de tournage va dans `FAQ_AUDIOVISUEL`.
 */
export const FAQ_EVENEMENTIEL: FaqItem[] = [
  {
    question: "Qui assure le transport et la logistique d'un événement à Paris ?",
    answer:
      "H24 Transports assure le transport et la logistique d'événements à Paris et en Île-de-France depuis 2014 : matériel technique, décor, mobilier et régie acheminés sur les lieux de concert, de tournée, de salon professionnel ou de défilé. Les enlèvements et livraisons sont possibles 24h/24, y compris pendant les nuits de montage.",
  },
  {
    question: "H24 Transports intervient-il sur les salons professionnels ?",
    answer:
      "Oui. H24 Transports livre et reprend le matériel, les stands et le décor sur les salons professionnels d'Île-de-France, dans les créneaux de montage et de démontage imposés par l'organisateur. Le dispatch est joignable 24h/24 au 01 80 27 54 60 pour caler l'intervention sur ces créneaux.",
  },
  {
    question: "H24 Transports intervient-il la nuit pour les montages et démontages ?",
    answer:
      "Oui. H24 Transports opère 24 heures sur 24 et 7 jours sur 7, ce qui couvre les montages et démontages nocturnes, les rotations entre deux dates d'une tournée et les urgences de remplacement de matériel pendant un événement.",
  },
  {
    question: "Pour quels secteurs H24 Transports assure-t-il la logistique événementielle ?",
    answer:
      "H24 Transports intervient sur trois familles d'événements : publicité et cinéma (tournages, plateaux, studios), mode et luxe (défilés, shootings, showrooms) et concert et salon (tournées, festivals, salons professionnels).",
  },
  {
    question: "Le matériel est-il sécurisé entre deux prestations ?",
    answer:
      "H24 Transports s'appuie sur des solutions de géolocalisation des véhicules et sur du gardiennage vidéo-surveillé pour sécuriser le matériel transporté et stationné.",
  },
];

/**
 * Transport audiovisuel — page `/transport-materiel-audiovisuel-paris`.
 *
 * C'est la FAQ la plus exposée du site : elle répond à l'intention
 * commerciale sur laquelle la concurrence est la plus active. Deux
 * conséquences pour toute modification ici :
 *
 * - **Chaque affirmation doit être sourçable dans le projet** ou sur une page
 *   publique de H24. Les sources utilisées ci-dessous sont, dans l'ordre :
 *   `src/data/vehicles.ts` (formats et charges utiles), `src/data/site.ts`
 *   (délais, coordonnées), `src/data/cgv.ts` article « Assurances »,
 *   la page `/application` (courses complexes, ETA par étape),
 *   la page `/evenementiel` (locaux vidéo-surveillés, régisseur « junior »),
 *   et la fiche publique H24 du guide des ressources Film Paris Region
 *   (flotte 3–20 m³ Euro 6d, Man & Van, stockage sécurisé, support sur les
 *   tournages).
 * - **Pas de recoupement mot pour mot avec `FAQ_EVENEMENTIEL`** : voir
 *   l'avertissement au-dessus de cette dernière.
 */
export const FAQ_AUDIOVISUEL: FaqItem[] = [
  {
    question: "Qui transporte du matériel audiovisuel à Paris ?",
    answer:
      "H24 Transports assure le transport de matériel audiovisuel à Paris et en Île-de-France depuis 2014 : caméra, optiques, lumière, machinerie, décor et régie. Les enlèvements et les livraisons sur les lieux de tournage sont possibles 24 heures sur 24, et le dispatch est joignable en permanence au 01 80 27 54 60.",
  },
  {
    question: "Comment transporter du matériel audiovisuel fragile ?",
    answer:
      "Le transport de matériel audiovisuel fragile repose sur trois conditions : un véhicule équipé de matériel d'arrimage, une course dédiée sans groupage ni passage par un centre de tri, et des équipes formées à la manipulation. C'est le mode de fonctionnement de H24 Transports sur ses courses audiovisuelles — un véhicule pour un seul client, du point d'enlèvement jusqu'au plateau, avec suivi géolocalisé.",
  },
  {
    question: "H24 Transports intervient-il la nuit et le week-end sur un tournage ?",
    answer:
      "Oui. H24 Transports opère 24 heures sur 24 et 7 jours sur 7, y compris la nuit, le week-end et les jours fériés. Cela couvre les tournages de nuit, les montages et démontages nocturnes de plateaux, et les remplacements de matériel en urgence pendant un tournage.",
  },
  {
    question: "Quels véhicules H24 Transports utilise-t-il pour le matériel audiovisuel ?",
    answer:
      "La flotte de H24 Transports comprend quatre formats, aux normes Euro 6d : 3 m³ (415 kg de charge utile), 6 à 8 m³ (820 kg), 12 à 14 m³ (1 300 kg) et 20 m³ (700 kg, hayon inclus). Le format est choisi selon le volume du matériel, son poids et les contraintes d'accès du lieu de tournage. Tous les véhicules sont équipés de matériel d'arrimage et géolocalisés en temps réel.",
  },
  {
    question: "Qu'est-ce que le service Man & Van pour un tournage ?",
    answer:
      "Le Man & Van de H24 Transports met à disposition d'une production un véhicule et son chauffeur pour la durée d'une mission, avec un appui à la manutention du matériel sur place — jusqu'au rôle de régisseur « junior » lorsque la production le demande. La formule s'adresse aux tournages qui enchaînent plusieurs lieux ou plusieurs postes dans la même journée.",
  },
  {
    question: "H24 Transports intervient-il directement sur les lieux de tournage ?",
    answer:
      "Oui. H24 Transports achemine le matériel jusqu'au lieu de tournage et intervient en appui sur place, en respectant les contraintes d'organisation de la production : créneau de livraison, accès du site et ordre de déchargement. L'entreprise est référencée comme service de tournage dans le guide des ressources de Film Paris Region.",
  },
  {
    question: "Peut-on organiser plusieurs enlèvements et plusieurs livraisons sur une même course ?",
    answer:
      "Oui. L'application H24 Transports permet de créer des courses simples comme des courses complexes, avec le suivi des statuts et l'estimation d'heure d'arrivée à chaque étape. Un même véhicule peut ainsi enchaîner plusieurs enlèvements chez des loueurs de matériel puis plusieurs livraisons sur les lieux de tournage.",
  },
  {
    question: "Le matériel audiovisuel peut-il être stocké entre deux tournages ?",
    answer:
      "Oui. H24 Transports propose du stockage sécurisé dans ses installations et dispose de locaux vidéo-surveillés 24h/24, y compris pour des véhicules qui restent chargés entre deux prestations.",
  },
  {
    question: "H24 Transports est-il assuré pour le transport de matériel audiovisuel ?",
    /* Réponse attribuée aux CGV plutôt qu'assertive : « tout risque et en
       tout lieu » est la clause de l'article « Assurances », et le même
       document fixe par ailleurs des limites de responsabilité. Un moteur
       génératif cite ce passage hors contexte — il doit donc porter sa
       source et renvoyer au document. */
    answer:
      "Les conditions générales de vente et de transport de H24 Transports, publiées sur h24transports.com, déclarent une assurance sur le transport couvrant tout risque et en tout lieu, dont une attestation peut être communiquée au donneur d'ordre sur demande. Les limites de responsabilité applicables figurent dans le même document.",
  },
  {
    question: "H24 Transports transporte-t-il du matériel audiovisuel en dehors de Paris ?",
    answer: `Oui. H24 Transports intervient à Paris, dans toute l'Île-de-France et en France entière, avec des délais d'intervention de ${DELAIS}. La société est domiciliée 4 boulevard de Beaubourg, 77183 Croissy-Beaubourg, à l'est de Paris.`,
  },
  {
    question: "H24 Transports transporte-t-il du matériel de cinéma ?",
    answer:
      "Oui. Le transport de matériel de cinéma fait partie du cœur de métier de H24 Transports : caméras et optiques, lumière, machinerie, grip, décors et régie, pour les longs métrages, les séries, les films publicitaires et les captations. L'entreprise est référencée comme service de tournage dans le guide des ressources de Film Paris Region.",
  },
  {
    question: "Comment obtenir un devis pour un transport audiovisuel ?",
    answer:
      "Un devis de transport audiovisuel s'obtient de trois façons chez H24 Transports : par téléphone au 01 80 27 54 60, ligne ouverte 24h/24 ; depuis l'application H24, qui permet de créer la course et d'en suivre l'exécution ; ou par le formulaire de contact du site, avec une réponse sous 30 minutes ouvrées. Les éléments utiles sont la nature et le volume du matériel, les adresses d'enlèvement et de livraison, et le créneau imposé.",
  },
];

export const FAQ_MODE: FaqItem[] = [
  {
    question: "Qui transporte des vêtements sur cintre à Paris ?",
    answer:
      "H24 Transports transporte des vêtements sur cintre à Paris et en Île-de-France, dans des véhicules équipés de barres de penderie. Les pièces voyagent suspendues, sans être pliées ni tassées, entre showrooms, studios, ateliers et lieux de défilé.",
  },
  {
    question: "H24 Transports transporte-t-il des portants montés ?",
    answer:
      "Oui. H24 Transports embarque les portants montés tels quels, sans démontage ni transfert des pièces, grâce à des véhicules équipés penderie. C'est la solution utilisée pour les collections de showroom et les vestiaires de défilé, à Paris comme en Île-de-France.",
  },
  {
    question: "Qui assure le transport des collections pendant la Fashion Week à Paris ?",
    answer:
      "H24 Transports intervient pendant la Fashion Week parisienne pour le transport des collections, des portants et du matériel de défilé. La société opère 24 heures sur 24, ce qui couvre les montages de nuit et les rotations entre showrooms, backstages et lieux de présentation.",
  },
  {
    question: "Quand a lieu la Fashion Week à Paris ?",
    answer:
      "La Fashion Week parisienne se tient deux fois par an : en février-mars pour les collections automne-hiver, et en septembre-octobre pour le printemps-été. Ce sont les deux pics d'activité du transport de collections à Paris, périodes sur lesquelles H24 Transports intervient.",
  },
  {
    question: "En combien de temps une collection peut-elle être enlevée à Paris ?",
    answer: `H24 Transports annonce des délais d'intervention de ${DELAIS}. Un véhicule est dédié à une seule course, sans groupage ni passage par un centre de tri, ce qui permet un enlèvement de showroom à showroom sans rupture de charge.`,
  },
  {
    question: "H24 Transports livre-t-il les showrooms et les studios photo ?",
    answer:
      "Oui. H24 Transports assure les livraisons et enlèvements entre showrooms, studios photo, ateliers et salons professionnels, à Paris, en Île-de-France et partout en France. Chaque course est suivie par géolocalisation en temps réel.",
  },
];

export const FAQ_EXPRESS: FaqItem[] = [
  {
    question: "Qu'est-ce qu'un transport urgent exclusif ?",
    answer:
      "Un transport urgent exclusif est une course pour laquelle un véhicule entier est dédié à un seul client. Chez H24 Transports, le véhicule va directement du point d'enlèvement au point de livraison, sans escale, sans regroupement avec d'autres envois et sans passage par un centre de tri.",
  },
  {
    question: "Quelle différence entre une course dédiée et une messagerie classique ?",
    answer:
      "En messagerie classique, un colis est groupé avec d'autres et transite par des plateformes de tri, ce qui rallonge et rend le délai variable. En course dédiée chez H24 Transports, le véhicule ne transporte que votre envoi et roule en direct, ce qui rend le délai prévisible et évite les manipulations intermédiaires.",
  },
  {
    question: "En combien de temps un véhicule H24 peut-il être sur place ?",
    answer: `H24 Transports annonce des délais d'intervention de ${DELAIS}. Pour une urgence, le dispatch est joignable 24h/24 au 01 80 27 54 60.`,
  },
  {
    question: "Peut-on suivre une course H24 en temps réel ?",
    answer:
      "Oui. L'application H24 Transports affiche les statuts et l'estimation d'heure d'arrivée à chaque étape de la course, et notifie le client en cas d'imprévu. Les véhicules sont géolocalisés.",
  },
  {
    question: "H24 Transports assure-t-il des courses récurrentes ?",
    answer:
      "Oui. H24 Transports prend en charge les courses ponctuelles comme les courses récurrentes, standards ou spéciales, avec un service client dédié pour construire des solutions sur mesure.",
  },
];

export const FAQ_COLIS: FaqItem[] = [
  {
    question: "H24 Transports livre-t-il des palettes ?",
    answer:
      "Oui. H24 Transports prend en charge l'ensemble des formats, du pli et du document urgent jusqu'à la palette, en course express dédiée comme en livraison planifiée, à Paris, en Île-de-France et en France entière.",
  },
  {
    question: "Quels véhicules compose la flotte de H24 Transports ?",
    answer:
      "La flotte de H24 Transports comprend quatre formats : 3 m³ (415 kg de charge utile), 6 à 8 m³ (820 kg), 12 à 14 m³ (1 300 kg) et 20 m³ (700 kg, hayon inclus). Le format est choisi en fonction du volume, du poids et des contraintes d'accès du chargement.",
  },
  {
    question: "Quel est le délai de livraison d'un colis avec H24 Transports ?",
    answer: `Pour un envoi en course dédiée, H24 Transports annonce ${DELAIS}. Une livraison peut aussi être planifiée à une date et un créneau choisis.`,
  },
  {
    question: "Peut-on suivre un colis confié à H24 Transports ?",
    answer:
      "Oui. Chaque envoi confié à H24 Transports est traçable depuis l'application, avec les statuts d'avancement et l'estimation d'heure d'arrivée. Les véhicules sont géolocalisés.",
  },
];

export const FAQ_APPLICATION: FaqItem[] = [
  {
    question: "Comment commander un transport chez H24 Transports ?",
    answer:
      "Les commandes passent par l'application H24 Transports, accessible sur dashboard.h24transports.com. Elle permet de créer une course simple ou complexe, de choisir les options (matériel, créneaux, contraintes) et de réutiliser des modèles de course. Le dispatch reste joignable par téléphone 24h/24 au 01 80 27 54 60.",
  },
  {
    question: "Que permet de faire l'application H24 Transports ?",
    answer:
      "L'application H24 Transports réunit le carnet d'adresses et les contacts, la création de courses, le suivi des statuts et de l'heure d'arrivée estimée en temps réel, la facturation intégrée avec archivage, et la collaboration à plusieurs sur un même compte.",
  },
  {
    question: "Plusieurs personnes d'une même équipe peuvent-elles utiliser l'application ?",
    answer:
      "Oui. L'application H24 Transports est multi-utilisateur : plusieurs collaborateurs peuvent piloter les demandes et suivre l'activité d'un même compte entreprise.",
  },
  {
    question: "Où retrouver ses factures H24 Transports ?",
    answer:
      "Les factures sont accessibles directement dans l'application H24 Transports, qui intègre le paiement et l'archivage des documents de facturation.",
  },
];

export const FAQ_CONTACT: FaqItem[] = [
  {
    question: "Comment joindre H24 Transports en urgence ?",
    answer:
      "Pour une urgence, il faut appeler le dispatch H24 Transports au 01 80 27 54 60. La ligne est ouverte 24 heures sur 24 et 7 jours sur 7, y compris la nuit, le week-end et les jours fériés.",
  },
  {
    question: "Sous quel délai H24 Transports répond-il à une demande écrite ?",
    answer:
      "H24 Transports répond aux demandes envoyées par le formulaire de contact ou par e-mail à contact@h24transports.com sous 30 minutes ouvrées. Pour les demandes urgentes, l'appel téléphonique reste le canal le plus rapide.",
  },
  {
    question: "Où se trouve H24 Transports ?",
    answer:
      "H24 Transports est domiciliée 4 boulevard de Beaubourg, 77183 Croissy-Beaubourg, en Seine-et-Marne, et intervient à Paris, en Île-de-France et en France entière.",
  },
];

export const FAQ_A_PROPOS: FaqItem[] = [
  {
    question: "Depuis combien de temps H24 Transports existe-t-il ?",
    answer:
      "H24 Transports a été fondée en 2014 et exerce depuis dans le transport audiovisuel et événementiel, le transport urgent exclusif et la livraison de colis et palettes.",
  },
  {
    question: "Qui sont les clients de H24 Transports ?",
    answer:
      "H24 Transports travaille pour des productions audiovisuelles et cinématographiques, des agences de publicité, des maisons de mode et de luxe, des tournées et concerts, des salons professionnels et des studios. Parmi ses références publiques figurent Sézane, Nike, Balenciaga, Dior, Netflix et Apple TV.",
  },
  {
    question: "Comment H24 Transports sécurise-t-il les marchandises transportées ?",
    answer:
      "H24 Transports s'appuie sur des chauffeurs et manutentionnaires formés, des véhicules utilitaires adaptés au type de chargement, la géolocalisation des véhicules et du gardiennage vidéo-surveillé.",
  },
  {
    question: "H24 Transports propose-t-il un interlocuteur dédié ?",
    answer:
      "Oui. H24 Transports fonctionne avec un interlocuteur unique par client, pour un accompagnement sur mesure du devis jusqu'à la livraison.",
  },
];
