"use client";

/**
 * Mesure d'audience GA4, conditionnée au consentement.
 *
 * Histoire de ce fichier : l'ancien site Angular chargeait gtag.js
 * inconditionnellement depuis son `index.html`. La refonte Next.js du
 * 2026-08-15 (`3a8fd5e`) a supprimé ce fichier avec le reste de l'app Angular
 * sans reporter le tag — la mesure d'audience est donc morte le 2026-08-19,
 * jour de la mise en production, et personne ne l'a vu pendant dix jours.
 *
 * Elle revient ici, mais pas à l'identique : le script n'est **pas** injecté
 * tant que le visiteur n'a pas accepté. Google Analytics dépose des cookies et
 * n'entre pas dans les cas d'exemption de consentement de la CNIL, qui a déjà
 * prononcé des mises en demeure sur ce motif précis. Le charger d'abord et
 * demander ensuite reviendrait à reconduire la non-conformité d'avant.
 *
 * Choix technique : on n'utilise pas le « consent mode » de Google, qui charge
 * gtag.js en mode dégradé avant le choix. On ne charge rien du tout. C'est plus
 * simple à défendre et ça ne coûte qu'une mesure manquée sur les visiteurs qui
 * refusent.
 */

import Script from "next/script";
import { useEffect, useState } from "react";
import { ANALYTICS } from "@/data/site";

/** Valeur stockée : le choix explicite du visiteur, ou rien s'il n'a pas tranché. */
type Consent = "granted" | "denied";

const STORAGE_KEY = "h24-consent";

/** Emis par le lien « Cookies » du pied de page pour rouvrir le choix. */
export const CONSENT_EVENT = "h24:consent-reopen";

function lire(): Consent | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    // Navigation privée, cookies bloqués, stockage plein : on retombe sur
    // « pas de choix connu », donc pas de mesure. Jamais d'exception ici.
    return null;
  }
}

function ecrire(v: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, v);
  } catch {
    /* Le choix ne survivra pas au rechargement, mais il vaut pour la session. */
  }
}

export function Analytics() {
  /**
   * `undefined` = on ne sait pas encore (rendu serveur ou premier rendu client).
   * Il est important de ne pas afficher le bandeau pendant cette phase : le HTML
   * est statique et servi identiquement à tous, un bandeau rendu côté serveur
   * s'afficherait une fraction de seconde même aux visiteurs ayant déjà répondu.
   */
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);

  useEffect(() => {
    setConsent(lire());
    /*
     * Le consentement doit rester revocable a tout moment : sans cela le
     * bandeau n'a aucune valeur juridique. Le lien « Cookies » du pied de page
     * emet cet evenement, qui remet le choix a zero et reaffiche le bandeau.
     */
    const rouvrir = () => {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* Sans stockage, le bandeau reapparait quand meme pour cette session. */
      }
      setConsent(null);
    };
    window.addEventListener(CONSENT_EVENT, rouvrir);
    return () => window.removeEventListener(CONSENT_EVENT, rouvrir);
  }, []);

  function choisir(v: Consent) {
    ecrire(v);
    setConsent(v);
  }

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${ANALYTICS.ga4}', { cookie_expires: ${ANALYTICS.cookieMaxAgeSeconds} });`}
          </Script>
        </>
      )}

      {consent === null && (
        <div className="consent" role="dialog" aria-label="Consentement aux cookies de mesure">
          <p className="consent-text">
            Nous utilisons un cookie de mesure d&apos;audience pour comprendre
            comment le site est consulté. Rien n&apos;est déposé sans votre
            accord, et aucune donnée n&apos;est revendue.{" "}
            <a href="/mentions-legales">En savoir plus</a>
          </p>
          <div className="consent-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => choisir("denied")}
            >
              Refuser
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => choisir("granted")}
            >
              Accepter
            </button>
          </div>
        </div>
      )}
    </>
  );
}
