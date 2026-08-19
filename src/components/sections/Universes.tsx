import Link from "next/link";
import { UNIVERSES } from "@/data/universes";

export const Universes = () => {
  return (
    <section className="universes" id="universes">
      <div className="container">
        <div className="section-head reveal">
          <div className="left">
            <span className="eyebrow">Nos univers</span>
            <h2 className="display-l">Quatre métiers,<br/>une exigence&nbsp;: <span className="accent">la précision</span>.</h2>
          </div>
          <div className="right">
            Depuis 2014, nous structurons l'offre H24 autour de pôles complémentaires&nbsp;:
            de l'audiovisuel à la palette. Choisissez le vôtre.
          </div>
        </div>

        <div className="universes-grid reveal-stagger">
          {UNIVERSES.map((u) => (
            <Link key={u.id} href={u.href} className="universe-card">
              <div className="universe-num">{u.num}</div>
              <div className="universe-meta mono">// {u.name}</div>
              <h3 className="display-m universe-title">{u.headline}</h3>
              <p className="dim" style={{ marginTop: 18, lineHeight: 1.6 }}>{u.text}</p>
              <div className="universe-tags">
                {u.tags.map((t) => <span key={t} className="universe-tag">{t}</span>)}
              </div>
              <div className="universe-cta">
                <span className="mono">Explorer</span>
                <span className="arrow"></span>
              </div>
              <div className="universe-glow"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
