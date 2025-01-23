FROM node:22-alpine

# Accept NODE_ENV as a build argument
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Set memory and environment variables
ENV NODE_OPTIONS=--max_old_space_size=4096

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies based on NODE_ENV
RUN if [ "$NODE_ENV" = "production" ]; then \
    npm ci --only=production; \
    else \
    npm install; \
    fi

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]