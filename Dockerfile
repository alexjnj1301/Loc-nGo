# --- Build Angular ---
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# dossier de sortie stable
RUN npm run build -- --configuration production --output-path=dist/app

# --- Serve with Nginx ---
FROM nginx:alpine
# conf SPA + proxy vers /api
COPY nginx.conf /etc/nginx/conf.d/default.conf
# fichiers statiques
COPY --from=build /app/dist/app/ /usr/share/nginx/html/
EXPOSE 80
