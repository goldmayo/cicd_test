FROM node:lts

# Set working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Reinstall bcrypt
RUN npm rebuild bcrypt --build-from-source

# Bundle app source
COPY . .

# Expose port and start application
EXPOSE 3000
CMD [ "node", "app.js" ]
