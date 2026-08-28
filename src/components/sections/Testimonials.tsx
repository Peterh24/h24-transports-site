/* ============================================================
   3D Testimonials Marquee — adapté du shadcn marquee
   4 colonnes verticales avec sens alternés, perspective 3D

   Le contenu est constitué d'avis Google réels (cf. src/data/testimonials.ts).
   Chaque carte porte donc le nom de l'auteur, la date et la mention de la
   source : c'est ce qui rend l'avis confrontable à la fiche publique, et
   c'est exactement ce qui manquait aux témoignages inventés d'avant.
   ============================================================ */

import { GOOGLE_BUSINESS_PROFILE } from "@/data/site";
import { GOOGLE_REVIEWS, TESTIMONIALS, type Testimonial } from "@/data/testimonials";

function TestimonialCard({ name, date, body, initials, rating }: Testimonial) {
  return (
    <div className="t-card">
      <div className="t-card-head">
        <div className="t-avatar">{initials}</div>
        <div className="t-meta">
          <div className="t-name">{name}</div>
          <div className="t-role">{date}</div>
        </div>
        <div className="t-tag">Google</div>
      </div>
      <blockquote className="t-quote">&quot;{body}&quot;</blockquote>
      <div
        className="t-stars"
        role="img"
        aria-label={`${rating} étoiles sur 5`}
      >
        {Array.from({ length: rating }, (_, i) => (
          <span key={i} className="t-star" aria-hidden="true">
            ★
          </span>
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
            <span className="eyebrow">Avis clients</span>
            <h2 className="display-l" style={{ marginTop: 16 }}>
              Ils dorment mieux<br />
              <span className="accent">depuis qu&apos;ils nous appellent.</span>
            </h2>
          </div>
          <p className="lead t-lead">
            Régisseurs, producteurs, loueurs de matériel, studios — voici ce
            qu&apos;ils écrivent sur notre fiche Google. Chaque avis y est
            consultable et vérifiable.
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
          <span className="t-foot-v">
            {GOOGLE_REVIEWS.rating}
            <span className="t-foot-vs">/5</span>
          </span>
          <span className="t-foot-l">Note moyenne sur Google</span>
        </div>
        <div className="t-foot-stat">
          <span className="t-foot-v tnum">{GOOGLE_REVIEWS.count}</span>
          <span className="t-foot-l">Avis publiés sur Google</span>
        </div>
        <div className="t-foot-stat">
          <span className="t-foot-v">
            12<span className="t-foot-vs"> ans</span>
          </span>
          <span className="t-foot-l">D&apos;expertise terrain</span>
        </div>
      </div>

      <div className="container t-source reveal">
        <a
          href={GOOGLE_BUSINESS_PROFILE}
          className="t-source-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lire les {GOOGLE_REVIEWS.count} avis sur Google
          <span className="arrow" />
        </a>
      </div>
    </section>
  );
}
