FROM node:14-alpine as build

WORKDIR /app

# Install app dependencies
COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . /app

CMD npm start

