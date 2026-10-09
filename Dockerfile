# --- Etapa 1: Compilación ---
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./

# Usamos --legacy-peer-deps para evitar conflictos entre Vite y Tailwind
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# --- Etapa 2: Servidor Nginx ---
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]