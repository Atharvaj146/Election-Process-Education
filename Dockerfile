# Stage 1: Build the frontend
FROM node:20-slim AS build-stage
WORKDIR /app

# Ensure Vite can see the API key from the environment
ARG VITE_GEMINI_API_KEY
# This line is the secret sauce: it takes the key from either Arg or Env
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

COPY package.json ./
RUN npm install --include=optional --legacy-peer-deps

COPY . .
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
