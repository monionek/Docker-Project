FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:20-alpine

WORKDIR /app
RUN apk add --no-cache curl

COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/app.js"]
