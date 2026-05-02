# Stage 1: Build the frontend
FROM node:20-slim AS build-stage
WORKDIR /app

# Copy ONLY package.json (skip package-lock.json to avoid Windows/Linux conflicts)
COPY package.json ./

# Install dependencies for Linux specifically
RUN npm install --include=optional --legacy-peer-deps

COPY . .
# Build the app
RUN npx vite build

# Stage 2: Run the server
FROM node:20-slim
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --legacy-peer-deps
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/server ./server

EXPOSE 3001
ENV PORT=3001

CMD ["node", "server/server.js"]
