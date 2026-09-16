import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Campaign } from "@/components/sections/Campaign";
import { Hero } from "@/components/sections/Hero";
import { Universes } from "@/components/sections/Universes";
import { Fleet } from "@/components/sections/Fleet";
import { Zones } from "@/components/sections/Zones";
import { Testimonials } from "@/components/sections/Testimonials";
import { Clients } from "@/components/sections/Clients";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_HOME } from "@/data/faq";
import { getPage } from "@/data/pages";
import { TESTIMONIALS } from "@/data/testimonials";
import { faqPage, graph, review, service, webPage } from "@/lib/schema";

const PAGE = getPage("/");

/**
 * Le bloc « temps fort » (`Campaign`) dépend de la date du rendu : sans
 * revalidation, la page prégénérée afficherait éternellement la campagne du
 * dernier build — et continuerait à annoncer un code promo expiré. Une heure
 * suffit largement, les fenêtres d'affichage se comptent en jours.
 */
export const revalidate = 3600;

export const metadata: Metadata = {
  description:
    "Transport audiovisuel, événementiel et urgent exclusif, disponible 24/7 en Île-de-France. Flotte dédiée, chauffeurs expérimentés et logistique sur mesure pour vos productions et vos courses sensibles.",
  alternates: { canonical: "/" },
};

/**
 * L'accueil porte le catalogue de services : c'est la page que les moteurs
 * génératifs rattachent à la question « qui fait X à Paris ». Les avis sont
 * balisés en `Review` avec leur note et leur date réelles, reprises de la
 * fiche Google — sans `aggregateRating`, que Google ignore quand une
 * entreprise le publie à propos d'elle-même (cf. `src/lib/schema.ts`).
 * Google n'affichera donc pas d'étoiles dans les résultats ; la valeur est
 * ici l'ancrage des réponses génératives.
 */
const jsonLd = graph(
  webPage({
    path: "/",
    name: PAGE.label,
    description: PAGE.summary,
    dateModified: PAGE.updated,
    hasBreadcrumb: false,
  }),
  /*
   * ⚠️ Les `@id` de ces nœuds sont `<url de la page>#service` : ils sont
   * **partagés** avec les pages de service elles-mêmes. Toute modification
   * ici doit rester strictement identique à celle du nœud déclaré par la
   * page correspondante, sinon la même entité arrive au moteur avec deux
   * descriptions différentes selon la page crawlée.
   *
   * Depuis le 2026-09-16, l'audiovisuel et l'événementiel sont deux services
   * distincts, portés par deux pages distinctes (cf. le commentaire de
   * `/transport-materiel-audiovisuel-paris`).
   */
  service({
    path: "/transport-materiel-audiovisuel-paris",
    name: "Transport de matériel audiovisuel",
    serviceType: "Transport de matériel audiovisuel et de tournage",
    description:
      "Transport de caméras, optiques, lumière, machinerie, décors et régie sur les lieux de tournage, en course dédiée et 24h/24, à Paris, en Île-de-France et en France entière. Flotte de 3 à 20 m³ avec hayon sur les grands formats, stockage sécurisé et suivi géolocalisé.",
    offers: [
      "Transport de caméras, optiques et matériel vidéo",
      "Transport de lumière et de matériel électro",
      "Transport de machinerie, grip et accessoires",
      "Transport de décors et de régie",
      "Transport dédié sans rupture de charge",
      "Stockage et gardiennage sécurisé de matériel audiovisuel",
    ],
  }),
  service({
    path: "/evenementiel",
    name: "Transport et logistique événementielle",
    serviceType: "Transport de matériel événementiel",
    description:
      "Transport de matériel technique, de décor, de mobilier et de régie pour les concerts, les tournées, les festivals, les salons professionnels et les opérations de marque, à Paris, en Île-de-France et partout en France, 24h/24.",
    offers: [
      "Concert & tournée",
      "Salon professionnel",
      "Opération de marque",
      "Décor & régie",
    ],
  }),
  /*
   * ⚠️ Les deux nœuds ci-dessous divergeaient de ceux déclarés par `/express`
   * et `/colis` (relevé le 2026-09-16) : même `@id`, mais un `serviceType`,
   * une description et un `offers` plus courts d'une entrée. Selon la page
   * qu'il crawlait, un moteur recevait donc deux définitions du même service.
   * Ils sont désormais alignés au mot sur ceux des pages concernées — toute
   * modification doit l'être des deux côtés.
   */
  service({
    path: "/express",
    name: "Transport urgent exclusif",
    serviceType: "Coursier express et course urgente en véhicule dédié",
    description:
      "Un véhicule entièrement dédié à une seule course, du point d'enlèvement au point de livraison, sans escale, sans groupage ni passage par un centre de tri, avec suivi en temps réel.",
    offers: ["Course ponctuelle", "Course récurrente", "Course spéciale", "Course standard"],
  }),
  service({
    path: "/colis",
    name: "Livraison de plis, colis et palettes",
    serviceType: "Messagerie et coursier dédié",
    description:
      "Livraison de plis, documents, colis et palettes en course express dédiée ou en livraison planifiée, à Paris, en Île-de-France et en France entière, avec suivi en temps réel.",
    offers: ["Pli & documents", "Colis & palette", "Coursier dédié", "Tournée planifiée"],
  }),
  faqPage("/", FAQ_HOME),
  ...TESTIMONIALS.map((testimonial) =>
    review({
      body: testimonial.body,
      authorName: testimonial.name,
      rating: testimonial.rating,
      datePublished: testimonial.datePublished,
    }),
  ),
);

export default function HomePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <RevealOnScroll />
      <Hero />
      <Campaign />
      <Universes />
      <Fleet />
      <Zones />
      <Testimonials />
      <Clients />
      <Faq items={FAQ_HOME} />
      <Cta />
    </>
  );
}
