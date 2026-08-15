import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

/** Métadonnées partagées par les routes opengraph-image et twitter-image. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = `${SITE.name} — ${SITE.tagline}`;
export const OG_CONTENT_TYPE = "image/png";

/**
 * Carte sociale de marque (1200×630), rendue à la volée.
 * Réutilisée pour Open Graph et Twitter afin d'éviter un asset binaire.
 */
export function renderBrandOg() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0908",
          padding: "72px 80px",
          color: "#f5f2ec",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#f59239",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#f59239",
            }}
          />
          Disponibles 24h / 24 · 7j / 7
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 116, fontWeight: 800, lineHeight: 1 }}>
            {SITE.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 46,
              marginTop: 22,
              color: "rgba(245,242,236,0.72)",
            }}
          >
            {SITE.tagline}.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "rgba(245,242,236,0.6)" }}>
          Audiovisuel · Événementiel · Express exclusif — Paris &amp; Île-de-France
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
