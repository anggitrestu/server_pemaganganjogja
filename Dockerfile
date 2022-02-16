FROM node:14.15.0

WORKDIR ./
COPY package.json .
RUN yarn
RUN yarn remove bcrypt 
RUN yarn remove nodemon 
COPY . .
RUN yarn add bcrypt 
RUN yarn add nodemon 

CMD [ "yarn", "start" ]