# ---- Base Image ----
FROM node:22-alpine AS base
WORKDIR /app

# ---- Dependencies ----
COPY package*.json ./
RUN npm ci

# ---- Build ----
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---- Production ----
FROM node:22-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production
COPY --from=base /app/package*.json ./
COPY --from=base /app/dist ./dist
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["node", "dist/server.js"]
