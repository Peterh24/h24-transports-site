import type { Metadata } from "next";
import Image from "next/image";
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
import { PARTNER_OG_ALT } from "./og-card";

const PAGE = getPage("/devenir-partenaire");

/**
 * Titre et description écrits dans les mots d'un transporteur qui cherche du
 * travail, pas dans ceux de H24 : « transporteur affrété », « sous-traitance ».
 * « Devenir partenaire » est le libellé de navigation, pas une requête tapée.
 */
export const metadata: Metadata = pageMetadata({
  path: PAGE.path,
  title: "Devenir transporteur affrété à Paris",
  description:
    "H24 Transports, commissionnaire de transport, recrute des transporteurs affrétés en sous-traitance à Paris et en Île-de-France. Candidature en ligne.",
  socialImageAlt: PARTNER_OG_ALT,
});

const jsonLd = graph(
  webPage({
    path: PAGE.path,
    name: "Devenir transporteur affrété à Paris",
    description: PAGE.summary,
    dateModified: PAGE.updated,
  }),
  breadcrumb(PAGE.path, [{ name: PAGE.label, path: PAGE.path }]),
  faqPage(PAGE.path, FAQ_PARTENAIRE),
);

/**
 * Trois apports, rendus dans la colonne texte d'un `split-grid`, sur le
 * modèle exact du bloc « contraintes » de `/mode` : étiquette mono, titre,
 * paragraphe, séparés par un filet. La première version de la page les
 * présentait en lignes numérotées pleine largeur (`.about-row`), sans aucun
 * visuel : la page était la seule du site sans photo, et se lisait comme une
 * fiche administrative. `<Values>` avait aussi été écarté, sa grille étant
 * câblée sur 4 colonnes et laissant une case vide avec 3 éléments.
 */
const CONTRIBUTIONS = [
  {
    tag: "missions",
    title: "Des missions récurrentes",
    text: "En tant que commissionnaire de transport, H24 Transports confie à ses transporteurs affrétés des missions récurrentes dans l'audiovisuel, l'événementiel et le transport urgent exclusif.",
  },
  {
    tag: "dispatch",
    title: "Un interlocuteur unique",
    text: "Le dispatch H24 Transports reste l'interlocuteur unique du transporteur partenaire, du déclenchement de la mission jusqu'à son exécution, joignable 24 heures sur 24 et 7 jours sur 7.",
  },
  {
    tag: "zone",
    title: "Une zone resserrée",
    text: "Les missions sous-traitées se concentrent sur Paris et l'Île-de-France, sans dispersion sur un territoire trop large.",
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
      {/*
        Deux cadrages de la même scène (Paris de nuit depuis l'Arc de
        Triomphe, Pexels, cf. public/images/CREDITS.md) : paysage au-dessus de
        900 px, portrait en dessous, servis par le `<picture>` de PageHeader
        comme sur /transport-materiel-audiovisuel-paris. `imagePosition` remonte
        légèrement le cadrage pour garder la ligne d'horizon de La Défense
        quand l'en-tête est plus large que haut.

        Le h1 porte le mot que tape un transporteur (« affrété ») tout en
        gardant la forme interrogative des autres en-têtes (« Une mission ? »
        sur /contact).
      */}
      <PageHeader
        tag="/ partenaires / affrètement"
        eyebrow="Devenir partenaire"
        title="Transporteur affrété ?"
        accent="Roulez pour H24 Transports."
        lead="H24 Transports, commissionnaire de transport, recrute des transporteurs affrétés pour accompagner ses missions audiovisuelles, événementielles et urgentes à Paris et en Île-de-France."
        image="/images/partenaires/paris-nuit.webp"
        imageMobile="/images/partenaires/paris-nuit-mobile.webp"
        imageAlt="Paris la nuit vu depuis l'Arc de Triomphe, avenue de la Grande-Armée éclairée et tours de La Défense à l'horizon"
        imagePosition="50% 40%"
        glow={false}
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
            {/* Paragraphe autoportant, écrit pour être cité tel quel par un
                moteur génératif : le sujet est nommé, le rôle est défini, la
                zone et les métiers sont explicites. */}
            <div className="right">
              H24 Transports exerce comme commissionnaire de transport : il
              organise les transports de ses clients de l&apos;audiovisuel, de
              l&apos;événementiel et de l&apos;urgence, et sous-traite
              l&apos;exécution d&apos;une partie des missions à des
              transporteurs affrétés, à Paris et en Île-de-France, sous la
              coordination de son dispatch 24h/24.
            </div>
          </div>
          {/* Photo à droite ici, à gauche dans la section suivante : les deux
              blocs alternent pour ne pas répéter la même composition. */}
          <div className="split-grid reveal">
            <div>
              {CONTRIBUTIONS.map((c, i) => (
                <div
                  key={c.tag}
                  style={{
                    marginTop: i === 0 ? 0 : 28,
                    paddingTop: i === 0 ? 0 : 28,
                    borderTop: i === 0 ? "none" : "1px solid var(--line)",
                  }}
                >
                  <span className="mono dim">// {c.tag}</span>
                  <h3 className="display-s" style={{ marginTop: 12 }}>
                    {c.title}
                  </h3>
                  <p className="dim" style={{ marginTop: 10, lineHeight: 1.6 }}>
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
            <Image
              className="split-photo"
              src="/images/partenaires/voie-rapide-nuit.webp"
              width={1240}
              height={1040}
              alt="Voie rapide urbaine la nuit en pose longue, traînées de phares blanches et rouges sous les lampadaires"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
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
          <div className="split-grid reveal">
            <Image
              className="split-photo"
              src="/images/partenaires/cartons-utilitaire.webp"
              width={1240}
              height={1040}
              alt="Cartons empilés dans un utilitaire blanc, porte arrière ouverte, étiquettes fragile"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div>
              <p className="dim" style={{ lineHeight: 1.7 }}>
                H24 Transports étudie chaque candidature de transporteur
                affrété au regard de quatre points&nbsp;:
              </p>
              {/* .cgv-list : même traitement que la liste de src/app/cgv/page.tsx,
                  réutilisé tel quel plutôt que dupliqué en styles locaux. */}
              <ul className="cgv-list dim">
                {EXPECTATIONS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
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
                  véhicules. H24 Transports revient vers les transporteurs
                  dont le profil correspond à ses besoins.
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
