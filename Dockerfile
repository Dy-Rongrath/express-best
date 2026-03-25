FROM node:22-bookworm-slim AS base

WORKDIR /app

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    fontconfig \
    python3 \
    python3-uno \
    libreoffice-core \
    libreoffice-writer \
    fonts-dejavu-core \
    fonts-khmeros \
  && rm -rf /var/lib/apt/lists/*

# On Debian, apt installs soffice.bin to /usr/lib/libreoffice/program which is
# NOT on the default PATH. Carbone (on Linux) searches for "soffice.bin" via
# `which`, so it never finds the binary unless we add the directory to PATH.
ENV PATH="/usr/lib/libreoffice/program:${PATH}"

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:22-bookworm-slim AS prod

WORKDIR /app

ENV NODE_ENV=production
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates \
    fontconfig \
    python3 \
    python3-uno \
    libreoffice-core \
    libreoffice-writer \
    fonts-dejavu-core \
    fonts-khmeros \
  && rm -rf /var/lib/apt/lists/*

ENV PATH="/usr/lib/libreoffice/program:${PATH}"

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=base /app/dist ./dist

EXPOSE 3000
CMD ["node", "dist/server.js"]
