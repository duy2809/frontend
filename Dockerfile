# build stage
FROM node:18-alpine as build-stage

# Create app directory
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy the rest of the application code to the container
COPY . .

# Creates a "build" folder with the production build
RUN yarn build

# production stage
FROM nginx:alpine as production-stage

COPY --from=build-stage /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
