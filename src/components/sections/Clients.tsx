import { CLIENTS } from "@/data/clients";

type Props = {
  /** Sur-titre. Défaut : « Ils nous font confiance ». */
  eyebrow?: string;
  /** Chapô. Défaut : la formule de l'accueil. */
  lead?: React.ReactNode;
};

/**
 * Bandeau des références clients (`src/data/clients.ts`).
 *
 * Le chapô est paramétrable depuis le 2026-09-16 : la section est réemployée
 * sur `/transport-materiel-audiovisuel-paris`, où plusieurs de ces noms sont
 * des loueurs et studios audiovisuels — c'est la preuve la plus parlante de
 * cette page, et la formule générique de l'accueil ne le disait pas. Les
 * valeurs par défaut reproduisent le texte d'origine, donc l'accueil est
 * inchangé.
 */
export const Clients = ({ eyebrow, lead }: Props = {}) => (
  <section className="clients section-tight">
    <div className="container">
      <div className="clients-head reveal">
        <span className="eyebrow">{eyebrow ?? "Ils nous font confiance"}</span>
        <p className="lead" style={{ marginTop: 16 }}>
          {lead ?? "Studios, productions, marques — recommandés par les meilleurs."}
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
