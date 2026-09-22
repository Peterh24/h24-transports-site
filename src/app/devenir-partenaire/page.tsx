import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { PartnerForm } from "@/components/sections/PartnerForm";
import { Faq } from "@/components/sections/Faq";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_PARTENAIRE } from "@/data/faq";
import { SITE } from "@/data/site";
import { getPage } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumb, faqPage, graph, webPage } from "@/lib/schema";

const PAGE = getPage("/devenir-partenaire");

export const metadata: Metadata = pageMetadata({
  path: PAGE.path,
  title: "Devenir partenaire transporteur",
  description:
    "H24 Transports, commissionnaire de transport, recrute des transporteurs affrétés à Paris et en Île-de-France. Candidature en ligne : licence, véhicule et zone d'intervention.",
});

const jsonLd = graph(
  webPage({
    path: PAGE.path,
    name: "Devenir partenaire transporteur",
    description: PAGE.summary,
    dateModified: PAGE.updated,
  }),
  breadcrumb(PAGE.path, [{ name: PAGE.label, path: PAGE.path }]),
  faqPage(PAGE.path, FAQ_PARTENAIRE),
);

/**
 * Trois apports, pas quatre : `<Values>` a été essayé ici, mais sa grille est
 * câblée en dur sur 4 colonnes (`.values-grid { grid-template-columns:
 * repeat(4, 1fr) }`) et laisse une case vide visible avec 3 éléments. Plutôt
 * qu'inventer un quatrième argument pour la remplir, on reprend le motif de
 * lignes numérotées de `/a-propos` (`.about-row`), qui accepte n'importe
 * quel nombre d'entrées.
 */
const CONTRIBUTIONS = [
  {
    num: "01",
    title: "Des missions récurrentes",
    text: "En tant que commissionnaire de transport, H24 Transports confie à ses transporteurs partenaires des missions récurrentes dans l'audiovisuel, l'événementiel et le transport urgent exclusif.",
  },
  {
    num: "02",
    title: "Un interlocuteur unique",
    text: "Le dispatch H24 Transports reste l'interlocuteur unique du partenaire, du déclenchement de la mission jusqu'à son exécution, joignable 24 heures sur 24 et 7 jours sur 7.",
  },
  {
    num: "03",
    title: "Une zone resserrée",
    text: "Les missions confiées aux transporteurs partenaires se concentrent sur Paris et l'Île-de-France, sans dispersion sur un territoire trop large.",
  },
];

const EXPECTATIONS = [
  "Une licence de transport valide : intérieur (jusqu'à 3,5 t) ou communautaire (au-delà de 3,5 t).",
  "Un ou plusieurs véhicules adaptés aux missions confiées, du véhicule léger de 3 m³ au semi-remorque, selon l'activité.",
  "Une zone d'intervention déclarée : Paris, Île-de-France, France entière ou international.",
  "Le cas échéant, une disponibilité en dehors des horaires classiques, pour répondre aux missions urgentes signalées par le dispatch.",
];

export default function DevenirPartenairePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <RevealOnScroll />
      <PageHeader
        tag="/ partenaires / affrètement"
        eyebrow="Devenir partenaire"
        title="Roulez"
        accent="pour H24 Transports."
        lead="H24 Transports, commissionnaire de transport, recrute des transporteurs affrétés pour accompagner ses missions audiovisuelles, événementielles et urgentes à Paris et en Île-de-France."
      />

      <section>
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">Ce que nous apportons</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Un partenariat,
                <br />
                <span className="accent">pas une sous-traitance de plus.</span>
              </h2>
            </div>
          </div>
          {CONTRIBUTIONS.map((c) => (
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

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">Ce que nous attendons</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Avant de candidater,
                <br />
                <span className="accent">quatre points à vérifier.</span>
              </h2>
            </div>
          </div>
          <p className="dim" style={{ lineHeight: 1.7 }}>
            H24 Transports étudie chaque candidature de transporteur affrété au
            regard de quatre points&nbsp;:
          </p>
          {/* .cgv-list : même traitement que la liste de src/app/cgv/page.tsx,
              réutilisé tel quel plutôt que dupliqué en styles locaux. */}
          <ul className="cgv-list dim">
            {EXPECTATIONS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact">
        <div className="container">
          <div className="contact-grid reveal">
            <div className="contact-info">
              <div className="contact-block">
                <div className="mono dim">// dispatch 24/7</div>
                <a
                  href={SITE.phoneHref}
                  className="display-m tnum"
                  style={{ display: "block", marginTop: 8 }}
                >
                  {SITE.phone}
                </a>
              </div>
              <div className="contact-block">
                <div className="mono dim">// candidature</div>
                <p className="dim" style={{ marginTop: 8, lineHeight: 1.7 }}>
                  Complétez le formulaire ci-contre avec les informations de
                  votre entreprise, votre licence de transport et vos
                  véhicules. H24 Transports revient vers les candidats dont le
                  profil correspond à ses besoins.
                </p>
              </div>
            </div>

            <PartnerForm />
          </div>
        </div>
      </section>

      <Faq items={FAQ_PARTENAIRE} />
    </>
  );
}
