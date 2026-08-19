import { HeroGlow } from "@/components/ui/HeroGlow";

type Props = {
  num: string;
  eyebrow: string;
  title: string;
  accent: string;
  lead: string;
  /** Étiquette mono en haut. Par défaut "/ univers / {num}" (pages univers). */
  tag?: string;
  /** Photo de fond optionnelle (assombrie, halo orange par-dessus). */
  image?: string;
  /** Cadrage de la photo de fond (CSS background-position). Défaut "72% center". */
  imagePosition?: string;
  /** Affiche le halo orange sur la photo (défaut true). */
  glow?: boolean;
  /** Tonalité de la photo : "dark" (nuit, défaut) ou "bright" (jour, moins assombri). */
  photoTone?: "dark" | "bright";
  /** Image (ex. rendu véhicule sur fond sombre) affichée à la place du grand numéro. */
  media?: string;
  /** Affiche la grille de carreaux en fond (défaut true ; sans effet si `image`). */
  grid?: boolean;
  /** Atténue le halo orange (utile quand un visuel occupe déjà l'en-tête). */
  softGlow?: boolean;
};

/** En-tête générique des pages univers / à-propos / contact. */
export function PageHeader({
  num,
  eyebrow,
  title,
  accent,
  lead,
  tag,
  image,
  imagePosition,
  glow = true,
  photoTone = "dark",
  media,
  grid = true,
  softGlow = false,
}: Props) {
  return (
    <section
      className={`page-header${image ? ` has-photo photo-${photoTone}` : ""}${
        softGlow ? " glow-soft" : ""
      }`}
    >
      <div className="hero-bg">
        {image ? (
          <>
            <div
              className="page-header-photo"
              style={{ backgroundImage: `url(${image})`, backgroundPosition: imagePosition }}
            />
            <div className="page-header-photo-scrim" />
            {glow && <div className="page-header-glow" />}
          </>
        ) : (
          <>
            {grid && <div className="hero-grid" />}
            {glow && <HeroGlow />}
          </>
        )}
      </div>
      <div className="container page-header-inner">
        <div className="page-header-side">
          <span className="mono dim">{tag ?? `/ univers / ${num}`}</span>
          <span className="eyebrow" style={{ marginTop: 24 }}>
            {eyebrow}
          </span>
          <h1 className="display-xl" style={{ marginTop: 24 }}>
            {title}
            <br />
            <span className="accent">{accent}</span>
          </h1>
          <p className="lead" style={{ marginTop: 30 }}>
            {lead}
          </p>
        </div>
        {media ? (
          <div
            className="page-header-media"
            style={{ backgroundImage: `url(${media})` }}
            aria-hidden="true"
          />
        ) : (
          <div className="page-header-num">{num}</div>
        )}
      </div>
    </section>
  );
}
