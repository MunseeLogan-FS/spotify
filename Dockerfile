# Use an official Node.js LTS image
FROM node:22

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose the port your app runs on
EXPOSE 3001

# Start the app
CMD [ "npm", "run", "dev" ]
