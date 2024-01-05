# Use the latest Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the application source code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 6789

# Command to start the application
CMD [ "node", "marketIndex.js" ]
