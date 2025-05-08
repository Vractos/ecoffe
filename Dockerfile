FROM node:23-alpine AS builder

WORKDIR /app

COPY . .
RUN npm install

COPY prisma ./prisma/

RUN npm run build

FROM node:slim

WORKDIR /app

RUN apt-get update -y \
&& apt-get install -y openssl

ARG port
ENV PORT=$port

ARG node_env
ENV NODE_ENV=$node_env

ARG postgres_user
ENV POSTGRES_USER=$postgres_user

ARG postgres_password
ENV POSTGRES_PASSWORD=$postgres_password

ARG postgres_db_name
ENV POSTGRES_DB_NAME=$postgres_db_name

ARG postgres_host
ENV POSTGRES_HOST=$postgres_host

ARG database_url
ENV DATABASE_URL=$database_url

ARG repository_type
ENV REPOSITORY_TYPE=$repository_type

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma 
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/dist ./dist

RUN apt-get update -y && apt-get install -y openssl

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]