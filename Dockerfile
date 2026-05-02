# Stage 1: Build the frontend
FROM node:20-slim AS build-stage
WORKDIR /app

# Ensure Vite can see the API key from the environment
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=${VITE_GEMINI_API_KEY}
RUN echo "Building with API Key starting with: ${VITE_GEMINI_API_KEY:0:5}..."

COPY package.json package-lock.json ./
RUN npm install --include=optional --legacy-peer-deps

COPY . .
RUN npx vite build

# Stage 2: Run the server
FROM node:20-slim
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --omit=dev --legacy-peer-deps

COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/server ./server

# Cloud Run sets PORT dynamically — must use 8080
EXPOSE 8080
ENV PORT=8080

CMD ["node", "server/server.js"]