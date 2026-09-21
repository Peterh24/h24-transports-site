#!/bin/bash
# Script pour configurer et déployer l'application h24 Transports app sur le serveur

# Récupérer les variables d'environnement
ENV="$1"
COMMIT_HASH="$2"
DOCKER_REGISTRY="$3"
DOCKER_REPO="$4"
REPO_NAME="$5"

# --- Serialisation des deploiements ---------------------------------------
# Le serveur est partage par les trois projets, et plusieurs ressources le sont
# aussi entre deux deploiements simultanes :
#   - /tmp/deploy.sh et /tmp/deploy-files, ecrases par le run suivant ;
#   - `docker image prune -a -f`, qui porte sur tout le daemon Docker et
#     supprime l'image qu'un autre run vient de tirer mais pas encore demarree ;
#   - /tmp/backup_script.sh, partage par les deux environnements de l'API.
# Les chemins par depot (juste en dessous) reglent les deux premiers points,
# pas les deux autres. Seul un verrou les regle tous : un deploiement a la fois
# sur ce serveur, quel que soit le depot et quel que soit l'environnement.
#
# Constate trois fois : 2026-09-10 (API + dashboard), 2026-09-16 (develop puis
# main du MEME depot a 11 s d'intervalle), 2026-09-21 (API + dashboard a 7 s,
# le run API a execute le deploy.sh du dashboard).
#
# -w 420 : au-dela on echoue plutot que d'attendre sans fin. La valeur tient
# sous le command_timeout de appleboy/ssh-action, attente et deploiement
# compris. Le verrou est relache a la sortie du script, quelle qu'en soit la
# cause : le descripteur 9 est ferme par le shell.
LOCK_FILE="/tmp/h24-deploy.lock"
exec 9>"$LOCK_FILE"
if command -v flock >/dev/null 2>&1; then
    echo "Attente du verrou de deploiement ($LOCK_FILE)..."
    if ! flock -w 420 9; then
        echo "ERREUR: verrou non obtenu apres 7 minutes, un autre deploiement est en cours ou bloque."
        exit 1
    fi
    echo "Verrou obtenu, ce deploiement est seul sur le serveur."
else
    echo "AVERTISSEMENT: flock introuvable, les deploiements ne sont pas serialises."
fi

# --- Repertoire de transfert, propre a ce depot ----------------------------
# Le workflow depose desormais dans /tmp/deploy-<depot>/. Le repli sur l'ancien
# /tmp/deploy-files garde ce script compatible avec le workflow non encore mis
# a jour : sans lui, ce correctif casserait le deploiement charge de le mettre
# en place.
DEPLOY_FILES="/tmp/deploy-${REPO_NAME}/deploy-files"
if [ ! -d "$DEPLOY_FILES" ]; then
    DEPLOY_FILES="/tmp/deploy-files"
fi
echo "Fichiers de deploiement lus depuis $DEPLOY_FILES"

# Définir les variables selon l'environnement
DOCKER_COMPOSE_FILE="docker-compose.${ENV}.yml"
ENV_FILE=".env.${ENV}"
CONTAINER_NAME=$([ "$ENV" == "prod" ] && echo "h24_appserver" || echo "h24_dev_appserver")
APP_PATH=$([ "$ENV" == "prod" ] && echo "/home/ubuntu/workspace/h24-transports-site" || echo "/home/ubuntu/workspace/h24-transports-site-dev")

echo "Déploiement en environnement: $ENV avec le fichier $DOCKER_COMPOSE_FILE dans $APP_PATH"

# Arrêter et supprimer l'ancien conteneur si il existe
if docker ps -q -f name=$CONTAINER_NAME | grep -q .; then
echo "Arrêt du conteneur existant: $CONTAINER_NAME"
cd $APP_PATH 2>/dev/null || true
PROJECT_NAME="h24-${ENV}"
docker compose -p $PROJECT_NAME -f docker/$DOCKER_COMPOSE_FILE down 2>/dev/null || true
fi

echo "Suppression de l'ancien répertoire de déploiement"
rm -rf $APP_PATH

# Créer les répertoires nécessaires s'ils n'existent pas
mkdir -p $APP_PATH/docker

# Copier les fichiers Docker depuis le répertoire temporaire
echo "Copie des fichiers Docker depuis le répertoire temporaire..."
cp -a "$DEPLOY_FILES"/. "$APP_PATH"

# Générer le fichier docker/.env avec l'image Docker mise à jour uniquement
# Les variables d'environnement Docker ne contiennent que l'image à utiliser
echo "DOCKER_H24APP_IMAGE=\"$DOCKER_REGISTRY/$DOCKER_REPO:$REPO_NAME-$ENV-$COMMIT_HASH\"" > $APP_PATH/docker/.env

# Déployer avec docker-compose
cd $APP_PATH
# Définir un nom de projet basé sur l'environnement pour différencier les containers
PROJECT_NAME="h24-${ENV}"
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
rm -rf "$DEPLOY_FILES"

echo "Déploiement terminé avec succès pour l'environnement $ENV"
