import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { BrowserRouter, Route } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import UserProvider from './contextProviders/UserProvider';
import App from './pages/App';
import keycloak from './keycloak';


const browserHistory = createHistory();

ReactDOM.render(
    <KeycloakProvider keycloak={keycloak}>
        <BrowserRouter history={browserHistory}>
            <UserProvider>
                <Route exact path="*" component={App} />
            </UserProvider>
        </BrowserRouter>
    </KeycloakProvider>,
    document.getElementById('app'),
);
