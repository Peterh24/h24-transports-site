import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { AppScreens } from "@/components/sections/AppScreens";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/data/site";
import { FAQ_APPLICATION } from "@/data/faq";
import { getPage } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { ORG_REF, breadcrumb, faqPage, graph, webPage } from "@/lib/schema";

const PAGE = getPage("/application");

export const metadata: Metadata = pageMetadata({
  path: PAGE.path,
  title: "Application mobile de pilotage",
  description:
    "Pilotez vos transports de bout en bout : carnet d'adresses, création de courses, suivi temps réel, facturation intégrée. L'app H24 Transports pour transporteurs audiovisuels et équipes événementielles.",
});

/**
 * Typée `WebApplication` et non `MobileApplication` : l'accès documenté est le
 * dashboard web. On ne déclare ni `installUrl` ni note de store tant qu'on n'a
 * pas de fiche App Store / Play Store confirmée à référencer.
 */
const jsonLd = graph(
  webPage({
    path: PAGE.path,
    name: "Application mobile de pilotage",
    description: PAGE.summary,
    dateModified: PAGE.updated,
  }),
  breadcrumb(PAGE.path, [{ name: PAGE.label, path: PAGE.path }]),
  {
    "@type": "WebApplication",
    "@id": `${SITE.url}${PAGE.path}#app`,
    name: "Application H24 Transports",
    description:
      "Application de pilotage des transports H24 : carnet d'adresses et contacts, création de courses simples ou complexes, suivi des statuts et de l'heure d'arrivée en temps réel, facturation intégrée et accès multi-utilisateur.",
    url: SITE.dashboard.login,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    browserRequirements: "Navigateur web moderne",
    inLanguage: "fr-FR",
    publisher: ORG_REF,
    featureList: [
      "Carnet d'adresses et contacts géolocalisés",
      "Création de courses simples ou complexes",
      "Modèles de courses réutilisables",
      "Suivi des statuts et heure d'arrivée estimée en temps réel",
      "Notifications en cas d'imprévu",
      "Facturation intégrée et archivage",
      "Collaboration multi-utilisateur sur un même compte",
    ],
  },
  faqPage(PAGE.path, FAQ_APPLICATION),
);

const FEATURES: { tag: string; title: string; text: string }[] = [
  {
    tag: "Organisation",
    title: "Carnet d'adresses & contacts",
    text: "Centralisation, géolocalisation, accès rapide à votre portefeuille clients avec filtres et recherche.",
  },
  {
    tag: "Demandes",
    title: "Création de courses simples ou complexes",
    text: "Options modulaires : matériel, créneaux, contraintes. Modèles réutilisables pour gagner du temps.",
  },
  {
    tag: "Suivi",
    title: "Statuts en temps réel & ETA",
    text: "Traçabilité des colis et ETA pour chaque étape. Notifications instantanées en cas d'imprévu.",
  },
  {
    tag: "Paiement",
    title: "Facturation intégrée",
    text: "Paiement directement dans l'app, avec archivage et accès à vos factures.",
  },
  {
    tag: "Multi-utilisateur",
    title: "Collaboration équipe",
    text: "Plusieurs collaborateurs peuvent piloter les demandes et suivre l'activité d'un même compte.",
  },
  {
    tag: "Cross-device",
    title: "Web & mobile",
    text: "Accessible sur ordinateur, tablette ou téléphone — pour clients existants et nouveaux.",
  },
];

/** Univers · Application mobile — fonctionnalités, screens et accès au dashboard. */
export default function AppPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <RevealOnScroll />
      <PageHeader
        num="04"
        eyebrow="Univers · Application mobile"
        title="Pilotez vos transports."
        accent="Du brief à la facture."
        lead="Après 2 ans de développement, l'app pensée pour les transporteurs audiovisuels et les équipes événementielles est disponible. Intuitive, sécurisée, conçue pour gérer toutes vos demandes de bout en bout."
        media="/images/app/app-header-mac.webp"
        grid={false}
        softGlow
      />
      <AppScreens />
      <section className="features-app">
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">Fonctionnalités clés</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Une plateforme,
                <br />
                tout votre flux.
              </h2>
            </div>
            <div className="right">
              Pensée à partir des besoins réels du terrain : gain de temps,
              traçabilité, simplicité pour les clients comme pour les équipes ops.
            </div>
          </div>

          <div className="app-features reveal-stagger">
            {FEATURES.map((f, i) => (
              <div className="app-feature" key={i}>
                <span className="mono dim">// {f.tag}</span>
                <h3 className="display-s" style={{ marginTop: 14 }}>
                  {f.title}
                </h3>
                <p className="dim" style={{ marginTop: 12, lineHeight: 1.6 }}>
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="app-try" style={{ background: "var(--bg-1)" }}>
        <div className="container">
          <div className="app-cta reveal" style={{ textAlign: "center" }}>
            <h3 className="display-m">Prêt à essayer ?</h3>
            <div style={{ marginTop: 30, display: "inline-flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
              <a
                className="btn btn-primary"
                href={SITE.dashboard.login}
              >
                Accéder à l'application <span className="arrow" />
              </a>
              <a className="btn btn-ghost" href={SITE.phoneHref}>
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>
        <div className="truck-lane" aria-hidden="true">
          {/* point de départ (vert) & d'arrivée (rouge) */}
          <span className="lane-dot lane-dot--start" />
          <span className="lane-dot lane-dot--end" />

          {/* studios 2D — étapes de la tournée */}
          <span className="lane-building b1">
            <svg viewBox="0 0 48 64" role="img">
              <line x1="24" y1="12" x2="24" y2="3" stroke="var(--line-strong)" strokeWidth="1.5" />
              <circle cx="24" cy="3" r="2" fill="var(--accent)" />
              <rect x="6" y="12" width="36" height="52" rx="2" fill="var(--bg-elev)" stroke="var(--line-strong)" />
              <rect x="11" y="18" width="6" height="6" fill="var(--accent)" opacity="0.85" />
              <rect x="21" y="18" width="6" height="6" fill="var(--accent-faint)" />
              <rect x="31" y="18" width="6" height="6" fill="var(--accent-faint)" />
              <rect x="11" y="28" width="6" height="6" fill="var(--accent-faint)" />
              <rect x="21" y="28" width="6" height="6" fill="var(--accent)" opacity="0.85" />
              <rect x="31" y="28" width="6" height="6" fill="var(--accent-faint)" />
              <rect x="11" y="38" width="6" height="6" fill="var(--accent-faint)" />
              <rect x="21" y="38" width="6" height="6" fill="var(--accent-faint)" />
              <rect x="31" y="38" width="6" height="6" fill="var(--accent)" opacity="0.85" />
              <rect x="18" y="50" width="12" height="14" fill="var(--bg-0)" />
            </svg>
          </span>

          <span className="lane-building b2">
            <svg viewBox="0 0 60 52" role="img">
              <rect x="2" y="10" width="56" height="42" rx="2" fill="var(--bg-3)" stroke="var(--line-strong)" />
              {/* bandeau enseigne */}
              <rect x="2" y="10" width="56" height="7" fill="var(--accent)" opacity="0.85" />
              {/* bobine film (studio) */}
              <circle cx="13" cy="27" r="5.5" fill="none" stroke="var(--line-strong)" strokeWidth="1.5" />
              <circle cx="13" cy="27" r="1.6" fill="var(--accent-faint)" />
              {/* porte à enroulement */}
              <rect x="24" y="26" width="26" height="26" fill="var(--bg-0)" />
              <line x1="24" y1="32" x2="50" y2="32" stroke="var(--line-strong)" strokeWidth="1" />
              <line x1="24" y1="38" x2="50" y2="38" stroke="var(--line-strong)" strokeWidth="1" />
              <line x1="24" y1="44" x2="50" y2="44" stroke="var(--line-strong)" strokeWidth="1" />
            </svg>
          </span>

          <span className="lane-building b3">
            <svg viewBox="0 0 44 58" role="img">
              <rect x="4" y="8" width="36" height="50" rx="2" fill="var(--bg-elev)" stroke="var(--line-strong)" />
              <rect x="9" y="14" width="7" height="7" fill="var(--accent-faint)" />
              <rect x="19" y="14" width="7" height="7" fill="var(--accent)" opacity="0.85" />
              <rect x="29" y="14" width="7" height="7" fill="var(--accent-faint)" />
              <rect x="9" y="25" width="7" height="7" fill="var(--accent)" opacity="0.85" />
              <rect x="19" y="25" width="7" height="7" fill="var(--accent-faint)" />
              <rect x="29" y="25" width="7" height="7" fill="var(--accent-faint)" />
              <rect x="9" y="36" width="7" height="7" fill="var(--accent-faint)" />
              <rect x="19" y="36" width="7" height="7" fill="var(--accent-faint)" />
              <rect x="29" y="36" width="7" height="7" fill="var(--accent)" opacity="0.85" />
              <rect x="16" y="46" width="12" height="12" fill="var(--bg-0)" />
            </svg>
          </span>

          <span className="truck-2d">
            <svg viewBox="0 0 116 56" role="img">
              {/* cargo box */}
              <rect x="2" y="8" width="70" height="34" rx="3" fill="#fff" />
              {/* cab */}
              <path d="M72 18 H95 L108 30 V42 H72 Z" fill="#fff" />
              {/* windshield */}
              <path d="M77 22 H93 L101 30 H77 Z" fill="#15120f" />
              {/* headlight (brand accent) */}
              <circle cx="106.5" cy="34" r="1.9" fill="#ffa84a" />
              {/* rear wheel */}
              <g className="h24-wheel">
                <circle cx="22" cy="46" r="7.5" fill="#15120f" />
                <circle cx="22" cy="46" r="2.4" fill="#fff" />
                <rect x="20.8" y="39" width="2.4" height="14" rx="1" fill="#fff" opacity="0.45" />
                <rect x="15" y="44.8" width="14" height="2.4" rx="1" fill="#fff" opacity="0.45" />
              </g>
              {/* front wheel */}
              <g className="h24-wheel">
                <circle cx="94" cy="46" r="7.5" fill="#15120f" />
                <circle cx="94" cy="46" r="2.4" fill="#fff" />
                <rect x="92.8" y="39" width="2.4" height="14" rx="1" fill="#fff" opacity="0.45" />
                <rect x="87" y="44.8" width="14" height="2.4" rx="1" fill="#fff" opacity="0.45" />
              </g>
            </svg>
          </span>
        </div>
      </section>
      <Faq items={FAQ_APPLICATION} />
      <Cta />
    </>
  );
}
