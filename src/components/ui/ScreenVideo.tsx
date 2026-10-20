"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Vidéo H.264 (lue partout, Safari compris), avec sa piste son. */
  mp4: string;
  /** Image affichée avant la lecture, et à la place de la vidéo si l'animation est réduite. */
  poster: string;
  /** Titre de la vidéo : nom accessible du bouton et de la fenêtre de lecture. */
  title: string;
  className?: string;
};

/**
 * Vidéo incrustée dans un visuel (ex. l'écran du Mac de la page Application).
 *
 * Dans le visuel : boucle muette, sans contrôles. Un clic ouvre la même vidéo
 * en grand, depuis le début, avec le son et les contrôles du navigateur.
 *
 * WHY deux lectures distinctes : les navigateurs n'autorisent la lecture
 * automatique que sans son. Le son ne peut démarrer qu'après un geste de
 * l'utilisateur, d'où le clic qui ouvre la fenêtre de lecture.
 *
 * WHY un composant client : `prefers-reduced-motion` ne peut pas couper un
 * `autoPlay` en CSS. La boucle n'est lancée qu'après vérification de la
 * préférence ; sinon le poster reste affiché (la lecture au clic reste possible).
 */
export function ScreenVideo({ mp4, poster, title, className }: Props) {
  const loopRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fullRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = loopRef.current;
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
      if (document.visibilityState === "visible" && video.paused && !dialogRef.current?.open) play();
    };
    play();
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  const openPlayer = () => {
    loopRef.current?.pause();
    dialogRef.current?.showModal();
    const full = fullRef.current;
    if (full) {
      full.currentTime = 0;
      full.play().catch(() => {
        /* l'utilisateur lancera la lecture avec les contrôles */
      });
    }
  };

  /** Fermeture (bouton, Échap ou clic hors de la vidéo) : on coupe le son et on reprend la boucle. */
  const onClose = () => {
    fullRef.current?.pause();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      loopRef.current?.play().catch(() => {});
    }
  };

  return (
    <>
      <button
        type="button"
        className={`screen-video ${className ?? ""}`}
        onClick={openPlayer}
        aria-label={`Regarder la vidéo avec le son : ${title}`}
      >
        <video ref={loopRef} poster={poster} muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1}>
          <source src={mp4} type="video/mp4" />
        </video>
        <span className="screen-video-cta" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
          Regarder avec le son
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="screen-video-dialog"
        aria-label={title}
        onClose={onClose}
        onClick={(e) => {
          // clic sur le fond (hors de la vidéo) : fermeture
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <button
          type="button"
          className="screen-video-close"
          onClick={() => dialogRef.current?.close()}
          aria-label="Fermer la vidéo"
        >
          ×
        </button>
        {/* preload="none" : rien n'est téléchargé pour ce lecteur tant qu'on ne clique pas. */}
        <video ref={fullRef} poster={poster} controls playsInline preload="none">
          <source src={mp4} type="video/mp4" />
        </video>
      </dialog>
    </>
  );
}
