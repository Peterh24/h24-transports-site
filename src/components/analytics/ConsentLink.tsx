"use client";

/**
 * Lien « Cookies » du pied de page : rouvre le choix de consentement.
 *
 * Il existe pour une raison précise : un consentement qu'on ne peut pas retirer
 * n'est pas un consentement valable. Le bandeau ne s'affiche qu'une fois, donc
 * sans ce lien un visiteur ayant accepté n'aurait plus aucun moyen de revenir
 * en arrière — et les mentions légales ne pourraient pas annoncer ce droit.
 *
 * Le composant est volontairement minuscule et découplé : il émet un événement
 * que `Analytics` écoute, ce qui évite de faire remonter un état de
 * consentement jusqu'au layout pour le redescendre dans le pied de page.
 */

import { CONSENT_EVENT } from "./Analytics";

export function ConsentLink() {
  return (
    <button
      type="button"
      className="footer-linkish"
      onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}
    >
      Cookies
    </button>
  );
}
