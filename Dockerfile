# specify the node base image with your desired version
FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
#install nodemon globally in your container
RUN npm install -g nodemon
COPY . .
EXPOSE 3000
CMD [ "nodemon", "-L", "./bin/www" ]
