"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Code promo affiché en grand, cliquable pour être copié.
 *
 * Le code doit être **saisi** dans le formulaire de commande de l'app : un
 * code recopié à la main se trompe d'un caractère, un code copié non. En cas
 * de refus du presse-papiers (contexte non sécurisé, permission navigateur),
 * on n'affiche pas de faux succès — le code reste lisible et sélectionnable.
 */
export function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      /* presse-papiers indisponible : on laisse l'utilisateur sélectionner */
    }
  };

  return (
    <button
      type="button"
      className="code-copy"
      onClick={copy}
      aria-label={`Copier le code promo ${code}`}
    >
      <span className="code-copy-value">{code}</span>
      <span className="code-copy-hint mono" aria-hidden="true">
        {copied ? "copié" : "copier"}
      </span>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? `Code ${code} copié` : ""}
      </span>
    </button>
  );
}
