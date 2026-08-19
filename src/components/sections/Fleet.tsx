"use client";

import { useState } from "react";
import { VEHICLES } from "@/data/vehicles";

/** Étoiles (positions figées → pas de mismatch d'hydratation). x/y en %, s = taille px, d = délai s, t = durée s. */
const STARS = [
  { x: 5, y: 10, s: 2, d: 0, t: 3.2 },
  { x: 12, y: 30, s: 1.4, d: 1.1, t: 4 },
  { x: 19, y: 16, s: 1.8, d: 2.2, t: 3.6 },
  { x: 24, y: 42, s: 1.2, d: 0.6, t: 4.4 },
  { x: 31, y: 8, s: 2.2, d: 1.6, t: 3 },
  { x: 37, y: 33, s: 1.3, d: 2.8, t: 4.2 },
  { x: 44, y: 20, s: 1.7, d: 0.3, t: 3.8 },
  { x: 49, y: 45, s: 1.1, d: 1.9, t: 4.6 },
  { x: 56, y: 12, s: 2, d: 1.2, t: 3.4 },
  { x: 61, y: 36, s: 1.5, d: 2.5, t: 4 },
  { x: 67, y: 22, s: 1.9, d: 0.8, t: 3.2 },
  { x: 72, y: 7, s: 1.3, d: 1.7, t: 4.4 },
  { x: 77, y: 40, s: 2.1, d: 0.4, t: 3 },
  { x: 82, y: 18, s: 1.4, d: 2.1, t: 4.2 },
  { x: 88, y: 31, s: 1.8, d: 1.4, t: 3.6 },
  { x: 93, y: 13, s: 1.6, d: 0.9, t: 4 },
  { x: 96, y: 38, s: 1.2, d: 2.6, t: 3.8 },
  { x: 9, y: 47, s: 1.6, d: 3, t: 3.4 },
  { x: 41, y: 6, s: 1.2, d: 0.5, t: 4.6 },
  { x: 64, y: 49, s: 1.5, d: 1.5, t: 3.2 },
  { x: 16, y: 5, s: 1.3, d: 2, t: 4 },
  { x: 53, y: 28, s: 1.7, d: 0.2, t: 3.6 },
  { x: 85, y: 47, s: 1.3, d: 2.4, t: 4.2 },
  { x: 28, y: 24, s: 1.5, d: 1.0, t: 3.9 },
];

export function Fleet() {
  const [active, setActive] = useState(0);
  const v = VEHICLES[active];

  return (
    <section className="fleet" id="fleet">
      <div className="fleet-sky" aria-hidden="true">
        <div className="fleet-stars">
          {STARS.map((st, i) => (
            <span
              key={i}
              className="fleet-star"
              style={{
                left: `${st.x}%`,
                top: `${st.y}%`,
                width: `${st.s}px`,
                height: `${st.s}px`,
                animationDelay: `${st.d}s`,
                animationDuration: `${st.t}s`,
              }}
            />
          ))}
          <span className="shooting-star" />
          <span className="shooting-star shooting-star-2" />
        </div>
        <div className="fleet-eiffel-wrap">
          <span className="eiffel-beam" />
          <span className="eiffel-beam eiffel-beam-2" />
          <svg
            className="fleet-eiffel"
            viewBox="0 0 120 260"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
          >
          {/* socle / sol */}
          <line className="ef-soft" x1="6" y1="252" x2="114" y2="252" />
          {/* arche de la base entre les pieds */}
          <path className="ef-line" d="M38 252 Q60 214 82 252" />
          {/* pied / arête gauche (concave) */}
          <path className="ef-line" d="M10 252 Q40 168 50 92 Q54 52 56 30" />
          {/* pied / arête droite (concave) */}
          <path className="ef-line" d="M110 252 Q80 168 70 92 Q66 52 64 30" />
          {/* plateformes */}
          <line className="ef-line" x1="30" y1="170" x2="90" y2="170" />
          <line className="ef-line" x1="46" y1="92" x2="74" y2="92" />
          <line className="ef-line" x1="55" y1="44" x2="65" y2="44" />
          {/* plateforme haute -> sommet */}
          <path className="ef-line" d="M56 30 L64 30" />
          {/* mât / antenne */}
          <line className="ef-line" x1="60" y1="30" x2="60" y2="8" />
          {/* treillis (détail léger) */}
          <path className="ef-soft" d="M40 170 L52 92 M80 170 L68 92 M50 92 L56 44 M70 92 L64 44" />
          {/* phare clignotant au sommet */}
          <circle className="eiffel-beacon" cx="60" cy="6" r="2.6" />
          </svg>
        </div>
      </div>
      <div className="container">
        <div className="section-head reveal">
          <div className="left">
            <span className="eyebrow">Notre flotte</span>
            <h2 className="display-l">Quatre formats.<br/>Une seule promesse.</h2>
          </div>
          <div className="right">
            Tous nos véhicules sont équipés de matériel d'arrimage, géolocalisés
            en temps réel et entretenus par nos équipes.
          </div>
        </div>

        <div className="fleet-stage reveal">
          <div className="fleet-tabs">
            {VEHICLES.map((vh, i) => (
              <button key={i}
                      className={`fleet-tab ${i === active ? "active" : ""}`}
                      onClick={() => setActive(i)}>
                <span className="mono">0{i + 1}</span>
                <span className="fleet-tab-size">{vh.size}</span>
              </button>
            ))}
          </div>

          <div className="fleet-display">
            <div className="fleet-truck">
              <video
                key={v.video}
                className="fleet-truck-img fleet-truck-video"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={v.poster}
                aria-label={`Véhicule ${v.size}`}
              >
                <source src={v.video} type="video/mp4" />
              </video>
              <svg
                key={v.size}
                className="fleet-cotes"
                viewBox="0 0 160 100"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                {/* Longueur (cote du bas) */}
                <line className="fc-ext" x1="38" y1="82" x2="38" y2="92" />
                <line className="fc-ext" x1="122" y1="82" x2="122" y2="92" />
                <line className="fc-line" x1="38" y1="89" x2="71" y2="89" />
                <line className="fc-line" x1="89" y1="89" x2="122" y2="89" />
                <path className="fc-arrow" d="M38 89 l4 -1.6 v3.2 z" />
                <path className="fc-arrow" d="M122 89 l-4 -1.6 v3.2 z" />
                <text className="fc-val" x="80" y="91">{v.length}</text>
                {/* Hauteur (cote de gauche) */}
                <line className="fc-ext" x1="9" y1="30" x2="19" y2="30" />
                <line className="fc-ext" x1="9" y1="70" x2="19" y2="70" />
                <line className="fc-line" x1="14" y1="31" x2="14" y2="69" />
                <path className="fc-arrow" d="M14 31 l-1.6 4 h3.2 z" />
                <path className="fc-arrow" d="M14 69 l-1.6 -4 h3.2 z" />
                <text className="fc-val fc-val-left" x="22" y="52">{v.height}</text>
              </svg>
              <div className="fleet-truck-num">{active + 1}<span className="dim">/{VEHICLES.length}</span></div>
            </div>
            <div className="fleet-specs">
              <div className="fleet-spec-grid">
                <div className="fleet-spec">
                  <div className="mono dim">Longueur</div>
                  <div className="display-s tnum">{v.length}</div>
                </div>
                <div className="fleet-spec">
                  <div className="mono dim">Hauteur</div>
                  <div className="display-s tnum">{v.height}</div>
                </div>
                <div className="fleet-spec">
                  <div className="mono dim">Charge utile</div>
                  <div className="display-s tnum">{v.payload}</div>
                </div>
                <div className="fleet-spec">
                  <div className="mono dim">Hayon</div>
                  <div className="display-s">{v.tail}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
