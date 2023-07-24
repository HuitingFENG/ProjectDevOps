############################################################
#                          BUILD                           #
############################################################
FROM node:14-alpine as build

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY angular.json .
COPY tsconfig.json .
COPY tsconfig.app.json .
COPY .browserslistrc .
COPY src ./src


RUN npm run build:prod

############################################################
#                          RUN                             #
############################################################
FROM nginx:1.21-alpine

# Copy nginx conf
COPY default.nginx /etc/nginx/conf.d/default.conf

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /usr/src/app/dist/ProgWebProjetM1 /usr/share/nginx/html


RUN touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid && \
  chown -R nginx:nginx /var/cache/nginx

USER 101
