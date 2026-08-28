"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type Props = {
  value: number | string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  /**
   * Séparateur de milliers. `false` pour une **année** : `toLocaleString`
   * affichait « 2 014 » sur /a-propos, la mise en forme des nombres étant
   * appliquée telle quelle à une date.
   */
  grouping?: boolean;
};

/**
 * `useLayoutEffect` dans le navigateur, `useEffect` au rendu serveur.
 *
 * React avertit quand `useLayoutEffect` est appelé côté serveur (il n'y fait
 * rien). Or c'est précisément l'effet de mise en page qu'il nous faut ici : il
 * est vidé **avant que le navigateur ne peigne**, donc la remise à zéro du
 * compteur n'est jamais visible. Avec un `useEffect` ordinaire, le visiteur
 * verrait brièvement 657, puis 0, puis le comptage — un clignotement au-dessus
 * de la ligne de flottaison.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Compteur animé déclenché à l'entrée dans le viewport (easing cubic out).
 *
 * Le HTML rendu par le serveur porte la **valeur finale**, pas zéro : c'est ce
 * que lisent les robots qui n'exécutent pas JavaScript, et notamment les agents
 * de réponse générative que `robots.ts` autorise explicitement à citer le site
 * (`ChatGPT-User`, `PerplexityBot`, `Claude-SearchBot`…). Avant cette version,
 * l'état initial était `0` : les chiffres de preuve du site — 657 clients
 * récurrents, 12K clients satisfaits, 35K courses réalisées — apparaissaient
 * littéralement à « 0 » dans la source servie.
 *
 * Le navigateur, lui, repart de zéro et anime : l'effet visuel est inchangé.
 * C'est le même principe que la FAQ rendue en `<details>` natif — le contenu
 * doit exister dans le HTML servi, l'enrichissement vient après.
 */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1800,
  grouping = true,
}: Props) {
  const target = parseFloat(String(value));

  /** `null` ⇒ pas encore pris en main par le navigateur : on affiche `target`. */
  const [n, setN] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  // Bascule à zéro avant le premier paint — sauf si l'animation est refusée,
  // auquel cas la valeur finale reste affichée telle quelle.
  useIsomorphicLayoutEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(target * eased);
              if (p < 1) requestAnimationFrame(tick);
              else setN(target);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  const display = useMemo(() => {
    const current = n ?? target;
    if (!Number.isInteger(target)) return current.toFixed(1);
    const rounded = Math.round(current);
    return grouping ? rounded.toLocaleString("fr-FR") : String(rounded);
  }, [n, target, grouping]);

  return (
    <span ref={ref} className="tnum">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
