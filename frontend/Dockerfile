FROM node:16 AS build

WORKDIR /react

RUN rm -rf /react/*

RUN echo "removed"
RUN ls

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

# EXPOSE 5173

# CMD [ "npm" , "run", "dev" ]
# CMD [ "npm", "start" ]
# CMD [ "npm", "run", "build" ]
RUN npm run build

RUN ls

FROM node:18-alpine

WORKDIR /react_build

# 내부의 모든내용 삭제
RUN rm -rf /react_build/*

COPY --from=build /react_build /react/dist

RUN ls
RUN pwd
