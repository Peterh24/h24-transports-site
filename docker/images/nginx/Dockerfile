# Image de production du site vitrine H24 Transports (Next.js 15).
#
# Le chemin `docker/images/nginx/` est conservé tel quel : c'est celui que
# référence `.github/workflows/deploy.yml` (`dockerfile_path`). Le nom « nginx »
# est un héritage — l'image précédente servait déjà du Node, pas du nginx.
# Le renommer imposerait de modifier le workflow sans rien apporter.
#
# Contrat avec le reste de la chaîne, à ne pas casser :
# - `docker/docker-compose.prod.yml` impose `PORT=8080` et Traefik route vers
#   ce port (`loadbalancer.server.port=8080`).
# - Le workflow génère un `.env` à la racine AVANT le build : Next le lit pour
#   inliner les variables `NEXT_PUBLIC_*` (dont `NEXT_PUBLIC_SITE_URL`).
# - `output: "standalone"` doit rester activé dans `next.config.ts`.

# ---------- 1. Dépendances ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# `npm ci` installe aussi les dépendances optionnelles, dont `sharp`
# (binaires musl), requis par next/image pour l'optimisation en production.
RUN npm ci && npm cache clean --force

# ---------- 2. Build ----------
FROM node:20-alpine AS build
ARG APP_ENV=prod
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- 3. Production ----------
FROM node:20-alpine AS production
ARG APP_ENV=prod
LABEL build.environment=$APP_ENV
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Aligné sur docker-compose.prod.yml ; HOSTNAME=0.0.0.0 est indispensable pour
# que le serveur écoute en dehors du conteneur.
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# La sortie standalone embarque son propre `server.js` et le sous-ensemble de
# node_modules réellement utilisé. `static/` et `public/` ne sont pas inclus
# par Next dans le bundle : ils doivent être copiés explicitement.
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 8080

CMD ["node", "server.js"]
