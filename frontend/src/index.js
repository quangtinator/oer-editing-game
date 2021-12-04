import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Keycloak from "keycloak-js";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import store from "./store";
import {KEYCLOAK_BASE_URL_API} from "./definitions/config";


export const keycloak = Keycloak({
    url: KEYCLOAK_BASE_URL_API,
    realm: 'License-game',
    clientId: 'react'
});

keycloak
    .init({onLoad: 'login-required', checkLoginIframe : false})
    .then((authenticated) => {
        if (authenticated) {
            window.accessToken = keycloak.token;
            ReactDOM.render(
                <React.StrictMode>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </React.StrictMode>,
                document.getElementById('root')
            );
        }
    });


