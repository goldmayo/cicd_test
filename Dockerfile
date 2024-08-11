FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm uninstall bcrypt && npm install bcrypt

COPY . .

EXPOSE 3000
EXPOSE 443
CMD ["node", "app.js"]
