"use client";

import { useState } from "react";
import { SITE } from "@/data/site";

const SERVICES = [
  { v: "event", l: "Événementiel" },
  { v: "express", l: "Express" },
  { v: "app", l: "Application" },
];

/** Libellés lisibles des univers — le champ brut ne parlerait pas au dispatch. */
const SERVICE_LABELS: Record<string, string> = {
  event: "Événementiel / audiovisuel",
  express: "Transport urgent exclusif",
  app: "Application",
  colis: "Colis, plis & palettes",
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Au-delà, on rend la main au visiteur plutôt que de le laisser attendre.
 * 20 s et non 10 : l'API a été mesurée à 9,8 s sur un premier appel à froid
 * (0,8 s à chaud). Un plafond à 10 s coupait donc une requête qui aboutissait.
 */
const TIMEOUT_MS = 20_000;

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Formulaire de contact.
 *
 * L'envoi part **du navigateur du visiteur**, comme le faisait le site Angular
 * (`this.http.post('https://api.h24transports.com/api/send-email', ...)`).
 * C'est un choix, pas un oubli : la même requête émise par le conteneur
 * serveur (Server Action) échoue avant même d'atteindre l'API. Voir le
 * commentaire de `SITE.contactApi`.
 *
 * ⚠️ Règle à ne pas casser : ne JAMAIS afficher un succès sans la confirmation
 * que la demande est bien partie. Une fausse confirmation est pire qu'une
 * erreur affichée — le prospect attend une réponse qui ne viendra pas, et
 * personne côté H24 ne sait qu'il existe.
 */
export function ContactForm() {
  const [service, setService] = useState("event");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const label =
    status === "sending"
      ? "Envoi…"
      : status === "sent"
        ? "Message envoyé ✓"
        : "Envoyer la demande";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "sent") return;

    const form = new FormData(event.currentTarget);
    const get = (k: string) => String(form.get(k) ?? "").trim();

    const data = {
      nom: get("nom"),
      prenom: get("prenom"),
      societe: get("societe"),
      email: get("email"),
      tel: get("tel"),
      message: get("message"),
    };

    if (Object.values(data).some((value) => !value)) {
      setStatus("error");
      setError("Merci de remplir tous les champs obligatoires.");
      return;
    }

    if (!EMAIL_RE.test(data.email)) {
      setStatus("error");
      setError("L'adresse email saisie semble invalide.");
      return;
    }

    setStatus("sending");
    setError("");

    // L'API attend exactement ces six champs. Plutôt que d'y ajouter un
    // `service` qu'elle ignorerait (ou qui la ferait échouer), on préfixe le
    // message : l'information arrive au dispatch sans toucher au contrat.
    const payload = {
      ...data,
      message: `[${SERVICE_LABELS[service] ?? service}]\n\n${data.message}`,
    };

    // `AbortSignal.timeout` n'existe qu'à partir de Safari 16. Sans ce
    // garde-fou, l'appel lèverait un TypeError sur un navigateur plus ancien et
    // le visiteur verrait « Envoi impossible » alors que rien n'aurait été
    // tenté. Sans plafond, la requête aboutit quand même — c'est le compromis
    // qu'avait l'Angular, qui n'en posait aucun.
    const signal =
      typeof AbortSignal.timeout === "function"
        ? AbortSignal.timeout(TIMEOUT_MS)
        : undefined;

    try {
      const response = await fetch(SITE.contactApi, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal,
        cache: "no-store",
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
    } catch {
      setStatus("error");
      setError(
        `Envoi impossible pour le moment. Appelez-nous directement au ${SITE.phone}, 24h/24.`,
      );
      return;
    }

    setStatus("sent");
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          <span className="mono dim">Nom *</span>
          <input type="text" name="nom" required />
        </label>
        <label>
          <span className="mono dim">Prénom *</span>
          <input type="text" name="prenom" required />
        </label>
      </div>

      <label>
        <span className="mono dim">Société *</span>
        <input type="text" name="societe" required />
      </label>

      <div className="form-row">
        <label>
          <span className="mono dim">Email *</span>
          <input type="email" name="email" required />
        </label>
        <label>
          <span className="mono dim">Téléphone *</span>
          <input type="tel" name="tel" required />
        </label>
      </div>

      <label>
        <span className="mono dim">Service souhaité</span>
        <div className="service-radio">
          {SERVICES.map((o) => (
            <button
              type="button"
              key={o.v}
              className={`service-opt ${service === o.v ? "active" : ""}`}
              onClick={() => setService(o.v)}
            >
              {o.l}
            </button>
          ))}
        </div>
      </label>

      <label>
        <span className="mono dim">Votre demande *</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Décrivez votre besoin : trajet, dates, type de matériel…"
        />
      </label>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status === "sending" || status === "sent"}
        >
          {label} <span className="arrow" />
        </button>
        <span className="mono dim">
          {status === "error" ? (
            <span className="form-note">{error}</span>
          ) : (
            "Réponse sous 30 minutes ouvrées"
          )}
        </span>
      </div>

      {status === "sent" && (
        <p className="mono accent" role="status" style={{ marginTop: 4 }}>
          Message envoyé ✓ — réponse sous 30 minutes ouvrées.
        </p>
      )}
    </form>
  );
}
