FROM node:16

WORKDIR /src

COPY package.json .


# RUN apk update
# RUN apk add bash
# RUN apk add curl
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
# # RUN source ~/.bashrc
# ENV NVM_DIR /root/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
# RUN source ~/.bashrc
RUN source ~/.nvm/nvm.s
RUN nvm intall 16.16.0
RUN nvm use 16.16.0
RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm" , "run", "dev" ]
# CMD [ "npm", "start" ]