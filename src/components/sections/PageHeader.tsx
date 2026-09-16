import Image from "next/image";
import { HeroGlow } from "@/components/ui/HeroGlow";

type CommonProps = {
  eyebrow: string;
  title: string;
  accent: string;
  lead: string;
  /** Étiquette mono en haut. Par défaut "/ univers" (pages univers). */
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
  /**
   * Variante de la photo servie sous 901 px — **direction artistique**, pas
   * simple changement de résolution : un second cadrage, généralement en
   * portrait, pour une colonne étroite et haute où `cover` amputerait la
   * largeur du visuel paysage.
   *
   * Sa présence change la façon de rendre l'image (cf. le commentaire du
   * `<picture>` plus bas). Sans elle, le comportement reste celui des cinq
   * autres pages à photo, inchangé.
   */
  imageMobile?: string;
  /** Cadrage de la photo (CSS object-position). Défaut "72% center". */
  imagePosition?: string;
  /** Tonalité : "dark" (nuit, défaut) ou "bright" (jour, moins assombri). */
  photoTone?: "dark" | "bright";
};

type WithoutPhoto = CommonProps & {
  image?: never;
  imageAlt?: never;
  imageMobile?: never;
  imagePosition?: never;
  photoTone?: never;
};

type Props = WithPhoto | WithoutPhoto;

/** En-tête générique des pages univers / à-propos / contact. */
export function PageHeader(props: Props) {
  const {
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
        mobileSrc: props.imageMobile,
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
              {photo.mobileSrc ? (
                /*
                 * Deux cadrages distincts selon la largeur : `<picture>` et
                 * non `next/image`.
                 *
                 * Ce n'est pas un renoncement à l'optimiseur mais la seule
                 * forme correcte ici. `next/image` fait du **resolution
                 * switching** — la même image à plusieurs largeurs — alors
                 * qu'il s'agit de **direction artistique** : deux compositions
                 * différentes. Les deux contournements habituels sont pires :
                 * deux `<Image>` dont un masqué en `display:none` sont tous
                 * deux téléchargés par le navigateur, ce qui double le poids
                 * sur la page dont on surveille le LCP ; et un `srcSet` manuel
                 * sur `<Image>` est ignoré.
                 *
                 * Avec `<source media>`, le navigateur ne télécharge que la
                 * variante retenue. Les fichiers sont déjà encodés en WebP à
                 * la bonne taille (cf. `public/images/CREDITS.md`), donc ce que
                 * l'optimiseur aurait apporté en plus se limite à l'AVIF et aux
                 * variantes de densité.
                 *
                 * 900 px : le palier auquel `.page-header.has-photo` change
                 * déjà de comportement dans `globals.css` (min-height au-delà
                 * de 901 px). Un seul palier, au même endroit.
                 *
                 * `fetchPriority="high"` remplace le `priority` de
                 * `next/image` : sans lui la photo d'en-tête, candidate LCP,
                 * partirait en file basse.
                 */
                <picture>
                  <source
                    media="(max-width: 900px)"
                    srcSet={photo.mobileSrc}
                  />
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    fetchPriority="high"
                    decoding="async"
                    style={{ objectPosition: photo.position }}
                  />
                </picture>
              ) : (
                <>
                  {/*
                    `priority` : sur ces pages, la photo d'en-tête est l'élément
                    le plus grand au-dessus de la ligne de flottaison, donc le
                    candidat LCP. Sans lui, next/image la charge en `lazy` et
                    retarde justement la mesure qui compte.
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
                </>
              )}
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
      <div
        className={`container page-header-inner${media ? "" : " is-solo"}`}
      >
        <div className="page-header-side">
          <span className="mono dim">{tag ?? "/ univers"}</span>
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
        {media && (
          <div
            className="page-header-media"
            style={{ backgroundImage: `url(${media})` }}
            aria-hidden="true"
          />
        )}
      </div>
    </section>
  );
}
