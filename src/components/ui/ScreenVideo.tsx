"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Vidéo H.264 (lue partout, Safari compris). */
  mp4: string;
  /** Même vidéo en VP9, plus légère, proposée en premier aux navigateurs qui la lisent. */
  webm?: string;
  /** Image affichée avant la lecture, et à la place de la vidéo si l'animation est réduite. */
  poster: string;
  className?: string;
};

/**
 * Courte boucle muette incrustée dans un visuel (ex. l'écran du Mac de la page
 * Application). Décorative : masquée des lecteurs d'écran, sans contrôles.
 *
 * WHY un composant client : `prefers-reduced-motion` ne peut pas couper un
 * `autoPlay` en CSS. La lecture n'est donc lancée qu'après vérification de la
 * préférence ; sinon le poster reste affiché, image fixe.
 */
export function ScreenVideo({ mp4, webm, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // `muted` posé en propriété : condition des navigateurs pour la lecture automatique.
    video.muted = true;
    const play = () => {
      video.play().catch(() => {
        /* lecture refusée (économiseur de données, batterie) : le poster reste affiché */
      });
    };
    // Chrome suspend une vidéo muette tant que l'onglet est caché (ouvert en
    // arrière-plan) : on relance la lecture quand il redevient visible.
    const onVisible = () => {
      if (document.visibilityState === "visible" && video.paused) play();
    };
    play();
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      {webm && <source src={webm} type="video/webm" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
