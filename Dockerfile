#<<<<<<< HEAD
# pull official base image
FROM node:18-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]
#========
# FROM node:18-alpine
# WORKDIR /home/node/app
# COPY . .
# RUN npm install
# EXPOSE 3000
# CMD ["npm", "start"]
#>>>>>>> 2a2f40969f651df169cdf6b37b09883fc0bb85c0

