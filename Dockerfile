FROM reportportal/service-api

COPY . /API-TESTING

WORKDIR /API-TESTING

RUN npm install
RUN npm run test