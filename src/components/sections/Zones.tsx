type Zone = {
  label: string;
  time: string;
  km: string;
  color: string;
};

const zones: Zone[] = [
  { label: "Paris", time: "H-1", km: "0–20", color: "var(--accent)" },
  { label: "Île-de-France", time: "H-3", km: "20–80", color: "var(--accent-deep)" },
  { label: "France entière", time: "H-12", km: "80+", color: "rgba(255,255,255,0.4)" },
];

const dispatchMarkers: [number, number][] = [
  [120, 180],
  [280, 200],
  [150, 320],
  [310, 290],
  [100, 250],
  [260, 130],
];

export function Zones() {
  return (
    <section className="zones" id="zones">
      <div className="container">
        <div className="zones-grid">
          <div className="zones-text reveal">
            <span className="eyebrow">Délais d'intervention</span>
            <h2 className="display-l" style={{ marginTop: 16 }}>
              Où vous voulez.<br />
              <span className="accent">Quand vous voulez.</span>
            </h2>
            <p className="lead" style={{ marginTop: 24 }}>
              De Paris intramuros au reste de la France, nous garantissons des
              délais d'intervention adaptés à l'urgence de votre demande.
            </p>
            <div className="zones-list" style={{ marginTop: 40 }}>
              {zones.map((z, i) => (
                <div className="zone-row reveal" key={z.label} style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="zone-dot" style={{ background: z.color, boxShadow: `0 0 12px ${z.color}` }}></span>
                  <span className="zone-label">{z.label}</span>
                  <span className="zone-km mono dim">{z.km} km</span>
                  <span className="zone-time display-s tnum accent">{z.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="zones-map reveal">
            <div className="zones-map-inner">
              <svg viewBox="0 0 400 480" className="map-svg">
                {/* concentric rings */}
                <circle cx="200" cy="240" r="220" fill="none" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
                <circle cx="200" cy="240" r="160" fill="none" stroke="rgba(245,146,57,0.15)" strokeDasharray="3 6" />
                <circle cx="200" cy="240" r="80" fill="none" stroke="rgba(245,146,57,0.4)" strokeDasharray="3 6" />
                <circle cx="200" cy="240" r="22" fill="rgba(245,146,57,0.1)" />
                {/* dotted map background */}
                {Array.from({ length: 18 * 18 }).map((_, i) => {
                  const x = (i % 18) * 22 + 10;
                  const y = Math.floor(i / 18) * 22 + 30;
                  const dx = x - 200,
                    dy = y - 240;
                  const dist = Math.sqrt(dx * dx + dy * dy);
                  if (dist > 220) return null;
                  const op = Math.max(0.05, 1 - dist / 250);
                  return <circle key={i} cx={x} cy={y} r="1.4" fill={`rgba(255,255,255,${op * 0.18})`} />;
                })}
                {/* paris core */}
                <circle cx="200" cy="240" r="6" fill="var(--accent)" />
                <circle cx="200" cy="240" r="14" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.7">
                  <animate attributeName="r" from="6" to="32" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* labels */}
                <text x="210" y="244" fill="white" fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="2">PARIS</text>
                <text x="200" y="80" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="2" textAnchor="middle">ÎLE-DE-FRANCE</text>
                <text x="200" y="20" fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="JetBrains Mono, monospace" letterSpacing="2" textAnchor="middle">FRANCE</text>
                {/* small dispatch markers */}
                {dispatchMarkers.map((p, i) => (
                  <g key={i}>
                    <circle cx={p[0]} cy={p[1]} r="3" fill="var(--accent)" opacity="0.7" />
                    <line x1="200" y1="240" x2={p[0]} y2={p[1]} stroke="rgba(245,146,57,0.2)" strokeDasharray="1 4" />
                  </g>
                ))}
              </svg>
              <div className="map-legend mono dim">
                <div>// dispatch en temps réel</div>
                <div className="ticker" style={{ marginTop: 8 }}>
                  <span className="dot"></span>
                  <span>14 véhicules en mission</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
