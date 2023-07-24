FROM node:14-alpine

RUN apk add --no-cache chromium nss chromium-chromedriver

WORKDIR /app/Frontend

# Copy package.json and package-lock.json
COPY Frontend/package.json .
COPY Frontend/package-lock.json .

RUN npm ci

# Copy all sources
COPY ./Frontend /app/Frontend/

RUN npm link

CMD npm run test:headless
