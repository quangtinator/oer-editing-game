let keycloak_base_url = process.env.KEYCLOAK_BASE_URL ? process.env.KEYCLOAK_BASE_URL : 'http://localhost/keycloak';
let mongo_db_base_url = process.env.MONGO_DB_BASE_URL ? process.env.MONGO_DB_BASE_URL : 'mongodb://localhost:27017/';
module.exports = {keycloak_base_url, mongo_db_base_url};