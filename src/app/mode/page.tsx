import type { Metadata } from "next";

import { Cta } from "@/components/sections/Cta";
import { Faq } from "@/components/sections/Faq";
import { PageHeader } from "@/components/sections/PageHeader";
import { Values } from "@/components/sections/Values";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_MODE } from "@/data/faq";
import { getPage } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumb, faqPage, graph, service, webPage } from "@/lib/schema";

const PAGE = getPage("/mode");

export const metadata: Metadata = pageMetadata({
  path: PAGE.path,
  title: "Transport mode & vêtements sur cintre à Paris",
  description:
    "Transport de vêtements sur cintre et de portants à Paris : showroom, défilé, Fashion Week et shooting. Véhicules équipés penderie, enlèvement en 1 h dans Paris.",
});

const jsonLd = graph(
  webPage({
    path: PAGE.path,
    name: "Transport mode & vêtements sur cintre à Paris",
    description: PAGE.summary,
    dateModified: PAGE.updated,
  }),
  /*
   * Fil d'Ariane volontairement imbriqué sous /evenementiel plutôt que posé
   * à la racine : la mode est l'une des trois familles déjà annoncées par la
   * page événementiel, et cette hiérarchie dit au moteur que les deux pages
   * traitent du même sujet à deux niveaux de précision — au lieu de les
   * laisser se concurrencer sur les mêmes requêtes.
   */
  breadcrumb(PAGE.path, [
    { name: "Événementiel", path: "/evenementiel" },
    { name: PAGE.label, path: PAGE.path },
  ]),
  service({
    path: PAGE.path,
    name: "Transport mode et luxe",
    serviceType: "Transport de vêtements sur cintre et de collections",
    description:
      "Transport de vêtements sur cintre, de portants montés, de collections et de matériel de défilé, en véhicule équipé penderie, pour les showrooms, les studios photo, les défilés et les salons professionnels.",
    offers: [
      "Défilé & Fashion Week",
      "Showroom & collection",
      "Shooting & studio",
      "Salon professionnel",
    ],
  }),
  faqPage(PAGE.path, FAQ_MODE),
);

/** Cas d'usage réellement couverts — confirmés par Peter le 2026-08-28. */
const CAS = [
  {
    num: "01",
    titre: "Défilé & Fashion Week",
    texte:
      "Collections, portants et matériel de défilé acheminés vers les backstages et les lieux de présentation. Montages et démontages de nuit compris.",
    stat: "Fév · Sept",
    statLabel: "Les deux saisons",
  },
  {
    num: "02",
    titre: "Showroom & collection",
    texte:
      "Rotations entre showrooms, sièges de marque et ateliers. Les portants partent montés et arrivent montés, sans transfert de pièces.",
    stat: "H-1",
    statLabel: "Paris intramuros",
  },
  {
    num: "03",
    titre: "Shooting & studio",
    texte:
      "Acheminement des collections et du matériel vers les studios photo, avec attente sur place ou reprise en fin de séance.",
    stat: "24h/24",
    statLabel: "Service continu",
  },
  {
    num: "04",
    titre: "Salon professionnel",
    texte:
      "Livraison et reprise des stands, portants et collections sur les salons du secteur, dans les créneaux de montage imposés.",
    stat: "7j/7",
    statLabel: "Montage & reprise",
  },
];

/** Les trois contraintes propres au textile suspendu. */
const CONTRAINTES = [
  {
    tag: "penderie",
    titre: "Barre de penderie, pas de pliage",
    texte:
      "Les véhicules sont équipés de barres de penderie. Les pièces voyagent suspendues, ni pliées ni tassées — la contrainte première du textile, qu'un fourgon nu ne sait pas tenir.",
  },
  {
    tag: "portants",
    titre: "Portants montés, embarqués tels quels",
    texte:
      "Le portant du client monte dans le véhicule sans être démonté et sans que les pièces changent de cintre. Moins de manipulation, moins de risque, et un temps de chargement divisé.",
  },
  {
    tag: "course dédiée",
    titre: "De showroom à showroom, sans rupture",
    texte:
      "Un véhicule pour une seule course : pas de groupage, pas de centre de tri, aucun contact avec d'autres marchandises entre l'enlèvement et la livraison.",
  },
];

export default function ModePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <RevealOnScroll />
      <PageHeader
        num="05"
        eyebrow="Univers · Mode & Luxe"
        title="La collection arrive."
        accent="Sans un pli."
        lead="Vêtements sur cintre, portants montés, collections et matériel de défilé — dans des véhicules équipés penderie. Pour les showrooms, les studios et la Fashion Week, à Paris, en Île-de-France et partout en France."
      />

      <section className="categories">
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">Ce qu&apos;on transporte</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Quatre moments
                <br />
                de la saison.
              </h2>
            </div>
            <div className="right">
              Du showroom au défilé, du studio au salon — les mêmes pièces, des
              contraintes de délai et de manipulation à chaque fois différentes.
            </div>
          </div>
          <div className="categories-grid reveal-stagger">
            {CAS.map((c) => (
              <div className="category-card" key={c.num}>
                <div className="mono dim">// cas {c.num}</div>
                <h3 className="display-m" style={{ marginTop: 16 }}>
                  {c.titre}
                </h3>
                <p className="dim" style={{ marginTop: 18, lineHeight: 1.6 }}>
                  {c.texte}
                </p>
                <div className="category-stat">
                  <span className="display-l accent tnum">{c.stat}</span>
                  <span className="mono dim">{c.statLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="split-feature">
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">La contrainte textile</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Une pièce froissée
                <br />
                est une pièce perdue.
              </h2>
            </div>
            <div className="right">
              Un vêtement de collection ne se transporte pas comme un colis. Il
              ne se plie pas, ne se superpose pas, et ne supporte ni le
              frottement ni l&apos;attente en soute.
            </div>
          </div>
          <div className="app-features reveal-stagger">
            {CONTRAINTES.map((c) => (
              <div className="app-feature" key={c.tag}>
                <span className="mono dim">// {c.tag}</span>
                <h3 className="display-s" style={{ marginTop: 14 }}>
                  {c.titre}
                </h3>
                <p className="dim" style={{ marginTop: 12, lineHeight: 1.6 }}>
                  {c.texte}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="categories" style={{ background: "var(--bg-1)" }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">Le calendrier</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Deux pics.
                <br />
                Rien entre les deux.
              </h2>
            </div>
            <div className="right">
              Le transport mode à Paris ne s&apos;étale pas dans l&apos;année :
              il se concentre sur les semaines de collection, où tout part en
              même temps et où un retard ne se rattrape pas.
            </div>
          </div>
          <div className="categories-grid reveal-stagger">
            <div className="category-card">
              <div className="mono dim">// saison 01</div>
              <h3 className="display-m" style={{ marginTop: 16 }}>
                Février — mars
              </h3>
              <p className="dim" style={{ marginTop: 18, lineHeight: 1.6 }}>
                Les collections automne-hiver. Défilés, présentations presse et
                rotations de showroom sur trois semaines pleines.
              </p>
              <div className="category-stat">
                <span className="display-l accent tnum">AH</span>
                <span className="mono dim">Automne-hiver</span>
              </div>
            </div>
            <div className="category-card">
              <div className="mono dim">// saison 02</div>
              <h3 className="display-m" style={{ marginTop: 16 }}>
                Septembre — octobre
              </h3>
              <p className="dim" style={{ marginTop: 18, lineHeight: 1.6 }}>
                Les collections printemps-été. Même intensité, mêmes créneaux
                contraints, souvent les mêmes adresses.
              </p>
              <div className="category-stat">
                <span className="display-l accent tnum">PE</span>
                <span className="mono dim">Printemps-été</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Values
        values={[
          {
            title: "Manipulation",
            text: "Des chauffeurs habitués au textile suspendu : on ne pose pas une collection, on la raccroche.",
          },
          {
            title: "Exclusivité",
            text: "Un véhicule dédié à une seule course, sans groupage ni passage par un centre de tri.",
          },
          {
            title: "Traçabilité",
            text: "Géolocalisation en temps réel de l'enlèvement à la livraison, consultable depuis l'application.",
          },
          {
            title: "Disponibilité",
            text: "24h/24 et 7j/7 — les montages de nuit et les créneaux de salon imposés font partie du métier.",
          },
        ]}
      />

      <Faq items={FAQ_MODE} />
      <Cta />
    </>
  );
}
