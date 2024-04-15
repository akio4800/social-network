FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/users .
COPY apps/users/prisma ./prisma/
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --production
# dependencies that nestjs needs
RUN npx prisma generate
CMD node ./main.js
