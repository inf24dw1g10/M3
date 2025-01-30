FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

#Instalar o serve globalmente
RUN npm install -g serve

RUN echo "REACT_APP_API_URL: $REACT_APP_API_URL"

EXPOSE 3001

#Usar o serve para servir a build
CMD ["serve", "-s", "build", "-l", "3001"]