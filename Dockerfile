FROM node:current-alpine

COPY . /API-TESTING

WORKDIR /API-TESTING
RUN mkdir -p /mochawesome-report
RUN npm install
RUN npm run test




