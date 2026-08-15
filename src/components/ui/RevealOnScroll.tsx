"use client";

import { useEffect } from "react";

/**
 * Observe tous les éléments `.reveal` / `.reveal-stagger` de la page et leur
 * ajoute la classe `.in` quand ils entrent dans le viewport.
 * À monter une fois par page (équivalent du hook `useReveal` de l'export d'origine).
 */
export function RevealOnScroll() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-stagger");
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
