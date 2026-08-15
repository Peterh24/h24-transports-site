type Step = { title: string; text: string };

/** Étapes "Comment ça marche" — du brief à la livraison. */
export function Process({ steps }: { steps: Step[] }) {
  return (
    <section className="process" style={{ background: "var(--bg-1)" }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="left">
            <span className="eyebrow">Comment ça marche</span>
            <h2 className="display-l" style={{ marginTop: 16 }}>
              Du brief à la livraison.
            </h2>
          </div>
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
