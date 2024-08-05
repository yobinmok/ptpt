FROM node:16-alpine

WORKDIR /src

COPY package.json .

RUN node -v
RUN nvm intall 16.16.0
RUN nvm use 16.16.0
RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm" , "run", "dev" ]
# CMD [ "npm", "start" ]