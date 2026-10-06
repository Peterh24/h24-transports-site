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

/**
 * Carte sociale sur photo (1200×630) : fond plein cadre assombri par un
 * dégradé, texte en bas à gauche. Le dégradé n'est pas décoratif : sans lui
 * le titre se perd sur une photo de nuit pleine de lumières.
 *
 * `backgroundDataUrl` : Satori ne charge ni URL relative ni WebP, la route
 * appelante lit donc un JPEG sur le disque et le passe en data URL.
 */
export function renderPhotoOg(opts: {
  backgroundDataUrl: string;
  eyebrow: string;
  title: string;
  /** Une entrée par ligne : la coupe est choisie, jamais laissée au moteur. */
  accentLines: string[];
  footer: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          background: "#0a0908",
          color: "#f5f2ec",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori, pas le DOM */}
        <img
          src={opts.backgroundDataUrl}
          alt=""
          width={OG_SIZE.width}
          height={OG_SIZE.height}
          style={{ position: "absolute", inset: 0, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,9,8,0.35) 0%, rgba(10,9,8,0.55) 45%, rgba(10,9,8,0.92) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 80,
            right: 80,
            bottom: 64,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 26,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#f59239",
            }}
          >
            <div style={{ width: 44, height: 3, background: "#f59239" }} />
            {opts.eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 800,
              lineHeight: 1.05,
              marginTop: 22,
            }}
          >
            {opts.title}
          </div>
          {opts.accentLines.map((line) => (
            <div
              key={line}
              style={{
                display: "flex",
                fontSize: 82,
                fontWeight: 800,
                lineHeight: 1.05,
                color: "#f59239",
              }}
            >
              {line}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 34,
              fontSize: 24,
              color: "rgba(245,242,236,0.72)",
            }}
          >
            <div style={{ display: "flex" }}>{opts.footer}</div>
            <div style={{ display: "flex", fontWeight: 800, color: "#f5f2ec" }}>
              {SITE.name}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
