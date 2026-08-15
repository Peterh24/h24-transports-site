"use client";

import { useActionState, useState } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";

const SERVICES = [
  { v: "event", l: "Événementiel" },
  { v: "express", l: "Express" },
  { v: "app", l: "Application" },
];

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContact,
    null,
  );
  const [service, setService] = useState("event");

  const label = pending
    ? "Envoi…"
    : state?.ok
      ? "Message envoyé ✓"
      : "Envoyer la demande";

  return (
    <form className="contact-form" action={formAction}>
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
        <input type="hidden" name="service" value={service} />
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
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {label} <span className="arrow" />
        </button>
        <span className="mono dim">
          {state && !state.ok ? (
            <span className="form-note">{state.message}</span>
          ) : (
            "Réponse sous 30 minutes ouvrées"
          )}
        </span>
      </div>

      {state?.ok && (
        <p className="mono accent" role="status" style={{ marginTop: 4 }}>
          {state.message}
        </p>
      )}
    </form>
  );
}
