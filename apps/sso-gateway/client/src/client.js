import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { KeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';



ReactDOM.render(
    <KeycloakProvider keycloak={keycloak}>
        <App />
    </KeycloakProvider>,
    document.getElementById('app'),
);
