import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { SITE } from "@/data/site";

/**
 * ⚠️ GABARIT EN ATTENTE DU TEXTE JURIDIQUE.
 *
 * L'ancien site WordPress exposait bien une URL `/index.php/cgv/`, mais la
 * page archivée est **vide** : titre et fil d'Ariane, aucun contenu. Il n'y a
 * donc rien à migrer.
 *
 * Les CGV d'un transporteur routier de marchandises ne s'improvisent pas :
 * elles s'articulent avec les contrats types réglementaires du Code des
 * transports (délais, limitation d'indemnisation, réserves à la livraison,
 * prescription…). Un texte rédigé « au mieux » serait au choix inopposable
 * aux clients ou défavorable à l'entreprise. Le contenu doit venir de
 * l'entreprise ou de son conseil.
 *
 * En attendant, la page est servie (les anciennes URLs CGV y redirigent) mais
 * en `noindex` — metadata ci-dessous — et hors sitemap (`indexable: false`
 * dans `src/data/pages.ts`). Un visiteur qui suit un vieux lien CGV comprend
 * ainsi la situation et sait qui appeler, au lieu d'atterrir sur un autre
 * document juridique.
 *
 * Pour la publier : remplacer le bloc d'attente par les articles, passer
 * `indexable: true` dans `src/data/pages.ts` et retirer le `robots` ci-dessous.
 * Aucune redirection à modifier.
 */

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente et de transport de H24 Transports.",
  alternates: { canonical: "/cgv" },
  robots: { index: false, follow: true },
};

export default function CgvPage() {
  return (
    <>
      <PageHeader
        num="§"
        tag="/ légal / cgv"
        eyebrow="Conditions générales"
        title="Conditions générales"
        accent="de vente."
        lead="Les conditions générales de vente et de transport de H24 Transports sont en cours de rédaction."
      />
      <section style={{ background: "var(--bg-0)" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="about-row" style={{ gridTemplateColumns: "1fr", borderBottom: "none" }}>
            <div>
              <span className="eyebrow">Document en cours de rédaction</span>
              <p className="dim" style={{ marginTop: 16, lineHeight: 1.7 }}>
                Les conditions générales de vente et de transport de {SITE.name}{" "}
                ne sont pas encore publiées sur ce site. Pour obtenir les
                conditions applicables à une prestation, contactez-nous par
                téléphone au{" "}
                <a className="accent tnum" href={SITE.phoneHref}>
                  {SITE.phone}
                </a>{" "}
                ou par e-mail à{" "}
                <a className="accent" href={SITE.emailHref}>
                  {SITE.email}
                </a>
                .
              </p>
              <p className="dim" style={{ marginTop: 16, lineHeight: 1.7 }}>
                Les informations relatives à l&apos;éditeur du site, à son
                hébergement et au traitement des données personnelles figurent
                dans les{" "}
                <Link className="accent" href="/mentions-legales">
                  mentions légales
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
