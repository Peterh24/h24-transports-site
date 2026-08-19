"use server";

import { SITE } from "@/data/site";

export type ContactState = { ok: boolean; message: string } | null;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Endpoint de reception des demandes de contact.
 *
 * C'est celui qu'utilisait deja le site Angular (`api.h24transports.com`) :
 * on reprend le meme, pour que la refonte n'exige aucune modification cote
 * back et que les demandes continuent d'arriver la ou l'equipe les lit.
 * Surchargeable par `CONTACT_API_URL` si le back deménage.
 */
const CONTACT_ENDPOINT =
  process.env.CONTACT_API_URL || "https://api.h24transports.com/api/send-email";

/** Au-dela, on rend la main a l'utilisateur plutot que de le laisser attendre. */
const TIMEOUT_MS = 10_000;

/** Libelles lisibles des univers — le champ brut ne parlerait pas au dispatch. */
const SERVICE_LABELS: Record<string, string> = {
  event: "Événementiel / audiovisuel",
  express: "Transport urgent exclusif",
  app: "Application",
  colis: "Colis, plis & palettes",
};

/**
 * Traitement d'une demande de contact (Server Action).
 *
 * ⚠️ Regle a ne pas casser : ne JAMAIS repondre `ok: true` sans avoir la
 * confirmation que la demande est bien partie. Une fausse confirmation est
 * pire qu'une erreur affichee — le prospect attend une reponse qui ne viendra
 * pas, et personne cote H24 ne sait qu'il existe.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  const service = get("service") || "event";
  const data = {
    nom: get("nom"),
    prenom: get("prenom"),
    societe: get("societe"),
    email: get("email"),
    tel: get("tel"),
    message: get("message"),
  };

  if (
    !data.nom ||
    !data.prenom ||
    !data.societe ||
    !data.email ||
    !data.tel ||
    !data.message
  ) {
    return { ok: false, message: "Merci de remplir tous les champs obligatoires." };
  }

  if (!EMAIL_RE.test(data.email)) {
    return { ok: false, message: "L'adresse email saisie semble invalide." };
  }

  // L'API historique attend exactement ces six champs. Plutot que d'y ajouter
  // un `service` qu'elle ignorerait (ou qui la ferait echouer), on prefixe le
  // message : l'information arrive au dispatch sans toucher au contrat.
  const payload = {
    ...data,
    message: `[${SERVICE_LABELS[service] ?? service}]\n\n${data.message}`,
  };

  const failure: ContactState = {
    ok: false,
    message: `Envoi impossible pour le moment. Appelez-nous directement au ${SITE.phone}, 24h/24.`,
  };

  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (!response.ok) {
      // On journalise le code, jamais le contenu : le message et les
      // coordonnees sont des donnees personnelles, elles n'ont rien a faire
      // dans les logs du conteneur (cf. article 4 des mentions legales).
      console.error(
        `[contact] echec de l'envoi — HTTP ${response.status} sur ${CONTACT_ENDPOINT}`,
      );
      return failure;
    }
  } catch (error) {
    const reason = error instanceof Error ? error.name : "inconnue";
    console.error(`[contact] echec de l'envoi — cause : ${reason}`);
    return failure;
  }

  return {
    ok: true,
    message: "Message envoyé ✓ — réponse sous 30 minutes ouvrées.",
  };
}
