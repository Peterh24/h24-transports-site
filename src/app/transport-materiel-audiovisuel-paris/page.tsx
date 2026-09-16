import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Clients } from "@/components/sections/Clients";
import { Cta } from "@/components/sections/Cta";
import { Faq } from "@/components/sections/Faq";
import { Fleet } from "@/components/sections/Fleet";
import { PageHeader } from "@/components/sections/PageHeader";
import { Process } from "@/components/sections/Process";
import { Values } from "@/components/sections/Values";
import { Counter } from "@/components/ui/Counter";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { ACTIVITY, anneesExperience } from "@/data/activity";
import { FAQ_AUDIOVISUEL } from "@/data/faq";
import { getPage } from "@/data/pages";
import { SITE, ZONES } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumb, faqPage, graph, service, webPage } from "@/lib/schema";

/**
 * `/transport-materiel-audiovisuel-paris` — page **pilier** du site sur
 * l'intention « transport (de) matériel audiovisuel », à Paris et au-delà.
 *
 * ── Pourquoi une page séparée de `/evenementiel` ──────────────────────────
 * `/evenementiel` parlait déjà d'audiovisuel, mais porte une promesse de
 * marque (« Le matériel arrive. L'événement peut commencer. ») et couvre trois
 * familles à la fois — pub & cinéma, mode & luxe, concert & salon. Aucun de
 * ses titres ne contenait la requête. Les deux pages qui nous devançaient
 * la portent, elles, dans leur URL, leur `<title>` et leur H1.
 *
 * ── Ce que la concurrence nous apprend (analyse du 2026-09-16) ────────────
 * - **BMS Ventouse** (`/transport-materiel-audiovisuel-paris/`) : 724 mots
 *   seulement, mais un alignement d'intention parfait — mot-clé dans l'URL,
 *   le title et le H1, H2 calés sur les sous-questions (volumes, nuit,
 *   accès, multistops), et deux pages satellites qui pointent dessus. C'est
 *   la correspondance de requête qui les fait gagner, pas la profondeur.
 * - **Transports Rivals** (`/transport-materiel-audiovisuel`) : l'inverse —
 *   ~1 850 mots, un H1 en question, six pages de service qui se maillent
 *   entre elles, et une autorité de domaine qu'on ne rattrapera pas
 *   (société de 1965, 97 collaborateurs, 70 véhicules, 3 × 30 000 m²
 *   d'entrepôts, Ecovadis). Mais **ils ne sont pas parisiens** : siège dans
 *   le Tarn, délais annoncés à 24 h sur l'Occitanie et 48 h en national.
 *
 * D'où l'arbitrage éditorial de cette page : on ne joue pas la surface de
 * catalogue d'un généraliste, on joue la **spécialisation** et l'**ancrage
 * parisien**, qui sont les deux choses qu'aucun des deux ne peut produire.
 *
 * Le fil d'Ariane est volontairement imbriqué sous `/evenementiel`, comme
 * celui de `/mode` : la hiérarchie dit au moteur que ces pages traitent du
 * même domaine à deux niveaux de précision, au lieu de les laisser se
 * concurrencer.
 *
 * ── Règle de contribution ─────────────────────────────────────────────────
 * Chaque affirmation de cette page est sourçable :
 * `src/data/vehicles.ts` (formats, cotes, charges utiles, hayon),
 * `src/data/activity.ts` (courses, ancienneté — relevé Dashdoc),
 * `src/data/site.ts` (délais, coordonnées, adresse),
 * `src/data/clients.ts` (références déjà affichées publiquement à l'accueil),
 * `src/data/cgv.ts` article « Assurances »,
 * `/evenementiel` (locaux vidéo-surveillés, casque, régisseur « junior »),
 * `/application` (courses complexes, ETA par étape),
 * et la fiche publique H24 du guide des ressources Film Paris Region
 * (« transport sécurisé d'équipements audiovisuels » vers les lieux de
 * tournage, flotte 3–20 m³ aux normes Euro 6d, stockage
 * sécurisé dans nos installations, conducteur et flotte à l'effigie de votre
 * marque).
 *
 * Rien d'autre. Pas de tarif, pas de délai garanti, pas de certification,
 * pas de « partenaire officiel » — la fiche Film Paris Region est un
 * référencement dans un guide, et c'est ainsi qu'elle est présentée.
 *
 * ⚠️ Le bloc « Man & Van » a été retiré de cette page le 2026-09-16, à la
 * demande de Peter. Le service existe toujours (fiche publique H24 du guide
 * Film Paris Region) et reste décrit par une question de `FAQ_AUDIOVISUEL`
 * et par le `knowsAbout` de l'organisation. Le retirer de l'`OfferCatalog`
 * du nœud `Service` était en revanche obligatoire : une offre balisée doit
 * correspondre à une prestation visible sur la page. Conséquence SEO
 * assumée — la requête « Man & Van tournage » ne garde qu'un ancrage de
 * FAQ, plus une section entière.
 *
 * ⚠️ Non retenu volontairement : la présence de H24 au **Paris Images
 * Production Forum**. Aucune page publique ne la confirme (recherche du
 * 2026-09-16) ; l'écrire aurait été une affirmation non vérifiable.
 */

const PAGE = getPage("/transport-materiel-audiovisuel-paris");

export const metadata: Metadata = pageMetadata({
  path: PAGE.path,
  /*
   * 40 caractères + « · H24 Transports » = 57 : le `<title>` complet tient
   * dans la largeur rendue par Google, et la requête principale ouvre la
   * balise. Même moule que les pages sœurs (« Transport de colis et palettes
   * à Paris »), donc pas de rupture dans la SERP de marque.
   *
   * Écarté : « Transport Matériel Audiovisuel Paris | H24 Transports ». Le
   * layout impose déjà le suffixe « · H24 Transports » ; ajouter la marque
   * une seconde fois la dupliquait dans l'onglet et dans les résultats.
   */
  title: "Transport de matériel audiovisuel à Paris",
  /*
   * 155 caractères, requête principale en tête et bénéfice concret ensuite.
   *
   * ⚠️ Compter en caractères, pas en octets : la version précédente était
   * annotée « 156 » alors qu'elle en faisait 161 — un `${#var}` en shell
   * compte les octets, et les accents comme le « ³ » en pèsent deux. Vérifier
   * avec `"…".length` en JS.
   */
  description:
    "Transport de matériel audiovisuel à Paris : caméra, lumière, machinerie et décors livrés sur vos tournages, 24h/24. Enlèvement en 1 h, flotte de 3 à 20 m³.",
});

const jsonLd = graph(
  webPage({
    path: PAGE.path,
    name: "Transport de matériel audiovisuel à Paris",
    description: PAGE.summary,
    dateModified: PAGE.updated,
  }),
  breadcrumb(PAGE.path, [
    { name: "Événementiel", path: "/evenementiel" },
    { name: PAGE.label, path: PAGE.path },
  ]),
  service({
    path: PAGE.path,
    name: "Transport de matériel audiovisuel",
    serviceType: "Transport de matériel audiovisuel et de tournage",
    description:
      "Transport de caméras, optiques, lumière, machinerie, décors et régie sur les lieux de tournage, en course dédiée et 24h/24, à Paris, en Île-de-France et en France entière. Flotte de 3 à 20 m³ avec hayon sur les grands formats, stockage sécurisé et suivi géolocalisé.",
    /* Chaque entrée correspond à une section visible de la page — règle
       Google sur les données structurées : elles décrivent ce qui est affiché. */
    offers: [
      "Transport de caméras, optiques et matériel vidéo",
      "Transport de lumière et de matériel électro",
      "Transport de machinerie, grip et accessoires",
      "Transport de décors et de régie",
      "Transport dédié sans rupture de charge",
      "Stockage et gardiennage sécurisé de matériel audiovisuel",
    ],
  }),
  /* `FAQPage` : Google a restreint les rich results FAQ en 2023 aux sites
     institutionnels — le balisage n'est donc pas posé pour décrocher un
     encart. Il reste consommé pour l'ancrage des réponses génératives, et
     surtout les réponses sont bien visibles dans le HTML servi (`Faq.tsx`
     rend des `<details>`, dépliés ou non). Même arbitrage que le reste du
     site, documenté dans `src/lib/schema.ts`. */
  faqPage(PAGE.path, FAQ_AUDIOVISUEL),
);

/* ------------------------------------------------------------------ */
/* Icônes — même gabarit que /evenementiel et /mode : viewBox 48,      */
/* trait seul, teinte accent héritée de `.engagement-icon`.            */
/* ------------------------------------------------------------------ */

function CameraBodyIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <path d="M6 16h24v18H6z" />
      <path d="M30 22l10-5v14l-10-5z" />
      <circle cx="14" cy="12" r="3.2" />
      <circle cx="22" cy="12" r="3.2" />
    </svg>
  );
}

function FresnelIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <path d="M12 10h14v16H12z" />
      <path d="M26 14l9-4v16l-9-4" />
      <path d="M19 26v10" />
      <path d="M11 42l8-6 8 6" />
    </svg>
  );
}

function DollyIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <path d="M8 38h32" />
      <path d="M8 34h32" />
      <circle cx="16" cy="28" r="4" />
      <circle cx="32" cy="28" r="4" />
      <path d="M12 24h24v-4H12z" />
      <path d="M24 20V8" />
      <path d="M18 8h12" />
    </svg>
  );
}

function FlightCaseIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <path d="M7 14h34v24H7z" />
      <path d="M7 22h34" />
      <path d="M18 14v-4h12v4" />
      <path d="M21 30h6" />
    </svg>
  );
}

function ClapIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <path d="M7 19h34v21H7z" />
      <path d="M7 19 10 8l32 3-1 8" />
      <path d="M16 9.2 13 19M25 10.1 22 19M34 11l-3 8" />
    </svg>
  );
}

function StudioIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <path d="M6 40V16l18-8 18 8v24" />
      <path d="M6 40h36" />
      <path d="M18 40V26h12v14" />
    </svg>
  );
}

function CratesIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <path d="M6 24h17v16H6zM25 24h17v16H25z" />
      <path d="M15 12h18v12H15z" />
      <path d="M6 32h17M25 32h17" />
    </svg>
  );
}

function HeadsetIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <path d="M11 30v-6a13 13 0 0 1 26 0v6" />
      <path d="M8 30h6v10H8zM34 30h6v10h-6z" />
      <path d="M24 40h8" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Contenu                                                             */
/* ------------------------------------------------------------------ */

/**
 * À qui s'adresse la page. La liste reprend les secteurs déjà revendiqués
 * publiquement par H24 (`FAQ_A_PROPOS` : productions audiovisuelles et
 * cinématographiques, agences de publicité, maisons de mode et de luxe,
 * tournées, salons, studios) et les métiers présents dans `src/data/clients.ts`
 * (loueurs et studios).
 */
const INTERLOCUTEURS = [
  {
    num: "01",
    Icon: ClapIcon,
    title: "Productions cinéma & publicité",
    text: "Longs métrages, séries, films publicitaires, clips, shootings et captations. Le transport se cale sur la feuille de service, pas sur des horaires d'agence.",
  },
  {
    num: "02",
    Icon: StudioIcon,
    title: "Studios & plateaux",
    text: "Livraisons et reprises sur les plateaux, les studios photo et les lieux de tournage en décor naturel, avec les contraintes d'accès et de créneau qui vont avec.",
  },
  {
    num: "03",
    Icon: CratesIcon,
    title: "Loueurs de matériel",
    text: "Rotations entre le loueur, la production et le plateau : sorties de parc, retours, échanges de matériel en cours de tournage.",
  },
  {
    num: "04",
    Icon: HeadsetIcon,
    title: "Régies & agences événementielles",
    /* Lien retour vers la page parente du domaine : c'est la carte où le
       recouvrement entre les deux intentions est réel, donc le seul endroit
       où le lien ne serait pas plaqué. */
    text: (
      <>
        Matériel technique, décor et régie pour les captations et les opérations
        de marque. Pour les concerts, les tournées et les salons, voir le{" "}
        <Link href="/evenementiel" className="link">transport événementiel</Link>.
      </>
    ),
  },
];

/**
 * Les quatre postes de matériel. La liste reprend celle déjà publiée sur
 * `/evenementiel` et dans les résumés de `PAGES` (caméra, optiques, lumière,
 * machinerie, décor, régie), détaillée poste par poste. Les `stat` viennent
 * toutes de `src/data/vehicles.ts`.
 *
 * Les H3 portent chacun une requête secondaire réelle (transport caméra,
 * transport lumière, transport machinerie, transport décor tournage) — c'est
 * volontaire, mais chaque titre reste une phrase qu'un régisseur écrirait.
 */
const POSTES = [
  {
    num: "01",
    Icon: CameraBodyIcon,
    title: "Caméras, optiques et matériel vidéo",
    text: "Corps caméra, séries d'optiques, moniteurs, enregistreurs et accessoires image. Peu de volume, beaucoup de valeur, aucune tolérance au choc : course dédiée, arrimage, et un véhicule qui ne transporte rien d'autre.",
    stat: "3 m³",
    statLabel: "Le format le plus mobile",
  },
  {
    num: "02",
    Icon: FresnelIcon,
    title: "Lumière et matériel électro",
    text: "Projecteurs, HMI, mandarines, panneaux LED, pieds, gélatines, câblage et flight cases. Du matériel lourd et encombrant, qui se charge par le hayon dès que le lieu de tournage n'a pas de quai.",
    stat: "Hayon",
    statLabel: "Sur les 12–14 et 20 m³",
  },
  {
    num: "03",
    Icon: DollyIcon,
    title: "Machinerie, grip et accessoires",
    text: "Travelling, rails, dollies, structures, pieds, plaques et sacs de sable. Des charges longues, lourdes et déséquilibrées, qui demandent un plan de chargement plutôt qu'un empilement.",
    stat: "1 300 kg",
    statLabel: "Charge utile maximale",
  },
  {
    num: "04",
    Icon: FlightCaseIcon,
    title: "Décors, accessoires et régie",
    text: (
      <>
        Éléments de décor, praticables, mobilier de plateau, accessoires et
        matériel de régie. Le volume qui doit être sur place avant
        l&apos;équipe, et repartir juste après. Les costumes d&apos;un tournage
        voyagent, eux, sur cintre —{" "}
        <Link href="/mode" className="link">dans un véhicule équipé penderie</Link>.
      </>
    ),
    stat: "20 m³",
    statLabel: "Le plus grand format",
  },
];

/** Les trois contraintes propres à un lieu de tournage. */
const CONTRAINTES = [
  {
    tag: "le créneau",
    titre: "Livré dans la fenêtre, pas dans la journée",
    texte:
      "Un plateau se monte sur un créneau arrêté à l'avance — parfois de nuit, parfois avant l'ouverture d'un site. H24 Transports fonctionne 24h/24 et 7j/7 : l'horaire contraint n'est pas une option, c'est le mode de fonctionnement depuis 2014.",
  },
  {
    tag: "l'accès",
    titre: "Des lieux de tournage qui ne sont pas des quais",
    texte:
      "Rue étroite, cour d'immeuble, sous-sol, studio avec un seul monte-charge. Le format du véhicule se décide avec la production avant la course, et le hayon est disponible sur les deux plus grands formats de la flotte.",
  },
  {
    tag: "le matériel",
    titre: "Sensible, cher, et attendu intact",
    texte:
      "Une caméra ou un projecteur ne se remplace pas dans la journée. Matériel d'arrimage dans chaque véhicule, chauffeurs et manutentionnaires formés à la manipulation du matériel sensible, et une seule marchandise à bord.",
  },
];

/**
 * Les horaires du secteur. Aucun de ces trois cas n'ajoute un service : ils
 * décrivent la journée d'un tournage et ce que le 24h/24 — déjà revendiqué
 * partout sur le site — permet d'en couvrir.
 */
const HORAIRES = [
  {
    num: "01",
    title: "Avant le call time",
    text: "Une équipe convoquée à 6 h suppose un matériel déjà sur place. Cela se joue la veille au soir ou avant l'aube, deux créneaux où un transporteur aux horaires de bureau ne répond pas. Le dispatch H24, lui, est joignable en permanence.",
  },
  {
    num: "02",
    title: "Après le dernier plan",
    text: "Un tournage finit quand il finit. Le démontage démarre dans la foulée, souvent tard, et le matériel doit repartir le soir même vers le parc du loueur ou vers le décor du lendemain.",
  },
  {
    num: "03",
    title: "Pendant, quand ça coince",
    text: "Un projecteur qui rend l'âme ou une optique oubliée au parc arrêtent le plateau. C'est une urgence qui se traite en course dédiée : un véhicule part immédiatement, sans escale, avec 1 heure d'intervention annoncée dans Paris intramuros.",
  },
];

export default function TransportMaterielAudiovisuelPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <RevealOnScroll />

      {/*
        En-tête sans photo de fond, contrairement aux cinq autres pages
        « univers ». Deux raisons :
        - la seule photo de tournage du site sert déjà d'en-tête à
          /evenementiel ; la réutiliser ici donnerait deux pages jumelles.
          Elle est réemployée plus bas, en contenu et en chargement différé ;
        - sans image plein cadre, le candidat LCP devient le H1 — le meilleur
          cas possible pour la page qu'on cherche à positionner.

        `glow={false}` : le fond reste la grille de carreaux (`hero-grid`).
        Les deux autres combinaisons ont été essayées et écartées après
        capture, le 2026-09-16 :
        - halo activé (défaut) : `HeroGlow` est dimensionné pour la vidéo de
          l'accueil (130 % de large, 110 % de haut) ; sur un en-tête nu, il
          passe par-dessus la seconde ligne du H1 et la rend floue ;
        - rendu véhicule en `media` + `softGlow` (la recette de
          /application) : le halo était corrigé, mais la colonne de texte
          réduite faisait passer le H1 de 3 à 5 lignes, en coupant
          « Île-de-France » en deux. Un H1 lisible vaut mieux qu'un en-tête
          rempli.
      */}
      <PageHeader
        tag="/ service / audiovisuel"
        eyebrow="Service · Transport audiovisuel"
        title="Transport de matériel audiovisuel"
        accent="à Paris &amp; en Île-de-France"
        lead="Caméras, optiques, lumière, machinerie, décors et régie — enlevés chez vos loueurs et livrés sur vos lieux de tournage, 24h/24. Une flotte dédiée de 3 à 20 m³ aux normes Euro 6d, des équipes habituées au matériel sensible, et un dispatch joignable en permanence."
        glow={false}
      />

      {/* Introduction : ce qu'on transporte, pour qui, où, quand. Le visiteur
          doit pouvoir répondre à ces quatre questions sans scroller deux fois.
          Les chiffres viennent de src/data/activity.ts et vehicles.ts. */}
      <section className="about-stats section-tight">
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <p className="lead">
                H24 Transports transporte du matériel audiovisuel à Paris et en
                Île-de-France depuis 2014 : caméras et optiques, lumière et
                matériel électro, machinerie, décors, accessoires et régie.
                Les donneurs d&apos;ordre sont des productions cinéma et
                publicité, des studios, des loueurs de matériel, des régies et
                des agences événementielles.
              </p>
              <p className="dim" style={{ marginTop: 20, lineHeight: 1.7 }}>
                Le matériel de tournage a trois particularités qui le rendent
                mal adapté à la messagerie classique : il est fragile, il vaut
                cher, et il est attendu à une heure précise sur un lieu qui
                n&apos;est pas un entrepôt. C&apos;est pourquoi le transport
                audiovisuel se fait en course dédiée — un véhicule, un client,
                aucun groupage — et pourquoi le dispatch reste joignable
                24 heures sur 24 au{" "}
                <a className="tnum" href={SITE.phoneHref}>
                  {SITE.phone}
                </a>
                .
              </p>
            </div>
            {/*
              Lien sortant vers la fiche publique H24 du guide des ressources
              de Film Paris Region. Formulation volontairement limitée à ce
              qu'elle est — un référencement dans un guide professionnel — et
              non un partenariat : rien sur la page de Film Paris Region ne
              déclare de partenariat.

              Pas de `nofollow` : c'est un lien éditorial vers un organisme
              sectoriel légitime, ni sponsorisé ni généré par un utilisateur,
              donc aucun des cas où Google attend un attribut.

              ⚠️ Le Paris Images Production Forum n'est **pas** lié ici : deux
              recherches (2026-09-16) n'ont trouvé aucune fiche H24 publique
              sur ce site, et son certificat TLS est expiré. Ne pas ajouter le
              lien sans une page publique qui confirme la présence.
            */}
            <div className="right">
              H24 Transports est référencée comme service de tournage dans le{" "}
              <a
                className="link"
                href="https://www.filmparisregion.com/en/resource-guide/h24-transports"
                target="_blank"
                rel="noopener noreferrer"
              >
                guide des ressources de Film Paris Region
              </a>
              .
              <p style={{ marginTop: 18 }}>
                <a className="btn btn-primary" href={SITE.dashboard.order}>
                  Demander un transport <span className="arrow" />
                </a>
              </p>
            </div>
          </div>
          <div className="stats-line reveal-stagger">
            <div className="stat-block">
              <div className="display-xl tnum">
                <Counter value={anneesExperience()} />
              </div>
              <div className="mono dim">Ans dans l&apos;audiovisuel</div>
            </div>
            <div className="stat-block">
              <div className="display-xl tnum">
                <Counter value={ACTIVITY.courses} />
              </div>
              <div className="mono dim">Courses depuis {ACTIVITY.coursesDepuis}</div>
            </div>
            <div className="stat-block">
              <div className="display-xl accent">3–20 m³</div>
              <div className="mono dim">Flotte aux normes Euro 6d</div>
            </div>
            <div className="stat-block">
              <div className="display-xl accent">24/7</div>
              <div className="mono dim">Dispatch joignable</div>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">Pour qui</span>
              {/* Les H2 de cette page tiennent en deux lignes de ~22 signes :
                  au-delà, la colonne `.section-head .left` (720 px) renvoie un
                  mot seul à la ligne et pousse la colonne de droite sous le
                  titre. Mesuré en capture le 2026-09-16. */}
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Pour les tournages
                <br />
                et les productions.
              </h2>
            </div>
            <div className="right">
              Quatre métiers appellent H24 Transports, et aucun n&apos;a les
              mêmes contraintes. Le point commun : une date, une heure, et du
              matériel qu&apos;on ne remplace pas dans la journée.
            </div>
          </div>
          <div className="engagements-grid reveal-stagger">
            {INTERLOCUTEURS.map((i) => (
              <div className="category-card" key={i.num}>
                <div className="engagement-icon">
                  <i.Icon />
                </div>
                <div className="mono dim" style={{ marginTop: 20 }}>
                  // {i.num}
                </div>
                <h3 className="display-s" style={{ marginTop: 12 }}>
                  {i.title}
                </h3>
                <p className="dim" style={{ marginTop: 14, lineHeight: 1.6 }}>
                  {i.text}
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
              <span className="eyebrow">Ce qu&apos;on transporte</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                De la caméra au décor,
                <br />
                poste par poste.
              </h2>
            </div>
            <div className="right">
              Chaque poste a ses contraintes de volume, de poids et de
              fragilité. Le véhicule et le plan de chargement se décident poste
              par poste, pas au forfait.
            </div>
          </div>
          <div className="engagements-grid reveal-stagger">
            {POSTES.map((p) => (
              <div className="category-card" key={p.num}>
                <div className="engagement-icon">
                  <p.Icon />
                </div>
                <div className="mono dim" style={{ marginTop: 20 }}>
                  // poste {p.num}
                </div>
                <h3 className="display-s" style={{ marginTop: 12 }}>
                  {p.title}
                </h3>
                <p className="dim" style={{ marginTop: 14, lineHeight: 1.6 }}>
                  {p.text}
                </p>
                <div className="category-stat">
                  <span className="display-m accent tnum">{p.stat}</span>
                  <span className="mono dim">{p.statLabel}</span>
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
              <span className="eyebrow">Transport dédié</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Un transport dédié,
                <br />
                sans rupture de charge.
              </h2>
            </div>
            <div className="right">
              Un véhicule, une course, un client. Le matériel part de
              l&apos;adresse d&apos;enlèvement et arrive au lieu de tournage
              sans passer par une plateforme logistique, sans être regroupé
              avec d&apos;autres envois et sans être manipulé entre les deux.
              <p style={{ marginTop: 18 }}>
                <Link href="/express" className="btn btn-ghost">
                  La course exclusive{" "}
                  <span className="arrow" />
                </Link>
              </p>
            </div>
          </div>
          <div className="split-grid reveal">
            {/*
              Photo réemployée depuis /evenementiel : c'est une prise de vue
              H24 sur un lieu de tournage, donc le visuel le plus juste de
              cette page. Elle est ici en contenu, sous la ligne de flottaison
              et sans `priority` — donc chargée en différé, contrairement à
              l'en-tête de /evenementiel. Aucun nouvel asset n'a été ajouté :
              les visuels du site sont des prises de vue H24 tracées dans
              `public/images/CREDITS.md`, et une photo de banque générique
              aurait dégradé la page plus qu'elle ne l'aurait servie.
            */}
            <Image
              className="split-photo"
              src="/images/evenementiel/event-tailgate.webp"
              width={1920}
              height={1280}
              alt="Chargement de matériel de machinerie et de projecteurs dans un camion H24 Transports, hayon déployé sur un lieu de tournage"
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

      {/* Sélecteur de flotte de l'accueil, avec un chapeau propre à
          l'audiovisuel (props ajoutées le 2026-09-16, cf. Fleet.tsx). Il
          répond à la question « quel véhicule pour mon matériel ? » avec les
          cotes et charges utiles réelles, pas avec « nous avons des
          véhicules ». */}
      <Fleet
        eyebrow="La flotte"
        title={
          <>
            Une flotte adaptée
            <br />
            au matériel audiovisuel.
          </>
        }
        intro="Quatre formats aux normes Euro 6d, tous équipés de matériel d'arrimage et géolocalisés. Un 3 m³ pour un jeu d'optiques ou une caméra, un 20 m³ pour un décor complet — hayon inclus sur les deux plus grands formats."
      />

      <section className="categories" style={{ background: "var(--bg-1)" }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">Matériel sensible</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Gardiennage et stockage
                <br />
                entre deux journées.
              </h2>
            </div>
            <div className="right">
              Un tournage sur plusieurs jours pose une question que personne
              n&apos;aime traiter la veille : où dort le matériel ? Rentrer au
              parc du loueur chaque soir coûte deux courses de plus par jour.
            </div>
          </div>
          <div className="engagements-grid reveal-stagger">
            <div className="category-card">
              <div className="mono dim">// 01</div>
              <h3 className="display-s" style={{ marginTop: 12 }}>
                Stockage sécurisé
              </h3>
              <p className="dim" style={{ marginTop: 14, lineHeight: 1.6 }}>
                Stockage dans les installations de H24 Transports, et locaux
                vidéo-surveillés 24h/24 — y compris pour un véhicule qui reste
                chargé entre deux journées de tournage, plutôt que de faire un
                aller-retour au parc chaque soir.
              </p>
              <div className="category-stat">
                <span className="display-m accent">24h/24</span>
                <span className="mono dim">Vidéo-surveillé</span>
              </div>
            </div>
            <div className="category-card">
              <div className="mono dim">// 02</div>
              <h3 className="display-s" style={{ marginTop: 12 }}>
                Suivi géolocalisé
              </h3>
              <p className="dim" style={{ marginTop: 14, lineHeight: 1.6 }}>
                Tous les véhicules sont géolocalisés. Les statuts et
                l&apos;heure d&apos;arrivée estimée sont consultables à chaque
                étape depuis{" "}
                <Link href="/application" className="link">l&apos;application H24</Link>, avec
                notification en cas d&apos;imprévu.
              </p>
              <div className="category-stat">
                <span className="display-m accent">Temps réel</span>
                <span className="mono dim">Étape par étape</span>
              </div>
            </div>
            <div className="category-card">
              <div className="mono dim">// 03</div>
              <h3 className="display-s" style={{ marginTop: 12 }}>
                Assurance transport
              </h3>
              {/* Formulation attribuée, pas assertive : « tout risque et en
                  tout lieu » est la clause des CGV de H24 (article
                  « Assurances », cf. src/data/cgv.ts), pas une garantie
                  illimitée. Dire d'où vient la phrase la rend vérifiable et
                  renvoie le lecteur aux limites de responsabilité, qui font
                  l'objet d'un autre article du même document. */}
              <p className="dim" style={{ marginTop: 14, lineHeight: 1.6 }}>
                Les{" "}
                <Link href="/cgv" className="link">
                  conditions générales
                </Link>{" "}
                de H24 Transports déclarent une assurance sur le transport
                couvrant tout risque et en tout lieu, dont une attestation peut
                être communiquée au donneur d&apos;ordre sur demande.
              </p>
              <div className="category-stat">
                <span className="display-m accent">Tout risque</span>
                <span className="mono dim">Attestation sur demande</span>
              </div>
            </div>
            <div className="category-card">
              <div className="mono dim">// 04</div>
              <h3 className="display-s" style={{ marginTop: 12 }}>
                Équipes formées
              </h3>
              <p className="dim" style={{ marginTop: 14, lineHeight: 1.6 }}>
                Chauffeurs et manutentionnaires formés à la manipulation du
                matériel sensible, équipés pour intervenir sur un plateau,
                casque compris.
              </p>
              <div className="category-stat">
                <span className="display-m accent">Manutention</span>
                <span className="mono dim">Spécialisée</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Les horaires du secteur — section la plus « métier » de la page, et
          celle qu'aucun transporteur généraliste n'écrit. Elle ne revendique
          aucun service nouveau : elle explique ce que le 24h/24 couvre. */}
      <section className="about-content">
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">Horaires du secteur</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Transport audiovisuel
                <br />
                24h/24 et 7j/7 à Paris.
              </h2>
            </div>
            <div className="right">
              Le tournage est l&apos;un des rares secteurs où les trois
              moments critiques du transport tombent tous en dehors des heures
              ouvrées. C&apos;est la raison d&apos;être du 24h/24 chez H24
              Transports, pas un argument ajouté après coup.
            </div>
          </div>
          {HORAIRES.map((h) => (
            <div className="about-row reveal" key={h.num}>
              <div className="about-row-num">{h.num}</div>
              <div className="about-row-title">
                <h3 className="display-m">{h.title}</h3>
              </div>
              <div className="about-row-text">
                <p className="dim" style={{ lineHeight: 1.7 }}>
                  {h.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pertinence géographique : les trois zones réelles de src/data/site.ts,
          source unique partagée avec l'accueil, les FAQ et le balisage. Pas de
          liste d'arrondissements ni de communes — une énumération artificielle
          n'apporte rien et signale exactement le contraire de ce qu'on veut. */}
      <section className="zones">
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">Zones d&apos;intervention</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Paris, Île-de-France,
                <br />
                et toute la France.
              </h2>
            </div>
            <div className="right">
              H24 Transports est domiciliée 4 boulevard de Beaubourg, 77183
              Croissy-Beaubourg, en Seine-et-Marne — à proximité immédiate de
              l&apos;est parisien.
            </div>
          </div>
          <div className="zones-list reveal-stagger">
            {ZONES.map((zone) => (
              <div className="zone-row" key={zone.label}>
                <span
                  className="zone-dot"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 12px var(--accent)",
                  }}
                />
                <span className="zone-label">{zone.label}</span>
                <span className="zone-km mono dim">{zone.km} km</span>
                <span className="zone-time display-s tnum accent">
                  {zone.time}
                </span>
              </div>
            ))}
          </div>
          <p className="dim reveal" style={{ marginTop: 32, lineHeight: 1.7 }}>
            L&apos;essentiel de l&apos;activité audiovisuelle se joue dans un
            périmètre serré : les studios et plateaux franciliens, les parcs des
            loueurs et prestataires techniques, et les décors naturels dans
            Paris. Ces délais s&apos;entendent depuis la prise en charge de la
            demande par le dispatch, joignable 24h/24. Au-delà de
            l&apos;Île-de-France, H24 Transports assure les départs de Paris
            vers la France entière — un tournage en province, un retour de
            matériel, une livraison sur un lieu de captation.
          </p>
        </div>
      </section>

      <Values
        eyebrow="Pourquoi H24"
        title={
          <>
            Pourquoi confier son
            <br />
            matériel audiovisuel.
          </>
        }
        intro="Pas de superlatif : quatre différences concrètes, toutes vérifiables sur ce site."
        values={[
          {
            title: "Spécialisation",
            text: "Le transport audiovisuel est l'un des trois métiers de H24 Transports depuis 2014, pas une ligne ajoutée à un catalogue de messagerie. L'entreprise est référencée comme service de tournage dans le guide des ressources de Film Paris Region.",
          },
          {
            title: "Exclusivité",
            text: "Un véhicule dédié à une seule course : pas de groupage, pas de plateforme logistique, aucun contact avec d'autres marchandises entre l'enlèvement et la livraison.",
          },
          {
            title: "Disponibilité",
            text: "24h/24 et 7j/7, dispatch joignable en permanence. Les tournages de nuit, les call times avant l'aube et les démontages tardifs font partie du métier.",
          },
          {
            title: "Traçabilité",
            text: "Véhicules géolocalisés, suivi des statuts et heure d'arrivée estimée à chaque étape depuis l'application, et un interlocuteur unique du devis à la livraison.",
          },
        ]}
      />

      <Process
        eyebrow="Organiser un transport"
        title={
          <>
            Organiser un transport
            <br />
            audiovisuel.
          </>
        }
        intro="Quatre étapes, du premier appel à la livraison sur le plateau. Une demande se dépose 24h/24, par téléphone ou depuis l'application."
        steps={[
          {
            title: "La demande",
            text: "Un appel au dispatch au 01 80 27 54 60, ou une demande créée directement depuis l'application H24. La ligne est ouverte 24h/24, y compris la nuit et le week-end.",
          },
          {
            title: "Le matériel et les adresses",
            text: "Nature et volume du matériel, poids, conditionnement, postes concernés, adresses d'enlèvement et de livraison, créneaux imposés et contraintes d'accès du lieu de tournage.",
          },
          {
            title: "Le véhicule et le créneau",
            text: "Le format de véhicule et le chauffeur sont affectés, le besoin de hayon tranché, le plan de chargement arrêté et le créneau confirmé. Un interlocuteur unique suit la mission de bout en bout.",
          },
          {
            title: "Le transport et le suivi",
            text: "La course est géolocalisée : statuts et heure d'arrivée estimée consultables à chaque étape depuis l'application, avec notification en cas d'imprévu, jusqu'à la livraison sur le plateau.",
          },
        ]}
      />

      {/* Références déjà affichées publiquement à l'accueil
          (src/data/clients.ts) — parmi elles des loueurs et studios
          audiovisuels, qui sont la preuve la plus parlante sur cette page.
          Aucune n'est présentée comme un partenariat : le chapô parle de
          « donneurs d'ordre », ce qu'ils sont. */}
      <Clients
        eyebrow="Une expertise au service des productions"
        lead="Productions, studios, loueurs de matériel et agences : quelques-uns des donneurs d'ordre de H24 Transports."
      />

      <Faq
        items={FAQ_AUDIOVISUEL}
        eyebrow="Questions fréquentes"
        title="Transport audiovisuel —"
        accent="vos questions."
      />

      <Cta />
    </>
  );
}
