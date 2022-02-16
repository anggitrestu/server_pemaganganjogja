FROM node:14.15.0

WORKDIR ./
COPY package.json .
RUN yarn
RUN yarn remove bcrypt 
COPY . .
RUN yarn add bcrypt 

CMD [ "yarn", "start" ]