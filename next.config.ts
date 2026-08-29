import type { NextConfig } from "next";

/**
 * Redirections 301 — bascule de l'ancien site vers cette refonte.
 *
 * Trois générations d'URLs coexistent dans l'index de Google et dans les liens
 * entrants. Toutes doivent atterrir sur une page réelle du nouveau site :
 *
 * 1. **Angular (site en production jusqu'à la bascule)** — routes relevées
 *    dans son `sitemap.xml` et dans sa table de routage
 *    (`/prehome`, `/home/:theme/:childTheme`, `/delay`, `/aboutUs`, `/legals`).
 * 2. **WordPress (site 2020, remplacé mais toujours indexé)** — URLs en
 *    `/index.php/...` relevées via la Wayback Machine, dont plusieurs sont
 *    encore listées dans le `robots.txt` de production.
 * 3. **Site statique 2018** — `/index.html`.
 *
 * Point de vigilance repris de l'audit : l'ancien site est une SPA qui répond
 * **200 sur n'importe quelle URL**, y compris inexistante (soft 404). Google a
 * donc pu indexer des URLs fantaisistes. Les règles fourre-tout en fin de
 * chaque bloc existent pour ça — elles évitent qu'une URL oubliée tombe en 404
 * sèche au lieu de transmettre son historique.
 *
 * L'ordre compte : Next applique la **première** règle qui correspond. Les
 * règles spécifiques précèdent donc toujours leur fourre-tout.
 *
 * `statusCode: 301` plutôt que `permanent: true` : ce dernier émet un **308**.
 * Google considère 301 et 308 comme équivalents pour la canonicalisation, mais
 * le 308 reste mal géré par certains crawlers anciens et outils d'audit de
 * liens. Sur une bascule de domaine où l'enjeu est de transmettre l'historique
 * accumulé depuis 2014, autant employer le code que tout le monde comprend.
 */

/**
 * Univers événementiel : l'ancien site éclatait la thématique en trois URLs.
 *
 * `eventMode` visait /evenementiel comme les deux autres jusqu'à la création de
 * la page /mode. Search Console montre que cette ancienne URL garde une audience
 * reelle — 67 impressions en position 7,7 sur les 28 jours precedant le
 * 2026-08-27, alors meme que le site Angular n'est plus en ligne. L'envoyer sur
 * la page dediee plutot que sur la page generique transmet cet historique la ou
 * il est pertinent, au lieu de le diluer.
 */
const EVENT_DESTINATIONS: Record<string, string> = {
  eventAudiovisuel: "/evenementiel",
  eventEvent: "/evenementiel",
  eventMode: "/mode",
};

/**
 * URL canonique du site, resolue AU BUILD.
 *
 * Pourquoi ici et pas seulement dans `src/data/site.ts` : le champ `env` de
 * Next inline la valeur dans le bundle serveur ET client, donc une seule
 * verite partout. Et surtout, ca evite de dependre d'une variable a poser a
 * la main sur le serveur — oubli qui avait fait declarer a la preprod des
 * canonicals pointant vers la production.
 *
 * Ordre de priorite :
 *   1. `NEXT_PUBLIC_SITE_URL` si elle est explicitement definie ;
 *   2. sinon, deduite de `APP_ENV`, que le workflow de deploiement ecrit
 *      systematiquement dans le `.env` avant le build (`prod` ou `dev`) ;
 *   3. sinon, la production — le cas d'un build local sans configuration.
 *
 * `NEXT_PUBLIC_SITE_URL` reste donc la porte de sortie si un domaine change.
 */
const SITE_URLS: Record<string, string> = {
  prod: "https://h24transports.com",
  dev: "https://develop.h24transports.com",
};

const RESOLVED_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  SITE_URLS[process.env.APP_ENV ?? ""] ||
  SITE_URLS.prod;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Inline la valeur resolue ci-dessus dans les bundles serveur et client.
  env: { NEXT_PUBLIC_SITE_URL: RESOLVED_SITE_URL },
  /**
   * Sortie autonome : Next produit dans `.next/standalone` un serveur Node
   * avec uniquement les dépendances réellement utilisées, et son propre
   * `server.js`. L'image Docker n'a donc pas besoin d'embarquer `node_modules`
   * en entier — c'est ce qui rend le conteneur de production léger.
   * Requis par `docker/images/nginx/Dockerfile`.
   */
  output: "standalone",
  // Le lint tourne via `npm run lint` (et en CI) — on ne bloque pas le build dessus.
  eslint: { ignoreDuringBuilds: true },
  // Formats modernes pour les images servies via next/image.
  images: { formats: ["image/avif", "image/webp"] },

  async redirects() {
    return [
      /* ---------- 1. Ancien site Angular ---------- */

      // Accueil : la racine de l'Angular redirigeait déjà vers /prehome.
      { source: "/prehome", destination: "/", statusCode: 301 },
      { source: "/home", destination: "/", statusCode: 301 },

      // Univers événementiel — audiovisuel et événement fusionnent sur
      // /evenementiel ; la mode a désormais sa propre page.
      ...Object.entries(EVENT_DESTINATIONS).map(([theme, destination]) => ({
        source: `/home/event/${theme}`,
        destination,
        statusCode: 301,
      })),
      { source: "/home/event/:child*", destination: "/evenementiel", statusCode: 301 },

      { source: "/home/express", destination: "/express", statusCode: 301 },
      // « Exploitation » désignait l'outil web/mobile, devenu la page Application.
      { source: "/home/exploitation", destination: "/application", statusCode: 301 },
      // Fourre-tout : tout autre thème NgRx non listé retombe sur l'accueil.
      { source: "/home/:theme*", destination: "/", statusCode: 301 },

      // /delay = carte des zones et délais France/International.
      // Son équivalent est la section « Délais d'intervention » de l'accueil.
      { source: "/delay", destination: "/#zones", statusCode: 301 },

      { source: "/aboutUs", destination: "/a-propos", statusCode: 301 },
      { source: "/legals", destination: "/mentions-legales", statusCode: 301 },

      /* ---------- 2. Ancien WordPress (2020) ---------- */

      // Société.
      { source: "/index.php/a-propos", destination: "/a-propos", statusCode: 301 },
      {
        source: "/index.php/a-propos-h24transports-express-evenementiel",
        destination: "/a-propos",
        statusCode: 301,
      },
      { source: "/index.php/clients", destination: "/a-propos", statusCode: 301 },

      // Services.
      {
        source: "/index.php/transport-service-evenementiel",
        destination: "/evenementiel",
        statusCode: 301,
      },
      {
        source: "/index.php/transport-service-prod-event",
        destination: "/evenementiel",
        statusCode: 301,
      },
      { source: "/index.php/coursier-express", destination: "/express", statusCode: 301 },
      // Tournées / navettes = livraisons planifiées et récurrentes → page Colis.
      { source: "/index.php/tournees-navettes", destination: "/colis", statusCode: 301 },
      { source: "/index.php/services-2", destination: "/#universes", statusCode: 301 },
      { source: "/index.php/vehicules", destination: "/#fleet", statusCode: 301 },

      // Devis et contact — toutes les variantes convergent vers /contact.
      { source: "/index.php/contact", destination: "/contact", statusCode: 301 },
      {
        source: "/index.php/formulaire-contact-h24transports",
        destination: "/contact",
        statusCode: 301,
      },
      { source: "/index.php/demande-de-devis-2", destination: "/contact", statusCode: 301 },
      {
        source: "/index.php/demande-de-devis-coursier-express",
        destination: "/contact",
        statusCode: 301,
      },
      {
        source: "/index.php/demande-de-devis-tournees-navettes",
        destination: "/contact",
        statusCode: 301,
      },
      {
        source: "/index.php/demande-de-devis-transport-evenementiel",
        destination: "/contact",
        statusCode: 301,
      },

      // Légal.
      {
        source: "/index.php/mentions-legales",
        destination: "/mentions-legales",
        statusCode: 301,
      },
      // Les anciennes URLs CGV pointent vers /cgv, qui existe et explique que
      // le document n'est pas encore publié (page `noindex`, hors sitemap,
      // cf. src/app/cgv/page.tsx). Rediriger vers /mentions-legales serait
      // trompeur : c'est un autre document. Rien à changer ici une fois le
      // texte fourni — il suffira de rendre /cgv indexable.
      { source: "/index.php/cgv", destination: "/cgv", statusCode: 301 },

      // Contenus WordPress résiduels (témoignages, archives de posts).
      { source: "/em_testimonial/:path*", destination: "/", statusCode: 301 },
      { source: "/archives/:path*", destination: "/", statusCode: 301 },

      // Fourre-tout WordPress : toute autre URL en /index.php/... vers l'accueil.
      { source: "/index.php/:path*", destination: "/", statusCode: 301 },

      // Anciens chemins de sitemap WordPress/Yoast : Google peut continuer a les
      // interroger longtemps apres la migration. Sans ca, il collecte des 404
      // sur un sitemap qu'il croit toujours declare.
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", statusCode: 301 },
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", statusCode: 301 },

      /* ---------- 3. Site statique 2018 ---------- */
      { source: "/index.html", destination: "/", statusCode: 301 },
    ];
  },

  // En-têtes de sécurité de base (complètent le reverse proxy).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
