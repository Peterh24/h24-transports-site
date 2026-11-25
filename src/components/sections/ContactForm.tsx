"use client";

import { useState } from "react";
import { SITE } from "@/data/site";

/**
 * Choix proposés au visiteur. `other` est volontairement le dernier : une
 * demande qui ne rentre dans aucun univers ne doit pas être forcée dans le
 * mauvais, sinon elle arrive au dispatch mal étiquetée.
 */
const SERVICES = [
  { v: "event", l: "Événementiel" },
  { v: "express", l: "Express" },
  { v: "app", l: "Application" },
  { v: "other", l: "Autres" },
];

/** Libellés lisibles des univers — le champ brut ne parlerait pas au dispatch. */
const SERVICE_LABELS: Record<string, string> = {
  event: "Événementiel / audiovisuel",
  express: "Transport urgent exclusif",
  app: "Application",
  colis: "Colis, plis & palettes",
  other: "Autre demande",
};

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Au-delà, on rend la main au visiteur plutôt que de le laisser attendre.
 * 20 s : hérité de l'ancienne API, mesurée à 9,8 s sur un premier appel à
 * froid. La route actuelle envoie le mail en différé et répond bien plus vite,
 * le plafond ne sert plus que de garde-fou.
 */
const TIMEOUT_MS = 20_000;

/*
 * Longueurs maximales : celles de l'API (ContactMessagePostDTO), pour qu'un
 * texte trop long soit arrêté par le navigateur au lieu de finir en erreur
 * générique. Message à 4 900 et non 5 000 : le site y ajoute le libellé du
 * service (« [Événementiel / audiovisuel] » et deux retours à la ligne).
 */

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Formulaire de contact.
 *
 * L'envoi part **du navigateur du visiteur** vers `SITE.contactApi`
 * (route `/contact-messages` de l'API H24). C'est un choix, pas un oubli : la
 * même requête émise par le conteneur serveur (Server Action) échoue avant
 * même d'atteindre l'API. Voir le commentaire de `SITE.contactApi`.
 *
 * Un envoi refusé par l'API (liste noire, 400) affiche le même message
 * d'erreur qu'une panne : rien ne dit à un spammeur qu'il est filtré, et un
 * vrai client bloqué par erreur est invité à appeler.
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

    // Champ piège (voir le rendu plus bas) : jamais rempli par un humain.
    const website = get("website");

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

    // L'API attend ces six champs (contrat repris de l'ancienne API) plus le
    // champ piège. Plutôt que d'y ajouter un `service`, on préfixe le
    // message : l'information arrive au dispatch sans toucher au contrat.
    const payload = {
      ...data,
      message: `[${SERVICE_LABELS[service] ?? service}]\n\n${data.message}`,
      website,
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

      if (response.status === 429) {
        setStatus("error");
        setError(
          `Trop de tentatives. Réessayez dans quelques minutes, ou appelez-nous au ${SITE.phone}.`,
        );
        return;
      }

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
          <input type="text" name="nom" required maxLength={100} />
        </label>
        <label>
          <span className="mono dim">Prénom *</span>
          <input type="text" name="prenom" required maxLength={100} />
        </label>
      </div>

      <label>
        <span className="mono dim">Société *</span>
        <input type="text" name="societe" required maxLength={150} />
      </label>

      <div className="form-row">
        <label>
          <span className="mono dim">Email *</span>
          <input type="email" name="email" required maxLength={255} />
        </label>
        <label>
          <span className="mono dim">Téléphone *</span>
          <input type="tel" name="tel" required maxLength={40} />
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
          maxLength={4900}
          placeholder="Décrivez votre besoin : trajet, dates, type de matériel…"
        />
      </label>

      {/* Champ piège : invisible à l'oeil et aux lecteurs d'écran, hors de
          portée du clavier. Un robot qui remplit tous les champs le remplit
          aussi, et l'API ignore alors l'envoi. Même dispositif que
          PartnerForm. */}
      <div className="field-trap" aria-hidden="true">
        <label htmlFor="contact-website">
          Site web
          <input
            id="contact-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

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
