FROM node:22-alpine

# Accept NODE_ENV as a build argument
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Set memory and environment variables
ENV NODE_OPTIONS=--max_old_space_size=4096

WORKDIR /app

# Install global dependencies and tools
RUN apk add --no-cache git

# Copy package files first for better caching
COPY package*.json ./

# Clear npm cache and install dependencies
RUN npm cache clean --force && \
    npm install -g npm@latest && \
    npm ci --verbose

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]