FROM node:10

WORKDIR /app

ADD . /app

RUN npm install bootstrap@4.3.1
RUN npm install react-native-network-info@5.2.1
RUN npm install  rollup-plugin-typescript2@0.25.2
RUN npm install

CMD node backend/myapi.js