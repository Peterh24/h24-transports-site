import type { Metadata } from "next";
import Link from "next/link";
import { HeroGlow } from "@/components/ui/HeroGlow";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="page-header" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
      <div className="hero-bg">
        <div className="hero-grid" />
        <HeroGlow />
      </div>
      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <span className="mono dim">// erreur 404</span>
        <h1 className="display-xl" style={{ marginTop: 16 }}>
          Route <span className="accent">introuvable.</span>
        </h1>
        <p className="lead" style={{ margin: "24px auto 40px" }}>
          Cette page a quitté l&apos;entrepôt et n&apos;est jamais arrivée. Revenons
          sur la route principale.
        </p>
        <div style={{ display: "inline-flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link className="btn btn-primary" href="/">
            Retour à l&apos;accueil <span className="arrow" />
          </Link>
          <Link className="btn btn-ghost" href="/contact">
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
