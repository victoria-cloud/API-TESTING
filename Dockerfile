FROM node:current-alpine

COPY . /API-TESTING

WORKDIR /API-TESTING
RUN npm install
RUN npm run test




