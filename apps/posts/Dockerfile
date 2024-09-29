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
RUN npx nx run posts:build --configuration=production

# Prisma Client generieren
RUN npx prisma generate --schema=apps/posts/prisma/schema.prisma

# Final-Stage mit schlankem Node-Image
FROM node:lts-alpine
WORKDIR /app

# Kopiere den gebauten Code und Prisma-Dateien aus dem Builder-Stage
COPY --from=builder /app/dist/apps/posts ./dist/apps/posts
COPY --from=builder /app/apps/posts/prisma ./prisma/

# Kopiere node_modules aus dem Builder-Stage
COPY --from=builder /app/node_modules ./node_modules

# Setze Umgebungsvariablen und öffne Ports
ENV PORT=3002
EXPOSE 3002

# Starte die Node.js-Anwendung mit dem korrekten Pfad
CMD ["node", "dist/apps/posts/main.js"]