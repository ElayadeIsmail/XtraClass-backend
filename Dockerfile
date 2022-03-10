FROM node:16.13.2-alpine


RUN apk add --no-cache --upgrade bash

RUN addgroup app && adduser -S -G app app
USER app


WORKDIR /app


COPY package.json ./
COPY prisma ./prisma/

RUN yarn install --network-timeout 1000000
COPY ./ ./

USER root

RUN chmod +x /app/docker-entrypoint.sh

USER app

EXPOSE 5000

