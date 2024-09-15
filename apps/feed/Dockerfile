FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/feed .
COPY apps/feed/prisma ./prisma/
ENV PORT=3500
EXPOSE ${PORT}
RUN npm install --omit=dev --legacy-peer-deps
RUN npx prisma generate
CMD node ./main.js
