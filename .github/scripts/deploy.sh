#!/bin/bash
# Script pour configurer et déployer l'application H24 Transports app sur le serveur

# Récupérer les variables d'environnement
ENV="$1"
COMMIT_HASH="$2"
DOCKER_REGISTRY="$3"
DOCKER_REPO="$4"
REPO_NAME="$5"

# Définir les variables selon l'environnement
DOCKER_COMPOSE_FILE="docker-compose.${ENV}.yml"
ENV_FILE=".env.${ENV}"
CONTAINER_NAME=$([ "$ENV" == "prod" ] && echo "h24app_web" || echo "h24app_dev_web")
APP_PATH=$([ "$ENV" == "prod" ] && echo "/home/ubuntu/workspace/h24-transports-app" || echo "/home/ubuntu/workspace/h24-transports-app-dev")

echo "Déploiement en environnement: $ENV avec le fichier $DOCKER_COMPOSE_FILE dans $APP_PATH"

# Arrêter et supprimer l'ancien conteneur si il existe
if docker ps -q -f name=$CONTAINER_NAME | grep -q .; then
echo "Arrêt du conteneur existant: $CONTAINER_NAME"
cd $APP_PATH 2>/dev/null || true
PROJECT_NAME="h24app-${ENV}"
docker compose -p $PROJECT_NAME -f docker/$DOCKER_COMPOSE_FILE down 2>/dev/null || true
fi

echo "Suppression de l'ancien répertoire de déploiement"
rm -rf $APP_PATH

# Créer les répertoires nécessaires s'ils n'existent pas
mkdir -p $APP_PATH/docker

# Copier les fichiers Docker depuis le répertoire temporaire
echo "Copie des fichiers Docker depuis le répertoire temporaire..."
cp -a /tmp/deploy-files/. $APP_PATH

# Générer le fichier docker/.env avec l'image Docker mise à jour uniquement
# Les variables d'environnement Docker ne contiennent que l'image à utiliser
echo "DOCKER_H24APP_IMAGE=\"$DOCKER_REGISTRY/$DOCKER_REPO:$REPO_NAME-$ENV-$COMMIT_HASH\"" > $APP_PATH/docker/.env

# Déployer avec docker-compose
cd $APP_PATH
# Définir un nom de projet basé sur l'environnement pour différencier les containers
PROJECT_NAME="h24app-${ENV}"
docker compose -p $PROJECT_NAME -f docker/$DOCKER_COMPOSE_FILE pull $CONTAINER_NAME
docker compose -p $PROJECT_NAME -f docker/$DOCKER_COMPOSE_FILE up -d

# Attendre quelques secondes que les conteneurs soient pleinement opérationnels
echo "Attente de 10 secondes pour que les conteneurs démarrent complètement..."
sleep 10

# Vérifier que le conteneur fonctionne correctement
if docker ps -q -f name=$CONTAINER_NAME | grep -q .; then
echo "Conteneur $CONTAINER_NAME démarré avec succès"

# Afficher les logs pour vérification
echo "Derniers logs du conteneur:"
docker logs --tail 20 $CONTAINER_NAME
else
echo "ERREUR: Le conteneur $CONTAINER_NAME n'a pas démarré correctement"
echo "Logs d'erreur:"
docker compose -p $PROJECT_NAME -f docker/$DOCKER_COMPOSE_FILE logs
exit 1
fi

# Nettoyer les images Docker inutilisées pour économiser de l'espace disque
docker image prune -a -f

# Sauvegarder le hash de la version déployée
echo "$COMMIT_HASH" > $APP_PATH/DEPLOYED_VERSION_$ENV

# Supprimer le répertoire temporaire
rm -rf /tmp/deploy-files

echo "Déploiement terminé avec succès pour l'environnement $ENV"
