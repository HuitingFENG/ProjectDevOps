FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install

CMD ["npm", "start"]

