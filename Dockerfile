#FROM reportportal/service-api
FROM node:current-alpine

COPY . /API-TESTING

WORKDIR /API-TESTING
RUN docker-compose -p reportportal up -d --force-recreate
RUN npm install
RUN npm run test