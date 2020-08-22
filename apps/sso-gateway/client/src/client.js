import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { BrowserRouter, Route } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import App from './pages/App';
import keycloak from './keycloak';

const browserHistory = createHistory();

ReactDOM.render(
    <KeycloakProvider keycloak={keycloak}>
        <BrowserRouter history={browserHistory}>
            <Route exact path="*" component={App}/>
        </BrowserRouter>
    </KeycloakProvider>,
    document.getElementById('app'),
);
