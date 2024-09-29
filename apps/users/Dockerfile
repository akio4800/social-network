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
RUN npx nx run users:build --configuration=production

# Prisma Client generieren
RUN npx prisma generate --schema=apps/users/prisma/schema.prisma

# Final-Stage mit schlankem Node-Image
FROM node:lts-alpine
WORKDIR /app

# Kopiere den gebauten Code und Prisma-Dateien aus dem Builder-Stage
COPY --from=builder /app/dist/apps/users ./dist/apps/users
COPY --from=builder /app/apps/users/prisma ./prisma/

# Kopiere node_modules aus dem Builder-Stage
COPY --from=builder /app/node_modules ./node_modules

# Setze Umgebungsvariablen und öffne Ports
ENV PORT=3001
EXPOSE 3001

# Starte die Node.js-Anwendung mit dem korrekten Pfad
CMD ["node", "dist/apps/users/main.js"]