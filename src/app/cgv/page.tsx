import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { LEGAL, SIREN_FORMATTED, SITE } from "@/data/site";
import { CGV_ARTICLES, CGV_UPDATED, type CgvBlock } from "@/data/cgv";
import { getPage } from "@/data/pages";
import { breadcrumb, graph, webPage } from "@/lib/schema";

/**
 * Conditions générales de vente.
 *
 * Le texte des articles 2 à 15 vit dans `src/data/cgv.ts` — document
 * contractuel rédigé par le conseil de H24, reproduit fidèlement.
 *
 * L'article 1 est **généré ici** depuis le bloc `LEGAL` de `src/data/site.ts`,
 * la même source que les mentions légales : il devient impossible que les deux
 * pages annoncent un capital, un SIREN ou un gérant différents. La version
 * d'origine des CGV portait d'ailleurs un capital périmé (10 000 €).
 */

const PAGE = getPage("/cgv");

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente et de transport de H24 Transports : obligations, livraison, délais, prix, responsabilité et annulation.",
  alternates: { canonical: "/cgv" },
};

const jsonLd = graph(
  webPage({
    path: PAGE.path,
    name: "Conditions générales de vente",
    description: PAGE.summary,
    dateModified: PAGE.updated,
  }),
  breadcrumb(PAGE.path, [{ name: PAGE.label, path: PAGE.path }]),
);

const rowStyle = { gridTemplateColumns: "1fr" } as const;
const textStyle = { marginTop: 16, lineHeight: 1.7 } as const;

function Block({ block }: { block: CgvBlock }) {
  if (block.type === "p") {
    return (
      <p className="dim" style={textStyle}>
        {block.text}
      </p>
    );
  }
  if (block.type === "sub") {
    return (
      <h3 className="cgv-sub">
        <span className="mono accent">{block.num}</span> {block.title}
      </h3>
    );
  }
  if (block.type === "ul") {
    return (
      <ul className="cgv-list dim">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <dl className="cgv-defs dim">
      {block.items.map((item) => (
        <div key={item.term}>
          <dt>{item.term}</dt>
          <dd>{item.def}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function CgvPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHeader
        num="§"
        tag="/ légal / cgv"
        eyebrow="Conditions générales"
        title="Conditions générales"
        accent="de vente."
        lead={`Conditions régissant les relations entre le Donneur d'ordre et ${SITE.name}, et modalités d'exécution des prestations de transport.`}
      />
      <section style={{ background: "var(--bg-0)" }}>
        <div className="container" style={{ maxWidth: 820 }}>
          {/* Article 1 — généré depuis LEGAL, jamais saisi à la main. */}
          <div className="about-row" style={rowStyle}>
            <div>
              <span className="eyebrow">Article 1 — Mentions légales</span>
              <p className="dim" style={textStyle}>
                {LEGAL.denomination} est une {LEGAL.legalFormLong} (
                {LEGAL.legalForm}) au capital de {LEGAL.capital}, dont le siège
                social est situé {SITE.address.street} à{" "}
                {SITE.address.city.toUpperCase()} ({SITE.address.postalCode}), et
                est immatriculée sous le SIREN{" "}
                <span className="tnum">{SIREN_FORMATTED}</span> au RCS de{" "}
                {LEGAL.rcsCity}. Le numéro de TVA intracommunautaire est{" "}
                <span className="tnum">{LEGAL.vatNumber}</span>. La société est
                spécialisée dans le secteur d&apos;activité des transports
                routiers de fret de proximité (code APE{" "}
                <span className="tnum">{LEGAL.naf}</span>).
              </p>

              <h3 className="cgv-sub">
                <span className="mono accent">1.1</span> Directeur de la
                publication
              </h3>
              <p className="dim" style={textStyle}>
                {LEGAL.director}
                <br />
                Téléphone :{" "}
                <a className="accent tnum" href={SITE.phoneHref}>
                  {SITE.phone}
                </a>
                <br />
                Adresse e-mail :{" "}
                <a className="accent" href={SITE.emailHref}>
                  {SITE.email}
                </a>
              </p>

              <h3 className="cgv-sub">
                <span className="mono accent">1.2</span> Hébergeur
              </h3>
              <p className="dim" style={textStyle}>
                OVH SAS, 2 rue Kellermann, 59100 Roubaix, France — téléphone :{" "}
                <span className="tnum">1007</span>.
              </p>
            </div>
          </div>

          {CGV_ARTICLES.map((article, index) => (
            <div
              className="about-row"
              style={
                index === CGV_ARTICLES.length - 1
                  ? { ...rowStyle, borderBottom: "none" }
                  : rowStyle
              }
              key={article.num}
            >
              <div>
                <span className="eyebrow">
                  Article {article.num} — {article.title}
                </span>
                {article.blocks.map((block, i) => (
                  <Block block={block} key={i} />
                ))}
              </div>
            </div>
          ))}

          <p className="mono dim" style={{ padding: "40px 0 0", fontSize: 13 }}>
            // dernière mise à jour : {CGV_UPDATED}
          </p>
        </div>
      </section>
    </>
  );
}
