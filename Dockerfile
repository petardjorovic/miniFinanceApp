# ----------------------
# BASE
# ----------------------
FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./

# ----------------------
# DEVELOPMENT
# ----------------------
FROM base AS development

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]

# ----------------------
# BUILD
# ----------------------
FROM base AS build

RUN npm ci --omit=dev

COPY . .

RUN npm run build
RUN npx prisma generate

# ----------------------
# PRODUCTION
# ----------------------
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]