/**
 * Recherche d'entreprise dans l'annuaire public de l'État
 * (recherche-entreprises.api.gouv.fr, base SIRENE de l'INSEE) : gratuite, sans
 * clé, CORS ouvert.
 *
 * Portage de `CompanySearchService` du dashboard (inscription client, depuis le
 * 2026-10-14) : même API, mêmes paramètres, même lecture de la réponse. Le code
 * ne peut pas être partagé (Angular d'un côté, Next.js de l'autre), seul le
 * comportement l'est. Une évolution de l'un est à reporter sur l'autre.
 *
 * L'appel part du navigateur du visiteur, jamais du serveur du site : le
 * conteneur n'a aucune sortie réseau (voir `SITE.contactApi`).
 *
 * Ne lève jamais : `null` signale une panne (réseau, quota, réponse
 * inattendue), `[]` l'absence de résultat. Le formulaire reste utilisable à la
 * main dans les deux cas.
 */

export type CompanyResult = {
  /** Libellé affiché dans la liste : nom complet SIRENE, sigles compris. */
  label: string;
  /** Raison sociale officielle, sans les sigles. */
  name: string;
  siren: string;
  city: string;
  postcode: string;
};

const API_URL = "https://recherche-entreprises.api.gouv.fr/search";
export const COMPANY_SEARCH_MIN_LENGTH = 3;
const MAX_RESULTS = 6;

export async function searchCompanies(
  query: string,
  signal?: AbortSignal,
): Promise<CompanyResult[] | null> {
  const params = new URLSearchParams({
    q: query.trim(),
    per_page: String(MAX_RESULTS),
    page: "1",
    etat_administratif: "A",
    minimal: "true",
    include: "siege",
  });

  try {
    const response = await fetch(`${API_URL}?${params}`, { signal });
    if (!response.ok) return null;
    const body: unknown = await response.json();
    const results =
      body && typeof body === "object" && Array.isArray((body as { results?: unknown }).results)
        ? (body as { results: unknown[] }).results
        : [];
    return results.map(mapResult).filter((r): r is CompanyResult => r !== null);
  } catch (error) {
    // Une annulation n'est pas une panne : la frappe suivante a pris le relais.
    if (error instanceof DOMException && error.name === "AbortError") return [];
    return null;
  }
}

/** Null si la réponse ne porte ni SIREN ni nom. */
function mapResult(raw: unknown): CompanyResult | null {
  const result = (raw ?? {}) as Record<string, unknown>;
  const siren = typeof result.siren === "string" ? result.siren : "";
  const label = String(result.nom_complet || result.nom_raison_sociale || "").trim();
  if (!/^\d{9}$/.test(siren) || !label) return null;

  const siege = (result.siege ?? {}) as Record<string, unknown>;
  return {
    label,
    name: String(result.nom_raison_sociale || label).trim(),
    siren,
    city: typeof siege.libelle_commune === "string" ? siege.libelle_commune : "",
    postcode: typeof siege.code_postal === "string" ? siege.code_postal : "",
  };
}

/**
 * Numéro de TVA intracommunautaire français déduit du SIREN :
 * FR + clé (12 + 3 × (SIREN mod 97)) mod 97 sur 2 chiffres + SIREN. C'est le
 * numéro que l'administration attribue ; une entreprise en franchise de TVA
 * n'en a pas, le champ reste donc modifiable.
 */
export function vatFromSiren(siren: string): string {
  const key = (12 + 3 * (Number(siren) % 97)) % 97;
  return `FR${String(key).padStart(2, "0")}${siren}`;
}
