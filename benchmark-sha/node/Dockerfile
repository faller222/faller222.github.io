FROM node:20-alpine

# Optimizaciones del sistema
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Optimizar capas de Docker
COPY package*.json ./
RUN npm install --omit=dev && \
    npm cache clean --force && \
    rm -rf /root/.npm

COPY . .

# Configuraciones de Node.js
ENV NODE_ENV=production
ENV UV_THREADPOOL_SIZE=4
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Usuario no root
USER node

EXPOSE 8080

CMD ["node", "index.js"]
