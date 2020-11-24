import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { BrowserRouter, Route } from 'react-router-dom';
import { KeycloakProvider } from '@react-keycloak/web';
import ProfileProvider from './contextProviders/ProfileProvider';
import UsersProvider from './contextProviders/UsersProvider';
import App from './pages/App';
import keycloak from './keycloak';


const browserHistory = createHistory();

ReactDOM.render(
    <KeycloakProvider keycloak={keycloak}>
        <BrowserRouter history={browserHistory}>
            <UsersProvider>
                <ProfileProvider>
                    <Route exact path="*" component={App} />
                </ProfileProvider>
            </UsersProvider>
        </BrowserRouter>
    </KeycloakProvider>,
    document.getElementById('app'),
);
