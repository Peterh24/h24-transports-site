"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/data/site";

type Option = { v: string; l: string };

/** Libellés exacts attendus par le contrat d'API (voir commentaire de `SITE.partnerApi`). */
const LICENSES: Option[] = [
  { v: "interieur", l: "Licence de transport intérieur (jusqu'à 3,5 t)" },
  { v: "communautaire", l: "Licence communautaire (plus de 3,5 t)" },
];

const VEHICLE_TYPES: Option[] = [
  { v: "vl_3m3", l: "3 m³" },
  { v: "fourgon_6_8m3", l: "6 à 8 m³" },
  { v: "fourgon_12_14m3", l: "12 à 14 m³" },
  { v: "fourgon_20m3", l: "20 m³" },
  { v: "porteur_hayon", l: "Porteur avec hayon" },
  { v: "semi_remorque", l: "Semi-remorque" },
  { v: "penderie", l: "Penderie" },
  { v: "frigorifique", l: "Frigorifique" },
];

const COMPANY_SIZES: Option[] = [
  { v: "1-2", l: "1 à 2 salariés" },
  { v: "3-10", l: "3 à 10 salariés" },
  { v: "11-50", l: "11 à 50 salariés" },
  { v: "51+", l: "Plus de 50 salariés" },
];

const FLEET_SIZES: Option[] = [
  { v: "1-2", l: "1 à 2 véhicules" },
  { v: "3-5", l: "3 à 5 véhicules" },
  { v: "6-15", l: "6 à 15 véhicules" },
  { v: "16+", l: "16 véhicules et plus" },
];

const ZONES_OPTIONS: Option[] = [
  { v: "paris", l: "Paris" },
  { v: "idf", l: "Île-de-France" },
  { v: "national", l: "France entière" },
  { v: "international", l: "International" },
];

const AVAILABLE_OPTIONS: Option[] = [
  { v: "oui", l: "Oui" },
  { v: "non", l: "Non" },
];

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const SIREN_RE = /^\d{9}$/;
const MESSAGE_MAX = 2000;

/**
 * Même plafond que `ContactForm` (20 s, et non 10) : l'infrastructure API est
 * la même pour les deux formulaires, et une requête qui aboutit lentement
 * vaut mieux qu'une requête coupée trop tôt.
 */
const TIMEOUT_MS = 20_000;

/** Clé de brouillon localStorage : préfixe `h24-` comme `h24-consent` dans Analytics.tsx. */
const DRAFT_KEY = "h24-partner-form-draft";

type Status = "idle" | "sending" | "sent" | "error";

type FieldKey =
  | "companyName"
  | "siren"
  | "contactFirstName"
  | "contactLastName"
  | "email"
  | "phone"
  | "licenses"
  | "vehicleTypes"
  | "companySize"
  | "fleetSize"
  | "zones"
  | "available247"
  | "message";

type FieldErrors = Partial<Record<FieldKey, string>>;

/** Forme du brouillon persisté : mêmes champs que l'état du formulaire. */
type Draft = {
  companyName: string;
  siren: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone: string;
  licenses: string[];
  vehicleTypes: string[];
  companySize: string;
  fleetSize: string;
  zones: string[];
  available247: boolean | null;
  message: string;
};

/** Lecture défensive : un brouillon corrompu ou d'un ancien format ne doit jamais planter le montage. */
function lireBrouillon(): Partial<Draft> | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Partial<Draft>) : null;
  } catch {
    // Navigation privée, stockage plein ou JSON corrompu : on démarre à vide.
    return null;
  }
}

function ecrireBrouillon(draft: Draft) {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch {
    // Le brouillon ne survivra pas au rechargement, mais la saisie en cours n'est pas bloquée.
  }
}

function effacerBrouillon() {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Si le stockage est inaccessible, il n'y avait de toute façon rien à effacer.
  }
}

/** Message d'erreur sous un champ, annoncé aux lecteurs d'écran. */
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={id} className="field-error" role="alert">
      {message}
    </span>
  );
}

/**
 * Groupe de boutons à sélection multiple (licences, véhicules, zones).
 * `role="group"` + `aria-pressed` : ce ne sont pas des radios (plusieurs
 * boutons peuvent rester actifs), donc pas `role="radiogroup"`/`aria-checked`,
 * qui annonceraient un mauvais modèle d'interaction aux lecteurs d'écran.
 *
 * Un `div.form-field` et surtout PAS un `label` : un `label` sans `for` prend
 * pour cible son premier descendant labelable, et un `button` en est un. Un
 * clic sur la légende ou sur le message d'erreur activait donc le premier
 * bouton du groupe, cochant une licence ou une disponibilité que le candidat
 * n'avait pas choisie, sans rien afficher. Le nom accessible vient déjà de
 * `aria-labelledby`, le `label` n'apportait rien.
 */
function MultiChoice({
  legendId,
  legend,
  options,
  selected,
  onToggle,
  error,
}: {
  legendId: string;
  legend: string;
  options: Option[];
  selected: string[];
  onToggle: (value: string) => void;
  error?: string;
}) {
  const errorId = error ? `${legendId}-error` : undefined;
  return (
    <div className="form-field">
      <span className="mono dim" id={legendId}>
        {legend}
      </span>
      <div
        className="service-multi"
        role="group"
        aria-labelledby={legendId}
        aria-describedby={errorId}
        style={{ marginTop: 8 }}
      >
        {options.map((o) => {
          const active = selected.includes(o.v);
          return (
            <button
              type="button"
              key={o.v}
              className={`service-opt ${active ? "active" : ""}`}
              aria-pressed={active}
              onClick={() => onToggle(o.v)}
            >
              {o.l}
            </button>
          );
        })}
      </div>
      <FieldError id={errorId ?? ""} message={error} />
    </div>
  );
}

/** Groupe de boutons à sélection unique (taille d'entreprise, parc, disponibilité). */
function SingleChoice({
  legendId,
  legend,
  options,
  selected,
  onSelect,
  error,
}: {
  legendId: string;
  legend: string;
  options: Option[];
  selected: string;
  onSelect: (value: string) => void;
  error?: string;
}) {
  const errorId = error ? `${legendId}-error` : undefined;
  return (
    <div className="form-field">
      <span className="mono dim" id={legendId}>
        {legend}
      </span>
      <div
        className="service-radio"
        role="group"
        aria-labelledby={legendId}
        aria-describedby={errorId}
        style={{ marginTop: 8 }}
      >
        {options.map((o) => {
          const active = selected === o.v;
          return (
            <button
              type="button"
              key={o.v}
              className={`service-opt ${active ? "active" : ""}`}
              aria-pressed={active}
              onClick={() => onSelect(o.v)}
            >
              {o.l}
            </button>
          );
        })}
      </div>
      <FieldError id={errorId ?? ""} message={error} />
    </div>
  );
}

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

/**
 * Formulaire de candidature « devenir partenaire », pour les transporteurs
 * affrétés.
 *
 * Même fonctionnement d'envoi que `ContactForm` (voir son commentaire de
 * tête) : la requête part **du navigateur du visiteur**, jamais du serveur.
 *
 * ⚠️ Règle à ne pas casser, identique à `ContactForm` : ne JAMAIS afficher un
 * succès sans la confirmation que la candidature est bien partie (un 201 de
 * l'API). Une fausse confirmation laisse un transporteur croire que sa
 * candidature a été reçue alors que personne chez H24 ne le sait.
 */
export function PartnerForm() {
  const [companyName, setCompanyName] = useState("");
  const [siren, setSiren] = useState("");
  const [contactFirstName, setContactFirstName] = useState("");
  const [contactLastName, setContactLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [licenses, setLicenses] = useState<string[]>([]);
  const [vehicleTypes, setVehicleTypes] = useState<string[]>([]);
  const [companySize, setCompanySize] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  const [zones, setZones] = useState<string[]>([]);
  const [available247, setAvailable247] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");
  /* Honeypot : jamais rempli par un visiteur humain (masqué en CSS et aux
     lecteurs d'écran, hors navigation clavier). Sa valeur réelle part dans le
     payload, la forcer à vide côté client annulerait l'intérêt du piège. */
  const [website, setWebsite] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [hydrated, setHydrated] = useState(false);

  // Restauration du brouillon au montage.
  useEffect(() => {
    const draft = lireBrouillon();
    if (draft) {
      if (typeof draft.companyName === "string") setCompanyName(draft.companyName);
      if (typeof draft.siren === "string") setSiren(draft.siren);
      if (typeof draft.contactFirstName === "string") setContactFirstName(draft.contactFirstName);
      if (typeof draft.contactLastName === "string") setContactLastName(draft.contactLastName);
      if (typeof draft.email === "string") setEmail(draft.email);
      if (typeof draft.phone === "string") setPhone(draft.phone);
      if (Array.isArray(draft.licenses)) setLicenses(draft.licenses);
      if (Array.isArray(draft.vehicleTypes)) setVehicleTypes(draft.vehicleTypes);
      if (typeof draft.companySize === "string") setCompanySize(draft.companySize);
      if (typeof draft.fleetSize === "string") setFleetSize(draft.fleetSize);
      if (Array.isArray(draft.zones)) setZones(draft.zones);
      if (typeof draft.available247 === "boolean") setAvailable247(draft.available247);
      if (typeof draft.message === "string") setMessage(draft.message);
    }
    // Le brouillon est restauré (ou absent) : la sauvegarde peut démarrer.
    setHydrated(true);
  }, []);

  // Sauvegarde du brouillon à chaque changement, une fois la restauration faite.
  // Sans le garde `hydrated`, ce même effet tournerait dès le premier rendu
  // (avant restauration) et écraserait le brouillon existant avec des champs vides.
  useEffect(() => {
    if (!hydrated) return;
    ecrireBrouillon({
      companyName,
      siren,
      contactFirstName,
      contactLastName,
      email,
      phone,
      licenses,
      vehicleTypes,
      companySize,
      fleetSize,
      zones,
      available247,
      message,
    });
  }, [
    hydrated,
    companyName,
    siren,
    contactFirstName,
    contactLastName,
    email,
    phone,
    licenses,
    vehicleTypes,
    companySize,
    fleetSize,
    zones,
    available247,
    message,
  ]);

  const label =
    status === "sending"
      ? "Envoi…"
      : status === "sent"
        ? "Candidature envoyée ✓"
        : "Envoyer ma candidature";

  function validate(sirenDigits: string): FieldErrors {
    const errors: FieldErrors = {};
    if (!companyName.trim()) errors.companyName = "Merci d'indiquer le nom de l'entreprise.";
    if (sirenDigits && !SIREN_RE.test(sirenDigits)) {
      errors.siren = "Le SIREN doit comporter 9 chiffres.";
    }
    if (!contactFirstName.trim()) errors.contactFirstName = "Merci d'indiquer un prénom.";
    if (!contactLastName.trim()) errors.contactLastName = "Merci d'indiquer un nom.";
    if (!email.trim()) errors.email = "Merci d'indiquer une adresse email.";
    else if (!EMAIL_RE.test(email.trim())) errors.email = "L'adresse email saisie semble invalide.";
    if (!phone.trim()) errors.phone = "Merci d'indiquer un numéro de téléphone.";
    if (licenses.length === 0) errors.licenses = "Sélectionnez au moins une licence.";
    if (vehicleTypes.length === 0) errors.vehicleTypes = "Sélectionnez au moins un type de véhicule.";
    if (!companySize) errors.companySize = "Sélectionnez la taille de l'entreprise.";
    if (available247 === null) {
      errors.available247 = "Indiquez si vous êtes disponible 24h/24 et 7j/7.";
    }
    if (message.trim().length > MESSAGE_MAX) {
      errors.message = `Le message ne doit pas dépasser ${MESSAGE_MAX} caractères.`;
    }
    return errors;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending" || status === "sent") return;

    const sirenDigits = siren.replace(/\s+/g, "");
    const errors = validate(sirenDigits);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setError("Merci de corriger les champs signalés ci-dessous.");
      return;
    }

    setFieldErrors({});
    setStatus("sending");
    setError("");

    const payload = {
      companyName: companyName.trim(),
      ...(sirenDigits ? { siren: sirenDigits } : {}),
      contactFirstName: contactFirstName.trim(),
      contactLastName: contactLastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      licenses,
      vehicleTypes,
      companySize,
      ...(fleetSize ? { fleetSize } : {}),
      ...(zones.length > 0 ? { zones } : {}),
      available247: available247 as boolean,
      ...(message.trim() ? { message: message.trim() } : {}),
      website,
    };

    // Voir le commentaire de `ContactForm` : garde-fou pour Safari < 16, sans
    // quoi l'appel lèverait un TypeError sur un navigateur ancien.
    const signal =
      typeof AbortSignal.timeout === "function"
        ? AbortSignal.timeout(TIMEOUT_MS)
        : undefined;

    let response: Response;
    try {
      response = await fetch(SITE.partnerApi, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal,
        cache: "no-store",
      });
    } catch {
      setStatus("error");
      setError(
        `Envoi impossible pour le moment. Appelez-nous directement au ${SITE.phone}, 24h/24.`,
      );
      return;
    }

    if (response.status === 201) {
      setStatus("sent");
      effacerBrouillon();
      return;
    }

    if (response.status === 422) {
      let body: { errors?: FieldErrors } = {};
      try {
        body = await response.json();
      } catch {
        // 422 sans corps JSON exploitable : on retombe sur le message générique ci-dessous.
      }
      setFieldErrors(body.errors ?? {});
      setStatus("error");
      setError("Merci de corriger les champs signalés ci-dessous.");
      return;
    }

    if (response.status === 429) {
      setStatus("error");
      setError(
        `Trop de tentatives. Réessayez dans quelques minutes, ou appelez-nous au ${SITE.phone}.`,
      );
      return;
    }

    setStatus("error");
    setError(
      `Envoi impossible pour le moment. Appelez-nous directement au ${SITE.phone}, 24h/24.`,
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="company-name">
          <span className="mono dim">Entreprise *</span>
          <input
            id="company-name"
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            aria-invalid={Boolean(fieldErrors.companyName)}
            aria-describedby={fieldErrors.companyName ? "company-name-error" : undefined}
          />
          <FieldError id="company-name-error" message={fieldErrors.companyName} />
        </label>
        <label htmlFor="siren">
          <span className="mono dim">SIREN (optionnel)</span>
          <input
            id="siren"
            type="text"
            inputMode="numeric"
            value={siren}
            onChange={(e) => setSiren(e.target.value)}
            aria-invalid={Boolean(fieldErrors.siren)}
            aria-describedby={fieldErrors.siren ? "siren-error" : undefined}
          />
          <FieldError id="siren-error" message={fieldErrors.siren} />
        </label>
      </div>

      <div className="form-row">
        <label htmlFor="contact-first-name">
          <span className="mono dim">Prénom du contact *</span>
          <input
            id="contact-first-name"
            type="text"
            value={contactFirstName}
            onChange={(e) => setContactFirstName(e.target.value)}
            aria-invalid={Boolean(fieldErrors.contactFirstName)}
            aria-describedby={
              fieldErrors.contactFirstName ? "contact-first-name-error" : undefined
            }
          />
          <FieldError id="contact-first-name-error" message={fieldErrors.contactFirstName} />
        </label>
        <label htmlFor="contact-last-name">
          <span className="mono dim">Nom du contact *</span>
          <input
            id="contact-last-name"
            type="text"
            value={contactLastName}
            onChange={(e) => setContactLastName(e.target.value)}
            aria-invalid={Boolean(fieldErrors.contactLastName)}
            aria-describedby={
              fieldErrors.contactLastName ? "contact-last-name-error" : undefined
            }
          />
          <FieldError id="contact-last-name-error" message={fieldErrors.contactLastName} />
        </label>
      </div>

      <div className="form-row">
        <label htmlFor="email">
          <span className="mono dim">Email *</span>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" message={fieldErrors.email} />
        </label>
        <label htmlFor="phone">
          <span className="mono dim">Téléphone *</span>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
          />
          <FieldError id="phone-error" message={fieldErrors.phone} />
        </label>
      </div>

      <MultiChoice
        legendId="licenses-legend"
        legend="Licences de transport *"
        options={LICENSES}
        selected={licenses}
        onToggle={(v) => setLicenses((prev) => toggleValue(prev, v))}
        error={fieldErrors.licenses}
      />

      <MultiChoice
        legendId="vehicle-types-legend"
        legend="Types de véhicules *"
        options={VEHICLE_TYPES}
        selected={vehicleTypes}
        onToggle={(v) => setVehicleTypes((prev) => toggleValue(prev, v))}
        error={fieldErrors.vehicleTypes}
      />

      <div className="form-row">
        <SingleChoice
          legendId="company-size-legend"
          legend="Taille de l'entreprise *"
          options={COMPANY_SIZES}
          selected={companySize}
          onSelect={setCompanySize}
          error={fieldErrors.companySize}
        />
        <SingleChoice
          legendId="fleet-size-legend"
          legend="Taille du parc (optionnel)"
          options={FLEET_SIZES}
          selected={fleetSize}
          onSelect={setFleetSize}
          error={fieldErrors.fleetSize}
        />
      </div>

      <div className="form-row">
        <MultiChoice
          legendId="zones-legend"
          legend="Zones d'intervention (optionnel)"
          options={ZONES_OPTIONS}
          selected={zones}
          onToggle={(v) => setZones((prev) => toggleValue(prev, v))}
          error={fieldErrors.zones}
        />
        <SingleChoice
          legendId="available-legend"
          legend="Disponible 24h/24 et 7j/7 *"
          options={AVAILABLE_OPTIONS}
          selected={available247 === null ? "" : available247 ? "oui" : "non"}
          onSelect={(v) => setAvailable247(v === "oui")}
          error={fieldErrors.available247}
        />
      </div>

      <label htmlFor="message">
        <span className="mono dim">Message (optionnel)</span>
        <textarea
          id="message"
          rows={5}
          maxLength={MESSAGE_MAX}
          placeholder="Expérience, secteurs déjà couverts, disponibilités particulières…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "message-error" : undefined}
        />
        <FieldError id="message-error" message={fieldErrors.message} />
      </label>

      {/* Honeypot : un visiteur humain ne voit jamais ce champ (masqué à
          l'oeil et aux lecteurs d'écran) et ne peut pas l'atteindre au
          clavier. Un robot qui remplit tous les champs du formulaire sans
          regarder le rendu le remplit aussi, ce qui permet à l'API de rejeter
          l'envoi. */}
      <div className="field-trap" aria-hidden="true">
        <label htmlFor="website">
          Site web
          <input
            id="website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
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
            <span className="form-note" role="alert">
              {error}
            </span>
          ) : (
            "Réponse après étude de votre candidature"
          )}
        </span>
      </div>

      {status === "sent" && (
        <p className="mono accent" role="status" style={{ marginTop: 4 }}>
          Candidature envoyée ✓, merci. Nous revenons vers vous après étude de votre profil.
        </p>
      )}
    </form>
  );
}
