import type { Metadata } from "next";
import Image from "next/image";

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

/* Icônes des cas d'usage — même gabarit que celles de /evenementiel :
   viewBox 48, trait seul, teinte accent héritée de `.engagement-icon`. */
function SpotIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <path d="M14 8h12l5 11H9L14 8Z" />
      <path d="M9 19h22v6H9z" />
      <path d="M20 25v9" />
      <path d="M14 40h12" />
    </svg>
  );
}
function RackIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <path d="M8 15h32" />
      <path d="M14 15v6M21 15v6M28 15v6M35 15v6" />
      <path d="M12 21h24v18H12z" />
    </svg>
  );
}
function CameraIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <path d="M7 16h34v22H7z" />
      <path d="M17 16l3-5h8l3 5" />
      <circle cx="24" cy="27" r="6.5" />
    </svg>
  );
}
function StandIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <path d="M6 10h36v8H6z" />
      <path d="M10 18v20M38 18v20" />
      <path d="M10 38h28" />
      <path d="M18 38V27h12v11" />
    </svg>
  );
}

/**
 * Cas d'usage réellement couverts — confirmés par Peter le 2026-08-28.
 * Photos : banque Pexels (licence libre, usage commercial, sans attribution).
 */
const CAS = [
  {
    img: "/images/mode/defile-backstage.webp",
    alt: "Backstage d'un défilé, mannequins et habilleurs devant les miroirs de loge",
    Icon: SpotIcon,
    titre: "Défilé & Fashion Week",
    texte:
      "Collections, portants et matériel acheminés vers les backstages et les lieux de présentation. Montages et démontages de nuit compris.",
  },
  {
    img: "/images/mode/showroom-portant.webp",
    alt: "Portant de collection garni de pièces sur cintre dans un showroom",
    Icon: RackIcon,
    titre: "Showroom & collection",
    texte:
      "Rotations entre showrooms, sièges de marque et ateliers. Les portants partent montés et arrivent montés, sans transfert de pièces.",
  },
  {
    img: "/images/mode/studio-shooting.webp",
    alt: "Séance photo de mode en studio, photographe et mannequins sous les projecteurs",
    Icon: CameraIcon,
    titre: "Shooting & studio",
    texte:
      "Acheminement des collections et du matériel vers les studios photo, avec attente sur place ou reprise en fin de séance.",
  },
  {
    img: "/images/mode/salon-hall.webp",
    alt: "Hall d'un salon professionnel vu de haut, allées et stands montés",
    Icon: StandIcon,
    titre: "Salon professionnel",
    texte:
      "Livraison et reprise des stands, portants et collections sur les salons du secteur, dans les créneaux de montage imposés.",
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

/**
 * Les deux prochaines sessions de la Fashion Week parisienne.
 *
 * Calculees a la date du build plutot qu'ecrites en dur, pour que la page
 * n'annonce jamais une saison deja passee. Le calendrier est stable depuis
 * des annees : fevrier-mars pour les collections automne-hiver, et
 * septembre-octobre pour le printemps-ete de l'annee suivante.
 *
 * ⚠️ Le calcul est fige au build. Le site etant redeploye a chaque
 * modification, la page reste a jour ; mais si plus rien n'etait publie
 * pendant une annee entiere, elle afficherait une session revolue.
 */
type Saison = {
  cle: string;
  mois: string;
  collection: string;
  stat: string;
  statLabel: string;
  fin: Date;
};

function prochainesSaisons(maintenant: Date): Saison[] {
  const annee = maintenant.getFullYear();
  const candidates: Saison[] = [];

  for (const a of [annee, annee + 1, annee + 2]) {
    candidates.push({
      cle: `ah-${a}`,
      mois: `Février — mars ${a}`,
      collection: `Les collections automne-hiver ${a}-${String((a + 1) % 100).padStart(2, "0")}.`,
      stat: "AH",
      // Même millésime que la phrase au-dessus : une saison automne-hiver est
      // toujours à cheval sur deux années, l'écrire « 2027 » seul contredirait
      // le texte de la carte.
      statLabel: `Automne-hiver ${a}-${String((a + 1) % 100).padStart(2, "0")}`,
      // Les défilés parisiens s'achèvent début mars : on laisse courir tout
      // le mois pour ne pas basculer la carte pendant la session elle-même.
      fin: new Date(a, 2, 31),
    });
    candidates.push({
      cle: `pe-${a}`,
      mois: `Septembre — octobre ${a}`,
      collection: `Les collections printemps-été ${a + 1}.`,
      stat: "PE",
      statLabel: `Printemps-été ${a + 1}`,
      fin: new Date(a, 9, 31),
    });
  }

  return candidates
    .filter((s) => s.fin >= maintenant)
    .sort((x, y) => x.fin.getTime() - y.fin.getTime())
    .slice(0, 2);
}

const SAISONS = prochainesSaisons(new Date());

export default function ModePage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <RevealOnScroll />
      <PageHeader
        eyebrow="Univers · Mode & Luxe"
        title="De showroom à showroom."
        accent="Sur cintre, sans un pli."
        lead="Vêtements sur cintre, portants montés, collections et matériel de défilé — dans des véhicules équipés penderie. Pour les showrooms, les studios et la Fashion Week, à Paris, en Île-de-France et partout en France."
        image="/images/mode/rack-tailgate.webp"
        imageAlt="Portant de vêtements sur cintre chargé dans un camion par le hayon, dans un entrepôt textile"
        glow={false}
        photoTone="bright"
      />

      <section className="categories">
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">Ce qu&apos;on transporte</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Défilé, showroom,
                <br />
                studio, salon.
              </h2>
            </div>
            <div className="right">
              Du showroom au défilé, du studio au salon — les mêmes pièces, des
              contraintes de délai et de manipulation à chaque fois différentes.
            </div>
          </div>
          <div className="engagements-grid reveal-stagger">
            {CAS.map((c) => (
              <figure className="engagement-card" key={c.titre}>
                <div className="engagement-photo">
                  <Image
                    src={c.img}
                    width={864}
                    height={455}
                    alt={c.alt}
                    sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 25vw"
                  />
                </div>
                <div className="engagement-body">
                  <div className="engagement-icon">
                    <c.Icon />
                  </div>
                  <h3 className="engagement-title">{c.titre}</h3>
                  <p className="engagement-text dim">{c.texte}</p>
                </div>
              </figure>
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
                Transportée sur cintre.
                <br />
                Jamais pliée.
              </h2>
            </div>
            <div className="right">
              Une pièce froissée est une pièce perdue. Un vêtement de collection
              ne se transporte pas comme un colis : il ne se plie pas, ne se
              superpose pas, et ne supporte ni le frottement ni l&apos;attente en
              soute.
            </div>
          </div>
          {/*
            `split-grid` / `split-photo` existaient en CSS sans qu'aucune page
            ne les utilise depuis la refonte. Ils reprennent du service ici :
            une grande image face au texte casse la succession de grilles de
            cartes, qui rendait la page monotone.
          */}
          <div className="split-grid reveal">
            <Image
              className="split-photo"
              src="/images/mode/cintres-penderie.webp"
              width={1240}
              height={1040}
              alt="Rangée serrée de vêtements sur cintres le long d'une barre de penderie"
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div>
              {CONTRAINTES.map((c, i) => (
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
                    {c.titre}
                  </h3>
                  <p className="dim" style={{ marginTop: 10, lineHeight: 1.6 }}>
                    {c.texte}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="categories" style={{ background: "var(--bg-1)" }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">Le calendrier</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                La Fashion Week parisienne
                <br />
                ne se rattrape pas.
              </h2>
            </div>
            <div className="right">
              Le transport mode à Paris ne s&apos;étale pas dans l&apos;année :
              il se concentre sur les semaines de collection, où tout part en
              même temps et où un retard ne se rattrape pas.
            </div>
          </div>
          <div className="categories-grid reveal-stagger">
            {SAISONS.map((s, i) => (
              <div className="category-card" key={s.cle}>
                <div className="mono dim">
                  // {i === 0 ? "prochaine session" : "session suivante"}
                </div>
                <h3 className="display-m" style={{ marginTop: 16 }}>
                  {s.mois}
                </h3>
                <p className="dim" style={{ marginTop: 18, lineHeight: 1.6 }}>
                  {s.collection} Défilés, présentations presse et rotations de
                  showroom sur trois semaines pleines, dans des créneaux qui ne
                  se rattrapent pas.
                </p>
                <div className="category-stat">
                  <span className="display-l accent tnum">{s.stat}</span>
                  <span className="mono dim">{s.statLabel}</span>
                </div>
              </div>
            ))}
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
