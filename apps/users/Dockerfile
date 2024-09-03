FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/users .
COPY apps/users/prisma ./prisma/
ENV PORT=3000
EXPOSE ${PORT}
RUN npm install --omit=dev --legacy-peer-deps
RUN npx prisma generate
CMD node ./main.js
