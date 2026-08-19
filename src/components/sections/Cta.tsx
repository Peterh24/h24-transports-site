import { SITE } from "@/data/site";

/** Bloc d'appel à l'action, réutilisé en bas de plusieurs pages. */
export function Cta() {
  return (
    <section className="cta">
      <div className="container">
        <div className="cta-inner reveal">
          <div>
            <span className="eyebrow">Prêt à démarrer ?</span>
            <h2 className="display-l" style={{ marginTop: 16 }}>
              Une mission urgente ?<br />
              <span className="accent">Nous sommes déjà en route.</span>
            </h2>
          </div>
          <div className="cta-actions">
            <a
              className="btn btn-primary"
              href={SITE.dashboard.login}
            >
              Devis en 2 minutes <span className="arrow" />
            </a>
            <a className="btn-arrow" href={SITE.phoneHref}>
              <span className="tnum">{SITE.phone}</span> <span className="arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
