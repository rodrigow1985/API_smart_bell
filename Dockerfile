FROM node:16

RUN npm install -g nodemon

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . /home/node/app/

EXPOSE 4001

CMD ./start.sh
