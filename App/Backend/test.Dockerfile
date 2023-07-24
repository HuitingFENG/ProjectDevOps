FROM node:14-alpine as build

WORKDIR /app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait
# Install app dependencies
COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . /app

CMD /wait && npm test

