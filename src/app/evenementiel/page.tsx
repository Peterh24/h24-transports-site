import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Cta } from "@/components/sections/Cta";
import { Faq } from "@/components/sections/Faq";
import { PageHeader } from "@/components/sections/PageHeader";
import { Values } from "@/components/sections/Values";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_EVENEMENTIEL } from "@/data/faq";
import { getPage } from "@/data/pages";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumb, faqPage, graph, service, webPage } from "@/lib/schema";

const PAGE = getPage("/evenementiel");

export const metadata: Metadata = pageMetadata({
  path: PAGE.path,
  title: "Transport événementiel & audiovisuel à Paris",
  description:
    "Transport audiovisuel et événementiel à Paris : caméra, lumière, machinerie et décor livrés à l'heure, en Île-de-France et partout en France.",
});

const jsonLd = graph(
  webPage({
    path: PAGE.path,
    name: "Transport événementiel & audiovisuel à Paris",
    description: PAGE.summary,
    dateModified: PAGE.updated,
  }),
  breadcrumb(PAGE.path, [{ name: PAGE.label, path: PAGE.path }]),
  service({
    path: PAGE.path,
    name: "Transport audiovisuel et événementiel",
    serviceType: "Transport de matériel audiovisuel et événementiel",
    description:
      "Transport de caméra, optiques, lumière, machinerie, décor et régie pour la publicité, le cinéma, la mode, le luxe, les concerts et les salons professionnels, 24h/24.",
    offers: ["Publicité & cinéma", "Mode & luxe", "Concert & salon"],
  }),
  faqPage(PAGE.path, FAQ_EVENEMENTIEL),
);

/* icônes des engagements (SVG, teinte accent) */
function LockIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <rect x="11" y="21" width="26" height="19" rx="3" />
      <path d="M16 21v-5a8 8 0 0 1 16 0v5" />
      <circle cx="24" cy="30" r="2.4" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <path d="M24 6c-7.2 0-13 5.6-13 12.6C11 28 24 42 24 42s13-14 13-23.4C37 11.6 31.2 6 24 6Z" />
      <circle cx="24" cy="19" r="4.5" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <path d="M24 6 39 12v9c0 9.4-6.4 16.8-15 21-8.6-4.2-15-11.6-15-21v-9L24 6Z" />
      <path d="M17 24l5 5 9-10" />
    </svg>
  );
}
function PeopleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="eng-svg" aria-hidden="true">
      <circle cx="18" cy="18" r="5" />
      <circle cx="32" cy="20" r="4" />
      <path d="M9 37c0-5.5 4-9.5 9-9.5s9 4 9 9.5" />
      <path d="M28 28.5c4.2.4 8 3.8 8 8.5" />
    </svg>
  );
}

const ENGAGEMENTS = [
  {
    img: "/images/evenementiel/engagement-stockage.webp",
    Icon: LockIcon,
    title: "Stockage sécurisé",
    text: "Locaux vidéo-surveillés 24h/24 pour vos véhicules chargés.",
  },
  {
    img: "/images/evenementiel/engagement-geoloc.webp",
    Icon: PinIcon,
    title: "Géolocalisation live",
    text: "Suivez vos marchandises en temps réel via notre dashboard.",
  },
  {
    img: "/images/evenementiel/engagement-assurances-v3.webp",
    Icon: ShieldIcon,
    title: "Assurances dédiées",
    text: "Couverture adaptée au matériel audiovisuel et événementiel.",
  },
  {
    img: "/images/evenementiel/engagement-equipes.webp",
    Icon: PeopleIcon,
    title: "Équipes formées",
    text: "Manutention spécialisée, casque, régisseur « junior » possible.",
  },
];

export default function EventPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <RevealOnScroll />
      <PageHeader
        eyebrow="Univers · Audiovisuel & Événementiel"
        title="Le matériel arrive."
        accent="L'événement peut commencer."
        lead="Caméra, lumière, machinerie, décor — pour Pub & Cinéma, Mode & Luxe, Concert & Salon. Une expertise née sur le terrain à Paris, en 2014."
        image="/images/evenementiel/event-tailgate.webp"
        imageAlt="Camion H24 Transports hayon déployé sur un tournage, chargé de matériel de machinerie et de lumière"
        glow={false}
        photoTone="bright"
      />
      <Values
        values={[
          {
            title: "Rapidité",
            text: "Nous mettons tout en œuvre pour une livraison rapide et fiable à chaque mission, conscients que le moindre retard peut compromettre votre projet.",
          },
          {
            title: "Fiabilité",
            text: "Une flotte adaptée et des professionnels qualifiés pour assurer le bon déroulement de chaque mission.",
          },
          {
            title: "Ponctualité",
            text: "L'arrivée à l'heure est notre priorité absolue, parce que nous comprenons l'importance du tempo dans votre secteur.",
          },
          {
            title: "Flexibilité",
            text: "Disponibles 24h/24, 7j/7. Nos équipes savent rebondir face à l'imprévu et trouver des solutions adaptées.",
          },
        ]}
      />
      <section className="split-feature">
        <div className="container">
          <div className="section-head reveal">
            <div className="left">
              <span className="eyebrow">Sécurité & assurances</span>
              <h2 className="display-l" style={{ marginTop: 16 }}>
                Une prise en charge
                <br />
                complète.
              </h2>
            </div>
            <div className="right">
              Stockage sécurisé, géolocalisation, assurances dédiées et équipes
              formées — vos marchandises entre de bonnes mains, du départ à la
              livraison.
              <p style={{ marginTop: 18 }}>
                <Link href="/mode" className="btn btn-ghost">
                  Transport mode &amp; vêtements sur cintre{" "}
                  <span className="arrow" />
                </Link>
              </p>
            </div>
          </div>
          <div className="engagements-grid reveal-stagger">
            {ENGAGEMENTS.map((e) => (
              <figure className="engagement-card" key={e.title}>
                <div className="engagement-photo">
                  <Image
                    src={e.img}
                    width={864}
                    height={455}
                    alt={`${e.title} — H24 Transports`}
                    sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 25vw"
                  />
                </div>
                <div className="engagement-body">
                  <div className="engagement-icon">
                    <e.Icon />
                  </div>
                  <h3 className="engagement-title">{e.title}</h3>
                  <p className="engagement-text dim">{e.text}</p>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <Faq items={FAQ_EVENEMENTIEL} />
      <Cta />
    </>
  );
}
