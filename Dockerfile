# Usar la imagen oficial de Node.js
FROM node:16-alpine

# Crear y definir el directorio de trabajo
WORKDIR /app

# Copiar los archivos de package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente de la aplicación
COPY . .

# Instalar TypeScript y compilar el código
RUN npm run build

# Exponer el puerto que usará la app (en este caso 3000)
EXPOSE 3000

# Ejecutar la aplicación cuando el contenedor arranca
CMD ["npm", "run", "start"]
