type Step = { title: string; text: string };

type Props = {
  steps: Step[];
  /** Sur-titre. Défaut : « Comment ça marche ». */
  eyebrow?: string;
  /** Titre H2. Défaut : « Du brief à la livraison. ». */
  title?: React.ReactNode;
  /** Colonne de droite du chapeau — absente par défaut. */
  intro?: React.ReactNode;
};

/** Étapes "Comment ça marche" — du brief à la livraison. */
export function Process({ steps, eyebrow, title, intro }: Props) {
  return (
    <section className="process" style={{ background: "var(--bg-1)" }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="left">
            <span className="eyebrow">{eyebrow ?? "Comment ça marche"}</span>
            <h2 className="display-l" style={{ marginTop: 16 }}>
              {title ?? "Du brief à la livraison."}
            </h2>
          </div>
          {intro && <div className="right">{intro}</div>}
        </div>
        <div className="process-grid reveal-stagger">
          {steps.map((s, i) => (
            <div className="process-step" key={s.title}>
              <div className="process-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="process-line" />
              <h3 className="display-s">{s.title}</h3>
              <p className="dim" style={{ marginTop: 12, lineHeight: 1.6 }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
