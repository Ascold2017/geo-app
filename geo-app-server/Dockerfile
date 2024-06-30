FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci
COPY ./app ./app
COPY ./.env ./.env
COPY ./tsconfig.json ./tsconfig.json

CMD ["npm","start"]