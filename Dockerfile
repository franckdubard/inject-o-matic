# Stage 1: Base layer for dependencies
FROM oven/bun:latest AS base

ENV HUSKY=0
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb ./
COPY .husky/install.mjs ./.husky/install.mjs
RUN bun install --production

# Stage 2: Build layer for production
FROM base AS build

# Copy source code and configuration
COPY . .

# Build the TypeScript code (assumes output is in `dist`)
RUN bun run build

# Stage 3: Development layer
FROM base AS development

WORKDIR /app

# Copy all source files for live reloading
COPY . .

# Install development dependencies
RUN bun install

# Expose development port
EXPOSE 3000

# Run the application in development mode
CMD ["bun", "run", "dev"]

# Stage 4: Production layer
FROM oven/bun:latest AS production

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy only necessary files from build stage
COPY --from=build /app/dist ./dist
COPY --from=base /app/node_modules ./node_modules

# Expose production port
EXPOSE 3000

# Start the application in production mode
CMD ["bun", "run", "dist/index.js"]