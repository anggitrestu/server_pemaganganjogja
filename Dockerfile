FROM node:14.15.0
RUN npm install yarn

RUN mkdir /app
ADD . /app
WORKDIR /app

COPY  package.json . /app/
RUN yarn
RUN yarn remove bcrypt
COPY . . /app/
# COPY package.json .
# RUN yarn
# RUN yarn remove bcrypt 

# COPY . . /app/
# RUN yarn add bcrypt 


CMD [ "yarn", "start" ]