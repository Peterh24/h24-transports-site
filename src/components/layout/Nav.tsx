"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { H24Logo } from "@/components/ui/H24Logo";
import { NAV_ITEMS, SITE } from "@/data/site";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ferme le menu mobile à chaque changement de route
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // bloque le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        className="nav"
        style={{ background: scrolled ? "rgba(10,9,8,0.85)" : "rgba(10,9,8,0.45)" }}
      >
        <div className="nav-inner">
          <Link className="nav-logo" href="/" aria-label="Accueil H24 Transports">
            <H24Logo />
          </Link>

          <div className="nav-links">
            {NAV_ITEMS.map((it) =>
              it.children ? (
                <div key={it.label} className="nav-dropdown">
                  <button
                    type="button"
                    className={`nav-link nav-dropdown-trigger ${
                      it.children.some((c) => isActive(c.href)) ? "active" : ""
                    }`}
                    aria-haspopup="true"
                  >
                    {it.label}
                    <span className="nav-caret" aria-hidden="true" />
                  </button>
                  <div className="nav-dropdown-menu">
                    {it.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`nav-dropdown-link ${isActive(c.href) ? "active" : ""}`}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={it.href}
                  href={it.href!}
                  className={`nav-link ${isActive(it.href!) ? "active" : ""}`}
                >
                  {it.label}
                </Link>
              )
            )}
          </div>

          <div className="nav-cta">
            <div className="nav-phone">
              <span className="badge">24/7</span>
              <a className="tnum" href={SITE.phoneHref}>
                {SITE.phone}
              </a>
            </div>
            <a
              className="btn btn-primary"
              href={SITE.dashboard.login}
            >
              Devis <span className="arrow" />
            </a>
            <button
              className={`nav-burger ${menuOpen ? "open" : ""}`}
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
        <div className="nav-progress" style={{ width: `${progress}%` }} />
      </nav>

      <div className={`nav-mobile ${menuOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((it) =>
          it.children ? (
            <div key={it.label} className="nav-mobile-group">
              <span className="nav-mobile-group-label">{it.label}</span>
              {it.children.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className={isActive(c.href) ? "active" : ""}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          ) : (
            <Link
              key={it.href}
              href={it.href!}
              className={isActive(it.href!) ? "active" : ""}
            >
              {it.label}
            </Link>
          )
        )}
        <div className="nav-mobile-cta">
          <a
            className="btn btn-primary"
            href={SITE.dashboard.login}
          >
            Demander un devis <span className="arrow" />
          </a>
          <a className="btn btn-ghost" href={SITE.phoneHref}>
            {SITE.phone}
          </a>
        </div>
      </div>
    </>
  );
}
