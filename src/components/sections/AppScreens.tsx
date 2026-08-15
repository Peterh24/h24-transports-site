"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const SCREENS: { src: string; w: number; h: number; alt: string; caption: string }[] = [
  {
    src: "/images/app/app-accueil.webp",
    w: 1080,
    h: 2050,
    alt: "Application H24 Transports — écran d'accueil et sélection de la société",
    caption: "Accueil & société",
  },
  {
    src: "/images/app/app-creer-demande.webp",
    w: 1160,
    h: 2120,
    alt: "Application H24 Transports — sélection du véhicule lors d'une demande",
    caption: "Créer une demande",
  },
  {
    src: "/images/app/app-suivi.webp",
    w: 1140,
    h: 2080,
    alt: "Application H24 Transports — suivi des transports en temps réel",
    caption: "Suivi des transports",
  },
];

/**
 * Section "écrans de l'app" avec animation au scroll :
 * les 3 téléphones arrivent groupés au centre (effet d'atterrissage)
 * puis se déploient à leur place au fur et à mesure du défilement.
 */
export function AppScreens() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      grid.style.setProperty("--p", "1");
      return;
    }

    // sur mobile la grille est en 1 colonne → pas d'animation (le CSS force
    // déjà l'état en place, on évite juste de travailler pour rien).
    const isMobile = () => window.matchMedia("(max-width: 900px)").matches;

    let raf = 0;
    const update = () => {
      raf = 0;
      if (isMobile()) {
        grid.style.setProperty("--p", "1");
        return;
      }
      // progression basée sur la grille de téléphones : groupés quand elle
      // apparaît en bas, déployés quand elle remonte vers le centre.
      const rect = grid.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const start = vh * 0.95; // haut de la grille près du bas → groupés
      const end = vh * 0.12; // haut de la grille vers le centre → déployés
      let p = (start - rect.top) / (start - end);
      p = Math.max(0, Math.min(1, p));
      grid.style.setProperty("--p", p.toFixed(4));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="app-screens" style={{ background: "var(--bg-1)" }}>
      <div className="container">
        <div className="section-head reveal">
          <div className="left">
            <span className="eyebrow">Aperçu de l&apos;app</span>
            <h2 className="display-l" style={{ marginTop: 16 }}>
              Pensée pour le terrain.
            </h2>
          </div>
          <div className="right">
            De la création de la demande au suivi en temps réel — quelques écrans
            de l&apos;application H24 Transports.
          </div>
        </div>
        <div ref={gridRef} className="screens-grid screens-grid-anim">
          {SCREENS.map((s) => (
            <figure className="app-screen" key={s.src}>
              <Image
                className="app-screen-img"
                src={s.src}
                width={s.w}
                height={s.h}
                alt={s.alt}
                sizes="(max-width: 900px) 80vw, 30vw"
                priority
              />
              <figcaption className="app-screen-cap mono dim">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
