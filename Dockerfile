# --- Etapa 1: Construcción de la aplicación con Node.js ---
FROM node:18-alpine AS builder

WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Compilamos el proyecto (genera la carpeta dist)
RUN npm run build

# --- Etapa 2: Servidor web ligero con Nginx para producción ---
FROM nginx:alpine

# Copiamos los archivos compilados desde la etapa anterior a la ruta pública de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 del contenedor
EXPOSE 80

# Arrancamos Nginx
CMD ["nginx", "-g", "daemon off;"]