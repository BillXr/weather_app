FROM node:16.17.1-alpine

WORKDIR /app

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

COPY package*.json ./

RUN npm install

ADD app.js ./

EXPOSE 3000

CMD [ "node","app.js" ]
