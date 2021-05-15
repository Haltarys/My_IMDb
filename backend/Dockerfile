FROM node:14.17.0-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn

COPY . .

CMD [ "npm", "run", "start:dev" ]
