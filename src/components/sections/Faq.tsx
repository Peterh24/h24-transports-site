import type { FaqItem } from "@/data/faq";
import { insecables } from "@/lib/typo";

type Props = {
  items: FaqItem[];
  eyebrow?: string;
  title?: string;
  accent?: string;
};

/**
 * Section « questions fréquentes ».
 *
 * Rendu en `<details>` natif : pas de JavaScript, accessible au clavier, et
 * surtout les réponses sont présentes dans le HTML servi même repliées — donc
 * lisibles par les crawlers qui n'exécutent pas de JS. Le balisage `FAQPage`
 * correspondant est déclaré par la page, dans son graphe schema.org.
 *
 * Questions et réponses passent par `insecables()` au rendu : sans cela un
 * « ? » ou un « : » peut se retrouver seul en début de ligne sur les
 * largeurs intermédiaires (cf. src/lib/typo.ts).
 */
export function Faq({
  items,
  eyebrow = "Questions fréquentes",
  title = "Ce qu'on",
  accent = "nous demande.",
}: Props) {
  return (
    <section className="faq section-tight" id="faq">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="display-l">
              {title} <span className="accent">{accent}</span>
            </h2>
          </div>
        </div>
        <div className="faq-list">
          {items.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary className="faq-q">
                <span>{insecables(item.question)}</span>
                <span className="faq-marker" aria-hidden="true" />
              </summary>
              <p className="faq-a dim">{insecables(item.answer)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
