import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderPhotoOg } from "@/lib/og";

/**
 * Carte sociale propre à /devenir-partenaire, partagée par ses routes
 * `opengraph-image` et `twitter-image`.
 *
 * Pourquoi une carte dédiée alors que toutes les autres pages partagent la
 * carte de marque : cette page est faite pour être envoyée à des transporteurs
 * (LinkedIn, mail, WhatsApp). La carte de marque annonce « le transport qui ne
 * dort jamais » à un client ; celle-ci dit à un transporteur ce qu'on lui
 * propose, avant même le clic.
 *
 * Le fond est lu sur le disque au moment du build (route statique, runtime
 * Node) et passé en data URL : Satori ne charge pas d'URL relative et ne lit
 * pas le WebP, d'où un JPEG dédié en 1200 × 630 à côté des visuels de la page
 * (cf. public/images/CREDITS.md).
 */
export const PARTNER_OG_ALT =
  "Transporteur affrété ? Roulez pour H24 Transports. Paris de nuit vu depuis l'Arc de Triomphe.";

export function renderPartnerOg() {
  const background = readFileSync(
    join(process.cwd(), "public/images/partenaires/paris-nuit-og.jpg"),
  );

  return renderPhotoOg({
    backgroundDataUrl: `data:image/jpeg;base64,${background.toString("base64")}`,
    eyebrow: "Devenir transporteur partenaire",
    title: "Transporteur affrété ?",
    accentLines: ["Roulez pour", "H24 Transports."],
    footer: "Commissionnaire de transport · Paris & Île-de-France · 24h/24, 7j/7",
  });
}
