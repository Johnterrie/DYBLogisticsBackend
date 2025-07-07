# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on (update if different)
EXPOSE 5000

# Start the application
CMD ["node", "app.js"]
