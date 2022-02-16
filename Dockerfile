FROM node:14.15.0
RUN npm install --global yarn

WORKDIR ./
COPY package.json .
RUN yarn
RUN yarn remove bcrypt 

COPY . .
RUN yarn add bcrypt 


CMD [ "yarn", "start" ]