#Imagen base :
FROM node:14

#Carpeta interna donde se guarda el proyecto
WORKDIR /app

#Se copia el archivo package.json al directorio raiz
COPY package*.json ./

#Ejecutamos el comando npm install para generar dependencias
RUN npm install

#Procedemos a copiar todo el codigo del aplicativo
COPY . .

#El puerto a exponer en nuestro contenedor
EXPOSE 8080

#Ejecutamos el comando para arrancar la app. (validar que existe el script en el package.json)
CMD ["npm","run","dev"]