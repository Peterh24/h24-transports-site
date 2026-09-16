type Value = { title: string; text: string };

type Props = {
  values: Value[];
  /** Sur-titre. Défaut : « Nos valeurs ». */
  eyebrow?: string;
  /** Titre H2. Défaut : « Quatre piliers, zéro compromis. ». */
  title?: React.ReactNode;
  /** Colonne de droite du chapeau — absente par défaut. */
  intro?: React.ReactNode;
};

/** Grille "Nos valeurs" — quatre piliers. */
export function Values({ values, eyebrow, title, intro }: Props) {
  return (
    <section className="values">
      <div className="container">
        <div className="section-head reveal">
          <div className="left">
            <span className="eyebrow">{eyebrow ?? "Nos valeurs"}</span>
            <h2 className="display-l" style={{ marginTop: 16 }}>
              {title ?? (
                <>
                  Quatre piliers,
                  <br />
                  zéro compromis.
                </>
              )}
            </h2>
          </div>
          {intro && <div className="right">{intro}</div>}
        </div>
        <div className="values-grid reveal-stagger">
          {values.map((v, i) => (
            <div className="value-card" key={v.title}>
              <div className="value-num mono">0{i + 1}</div>
              <h3 className="display-s">{v.title}</h3>
              <p className="dim" style={{ marginTop: 14, lineHeight: 1.6 }}>
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
