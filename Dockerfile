# Use Node.js base image
FROM node:18-alpine as build

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

COPY . .

RUN npm run build

#prod stage 
FROM node:18-alpine

WORKDIR /usr/src/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
# Copy application source code
COPY --from=build /usr/src/app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

RUN rm package*.json

# Expose port 3000 (or whatever port your NestJS application listens to)
EXPOSE 3000

# Command to run the application
CMD [ "node", "dist/main.js" ]
