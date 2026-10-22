"use client";

import { useEffect, useRef, useState } from "react";
import { SITE } from "@/data/site";
import {
  COMPANY_SEARCH_MIN_LENGTH,
  searchCompanies,
  vatFromSiren,
  type CompanyResult,
} from "@/lib/company-search";

/** Délai d'anti-rebond de la recherche d'entreprise, le même que dans le dashboard. */
const COMPANY_SEARCH_DEBOUNCE_MS = 300;

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
const PRICING_TEXT_MAX = 5000;

/** Format commun aux numéros de TVA européens : deux lettres de pays, puis 2 à 13 caractères. */
const VAT_RE = /^[A-Z]{2}[0-9A-Z]{2,13}$/;
const VAT_FR_RE = /^FR([0-9A-Z]{2})(\d{9})$/;

/** Mêmes formats et même plafond que l'API (`PartnerApplicationPricingFile`). */
const PRICING_FILE_EXTENSIONS = ["pdf", "xls", "xlsx", "ods", "csv", "doc", "docx", "jpg", "jpeg", "png"];
const PRICING_FILE_ACCEPT = PRICING_FILE_EXTENSIONS.map((e) => `.${e}`).join(",");
const PRICING_FILE_MAX = 5 * 1024 * 1024;

/**
 * Même plafond que `ContactForm` (20 s, et non 10) : l'infrastructure API est
 * la même pour les deux formulaires, et une requête qui aboutit lentement
 * vaut mieux qu'une requête coupée trop tôt.
 */
const TIMEOUT_MS = 20_000;

/**
 * Avec une grille jointe (jusqu'à 5 Mo, soit près de 7 Mo une fois encodée),
 * 20 s ne suffisent pas depuis une connexion mobile moyenne : la requête
 * serait coupée alors que l'envoi progresse.
 */
const TIMEOUT_WITH_FILE_MS = 90_000;

/** Clé de brouillon localStorage : préfixe `h24-` comme `h24-consent` dans Analytics.tsx. */
const DRAFT_KEY = "h24-partner-form-draft";

type Status = "idle" | "sending" | "sent" | "error";

/** Message global affiché sous le bouton tant qu'un champ est signalé. */
const FIELDS_ERROR_MESSAGE = "Merci de corriger les champs signalés ci-dessus.";

type FieldKey =
  | "companyName"
  | "siren"
  | "vatNumber"
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
  | "pricing"
  | "pricingText"
  | "pricingFile"
  | "message";

type FieldErrors = Partial<Record<FieldKey, string>>;

/**
 * Forme du brouillon persisté : mêmes champs que l'état du formulaire, sauf
 * le fichier de grille tarifaire (un `File` ne se sérialise pas, et 5 Mo
 * dépasseraient de toute façon le quota du localStorage).
 */
type Draft = {
  companyName: string;
  siren: string;
  vatNumber: string;
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
  pricingText: string;
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
      <span className="mono accent" id={legendId}>
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
      <span className="mono accent" id={legendId}>
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

/** Même normalisation que l'API : espaces, points et tirets retirés, majuscules. */
function normaliserTva(value: string): string {
  return value.replace(/[\s.\-]+/g, "").toUpperCase();
}

/**
 * Contrôle du numéro de TVA, aligné sur `PartnerApplicationVatNumber` côté
 * API : format européen, et pour un numéro français, clé recalculée à partir
 * du SIREN (c'est elle qui attrape une faute de frappe) et cohérence avec le
 * SIREN saisi. L'API refait ce contrôle, celui-ci évite un aller-retour.
 */
function erreurTva(vat: string, sirenDigits: string): string | undefined {
  if (!vat) return "Merci d'indiquer le numéro de TVA intracommunautaire.";
  if (!VAT_RE.test(vat)) return "Le numéro de TVA semble invalide (exemple : FR32123456789).";
  if (!vat.startsWith("FR")) return undefined;
  const fr = VAT_FR_RE.exec(vat);
  if (!fr) {
    return "Un numéro de TVA français s'écrit FR, une clé de 2 caractères, puis les 9 chiffres du SIREN.";
  }
  const [, key, vatSiren] = fr;
  if (/^\d{2}$/.test(key) && Number(key) !== (12 + 3 * (Number(vatSiren) % 97)) % 97) {
    return "Le numéro de TVA saisi est incorrect, vérifiez-le.";
  }
  if (sirenDigits && SIREN_RE.test(sirenDigits) && sirenDigits !== vatSiren) {
    return "Le numéro de TVA ne correspond pas au SIREN indiqué.";
  }
  return undefined;
}

function extension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot === -1 ? "" : name.slice(dot + 1).toLowerCase();
}

function tailleLisible(bytes: number): string {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} Ko`
    : `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} Mo`;
}

function erreurFichier(file: File): string | undefined {
  if (!PRICING_FILE_EXTENSIONS.includes(extension(file.name))) {
    return "Format non accepté. Formats acceptés : PDF, Excel, CSV, Word, JPG ou PNG.";
  }
  if (file.size > PRICING_FILE_MAX) return "Le fichier dépasse 5 Mo.";
  if (file.size === 0) return "Le fichier est vide.";
  return undefined;
}

/** Contenu du fichier en base64, sans le préfixe `data:...;base64,` que rend FileReader. */
function lireEnBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
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
  const [vatNumber, setVatNumber] = useState("");
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
  const [pricingText, setPricingText] = useState("");
  const [pricingFile, setPricingFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  /* Honeypot : jamais rempli par un visiteur humain (masqué en CSS et aux
     lecteurs d'écran, hors navigation clavier). Sa valeur réelle part dans le
     payload, la forcer à vide côté client annulerait l'intérêt du piège. */
  const [website, setWebsite] = useState("");

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [hydrated, setHydrated] = useState(false);

  /* Recherche d'entreprise (annuaire SIRENE) sur le champ « Entreprise »,
     comme à l'inscription client du dashboard, avec ses trois états :
     - search : le candidat tape, la liste propose ;
     - selected : entreprise choisie, rappelée sur une ligne (raison sociale,
       SIREN, ville) avec « Changer » ; le champ SIREN n'est pas affiché, il
       ferait doublon ;
     - manual : « Je ne trouve pas mon entreprise », ou recherche en panne :
       raison sociale et SIREN saisis à la main.
     Le numéro de TVA reste toujours visible et modifiable. */
  const [companyMode, setCompanyMode] = useState<"search" | "selected" | "manual">("search");
  const [companyPicked, setCompanyPicked] = useState<CompanyResult | null>(null);
  const [companyResults, setCompanyResults] = useState<CompanyResult[]>([]);
  const [companyListOpen, setCompanyListOpen] = useState(false);
  const [companyActive, setCompanyActive] = useState(-1);
  const [companySearchFailed, setCompanySearchFailed] = useState(false);
  const companyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const companyAbort = useRef<AbortController | null>(null);
  /* Dernier numéro de TVA rempli automatiquement : choisir une autre
     entreprise le remplace, mais jamais un numéro tapé par le candidat. */
  const autoVat = useRef("");

  useEffect(
    () => () => {
      if (companyTimer.current) clearTimeout(companyTimer.current);
      companyAbort.current?.abort();
    },
    [],
  );

  /**
   * Retire l'erreur des champs que le candidat vient de modifier : sans ça,
   * un champ signalé à l'envoi resterait rouge jusqu'à l'envoi suivant, même
   * corrigé. La validation complète est refaite au prochain envoi. Mise à
   * jour par fonction : deux corrections dans le même rendu ne s'écrasent pas.
   */
  function clearFieldErrors(...keys: FieldKey[]) {
    setFieldErrors((prev) => {
      if (!keys.some((key) => prev[key])) return prev;
      const next = { ...prev };
      for (const key of keys) delete next[key];
      return next;
    });
  }

  function onCompanyNameChange(value: string) {
    setCompanyName(value);
    clearFieldErrors("companyName");
    if (companyTimer.current) clearTimeout(companyTimer.current);
    companyAbort.current?.abort();

    if (companyMode === "manual" || value.trim().length < COMPANY_SEARCH_MIN_LENGTH) {
      setCompanyResults([]);
      setCompanyListOpen(false);
      return;
    }

    companyTimer.current = setTimeout(async () => {
      const controller = new AbortController();
      companyAbort.current = controller;
      const results = await searchCompanies(value, controller.signal);
      if (controller.signal.aborted) return;
      setCompanySearchFailed(results === null);
      // Annuaire injoignable : bascule en saisie manuelle, SIREN compris.
      if (results === null) setCompanyMode("manual");
      setCompanyResults(results ?? []);
      setCompanyActive(-1);
      setCompanyListOpen((results ?? []).length > 0);
    }, COMPANY_SEARCH_DEBOUNCE_MS);
  }

  function chooseCompany(company: CompanyResult) {
    setCompanyName(company.name);
    setSiren(company.siren);
    const vat = vatFromSiren(company.siren);
    if (!vatNumber.trim() || normaliserTva(vatNumber) === autoVat.current) {
      setVatNumber(vat);
      autoVat.current = vat;
    }
    setCompanyListOpen(false);
    setCompanyResults([]);
    setCompanyPicked(company);
    setCompanyMode("selected");
    clearFieldErrors("companyName", "siren", "vatNumber");
  }

  /** « Changer » : retour à la recherche, l'entreprise choisie est oubliée. */
  function resetCompany() {
    setCompanyName("");
    setSiren("");
    if (normaliserTva(vatNumber) === autoVat.current) {
      setVatNumber("");
      autoVat.current = "";
    }
    setCompanyPicked(null);
    setCompanyMode("search");
    // Le champ réapparaît au rendu suivant : focus une fois qu'il existe.
    setTimeout(() => document.getElementById("company-name")?.focus(), 0);
  }

  function switchToManual() {
    if (companyTimer.current) clearTimeout(companyTimer.current);
    companyAbort.current?.abort();
    setCompanyListOpen(false);
    setCompanyResults([]);
    setCompanyMode("manual");
  }

  function onCompanyKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!companyListOpen || companyResults.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setCompanyActive((i) => (i + 1) % companyResults.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCompanyActive((i) => (i <= 0 ? companyResults.length - 1 : i - 1));
    } else if (event.key === "Enter" && companyActive >= 0) {
      // Sans ce preventDefault, Entrée enverrait le formulaire.
      event.preventDefault();
      chooseCompany(companyResults[companyActive]);
    } else if (event.key === "Escape") {
      setCompanyListOpen(false);
    }
  }

  // Restauration du brouillon au montage.
  useEffect(() => {
    const draft = lireBrouillon();
    if (draft) {
      if (typeof draft.companyName === "string") setCompanyName(draft.companyName);
      if (typeof draft.siren === "string") {
        setSiren(draft.siren);
        // Un SIREN déjà saisi doit rester visible et corrigeable : sans la
        // ville de l'annuaire, le brouillon ne permet pas de rejouer l'état
        // « entreprise choisie », la saisie manuelle le montre tel quel.
        if (draft.siren) setCompanyMode("manual");
      }
      if (typeof draft.vatNumber === "string") setVatNumber(draft.vatNumber);
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
      if (typeof draft.pricingText === "string") setPricingText(draft.pricingText);
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
      vatNumber,
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
      pricingText,
      message,
    });
  }, [
    hydrated,
    companyName,
    siren,
    vatNumber,
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
    pricingText,
    message,
  ]);

  // Tous les champs signalés ont été corrigés : le message qui y renvoie n'a plus lieu d'être.
  const showError =
    status === "error" &&
    !(error === FIELDS_ERROR_MESSAGE && !Object.values(fieldErrors).some(Boolean));

  const label =
    status === "sending"
      ? "Envoi…"
      : status === "sent"
        ? "Candidature envoyée ✓"
        : "Envoyer ma candidature";

  function onPricingFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    // Valeur remise à zéro : choisir à nouveau le même fichier après l'avoir
    // retiré doit redéclencher `change`.
    event.target.value = "";
    if (!file) return;
    setPricingFile(file);
    const fileError = erreurFichier(file);
    if (fileError) setFieldErrors((prev) => ({ ...prev, pricing: undefined, pricingFile: fileError }));
    else clearFieldErrors("pricing", "pricingFile");
  }

  function validate(sirenDigits: string): FieldErrors {
    const errors: FieldErrors = {};
    if (!companyName.trim()) errors.companyName = "Merci d'indiquer le nom de l'entreprise.";
    if (sirenDigits && !SIREN_RE.test(sirenDigits)) {
      errors.siren = "Le SIREN doit comporter 9 chiffres.";
    }
    const vatError = erreurTva(normaliserTva(vatNumber), sirenDigits);
    if (vatError) errors.vatNumber = vatError;
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
    if (pricingText.trim().length > PRICING_TEXT_MAX) {
      errors.pricingText = `La grille tarifaire ne doit pas dépasser ${PRICING_TEXT_MAX} caractères.`;
    }
    if (pricingFile) {
      const fileError = erreurFichier(pricingFile);
      if (fileError) errors.pricingFile = fileError;
    } else if (!pricingText.trim()) {
      errors.pricing = "Merci d'indiquer votre grille tarifaire : saisissez-la ou joignez un fichier.";
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
      setError(FIELDS_ERROR_MESSAGE);
      return;
    }

    setFieldErrors({});
    setStatus("sending");
    setError("");

    let pricingFilePayload: { name: string; content: string } | undefined;
    if (pricingFile) {
      try {
        pricingFilePayload = { name: pricingFile.name, content: await lireEnBase64(pricingFile) };
      } catch {
        setFieldErrors({ pricingFile: "Impossible de lire ce fichier, joignez-le à nouveau." });
        setStatus("error");
        setError(FIELDS_ERROR_MESSAGE);
        return;
      }
    }

    const payload = {
      companyName: companyName.trim(),
      ...(sirenDigits ? { siren: sirenDigits } : {}),
      vatNumber: normaliserTva(vatNumber),
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
      ...(pricingText.trim() ? { pricingText: pricingText.trim() } : {}),
      ...(pricingFilePayload ? { pricingFile: pricingFilePayload } : {}),
      ...(message.trim() ? { message: message.trim() } : {}),
      website,
    };

    // Voir le commentaire de `ContactForm` : garde-fou pour Safari < 16, sans
    // quoi l'appel lèverait un TypeError sur un navigateur ancien.
    const signal =
      typeof AbortSignal.timeout === "function"
        ? AbortSignal.timeout(pricingFile ? TIMEOUT_WITH_FILE_MS : TIMEOUT_MS)
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
      setPricingFile(null);
      return;
    }

    if (response.status === 422) {
      let body: { errors?: FieldErrors } = {};
      try {
        body = await response.json();
      } catch {
        // 422 sans corps JSON exploitable : on retombe sur le message générique ci-dessous.
      }
      if (body.errors && Object.values(body.errors).some(Boolean)) {
        setFieldErrors(body.errors);
        setStatus("error");
        setError(FIELDS_ERROR_MESSAGE);
        return;
      }
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
      {companyMode === "selected" && companyPicked ? (
        <div className="form-field">
          <span className="mono accent" id="company-legend">
            Entreprise *
          </span>
          <div className="company-picked" aria-labelledby="company-legend">
            <div className="company-picked-text">
              <span className="company-result-name">{companyPicked.name}</span>
              <span className="company-result-meta">
                SIREN {companyPicked.siren}
                {companyPicked.city ? ` · ${companyPicked.postcode} ${companyPicked.city}` : ""}
              </span>
            </div>
            <button type="button" className="service-opt" onClick={resetCompany}>
              Changer
            </button>
          </div>
        </div>
      ) : (
        <label htmlFor="company-name" className="company-search">
          <span className="mono accent">Entreprise *</span>
          {companyMode === "search" && (
            <span className="pricing-hint" id="company-name-hint">
              Tapez le nom ou le SIREN de votre entreprise, puis choisissez-la dans la liste.
            </span>
          )}
          {companyMode === "manual" && companySearchFailed && (
            <span className="pricing-hint" id="company-name-hint">
              Recherche indisponible pour le moment : saisissez vos informations à la main.
            </span>
          )}
          <input
            id="company-name"
            type="text"
            {...(companyMode === "search"
              ? {
                  role: "combobox",
                  "aria-autocomplete": "list" as const,
                  "aria-expanded": companyListOpen,
                  "aria-controls": "company-results",
                  "aria-activedescendant":
                    companyActive >= 0 ? `company-result-${companyActive}` : undefined,
                  autoComplete: "off",
                }
              : { autoComplete: "organization" })}
            value={companyName}
            onChange={(e) => onCompanyNameChange(e.target.value)}
            onKeyDown={onCompanyKeyDown}
            onBlur={() => setCompanyListOpen(false)}
            onFocus={() => setCompanyListOpen(companyMode === "search" && companyResults.length > 0)}
            aria-invalid={Boolean(fieldErrors.companyName)}
            aria-describedby={
              [
                companyMode === "search" || companySearchFailed ? "company-name-hint" : "",
                fieldErrors.companyName ? "company-name-error" : "",
              ]
                .filter(Boolean)
                .join(" ") || undefined
            }
          />
          {companyListOpen && (
            <ul className="company-results" id="company-results" role="listbox">
              {companyResults.map((c, i) => (
                <li
                  key={c.siren}
                  id={`company-result-${i}`}
                  role="option"
                  aria-selected={i === companyActive}
                  className={i === companyActive ? "active" : undefined}
                  // mousedown et non click : le blur du champ fermerait la liste
                  // avant que le clic ne l'atteigne.
                  onMouseDown={(e) => {
                    e.preventDefault();
                    chooseCompany(c);
                  }}
                >
                  <span className="company-result-name">{c.label}</span>
                  <span className="company-result-meta">
                    SIREN {c.siren}
                    {c.city ? ` · ${c.postcode} ${c.city}` : ""}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <FieldError id="company-name-error" message={fieldErrors.companyName} />
        </label>
      )}
      {companyMode === "search" && (
        <button type="button" className="company-mode-link" onClick={switchToManual}>
          Je ne trouve pas mon entreprise
        </button>
      )}
      {companyMode === "manual" && !companySearchFailed && (
        <button
          type="button"
          className="company-mode-link"
          onClick={() => {
            // Un SIREN tapé à la main ne doit pas partir, invisible, avec
            // l'entreprise qui sera choisie ensuite dans l'annuaire.
            setSiren("");
            setCompanyMode("search");
          }}
        >
          Rechercher mon entreprise dans l&apos;annuaire
        </button>
      )}

      {/* SIREN affiché seulement en saisie manuelle : après un choix dans
          l'annuaire il est déjà rappelé sur la ligne de l'entreprise. Sans
          lui, la TVA prend toute la largeur plutôt qu'une demi-ligne vide. */}
      <div className={companyMode === "manual" ? "form-row" : undefined}>
        {companyMode === "manual" && (
          <label htmlFor="siren">
            <span className="mono accent">SIREN (optionnel)</span>
            <input
              id="siren"
              type="text"
              inputMode="numeric"
              value={siren}
              onChange={(e) => {
                setSiren(e.target.value);
                // La TVA est contrôlée contre le SIREN : corriger l'un peut régler l'autre.
                clearFieldErrors("siren", "vatNumber");
              }}
              aria-invalid={Boolean(fieldErrors.siren)}
              aria-describedby={fieldErrors.siren ? "siren-error" : undefined}
            />
            <FieldError id="siren-error" message={fieldErrors.siren} />
          </label>
        )}
        <label htmlFor="vat-number">
          <span className="mono accent">N° de TVA intracommunautaire *</span>
          <input
            id="vat-number"
            type="text"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="FR32123456789"
            value={vatNumber}
            onChange={(e) => {
              setVatNumber(e.target.value);
              clearFieldErrors("vatNumber");
            }}
            aria-invalid={Boolean(fieldErrors.vatNumber)}
            aria-describedby={fieldErrors.vatNumber ? "vat-number-error" : undefined}
          />
          <FieldError id="vat-number-error" message={fieldErrors.vatNumber} />
        </label>
      </div>

      <div className="form-row">
        <label htmlFor="contact-first-name">
          <span className="mono accent">Prénom *</span>
          <input
            id="contact-first-name"
            type="text"
            value={contactFirstName}
            onChange={(e) => {
              setContactFirstName(e.target.value);
              clearFieldErrors("contactFirstName");
            }}
            aria-invalid={Boolean(fieldErrors.contactFirstName)}
            aria-describedby={
              fieldErrors.contactFirstName ? "contact-first-name-error" : undefined
            }
          />
          <FieldError id="contact-first-name-error" message={fieldErrors.contactFirstName} />
        </label>
        <label htmlFor="contact-last-name">
          <span className="mono accent">Nom *</span>
          <input
            id="contact-last-name"
            type="text"
            value={contactLastName}
            onChange={(e) => {
              setContactLastName(e.target.value);
              clearFieldErrors("contactLastName");
            }}
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
          <span className="mono accent">Email *</span>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldErrors("email");
            }}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" message={fieldErrors.email} />
        </label>
        <label htmlFor="phone">
          <span className="mono accent">Téléphone *</span>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              clearFieldErrors("phone");
            }}
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
        onToggle={(v) => {
          setLicenses((prev) => toggleValue(prev, v));
          clearFieldErrors("licenses");
        }}
        error={fieldErrors.licenses}
      />

      <MultiChoice
        legendId="vehicle-types-legend"
        legend="Types de véhicules *"
        options={VEHICLE_TYPES}
        selected={vehicleTypes}
        onToggle={(v) => {
          setVehicleTypes((prev) => toggleValue(prev, v));
          clearFieldErrors("vehicleTypes");
        }}
        error={fieldErrors.vehicleTypes}
      />

      <div className="form-row">
        <SingleChoice
          legendId="company-size-legend"
          legend="Taille de l'entreprise *"
          options={COMPANY_SIZES}
          selected={companySize}
          onSelect={(v) => {
            setCompanySize(v);
            clearFieldErrors("companySize");
          }}
          error={fieldErrors.companySize}
        />
        <SingleChoice
          legendId="fleet-size-legend"
          legend="Taille du parc (optionnel)"
          options={FLEET_SIZES}
          selected={fleetSize}
          onSelect={(v) => {
            setFleetSize(v);
            clearFieldErrors("fleetSize");
          }}
          error={fieldErrors.fleetSize}
        />
      </div>

      <div className="form-row">
        <MultiChoice
          legendId="zones-legend"
          legend="Zones d'intervention (optionnel)"
          options={ZONES_OPTIONS}
          selected={zones}
          onToggle={(v) => {
            setZones((prev) => toggleValue(prev, v));
            clearFieldErrors("zones");
          }}
          error={fieldErrors.zones}
        />
        <SingleChoice
          legendId="available-legend"
          legend="Disponible 24h/24 et 7j/7 *"
          options={AVAILABLE_OPTIONS}
          selected={available247 === null ? "" : available247 ? "oui" : "non"}
          onSelect={(v) => {
            setAvailable247(v === "oui");
            clearFieldErrors("available247");
          }}
          error={fieldErrors.available247}
        />
      </div>

      {/* Grille tarifaire : texte OU fichier, l'un des deux suffit. Un
          `div.form-field` (et pas un `label`) pour la même raison que
          `MultiChoice` : le bloc contient deux contrôles, un `label` sans
          `for` enverrait tout clic vers le premier. */}
      <div className="form-field">
        <span className="mono accent" id="pricing-legend">
          Grille tarifaire *
        </span>
        <span className="pricing-hint" id="pricing-hint">
          Saisissez vos tarifs ci-dessous ou joignez votre grille (PDF, Excel, CSV, Word ou photo,
          5 Mo maximum). L&apos;un ou l&apos;autre suffit.
        </span>
        <textarea
          id="pricing-text"
          rows={5}
          maxLength={PRICING_TEXT_MAX}
          placeholder="Exemple : Paris intra-muros 45 € HT la course, Île-de-France 1,20 € HT/km, attente 30 € HT/h…"
          value={pricingText}
          onChange={(e) => {
            setPricingText(e.target.value);
            clearFieldErrors("pricing", "pricingText");
          }}
          aria-labelledby="pricing-legend"
          aria-invalid={Boolean(fieldErrors.pricingText || fieldErrors.pricing)}
          aria-describedby={[
            "pricing-hint",
            fieldErrors.pricingText ? "pricing-text-error" : "",
            fieldErrors.pricing ? "pricing-error" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        />
        <FieldError id="pricing-text-error" message={fieldErrors.pricingText} />
        <div className="pricing-file">
          {pricingFile ? (
            <>
              <span className="pricing-file-name">
                {pricingFile.name} <span className="dim">({tailleLisible(pricingFile.size)})</span>
              </span>
              <button
                type="button"
                className="service-opt"
                onClick={() => {
                  setPricingFile(null);
                  clearFieldErrors("pricingFile");
                }}
              >
                Retirer
              </button>
            </>
          ) : (
            <label htmlFor="pricing-file" className="service-opt pricing-file-button">
              Joindre un fichier
              <input
                id="pricing-file"
                type="file"
                className="pricing-file-input"
                accept={PRICING_FILE_ACCEPT}
                onChange={onPricingFileChange}
                aria-describedby={fieldErrors.pricingFile ? "pricing-hint pricing-file-error" : "pricing-hint"}
                aria-invalid={Boolean(fieldErrors.pricingFile)}
              />
            </label>
          )}
        </div>
        <FieldError id="pricing-file-error" message={fieldErrors.pricingFile} />
        <FieldError id="pricing-error" message={fieldErrors.pricing} />
      </div>

      <label htmlFor="message">
        <span className="mono accent">Message (optionnel)</span>
        <textarea
          id="message"
          rows={5}
          maxLength={MESSAGE_MAX}
          placeholder="Expérience, secteurs déjà couverts, disponibilités particulières…"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            clearFieldErrors("message");
          }}
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
          {showError ? (
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
