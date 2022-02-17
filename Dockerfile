FROM alpine:3.11
FROM node:14.15.0


RUN apk update && \
    apk add --no-cache docker-cli python3 && \
    apk add --no-cache --virtual .docker-compose-deps python3-dev libffi-dev openssl-dev gcc libc-dev make && \
    pip3 install --upgrade pip && \
    pip3 install docker-compose && \
    apk del .docker-compose-deps

COPY renew_certs.sh /etc/periodic/daily/renew_certs

RUN chmod +x /etc/periodic/daily/renew_certs

RUN npm install yarn


RUN mkdir /app
ADD . /app
WORKDIR /app

COPY  package.json . /app/
RUN yarn
RUN yarn remove bcrypt
COPY . . /app/
RUN yarn add bcrypt


CMD [ "yarn", "start" ]