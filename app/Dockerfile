FROM node:alpine
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
RUN npm init -y
COPY package.json .
RUN npm install
COPY . .
RUN npm i -g sequelize-cli
RUN npm i -g nodemon
EXPOSE 8080
ENTRYPOINT ["/home/node/app/entrypoint.sh"]
CMD ["nodemon", "app.js"]
