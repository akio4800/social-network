# Builder-Stage mit Alpine-Node.js-Image
FROM node:lts-alpine AS builder
WORKDIR /app

# Installiere systemweite Abhängigkeiten
RUN apk add --no-cache python3 make g++

# Kopiere die package.json und package-lock.json vom Build-Kontext (Root-Verzeichnis)
COPY package.json package-lock.json ./

# Installiere alle Abhängigkeiten
RUN npm install

# Kopiere den gesamten Code vom Build-Kontext (Root-Verzeichnis)
COPY . .

# Baue die Anwendung mit Nx
RUN npx nx run ui:build --configuration=production

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/apps/ui ./
RUN sed -i '10i \\ttry_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]