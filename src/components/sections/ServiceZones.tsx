import { ZONES } from "@/data/site";

type Props = {
  /** Titre H2 : il doit porter la requête de la page (« coursier urgent… »). */
  title: React.ReactNode;
  /** Colonne de droite du chapeau. */
  intro?: React.ReactNode;
  /** Paragraphe sous la liste, pour le contexte propre au service. */
  note?: React.ReactNode;
};

/**
 * Délais d'intervention par zone, déclinés pour une page service.
 *
 * Même markup que la section de `/transport-materiel-audiovisuel-paris`, mais
 * le H2 est paramétrable : chaque page y place sa propre requête. Les chiffres
 * viennent de `ZONES` (src/data/site.ts), source unique du site.
 */
export function ServiceZones({ title, intro, note }: Props) {
  return (
    <section className="zones">
      <div className="container">
        <div className="section-head reveal">
          <div className="left">
            <span className="eyebrow">Zones d&apos;intervention</span>
            <h2 className="display-l" style={{ marginTop: 16 }}>
              {title}
            </h2>
          </div>
          {intro && <div className="right">{intro}</div>}
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
              <span className="zone-time display-s tnum accent">{zone.time}</span>
            </div>
          ))}
        </div>
        {note && (
          <p className="dim reveal" style={{ marginTop: 32, lineHeight: 1.7 }}>
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
