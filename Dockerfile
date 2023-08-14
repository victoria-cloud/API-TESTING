#FROM reportportal/service-api
FROM node:current-alpine

COPY . /API-TESTING

WORKDIR /API-TESTING
RUN  
RUN npm install
RUN npm run test