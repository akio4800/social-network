FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/posts .
COPY apps/posts/prisma ./prisma/
ENV PORT=3400
EXPOSE ${PORT}
RUN npm install --omit=dev --legacy-peer-deps
RUN npx prisma generate
CMD node ./main.js
