FROM node:11.15.0-alpine
WORKDIR /app
COPY . .
RUN npm install
ENV KEYCLOAK_BASE_URL "http://license-game.cf/keycloak"
ENV MONGO_DB_BASE_URL "mongodb://mongo_db:27017/"
CMD ["npm", "start"]