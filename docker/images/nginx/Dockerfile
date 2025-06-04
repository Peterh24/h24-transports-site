# Utilise l'image officielle Node.js comme base
FROM node:20-alpine AS build

# Argument pour définir l'environnement de build (dev ou prod)
ARG APP_ENV=prod

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installe les dépendances (toutes les dépendances pour le build)
RUN npm ci && npm cache clean --force

# Copie le code source
COPY . .

# Build l'application selon l'environnement
RUN if [ "$APP_ENV" = "dev" ] ; then npm run build:dev ; else npm run build:prod ; fi

# Étape de production
FROM node:20-alpine AS production

# Récupère l'argument BUILD_ENV de l'étape précédente
ARG BUILD_ENV=prod

# Ajoute des labels pour identifier l'environnement
LABEL build.environment=$BUILD_ENV

# Définit le répertoire de travail
WORKDIR /app

# Copie seulement les fichiers nécessaires pour la production
COPY package*.json ./
COPY server.js ./

# Installe seulement les dépendances de production
RUN npm ci --only=production && npm cache clean --force

# Copie les fichiers buildés depuis l'étape de build
COPY --from=build /app/dist ./dist

# Expose le port 8080
EXPOSE 8080

# Crée un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change le propriétaire des fichiers
RUN chown -R nextjs:nodejs /app
USER nextjs

# Commande pour démarrer l'application
CMD ["npm", "start"]
