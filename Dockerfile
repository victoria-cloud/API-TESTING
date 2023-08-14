FROM node:current-alpine

COPY . /API-TESTING

WORKDIR /API-TESTING
RUN docker-compose.yml -p reportportal up -d --force-recreate
RUN npm install
RUN npm run test