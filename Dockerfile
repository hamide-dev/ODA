FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation complète de toutes les dépendances (dev + prod)
RUN npm ci

# Copie du reste du code source
COPY . .

# Build du projet TypeScript -> dist/
RUN npm run build

# --- Stage 2: Production ---
FROM node:20-alpine AS production

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

# Installation UNIQUEMENT des dépendances de production
RUN npm ci --only=production

# Copie du code compilé depuis le stage builder
COPY --from=builder /usr/src/app/dist ./dist

# Port d'écoute de l'application NestJS
EXPOSE 3000

# Commande de démarrage
CMD ["node", "dist/main"]