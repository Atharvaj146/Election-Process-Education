# Stage 1: Build the frontend
FROM node:20-slim AS build-stage
WORKDIR /app

# Ensure Vite can see the environment variables
ARG VITE_GEMINI_API_KEY
ARG VITE_GOOGLE_CLIENT_ID
ENV VITE_GEMINI_API_KEY=${VITE_GEMINI_API_KEY}
ENV VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}

COPY package.json ./
RUN npm install --include=optional --legacy-peer-deps

COPY . .
RUN echo "VITE_GEMINI_API_KEY=${VITE_GEMINI_API_KEY}" > .env
RUN echo "VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}" >> .env
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