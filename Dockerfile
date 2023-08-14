FROM node:current-alpine
FROM reportportal/service-api

COPY . /API-TESTING

WORKDIR /API-TESTING
#RUN docker-compose -p reportportal up -d --force-recreate
RUN npm install
RUN npm run test