FROM node:current-alpine

COPY . /API-TESTING

WORKDIR /API-TESTING

RUN install docker-compose
RUN docker-compose -p reportportal up -d --force-recreate
RUN npm install
RUN npm run test




