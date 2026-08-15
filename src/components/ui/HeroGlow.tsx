/** Couche de halo "phares" derrière le hero / les en-têtes de page. */
export function HeroGlow() {
  return (
    <svg className="hero-glow" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="hgleft" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hgcore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD896" stopOpacity="0.9" />
          <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="660" cy="500" rx="380" ry="180" fill="url(#hgleft)" />
      <ellipse cx="940" cy="500" rx="380" ry="180" fill="url(#hgleft)" />
      <ellipse cx="660" cy="500" rx="80" ry="40" fill="url(#hgcore)" />
      <ellipse cx="940" cy="500" rx="80" ry="40" fill="url(#hgcore)" />
    </svg>
  );
}
