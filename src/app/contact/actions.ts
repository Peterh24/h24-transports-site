"use server";

export type ContactState = { ok: boolean; message: string } | null;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Traitement de la demande de contact (Server Action).
 * Validation + journalisation. Le branchement de l'envoi réel
 * (email transactionnel / CRM / webhook) se fait à l'endroit indiqué.
 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  const data = {
    nom: get("nom"),
    prenom: get("prenom"),
    societe: get("societe"),
    email: get("email"),
    tel: get("tel"),
    message: get("message"),
    service: get("service") || "event",
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

  // TODO — brancher l'envoi réel ici :
  //   await sendTransactionalEmail({ to: SITE.email, ...data })
  //   ou POST vers un webhook / CRM.
  console.info("[contact] nouvelle demande reçue", data);

  return {
    ok: true,
    message: "Message envoyé ✓ — réponse sous 30 minutes ouvrées.",
  };
}
