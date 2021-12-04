const {keycloak_base_url} = require('../api');

const Keycloak = require('keycloak-connect');

let keycloak;

let kcConfig = {
  "realm": "License-game",
  "bearer-only": true,
  "auth-server-url": keycloak_base_url,
  "ssl-required": "external",
  "resource": "backend",
  "confidential-port": 0
};

exports.initKeycloak = (memoryStore) => {
  if (keycloak) {
    return keycloak;
  } else {
    keycloak = new Keycloak({
      store: memoryStore,
      secret: 'any_key',
      resave: false,
      saveUninitialized: true,
    }, kcConfig);
    return keycloak;
  }
};