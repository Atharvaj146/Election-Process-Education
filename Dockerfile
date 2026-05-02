# Stage 1: Build the frontend
FROM node:20-slim AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run the server
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/server ./server

EXPOSE 3001
ENV PORT=3001

CMD ["node", "server/server.js"]
