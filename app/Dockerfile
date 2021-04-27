FROM node:lts-alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
RUN npm i -DE chai
RUN npm i -g mocha
RUN npm i -g sequelize-cli
RUN npm i -g nodemon
COPY package.json .
RUN npm install
RUN echo $NODE_PATH∫
EXPOSE 8080
COPY . .
RUN chmod 777 /home/node/app/entrypoint.sh
ENTRYPOINT ["/home/node/app/entrypoint.sh"]
