FROM node:22-alpine

# Accept NODE_ENV as a build argument
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Set memory and environment variables
ENV NODE_OPTIONS=--max_old_space_size=4096

WORKDIR /app

# Install global dependencies
RUN npm install -g npm@latest

# Copy package files first for better caching
COPY package*.json ./

# Install all dependencies, including dev dependencies for building
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]