# Build stage
FROM node:18-slim as build

WORKDIR /app

# Copiar package.json e package-lock.json primeiro
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o resto dos arquivos
COPY . .

# Construir a aplicação
RUN npm run build

# Production stage
FROM nginx:alpine

# Copiar os arquivos de build para o nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuração do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]