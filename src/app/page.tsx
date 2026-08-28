import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
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
  service({
    path: "/evenementiel",
    name: "Transport audiovisuel et événementiel",
    serviceType: "Transport de matériel audiovisuel et événementiel",
    description:
      "Transport de caméra, optiques, lumière, machinerie, décor et régie pour la publicité, le cinéma, la mode, le luxe, les concerts et les salons professionnels.",
    offers: ["Publicité & cinéma", "Mode & luxe", "Concert & salon"],
  }),
  service({
    path: "/express",
    name: "Transport urgent exclusif",
    serviceType: "Course urgente en véhicule dédié",
    description:
      "Un véhicule entièrement dédié à une seule course, du point d'enlèvement au point de livraison, sans escale ni groupage, avec suivi en temps réel.",
    offers: ["Course ponctuelle", "Course récurrente", "Course spéciale"],
  }),
  service({
    path: "/colis",
    name: "Livraison de plis, colis et palettes",
    serviceType: "Messagerie et coursier dédié",
    description:
      "Livraison de plis, documents, colis et palettes en course express dédiée ou en livraison planifiée, à Paris, en Île-de-France et en France entière.",
    offers: ["Pli & documents", "Colis & palette", "Coursier dédié"],
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
