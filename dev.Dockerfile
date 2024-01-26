# Usa l'immagine Node.js come base
FROM node:18

# Crea e imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia i file di dipendenze e il file package.json nella directory di lavoro
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice nell'immagine
COPY . .

# Esponi la porta su cui l'applicazione Nest.js ascolterà
EXPOSE 3000

# Avvia l'applicazione Nest.js
CMD ["npm", "run", "start:dev"]
