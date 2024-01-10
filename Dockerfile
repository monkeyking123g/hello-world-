# Use Node.js base image
FROM node:16-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install --production

# Copy application source code
COPY . .

# Expose port 3000 (or whatever port your NestJS application listens to)
EXPOSE 3000

# Command to run the application
CMD [ "npm", "run", "start:prod" ]
