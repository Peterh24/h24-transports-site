import Image from "next/image";
import Link from "next/link";

import { CopyCode } from "@/components/ui/CopyCode";
import { activeCampaign } from "@/data/campaigns";
import { SITE } from "@/data/site";

/**
 * Temps fort en cours — bloc saisonnier posé entre le hero et les univers.
 *
 * Rien à afficher hors période : le composant rend `null`, la page retombe
 * exactement sur sa composition habituelle. Le contenu vit dans
 * `src/data/campaigns.ts`, jamais ici.
 */
export function Campaign() {
  const campaign = activeCampaign();
  if (!campaign) return null;

  const { promo } = campaign;

  return (
    <section
      className="campaign section-tight"
      id="temps-fort"
      aria-labelledby="campaign-title"
    >
      {campaign.image ? (
        <div className="campaign-bg" aria-hidden="true">
          <Image
            src={campaign.image.src}
            alt=""
            fill
            sizes="100vw"
            className="campaign-photo"
            style={{ objectPosition: campaign.image.position ?? "center" }}
          />
          <div className="campaign-scrim" />
        </div>
      ) : null}
      <div className="campaign-glow" aria-hidden="true" />

      <div className="container campaign-inner">
        <div className="campaign-text reveal">
          <span className="eyebrow">{campaign.eyebrow}</span>
          <h2 id="campaign-title" className="display-m campaign-title">
            {campaign.title}
            <br />
            <span className="accent">{campaign.titleAccent}</span>
          </h2>

          <div className="ticker campaign-window">
            <span className="dot" />
            <span>{campaign.window}</span>
          </div>

          <p className="lead campaign-intro">{campaign.intro}</p>

          <div className="campaign-facts">
            {campaign.facts.map((fact) => (
              <div className="campaign-fact" key={fact.label}>
                <div className="campaign-fact-value tnum">{fact.value}</div>
                <div className="mono dim">{fact.label}</div>
              </div>
            ))}
          </div>
          <div className="mono dim campaign-source">{campaign.source}</div>
        </div>

        {promo ? (
          <aside className="campaign-promo reveal">
            <div className="campaign-promo-head">
              <span className="mono dim">// code promo</span>
              <span className="campaign-promo-off">{promo.headline}</span>
            </div>

            <CopyCode code={promo.code} />

            <ul className="campaign-conditions">
              {promo.conditions.map((condition) => (
                <li key={condition}>{condition}</li>
              ))}
            </ul>

            <div className="campaign-actions">
              <a className="btn btn-primary" href={SITE.dashboard.order}>
                Commander avec le code <span className="arrow" />
              </a>
              <Link className="btn-arrow" href={campaign.link.href}>
                {campaign.link.label} <span className="arrow" />
              </Link>
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
