# --- Etapa 1: Compilación ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copiamos package.json y package-lock.json (si existe)
COPY package*.json ./

# Si tienes package-lock.json usa npm ci, si solo tienes package.json usa npm install
RUN npm install

# Copiamos el resto del código
COPY . .

# Compilamos la aplicación de Vite
RUN npm run build

# --- Etapa 2: Servidor Nginx ---
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]