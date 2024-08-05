FROM node:16-alpine

WORKDIR /src

COPY package.json .

RUN npm install -g npm@10.8.2
RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm" , "run", "dev" ]
# CMD [ "npm", "start" ]