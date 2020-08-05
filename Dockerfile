FROM node:alpine AS builder

WORKDIR /usr/src

COPY . .

RUN npm install && npm run build


FROM node:alpine

WORKDIR /usr/src

COPY --from=builder /usr/src/package.json* ./
COPY --from=builder /usr/src/dist ./dist
RUN npm install --prod

CMD ["node", "dist/server/server.js"]