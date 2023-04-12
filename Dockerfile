# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn install && yarn cache clean

# Bundle app source
COPY . .

# Expose the port that the application listens on
EXPOSE 3000

# Start the server using the production build
CMD [ "yarn", "start" ]
