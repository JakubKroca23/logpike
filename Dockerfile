# ==========================================
# STAGE 1: BUILD THE STATIC WEBPAGE WITH VITE
# ==========================================
FROM node:20-alpine AS build

WORKDIR /app

# Copy package descriptors and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application files
COPY index.html style.css main.js ./
COPY public/ ./public/

# Build static assets (generates /app/dist)
RUN npm run build

# ==========================================
# STAGE 2: PRODUCTION SERVER WITH NGINTX
# ==========================================
FROM nginx:1.25-alpine AS production

# Copy Nginx server configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets from build stage to Nginx public root
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTP port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
