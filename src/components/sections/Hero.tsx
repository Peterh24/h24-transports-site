"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Counter } from "@/components/ui/Counter";
import { ACTIVITY, anneesExperience } from "@/data/activity";
import { SITE } from "@/data/site";

const POSTER = "/images/hero/hero-poster.jpg";

/** Hero de la page d'accueil : vidéo de fond, horloge live, chiffres clés. */
export function Hero() {
  const [time, setTime] = useState<Date | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setTime(new Date());
    const t = setInterval(() => setTime(new Date()), 1000);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);

    return () => {
      clearInterval(t);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  const hh = time ? String(time.getHours()).padStart(2, "0") : "--";
  const mm = time ? String(time.getMinutes()).padStart(2, "0") : "--";
  const ss = time ? String(time.getSeconds()).padStart(2, "0") : "--";

  return (
    <section className="hero" data-screen-label="00 Hero">
      <div className="hero-bg">
        <video
          className="hero-video"
          autoPlay={!reduceMotion}
          loop={!reduceMotion}
          muted
          playsInline
          preload="metadata"
          poster={POSTER}
          aria-hidden="true"
        >
          <source src="/images/hero/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-scrim"></div>
        <div className="hero-vignette"></div>
      </div>

      <div className="container hero-inner">
        <div className="hero-meta">
          <div className="ticker">
            <span className="dot"></span>
            <span>
              Service actif · {hh}:{mm}:<span style={{ opacity: 0.5 }}>{ss}</span>
            </span>
          </div>
          <div className="mono hero-coord">{SITE.coords}</div>
        </div>

        <div className="hero-main">
          <div className="hero-row">
            <span className="mono hero-tag">— H24 / Transports / Paris</span>
          </div>
          <h1 className="display-xl hero-title">
            Le transport<br />
            <span className="hero-title-accent">qui ne dort jamais</span>
          </h1>
          {/* « Paris et Île-de-France » porté par le chapô plutôt que par le
              H1 : la signature de marque reste intacte, et la page gagne les
              mots-clés locaux qu'elle n'avait que dans une étiquette mono.
              Formulation alignée sur le résumé de l'accueil dans `PAGES`. */}
          <p className="lead hero-lead">
            Audiovisuel, événementiel, urgent exclusif à Paris et en
            Île-de-France. Une équipe, une flotte, et un service personnalisé —
            disponibles 24h&nbsp;/&nbsp;24 et 7j&nbsp;/&nbsp;7 depuis 2014.
          </p>
          <div className="hero-actions">
            <a
              href={SITE.dashboard.login}
              className="btn btn-primary"
            >
              Demander un devis <span className="arrow"></span>
            </a>
            <Link href="/evenementiel" className="btn btn-ghost">
              Découvrir nos univers
            </Link>
          </div>
        </div>

        {/* Chiffres issus de Dashdoc, relevés le 2026-08-28 (cf.
            src/data/activity.ts). Le libellé « depuis 2023 » n'est pas
            décoratif : Dashdoc ne couvre pas 2014-2022, retirer la mention
            transformerait un total de période en total depuis la création. */}
        <div className="hero-bottom">
          <div className="hero-stat">
            <div className="mono dim">// 01</div>
            <div className="display-s">
              <Counter value={ACTIVITY.clients} />
            </div>
            <div className="mono dim">Clients accompagnés</div>
          </div>
          <div className="hero-stat">
            <div className="mono dim">// 02</div>
            <div className="display-s">
              <Counter value={ACTIVITY.courses} />
            </div>
            <div className="mono dim">Courses depuis {ACTIVITY.coursesDepuis}</div>
          </div>
          <div className="hero-stat">
            <div className="mono dim">// 03</div>
            <div className="display-s">
              <Counter value={anneesExperience()} />
            </div>
            <div className="mono dim">Ans d&apos;expertise</div>
          </div>
          <div className="hero-stat hero-stat-cta">
            <div className="mono dim">// status</div>
            <div className="display-s accent">7j/7 · 24h/24</div>
            <div className="mono dim">Réactivité H-1 sur Paris</div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-cue">
        <span className="mono">scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
