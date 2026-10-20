import type { Metadata } from "next";
import Link from "next/link";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PageHeader } from "@/components/sections/PageHeader";
import { Values } from "@/components/sections/Values";
import { Faq } from "@/components/sections/Faq";
import { Fleet } from "@/components/sections/Fleet";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { ServiceZones } from "@/components/sections/ServiceZones";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_EXPRESS } from "@/data/faq";
import { getPage } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumb, faqPage, graph, service, webPage } from "@/lib/schema";

const PAGE = getPage("/express");

/**
 * Référencement retravaillé le 2026-10-20.
 *
 * Sur « coursier express transport urgent Paris », la page ne sortait pas des
 * 20 premiers résultats : la requête est tenue par des sites de coursiers à
 * deux-roues, et le H1 (« Du Point A au Point B. ») ne portait aucun mot
 * cherché. La page vise désormais « coursier urgent à Paris » avec ce qui la
 * distingue réellement : un utilitaire dédié de 3 à 20 m³, 24h/24. La formule
 * de marque passe en seconde ligne du H1.
 */
export const metadata: Metadata = pageMetadata({
  path: PAGE.path,
  title: "Coursier urgent à Paris, course dédiée 24h/24",
  description:
    "Coursier urgent à Paris : un utilitaire de 3 à 20 m³ dédié à votre seule course, sans groupage, 24h/24 et 7j/7. Sur place en 1 h dans Paris, 3 h en Île-de-France.",
});

const jsonLd = graph(
  webPage({
    path: PAGE.path,
    name: "Coursier urgent à Paris, course dédiée 24h/24",
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

/**
 * Cas d'usage d'une course dédiée. Ce sont des situations types, pas des
 * références clients : aucune n'affirme un chiffre ni un nom.
 */
const CAS = [
  {
    num: "01",
    title: "Une activité à l'arrêt",
    text: "Une pièce, un outil ou une fourniture manque et bloque une production, un chantier ou une boutique. Le véhicule part dès l'enlèvement et roule en direct.",
  },
  {
    num: "02",
    title: "Un oubli avant l'ouverture",
    text: "Du matériel ou des documents restés à l'atelier la veille d'un salon, d'un tournage ou d'un défilé. Le dispatch cale l'enlèvement sur l'heure d'ouverture du lieu.",
  },
  {
    num: "03",
    title: "Un envoi sensible",
    text: "Un original à remettre, un objet de valeur, un prototype : un seul envoi à bord, sans centre de tri ni manipulation intermédiaire, avec la signature du destinataire possible à la livraison.",
  },
  {
    num: "04",
    title: "La nuit et le week-end",
    text: "Quand la messagerie classique est fermée, le dispatch H24 Transports répond 24h/24 et 7j/7 et une course peut partir à toute heure.",
  },
];

export default function ExpressPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <RevealOnScroll />
      {/* Photo d'en-tête prise à l'heure bleue, déjà très sombre : le tone
          "dark" l'effaçait sous le scrim, d'où "bright" + halo désactivé
          (le phare du véhicule fait déjà la source lumineuse). */}
      <PageHeader
        eyebrow="Univers · Coursier & urgent exclusif"
        title={"Coursier urgent à Paris."}
        accent="Du Point A au Point B, sans escale."
        lead="Coursier express à Paris et en Île-de-France : un utilitaire entièrement dédié à votre course, sans groupage ni centre de tri. Courses ponctuelles, récurrentes ou spéciales, 24h/24 et 7j/7."
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
      {/* Ce qui distingue la page des coursiers à deux-roues qui tiennent la
          requête : le véhicule. Cotes et charges réelles (src/data/vehicles.ts). */}
      <Fleet
        eyebrow="Coursier en utilitaire"
        title={
          <>
            Un utilitaire,
            <br />
            pas un scooter.
          </>
        }
        intro="Une course urgente ne tient pas toujours dans un top-case. Quatre formats de 3 à 20 m³, de 415 à 1 300 kg de charge utile, géolocalisés, hayon inclus sur les deux plus grands."
      />
      <section className="about-content">
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">Quand appeler</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Coursier urgent,
                <br />
                à toute heure.
              </h2>
            </div>
            <div className="right">
              Une course dédiée sert quand la messagerie du lendemain arrive
              trop tard. Quatre situations reviennent le plus souvent.
            </div>
          </div>
          {CAS.map((c) => (
            <div className="about-row reveal" key={c.num}>
              <div className="about-row-num">{c.num}</div>
              <div className="about-row-title">
                <h3 className="display-m">{c.title}</h3>
              </div>
              <div className="about-row-text">
                <p className="dim" style={{ lineHeight: 1.7 }}>
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ServiceZones
        title={
          <>
            Coursier à Paris
            <br />
            et en Île-de-France.
          </>
        }
        intro="Les délais courent depuis la prise en charge de la demande par le dispatch, joignable 24h/24 au 01 80 27 54 60."
        note={
          <>
            Au-delà de l&apos;Île-de-France, la course part de Paris et roule
            en direct jusqu&apos;à destination, partout en France. Pour un
            envoi qui peut attendre un créneau, la{" "}
            <Link href="/colis" className="link">
              livraison planifiée de colis et palettes
            </Link>{" "}
            est plus adaptée.
          </>
        }
      />
      {/* Lien vers la page pilier audiovisuelle : le remplacement de matériel
          en cours de tournage est le cas d'urgence le plus fréquent du
          secteur, donc le contexte le plus naturel pour ce lien. /express
          garde son intention propre — la course dédiée urgente, tous secteurs
          confondus — et ne revendique pas l'audiovisuel. */}
      <Values
        intro={
          <>
            La course dédiée sert tous les secteurs. Quand l&apos;urgence
            concerne une caméra, un projecteur ou du matériel de plateau, le
            détail est sur la page{" "}
            <Link href="/transport-materiel-audiovisuel-paris" className="link">
              transport pour vos productions
            </Link>
            .
          </>
        }
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
      <RelatedServices current="/express" />
      <Faq items={FAQ_EXPRESS} />
      <Cta />
    </>
  );
}
