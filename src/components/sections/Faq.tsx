import type { FaqItem } from "@/data/faq";

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
                <span>{item.question}</span>
                <span className="faq-marker" aria-hidden="true" />
              </summary>
              <p className="faq-a dim">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
