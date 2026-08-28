import type { Metadata } from "next";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PageHeader } from "@/components/sections/PageHeader";
import { Values } from "@/components/sections/Values";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_COLIS } from "@/data/faq";
import { getPage } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumb, faqPage, graph, service, webPage } from "@/lib/schema";

const PAGE = getPage("/colis");

export const metadata: Metadata = pageMetadata({
  path: PAGE.path,
  title: "Transport de colis et palettes à Paris",
  description:
    "Du pli urgent à la palette : messagerie et coursier dédié, en express ou planifié, avec suivi en temps réel — Paris, Île-de-France et France entière.",
});

const jsonLd = graph(
  webPage({
    path: PAGE.path,
    name: "Transport de colis et palettes à Paris",
    description: PAGE.summary,
    dateModified: PAGE.updated,
  }),
  breadcrumb(PAGE.path, [{ name: PAGE.label, path: PAGE.path }]),
  service({
    path: PAGE.path,
    name: "Livraison de plis, colis et palettes",
    serviceType: "Messagerie et coursier dédié",
    description:
      "Livraison de plis, documents, colis et palettes en course express dédiée ou en livraison planifiée, à Paris, en Île-de-France et en France entière, avec suivi en temps réel.",
    offers: ["Pli & documents", "Colis & palette", "Coursier dédié", "Tournée planifiée"],
  }),
  faqPage(PAGE.path, FAQ_COLIS),
);

/* ---------- illustrations colis (SVG inline, animées en CSS) ---------- */
function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 100 100" className="parcel-svg" aria-hidden="true">
      <rect x="14" y="28" width="72" height="46" rx="3" />
      <path d="M15 31 L50 55 L85 31" />
    </svg>
  );
}
function BoxIcon() {
  return (
    <svg viewBox="0 0 100 100" className="parcel-svg" aria-hidden="true">
      <polygon points="50,12 88,30 50,48 12,30" />
      <polygon points="12,30 50,48 50,88 12,70" />
      <polygon points="88,30 50,48 50,88 88,70" />
      <line x1="50" y1="48" x2="50" y2="88" />
      <line x1="32" y1="21" x2="70" y2="39" className="parcel-tape" />
    </svg>
  );
}
function PalletIcon() {
  return (
    <svg viewBox="0 0 100 100" className="parcel-svg" aria-hidden="true">
      <rect x="30" y="24" width="30" height="24" />
      <rect x="20" y="48" width="26" height="24" />
      <rect x="54" y="48" width="26" height="24" />
      <rect x="14" y="76" width="72" height="7" />
      <rect x="18" y="83" width="9" height="8" />
      <rect x="45" y="83" width="9" height="8" />
      <rect x="73" y="83" width="9" height="8" />
    </svg>
  );
}
function CourierIcon() {
  return (
    <svg viewBox="0 0 100 100" className="parcel-svg" aria-hidden="true">
      <polygon points="56,16 90,32 56,48 22,32" />
      <polygon points="22,32 56,48 56,86 22,70" />
      <polygon points="90,32 56,48 56,86 90,70" />
      <line x1="56" y1="48" x2="56" y2="86" />
      <line className="parcel-speed" x1="2" y1="40" x2="20" y2="40" />
      <line className="parcel-speed" x1="0" y1="54" x2="16" y2="54" />
      <line className="parcel-speed" x1="4" y1="68" x2="18" y2="68" />
    </svg>
  );
}

/* tapis roulant : suite d'icônes, l'accent posé sur l'une d'elles */
const BELT = [
  { Icon: BoxIcon, accent: false },
  { Icon: EnvelopeIcon, accent: false },
  { Icon: PalletIcon, accent: true },
  { Icon: BoxIcon, accent: false },
  { Icon: CourierIcon, accent: false },
  { Icon: EnvelopeIcon, accent: true },
  { Icon: PalletIcon, accent: false },
  { Icon: BoxIcon, accent: false },
];

const CATEGORIES = [
  {
    Icon: EnvelopeIcon,
    num: "01",
    title: "Pli & documents",
    text: "Plis, documents et petits envois sensibles, remis en main propre et acheminés en express.",
    stat: "H-1",
    statLabel: "Paris intramuros",
  },
  {
    Icon: BoxIcon,
    num: "02",
    title: "Colis & messagerie",
    text: "Colis standards de point à point, ponctuels ou récurrents, suivis de bout en bout.",
    stat: "7j/7",
    statLabel: "Service continu",
  },
  {
    Icon: PalletIcon,
    num: "03",
    title: "Palette",
    text: "Marchandises volumineuses et palettisées, prises en charge jusqu'au hayon de nos véhicules.",
    stat: "Hayon",
    statLabel: "Inclus selon véhicule",
  },
  {
    Icon: CourierIcon,
    num: "04",
    title: "Coursier dédié",
    text: "Un coursier et un véhicule rien que pour votre envoi, sans détour ni regroupement.",
    stat: "Dédié",
    statLabel: "Sans regroupement",
  },
];

export default function ColisPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <RevealOnScroll />
      <PageHeader
        num="03"
        eyebrow="Univers · Colis, pli & palette"
        title="Du pli à la palette."
        accent="Livré dans les temps."
        lead="Messagerie et coursier dédié, en express ou planifié. Du document urgent à la palette volumineuse, on enlève vite, on trace en temps réel et on livre dans les délais — Paris, Île-de-France et France entière."
        image="/images/colis/truck-boxes.webp"
        imageAlt="Camion H24 Transports hayon déployé, chargé de cartons sur palettes"
        imagePosition="50% 25%"
        glow={false}
        photoTone="bright"
      />

      {/* tapis roulant animé */}
      <section className="colis-scene">
        <div className="colis-belt" aria-hidden="true">
          <div className="colis-belt-track">
            {[...BELT, ...BELT].map((b, i) => (
              <div className={`colis-parcel ${b.accent ? "is-accent" : ""}`} key={i}>
                <b.Icon />
              </div>
            ))}
          </div>
          <div className="colis-belt-line" />
        </div>
      </section>

      {/* catégories illustrées */}
      <section className="categories" style={{ background: "var(--bg-1)" }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">Ce que nous transportons</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Tous vos envois,
                <br />
                un seul interlocuteur.
              </h2>
            </div>
            <div className="right">
              Du pli au lot palettisé, la même exigence de fiabilité et de
              traçabilité que sur nos métiers audiovisuel et express.
            </div>
          </div>
          <div className="categories-grid reveal-stagger">
            {CATEGORIES.map((c) => (
              <div className="category-card colis-card" key={c.num}>
                <div className="colis-card-icon">
                  <c.Icon />
                </div>
                <div className="mono dim">// catégorie {c.num}</div>
                <h3 className="display-m" style={{ marginTop: 14 }}>
                  {c.title}
                </h3>
                <p className="dim" style={{ marginTop: 16, lineHeight: 1.6 }}>
                  {c.text}
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

      <Values
        values={[
          {
            title: "Réactivité",
            text: "Un pli urgent ou une palette à enlever ? Nos équipes interviennent vite et livrent dans les temps.",
          },
          {
            title: "Traçabilité",
            text: "Suivi en temps réel et preuve de livraison sur chaque envoi, du plus petit pli au lot complet.",
          },
          {
            title: "Couverture",
            text: "Paris, Île-de-France et France entière, avec des délais adaptés à l'urgence de votre demande.",
          },
          {
            title: "Sur-mesure",
            text: "Express dédié ou tournée planifiée et récurrente — nous adaptons la solution à votre flux logistique.",
          },
        ]}
      />
      <Faq items={FAQ_COLIS} />
      <Cta />
    </>
  );
}
