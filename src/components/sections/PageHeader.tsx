import Image from "next/image";
import { HeroGlow } from "@/components/ui/HeroGlow";

type CommonProps = {
  num: string;
  eyebrow: string;
  title: string;
  accent: string;
  lead: string;
  /** Étiquette mono en haut. Par défaut "/ univers / {num}" (pages univers). */
  tag?: string;
  /** Affiche le halo orange (défaut true). */
  glow?: boolean;
  /** Image (ex. rendu véhicule sur fond sombre) affichée à la place du grand numéro. */
  media?: string;
  /** Affiche la grille de carreaux en fond (défaut true ; sans effet si `image`). */
  grid?: boolean;
  /** Atténue le halo orange (utile quand un visuel occupe déjà l'en-tête). */
  softGlow?: boolean;
};

/**
 * Deux formes mutuellement exclusives : en-tête **avec** photo de fond, ou
 * sans. L'union rend `imageAlt` obligatoire dès qu'`image` est fourni — une
 * page ne peut donc plus ajouter un visuel d'en-tête en oubliant son texte
 * alternatif, ce qui était le cas des cinq pages à photo jusqu'ici.
 */
type WithPhoto = CommonProps & {
  /** Photo de fond (assombrie, halo orange par-dessus). */
  image: string;
  /** Description de la photo. Obligatoire : ce sont des images de contenu. */
  imageAlt: string;
  /** Cadrage de la photo (CSS object-position). Défaut "72% center". */
  imagePosition?: string;
  /** Tonalité : "dark" (nuit, défaut) ou "bright" (jour, moins assombri). */
  photoTone?: "dark" | "bright";
};

type WithoutPhoto = CommonProps & {
  image?: never;
  imageAlt?: never;
  imagePosition?: never;
  photoTone?: never;
};

type Props = WithPhoto | WithoutPhoto;

/** En-tête générique des pages univers / à-propos / contact. */
export function PageHeader(props: Props) {
  const {
    num,
    eyebrow,
    title,
    accent,
    lead,
    tag,
    glow = true,
    media,
    grid = true,
    softGlow = false,
  } = props;

  /**
   * Le test sur `props.image` discrimine l'union : dans cette branche,
   * TypeScript sait que `imageAlt` est présent.
   */
  const photo = props.image
    ? {
        src: props.image,
        alt: props.imageAlt,
        position: props.imagePosition ?? "72% center",
        tone: props.photoTone ?? "dark",
      }
    : null;

  return (
    <section
      className={`page-header${photo ? ` has-photo photo-${photo.tone}` : ""}${
        softGlow ? " glow-soft" : ""
      }`}
    >
      <div className="hero-bg">
        {photo ? (
          <>
            <div className="page-header-photo">
              {/*
                `priority` : sur ces pages, la photo d'en-tête est l'élément le
                plus grand au-dessus de la ligne de flottaison, donc le candidat
                LCP. Sans lui, next/image la charge en `lazy` et retarde
                justement la mesure qui compte.
                `sizes="100vw"` : elle occupe toute la largeur du viewport.
              */}
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="100vw"
                style={{ objectPosition: photo.position }}
              />
            </div>
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
