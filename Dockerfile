FROM node:10-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . ./
RUN yarn run build && yarn cache clean

EXPOSE 9000
CMD [ "yarn", "run", "server" ]
