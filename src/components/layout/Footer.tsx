import Link from "next/link";
import { H24Logo } from "@/components/ui/H24Logo";
import { SITE, SOCIALS } from "@/data/site";

/* Icônes réseaux — SVG inline : pas de requête réseau, pas de dépendance. */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.65h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.45-2.2 2.96V21h-4V9Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
} as const;

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <H24Logo />
            </div>
            <p className="footer-tag">
              Transport audiovisuel, événementiel et urgent exclusif. Disponibles
              24h/24 et 7j/7 depuis {SITE.founded}.
            </p>
            <div className="ticker" style={{ marginTop: 24 }}>
              <span className="dot" />
              <span>Service actif · Paris &amp; Île-de-France</span>
            </div>
            <ul className="footer-socials" aria-label="Réseaux sociaux">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      className="footer-social"
                      target="_blank"
                      /* noopener : empêche la page ouverte d'accéder à window.opener.
                         Pas de "nofollow" — ce sont nos profils officiels, le lien
                         doit confirmer la relation déclarée en schema.org sameAs. */
                      rel="noopener noreferrer me"
                      aria-label={`${SITE.name} sur ${social.label}`}
                    >
                      <Icon />
                      <span>{social.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="footer-col">
            <h5>Univers</h5>
            <ul>
              <li>
                <Link href="/evenementiel">Événementiel</Link>
              </li>
              <li>
                <Link href="/express">Express exclusif</Link>
              </li>
              <li>
                <Link href="/application">Application mobile</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Société</h5>
            <ul>
              <li>
                <Link href="/a-propos">À propos</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                {/* Pointe la section « Délais d'intervention » de l'accueil,
                    cible des redirections de l'ancienne page /delay. */}
                <Link href="/#zones">Délais d&apos;intervention</Link>
              </li>
              <li>
                <Link href="/mentions-legales">Mentions légales</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li>
                <a className="tnum" href={SITE.phoneHref}>
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={SITE.emailHref}>{SITE.email}</a>
              </li>
              <li>
                <span>{SITE.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="mono">© {SITE.founded}–2026 · {SITE.name}</span>
          <span className="mono">Conçu en France · Disponible 24/7</span>
        </div>
      </div>
    </footer>
  );
}
