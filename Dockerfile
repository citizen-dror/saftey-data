# Use Node.js runtime as the base image for building the application
FROM node:22 AS build

# Set working directory for the build stage
WORKDIR /app

# Copy package.json, package-lock.json, and tsconfig.json
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files (including TypeScript files)
COPY . .

# Compile the TypeScript code (this will output to /dist)
RUN npm run build

# Use a smaller image to run the app (production stage)
FROM node:22-slim

# Set the working directory for the production container
WORKDIR /app

# Copy compiled JavaScript files from the build stage
COPY --from=build /app/dist /app/dist

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Expose the port the app will run on
EXPOSE 5000

# Start the application
CMD ["node", "dist/server.js"]
