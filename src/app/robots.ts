import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

/**
 * Politique de crawl, avec une position **explicite** sur les agents des
 * moteurs génératifs.
 *
 * Deux familles à ne pas confondre :
 *
 * - Les **agents de réponse / recherche** (`OAI-SearchBot`, `PerplexityBot`,
 *   `Claude-SearchBot`, `Google-Extended`…) : ils alimentent les réponses
 *   citées. Les autoriser est la condition pour apparaître comme source.
 * - Les **agents d'entraînement** (`GPTBot`, `CCBot`, `Applebot-Extended`,
 *   `meta-externalagent`) : ils nourrissent l'entraînement des modèles. Les
 *   autoriser favorise la notoriété de la marque dans les modèles futurs,
 *   mais c'est une décision commerciale — d'où le bloc séparé, facile à
 *   basculer en `disallow` sans toucher au reste.
 *
 * À noter : `Google-Extended` ne pilote PAS l'apparition dans les AI Overviews.
 * Celles-ci sont construites à partir de l'index de recherche classique ; la
 * seule façon de s'en exclure serait de restreindre les snippets (ce que la
 * metadata `robots` du layout fait l'inverse de faire, volontairement).
 *
 * Aucune page n'est bloquée ici : les pages non indexables (mentions légales,
 * CGV) portent un `noindex` dans leur metadata. Les interdire au crawl
 * empêcherait justement Google de lire ce `noindex`.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },

      // Moteurs de recherche classiques.
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "Applebot", allow: "/" },

      // Agents de réponse générative — ceux qui citent des sources.
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },

      // Agents d'entraînement — décision commerciale, bloc isolé exprès.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
