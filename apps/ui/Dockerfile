FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/ui .
ENV PORT=3300
EXPOSE ${PORT}
RUN npm install --omit=dev --legacy-peer-deps
CMD node ./main.js
