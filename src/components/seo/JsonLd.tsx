import type { JsonLd as JsonLdData } from "@/lib/schema";

/**
 * Injecte un bloc JSON-LD. Composant serveur : le balisage part dans le HTML
 * initial, donc il est lu par les crawlers qui n'exécutent pas de JavaScript
 * (OAI-SearchBot, PerplexityBot, ClaudeBot…), pas seulement par Googlebot.
 */
export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
