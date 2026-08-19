import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { LEGAL, SIREN_FORMATTED, SITE } from "@/data/site";

/**
 * Mentions légales.
 *
 * Les identifiants (dénomination, forme, SIREN/SIRET, TVA, NAF) viennent de
 * `LEGAL` dans `src/data/site.ts`, relevé le 2026-08-15 sur l'API publique
 * `recherche-entreprises.api.gouv.fr` (bases SIRENE / RNE). Capital social,
 * greffe du RCS et directeur de la publication ont été confirmés par Peter le
 * même jour — ils ne figurent pas dans cette API.
 *
 * Contenu couvert : art. 6-III de la LCEN (identification de l'éditeur et de
 * l'hébergeur), art. R.123-237 du Code de commerce (identifiants au registre),
 * RGPD (finalités, base légale, durée, droits), propriété intellectuelle.
 *
 * ⚠️ Reste à faire, hors de ce que je peux constater :
 * - **Licence de transport** : le numéro de licence communautaire et
 *   l'inscription au registre électronique national des transporteurs ne sont
 *   pas mentionnés (donnée non publique via l'API). À ajouter à l'article 1.
 * - **Médiation de la consommation** : obligatoire seulement si H24 contracte
 *   avec des particuliers. Si l'activité est exclusivement B2B, rien à ajouter.
 */

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Éditeur, hébergement, identifiants légaux et traitement des données personnelles du site H24 Transports.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

const rowStyle = { gridTemplateColumns: "1fr" } as const;
const lastRowStyle = { gridTemplateColumns: "1fr", borderBottom: "none" } as const;
const textStyle = { marginTop: 16, lineHeight: 1.7 } as const;
const listStyle = {
  marginTop: 16,
  lineHeight: 1.9,
  paddingLeft: 0,
  listStyle: "none",
} as const;

/** Ligne « libellé — valeur » de la fiche d'identité de l'éditeur. */
function LegalRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <li>
      <span className="mono dim">{label}</span>{" "}
      <span style={{ marginLeft: 8 }}>{children}</span>
    </li>
  );
}

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHeader
        num="§"
        tag="/ légal / mentions"
        eyebrow="Informations légales"
        title="Mentions"
        accent="légales."
        lead="Informations relatives à l'éditeur du site, à son hébergement, aux identifiants de la société et au traitement des données personnelles."
      />
      <section style={{ background: "var(--bg-0)" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="about-row" style={rowStyle}>
            <div>
              <span className="eyebrow">Article 1 — L&apos;éditeur</span>
              <p className="dim" style={textStyle}>
                L&apos;édition du Site est assurée par la société{" "}
                {LEGAL.denomination}, {LEGAL.legalFormLong} ({LEGAL.legalForm})
                au capital de {LEGAL.capital}, dont le siège social est situé{" "}
                {SITE.address.street}, {SITE.address.postalCode}{" "}
                {SITE.address.city}.
              </p>
              <ul className="dim" style={listStyle}>
                <LegalRow label="// rcs">
                  {SIREN_FORMATTED} R.C.S. {LEGAL.rcsCity}
                </LegalRow>
                <LegalRow label="// siren">
                  <span className="tnum">{SIREN_FORMATTED}</span>
                </LegalRow>
                <LegalRow label="// siret (siège)">
                  <span className="tnum">{LEGAL.siret}</span>
                </LegalRow>
                <LegalRow label="// tva intracom.">
                  <span className="tnum">{LEGAL.vatNumber}</span>
                </LegalRow>
                <LegalRow label="// code ape">
                  <span className="tnum">{LEGAL.naf}</span> — {LEGAL.nafLabel}
                </LegalRow>
                <LegalRow label="// téléphone">
                  <a className="accent tnum" href={SITE.phoneHref}>
                    {SITE.phone}
                  </a>
                </LegalRow>
                <LegalRow label="// e-mail">
                  <a className="accent" href={SITE.emailHref}>
                    {SITE.email}
                  </a>
                </LegalRow>
                <LegalRow label="// dir. publication">
                  {LEGAL.director}, {LEGAL.directorRole.toLowerCase()}
                </LegalRow>
              </ul>
              <p className="dim" style={textStyle}>
                La convention collective applicable est celle des transports
                routiers et activités auxiliaires du transport (IDCC{" "}
                <span className="tnum">{LEGAL.idcc}</span>).
              </p>
            </div>
          </div>

          <div className="about-row" style={rowStyle}>
            <div>
              <span className="eyebrow">Article 2 — L&apos;hébergeur</span>
              <p className="dim" style={textStyle}>
                L&apos;hébergeur du Site est la société OVH SAS, dont le siège
                social est situé 2 rue Kellermann, 59100 Roubaix, France, avec le
                numéro de téléphone&nbsp;: <span className="tnum">1007</span>.
              </p>
            </div>
          </div>

          <div className="about-row" style={rowStyle}>
            <div>
              <span className="eyebrow">Article 3 — Accès au site</span>
              <p className="dim" style={textStyle}>
                Le Site est accessible en tout endroit, 7j/7, 24h/24 sauf cas de
                force majeure, interruption programmée ou non et pouvant
                découler d&apos;une nécessité de maintenance.
              </p>
              <p className="dim" style={textStyle}>
                En cas de modification, interruption ou suspension du Site,
                l&apos;Éditeur ne saurait être tenu responsable.
              </p>
            </div>
          </div>

          <div className="about-row" style={rowStyle}>
            <div>
              <span className="eyebrow">
                Article 4 — Données personnelles
              </span>
              <p className="dim" style={textStyle}>
                Les données transmises via le formulaire de contact du Site
                (identité, coordonnées et contenu du message) sont collectées
                par {LEGAL.denomination} aux seules fins de traiter la demande
                de l&apos;Utilisateur et d&apos;y répondre. La base légale de ce
                traitement est l&apos;intérêt légitime de l&apos;Éditeur à
                répondre aux sollicitations qui lui sont adressées, ainsi que
                l&apos;exécution de mesures précontractuelles lorsque la demande
                porte sur un devis.
              </p>
              <p className="dim" style={textStyle}>
                Ces données sont destinées aux seuls services de
                l&apos;Éditeur&nbsp;; elles ne font l&apos;objet d&apos;aucune
                cession ni d&apos;aucun transfert hors de l&apos;Union
                européenne. Elles sont conservées le temps nécessaire au
                traitement de la demande, puis pendant la durée de la relation
                commerciale et les délais légaux de prescription applicables.
              </p>
              <p className="dim" style={textStyle}>
                Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi
                n°78-17 du 6 janvier 1978 modifiée, l&apos;Utilisateur dispose
                d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
                de limitation, d&apos;opposition et de portabilité de ses
                données. Ces droits s&apos;exercent par courrier électronique à{" "}
                <a className="accent" href={SITE.emailHref}>
                  {SITE.email}
                </a>{" "}
                ou par courrier postal à l&apos;adresse du siège social indiquée
                à l&apos;article 1.
              </p>
              <p className="dim" style={textStyle}>
                L&apos;Utilisateur dispose également du droit d&apos;introduire
                une réclamation auprès de la Commission nationale de
                l&apos;informatique et des libertés (CNIL), 3 place de Fontenoy,
                TSA 80715, 75334 Paris Cedex 07.
              </p>
            </div>
          </div>

          <div className="about-row" style={lastRowStyle}>
            <div>
              <span className="eyebrow">
                Article 5 — Propriété intellectuelle
              </span>
              <p className="dim" style={textStyle}>
                La marque, les logos, les textes, les photographies, les vidéos
                et tout autre élément composant le Site sont la propriété
                exclusive de l&apos;Éditeur ou de ses ayants droit.
              </p>
              <p className="dim" style={textStyle}>
                Toute utilisation, reproduction, diffusion, commercialisation ou
                modification de tout ou partie du Site, sans autorisation de
                l&apos;Éditeur, est prohibée et pourra entraîner des actions et
                poursuites judiciaires telles que notamment prévues par le Code
                de la propriété intellectuelle et le Code civil.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
