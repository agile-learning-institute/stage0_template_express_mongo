# Build stage
FROM node:16 AS build

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Build server deployment 
COPY . .
RUN npm run build

# Record build time
RUN DATE=$(date "+%Y-%m-%d:%H:%M:%S") && \
    echo $DATE > dist/BUILT_AT

# Final Stage
FROM node:16 AS run

# Copy built assets from build stage 
RUN mkdir -p /opt/app && chown node:node /opt/app
WORKDIR /opt/app

COPY --from=build /app/dist /opt/app
COPY --from=build /app/node_modules /opt/app/node_modules

# Use non-root user
USER node

# Run the processor
CMD ["node", "server.js"]