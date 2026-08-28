import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PageHeader } from "@/components/sections/PageHeader";
import { Values } from "@/components/sections/Values";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_EXPRESS } from "@/data/faq";
import { getPage } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumb, faqPage, graph, service, webPage } from "@/lib/schema";

const PAGE = getPage("/express");

export const metadata: Metadata = pageMetadata({
  path: PAGE.path,
  title: "Coursier express & transport urgent à Paris",
  description:
    "Coursier express et transport urgent à Paris : un véhicule dédié à votre seule course, sans groupage. Enlèvement en 1 h dans Paris, partout en France en 12 h.",
});

const jsonLd = graph(
  webPage({
    path: PAGE.path,
    name: "Coursier express & transport urgent à Paris",
    description: PAGE.summary,
    dateModified: PAGE.updated,
  }),
  breadcrumb(PAGE.path, [{ name: PAGE.label, path: PAGE.path }]),
  service({
    path: PAGE.path,
    name: "Transport urgent exclusif",
    serviceType: "Coursier express et course urgente en véhicule dédié",
    description:
      "Un véhicule entièrement dédié à une seule course, du point d'enlèvement au point de livraison, sans escale, sans groupage ni passage par un centre de tri, avec suivi en temps réel.",
    offers: ["Course ponctuelle", "Course récurrente", "Course spéciale", "Course standard"],
  }),
  faqPage(PAGE.path, FAQ_EXPRESS),
);

export default function ExpressPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <RevealOnScroll />
      {/* Photo d'en-tête prise à l'heure bleue, déjà très sombre : le tone
          "dark" l'effaçait sous le scrim, d'où "bright" + halo désactivé
          (le phare du véhicule fait déjà la source lumineuse). */}
      <PageHeader
        num="02"
        eyebrow="Univers · Coursier & urgent exclusif"
        title="Du Point A au Point B."
        accent="Sans escale."
        lead="Coursier express à Paris et en Île-de-France : un véhicule entièrement dédié à votre course, sans groupage ni centre de tri. Courses ponctuelles, récurrentes ou spéciales, 24h/24."
        image="/images/express/van-motion.webp"
        imageAlt="Fourgon H24 Transports en course dans une rue de ville, à la tombée du jour"
        imagePosition="50% 78%"
        glow={false}
        photoTone="bright"
      />
      <section className="categories">
        <div className="container">
          <div className="categories-grid reveal-stagger">
            <div className="category-card">
              <div className="mono dim">// catégorie 01</div>
              <h3 className="display-m" style={{ marginTop: 16 }}>
                Express exclusif
              </h3>
              <p className="dim" style={{ marginTop: 18, lineHeight: 1.6 }}>
                Un véhicule dédié, du Point A au Point B, sans détour ni regroupement.
                Idéal pour les envois sensibles, urgents ou de grande valeur.
              </p>
              <div className="category-stat">
                <span className="display-l accent tnum">H-1</span>
                <span className="mono dim">Paris intramuros</span>
              </div>
            </div>
            <div className="category-card">
              <div className="mono dim">// catégorie 02</div>
              <h3 className="display-m" style={{ marginTop: 16 }}>
                Tournée navette
              </h3>
              <p className="dim" style={{ marginTop: 18, lineHeight: 1.6 }}>
                Tournées planifiées et récurrentes. Optimisation des trajets pour
                réduire empreinte carbone et coûts logistiques.
              </p>
              <div className="category-stat">
                <span className="display-l accent tnum">7j/7</span>
                <span className="mono dim">Service continu</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Values
        values={[
          {
            title: "Rapidité",
            text: "Garantie de livraison rapide et fiable à chaque mission entreprise.",
          },
          {
            title: "Fiabilité",
            text: "Une flotte de véhicules adaptée à tous les besoins, opérée par des professionnels qualifiés.",
          },
          {
            title: "Ponctualité",
            text: "L'heure d'arrivée est notre priorité absolue, conformément aux exigences de votre secteur.",
          },
          {
            title: "Flexibilité",
            text: "24h/24 et 7j/7. Nos équipes adaptent leur approche aux imprévus et aux contraintes d'organisation.",
          },
        ]}
      />
      <Faq items={FAQ_EXPRESS} />
      <Cta />
    </>
  );
}
