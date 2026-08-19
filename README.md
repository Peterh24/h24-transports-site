# H24 Transports — site vitrine

> Le transport qui ne dort jamais. Transport audiovisuel, événementiel et urgent exclusif — Paris & Île-de-France, 24h/24, 7j/7 depuis 2014.

Refonte du design exporté depuis Claude (SPA React via Babel standalone) vers une stack de production moderne.

## Stack

| Couche | Choix | Pourquoi |
| --- | --- | --- |
| Framework | **Next.js 15** (App Router) | Vraies routes, SSG/RSC, SEO de premier ordre, déploiement simple |
| UI | **React 19** + **TypeScript** (strict) | Le design d'origine est en React → portage fidèle + sûreté de types |
| Style | **Tailwind CSS v4** (`@theme`) + design-system CSS | Tokens modernes, tout en conservant l'identité visuelle bespoke (animations, marquee 3D…) |
| Polices | `next/font` (Expressway en local + JetBrains Mono) | Auto-hébergées, zéro FOUT, optimisées |
| Formulaire | **Server Action** + `useActionState` (React 19) | Validation côté serveur, prêt à brancher sur un envoi réel |

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
```

Autres scripts :

```bash
npm run build      # build de production
npm run start      # sert le build
npm run lint       # ESLint (next/core-web-vitals + typescript)
npm run typecheck  # tsc --noEmit
```

## Structure

```
src/
├─ app/
│  ├─ layout.tsx              # polices, metadata SEO, Nav + Footer
│  ├─ globals.css             # design system (tokens, sections, marquee 3D…)
│  ├─ page.tsx                # accueil
│  ├─ evenementiel/           # univers 01 — audiovisuel & événementiel
│  ├─ express/                # univers 02 — urgent exclusif
│  ├─ application/            # univers 03 — application mobile
│  ├─ a-propos/
│  ├─ contact/                # page + Server Action (actions.ts)
│  ├─ mentions-legales/
│  ├─ sitemap.ts · robots.ts · icon.svg · not-found.tsx
├─ components/
│  ├─ layout/                 # Nav (client), Footer
│  ├─ sections/               # Hero, Universes, Fleet, Zones, Testimonials, Clients, Cta, PageHeader, Values, Process, ContactForm
│  └─ ui/                     # H24Logo, HeroGlow, Counter, Placeholder, RevealOnScroll
├─ data/                      # site, universes, vehicles, testimonials, clients (source unique de vérité)
├─ fonts/                     # Expressway *.woff2 (next/font/local)
└─ lib/fonts.ts
```

## Personnalisation

- **Contenu / coordonnées** : `src/data/*` (téléphone, email, navigation, univers, flotte, témoignages, clients).
- **Couleurs / thème** : tokens CSS dans `src/app/globals.css` (`:root` + `@theme`). Accent par défaut : `#F59239`.
- **Formulaire de contact** : brancher l'envoi réel dans `src/app/contact/actions.ts` (voir `.env.example`).
- **Visuels** : les `<Placeholder/>` (flotte, plateaux, écrans de l'app) sont à remplacer par les photos/vidéos définitives.

## Déploiement

Optimisé pour **Vercel** (`vercel`/import GitHub) ou tout hébergeur Node. Pensez à définir `NEXT_PUBLIC_SITE_URL`.
