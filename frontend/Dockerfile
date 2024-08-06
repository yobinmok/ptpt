FROM node:16

WORKDIR /src

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

CMD [ "npm", "run", "build" ]


EXPOSE 5173

# CMD [ "npm" , "run", "dev" ]
# CMD [ "npm", "start" ]