import { CLIENTS } from "@/data/clients";

export const Clients = () => (
  <section className="clients section-tight">
    <div className="container">
      <div className="clients-head reveal">
        <span className="eyebrow">Ils nous font confiance</span>
        <p className="lead" style={{ marginTop: 16 }}>
          Studios, productions, marques — recommandés par les meilleurs.
        </p>
      </div>
    </div>
    <div className="marquee">
      <div className="marquee-track">
        {[...CLIENTS, ...CLIENTS].map((c, i) => (
          <span key={i} className="marquee-item">{c}</span>
        ))}
      </div>
    </div>
  </section>
);
