# Use the official Node.js 14 image as the base image
FROM node:21

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the source code to the working directory
COPY ./dist/ ./dist/

# Expose the port that your Express API will listen on
EXPOSE 8080

# Start the Express API
CMD ["npm", "start"]