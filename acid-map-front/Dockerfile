FROM node:latest

# Create app directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install

ADD src /usr/src/app/src
ADD public /usr/src/app/public
ADD .env.production.local /usr/src/app

RUN npm run build

EXPOSE 5000

RUN npm install -g serve

CMD [ "serve", "-s", "build" ]