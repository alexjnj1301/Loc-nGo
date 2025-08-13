# syntax=docker/dockerfile:1.6

# Étape 1 : build Angular sur l'archi de ta machine (BUILDPLATFORM, ARM sur ton Mac)
FROM --platform=$BUILDPLATFORM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# adapte le nom d'appli si besoin ; ici on sort dans dist/app
RUN npm run build -- --configuration production --output-path=dist/app

# Étape 2 : image finale NGINX pour la plateforme cible (amd64 pour ECS)
FROM --platform=$TARGETPLATFORM nginx:alpine
# Si tu utilises l'ALB pour router /api → backend, prends la conf "minimal" ci-dessous
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/app/ /usr/share/nginx/html/
EXPOSE 80
