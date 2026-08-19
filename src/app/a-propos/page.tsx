import type { Metadata } from "next";
import { Counter } from "@/components/ui/Counter";
import { PageHeader } from "@/components/sections/PageHeader";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_A_PROPOS } from "@/data/faq";
import { getPage } from "@/data/pages";
import { ORG_ID, breadcrumb, faqPage, graph, webPage } from "@/lib/schema";

const PAGE = getPage("/a-propos");

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Depuis 2014, H24 Transports propose un service unique et dédié à une clientèle exigeante : logistique audiovisuelle et événementielle, transport urgent exclusif, disponibilité 24h/24 et 7j/7.",
  alternates: { canonical: "/a-propos" },
};

/**
 * `mainEntity` pointe vers l'organisation : c'est la page qui *parle de*
 * l'entreprise. Ce signal aide un moteur génératif à choisir cette URL comme
 * source quand la question porte sur l'identité de H24 Transports.
 */
const jsonLd = graph(
  {
    ...webPage({
      path: PAGE.path,
      name: "À propos de H24 Transports",
      description: PAGE.summary,
      dateModified: PAGE.updated,
    }),
    "@type": "AboutPage",
    mainEntity: { "@id": ORG_ID },
  },
  breadcrumb(PAGE.path, [{ name: PAGE.label, path: PAGE.path }]),
  faqPage(PAGE.path, FAQ_A_PROPOS),
);

const aboutRows = [
  {
    num: "01",
    title: "Un service personnalisé pour répondre à vos besoins spécifiques",
    text: "Depuis 2014, H24 Transports propose un service unique et dédié à une clientèle exigeante. Nous mettons tout en œuvre pour offrir une expérience client personnalisée, avec un interlocuteur unique pour un accompagnement sur mesure. Nos chauffeurs et manutentionnaires formés utilisent des véhicules utilitaires adaptés à vos besoins.",
  },
  {
    num: "02",
    title: "La qualité de service, notre priorité absolue",
    text: "Notre priorité est la qualité de service. Nous nous engageons à mener à bien chaque mission, en toute flexibilité et disponibilité 24h/24 et 7j/7, tout en garantissant une sécurité optimale grâce à nos solutions de géolocalisation et de gardiennage vidéo-surveillé.",
  },
  {
    num: "03",
    title: "Des solutions de transport spécifiques pour des besoins particuliers",
    text: "Notre expertise nous a permis de développer deux services spécifiques : la logistique audiovisuelle et événementielle, ainsi que le transport urgent exclusif. Et pour mieux répondre à vos besoins, nous avons développé une exploitation web/mobile pour un suivi précis grâce à un tableau de bord intuitif.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <RevealOnScroll />
      <PageHeader
        num="H24"
        tag="/ société / depuis 2014"
        eyebrow="À propos"
        title="Depuis 2014."
        accent="Sur la route, sans relâche."
        lead="Chez H24 Transports, votre satisfaction est notre engagement. Un service unique et dédié à une clientèle exigeante en quête de prestations de qualité."
        image="/images/apropos/truck-night.webp"
      />
      <section className="about-stats">
        <div className="container">
          <div className="stats-line reveal-stagger">
            <div className="stat-block">
              <div className="display-xl tnum">
                <Counter value="2014" />
              </div>
              <div className="mono dim">Année de création</div>
            </div>
            <div className="stat-block">
              <div className="display-xl tnum">
                <Counter value="657" />
              </div>
              <div className="mono dim">Clients récurrents</div>
            </div>
            <div className="stat-block">
              <div className="display-xl tnum">
                <Counter value="35" suffix="K" />
              </div>
              <div className="mono dim">Courses réalisées</div>
            </div>
            <div className="stat-block">
              <div className="display-xl accent">24/7</div>
              <div className="mono dim">Disponibilité totale</div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          {aboutRows.map((c) => (
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
      <Faq items={FAQ_A_PROPOS} />
      <Cta />
    </>
  );
}
