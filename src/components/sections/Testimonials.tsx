/* ============================================================
   3D Testimonials Marquee — adapté du shadcn marquee
   4 colonnes verticales avec sens alternés, perspective 3D
   ============================================================ */

import { TESTIMONIALS, type Testimonial } from "@/data/testimonials";

function TestimonialCard({ name, role, company, body, initials, tag }: Testimonial) {
  return (
    <div className="t-card">
      <div className="t-card-head">
        <div className="t-avatar">{initials}</div>
        <div className="t-meta">
          <div className="t-name">{name}</div>
          <div className="t-role">{role} · {company}</div>
        </div>
        <div className="t-tag">{tag}</div>
      </div>
      <blockquote className="t-quote">&quot;{body}&quot;</blockquote>
      <div className="t-stars">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className="t-star">★</span>
        ))}
      </div>
    </div>
  );
}

type MarqueeColumnProps = {
  items: Testimonial[];
  reverse?: boolean;
  duration?: number;
};

function MarqueeColumn({ reverse = false, items, duration = 50 }: MarqueeColumnProps) {
  return (
    <div className="t-col">
      <div
        className="t-col-track"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((it, i) => (
          <TestimonialCard key={i} {...it} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  // Split testimonials into 4 columns
  const cols: Testimonial[][] = [[], [], [], []];
  TESTIMONIALS.forEach((t, i) => cols[i % 4].push(t));

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="t-head reveal">
          <div>
            <span className="eyebrow">Témoignages clients</span>
            <h2 className="display-l" style={{ marginTop: 16 }}>
              Ils dorment mieux<br />
              <span className="accent">depuis qu&apos;ils nous appellent.</span>
            </h2>
          </div>
          <p className="lead t-lead">
            Régisseurs, producteurs, DOP, tour managers — la nuit, ils nous appellent.
            Le matin, leurs équipes ont leur matériel.
          </p>
        </div>
      </div>

      <div className="t-stage-wrap">
        <div className="t-stage">
          <MarqueeColumn items={cols[0]} duration={55} />
          <MarqueeColumn items={cols[1]} reverse duration={48} />
          <MarqueeColumn items={cols[2]} duration={62} />
          <MarqueeColumn items={cols[3]} reverse duration={52} />
        </div>
        <div className="t-fade t-fade-top"></div>
        <div className="t-fade t-fade-bottom"></div>
        <div className="t-fade t-fade-left"></div>
        <div className="t-fade t-fade-right"></div>
      </div>

      <div className="container t-foot reveal">
        <div className="t-foot-stat">
          <span className="t-foot-v">4.9<span className="t-foot-vs">/5</span></span>
          <span className="t-foot-l">Note moyenne · 657 clients</span>
        </div>
        <div className="t-foot-stat">
          <span className="t-foot-v">98<span className="t-foot-vs">%</span></span>
          <span className="t-foot-l">Taux de recommandation</span>
        </div>
        <div className="t-foot-stat">
          <span className="t-foot-v">12<span className="t-foot-vs"> ans</span></span>
          <span className="t-foot-l">D&apos;expertise terrain</span>
        </div>
      </div>
    </section>
  );
}
