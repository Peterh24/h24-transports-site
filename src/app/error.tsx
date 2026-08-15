"use client";

import Link from "next/link";
import { useEffect } from "react";
import { HeroGlow } from "@/components/ui/HeroGlow";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Journalisation côté client (à brancher sur un service de monitoring si besoin).
    console.error(error);
  }, [error]);

  return (
    <section
      className="page-header"
      style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}
    >
      <div className="hero-bg">
        <div className="hero-grid" />
        <HeroGlow />
      </div>
      <div
        className="container"
        style={{ position: "relative", zIndex: 2, textAlign: "center" }}
      >
        <span className="mono dim">// erreur inattendue</span>
        <h1 className="display-xl" style={{ marginTop: 16 }}>
          Une panne <span className="accent">technique.</span>
        </h1>
        <p className="lead" style={{ margin: "24px auto 40px" }}>
          Quelque chose s&apos;est mal passé de notre côté. On reste joignables
          24h/24 — réessayez, ou contactez-nous directement.
        </p>
        <div
          style={{
            display: "inline-flex",
            gap: 16,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button type="button" className="btn btn-primary" onClick={reset}>
            Réessayer <span className="arrow" />
          </button>
          <Link className="btn btn-ghost" href="/">
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
