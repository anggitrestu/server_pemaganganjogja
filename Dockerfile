FROM node:14.15.0

WORKDIR ./
RUN npm install --global yarn 
COPY package.json .
RUN yarn
RUN yarn remove bcrypt 
RUN yarn remove nodemon 
COPY . .
RUN yarn add bcrypt 
RUN npm install --global yarn 
RUN yarn add nodemon 

CMD [ "yarn", "start" ]