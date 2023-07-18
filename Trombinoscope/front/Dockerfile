FROM node:current-alpine3.15

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install

CMD ["npm", "start"]