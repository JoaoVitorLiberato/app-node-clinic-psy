FROM node:18-alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

ENV DOCKERIZE_VERSION v0.9.2

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

ENV NODE_ENV=development

EXPOSE 3000

CMD [ "npm", "run", "serve" ]
