ARG NODE_VERSION=18

FROM node:${NODE_VERSION}

ENV NODE_ENV=production


WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "src/main.js" ]