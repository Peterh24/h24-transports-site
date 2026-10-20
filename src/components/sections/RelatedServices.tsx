import Link from "next/link";

/**
 * Maillage interne entre pages services.
 *
 * Avant le 2026-10-20, /express, /colis et /evenementiel n'étaient reliées
 * entre elles que par le pied de page : Google lisait trois pages isolées.
 * Chaque page affiche ici les autres services, avec une ancre descriptive
 * (la requête de la page cible, pas « en savoir plus »).
 */
const SERVICES = [
  {
    href: "/transport-materiel-audiovisuel-paris",
    anchor: "Transport de matériel audiovisuel",
    text: "Caméra, lumière, machinerie et décor livrés sur les tournages, de jour comme de nuit.",
  },
  {
    href: "/evenementiel",
    anchor: "Transport événementiel",
    text: "Salons, concerts et tournées : stands, décor et régie livrés dans les créneaux de montage.",
  },
  {
    href: "/mode",
    anchor: "Transport de vêtements sur cintre",
    text: "Portants et collections en véhicule équipé penderie, de showroom à showroom.",
  },
  {
    href: "/express",
    anchor: "Coursier urgent à Paris",
    text: "Un utilitaire dédié à une seule course, sans groupage, 24h/24 et 7j/7.",
  },
  {
    href: "/colis",
    anchor: "Transport de colis et palettes",
    text: "Du pli à la palette, en course dédiée ou en livraison planifiée.",
  },
] as const;

type Props = {
  /** Chemin de la page courante, retiré de la liste. */
  current: (typeof SERVICES)[number]["href"];
};

export function RelatedServices({ current }: Props) {
  const autres = SERVICES.filter((s) => s.href !== current);
  return (
    <section className="categories" style={{ background: "var(--bg-1)" }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="left">
            <span className="eyebrow">Nos autres services</span>
            <h2 className="display-l" style={{ marginTop: 16 }}>
              Un seul dispatch,
              <br />
              tous vos transports.
            </h2>
          </div>
        </div>
        <div className="engagements-grid reveal-stagger">
          {autres.map((s) => (
            <div className="category-card" key={s.href}>
              <h3 className="display-s">
                <Link href={s.href} className="link">
                  {s.anchor}
                </Link>
              </h3>
              <p className="dim" style={{ marginTop: 14, lineHeight: 1.6 }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
