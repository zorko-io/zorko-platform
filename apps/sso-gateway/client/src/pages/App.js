import React from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { withKeycloak } from '@react-keycloak/web';
import { setDefaults } from '../api';
import Layout from './Layout';
import Modals from '../Modals';
import NotAuthenticated from './NotAuthenticated';
import UserContext from '../contextProviders/context/UserContext';
import ModalsProvider from '../contextProviders/ModalsProvider';
import '../styles/AppStyles.scss';


class App extends React.Component {
    static contextType = UserContext;

    componentDidUpdate() {
        const { keycloak } = this.props;
        if (keycloak && !keycloak.authenticated) {
            keycloak.login();
        } else if (keycloak && keycloak.authenticated && keycloak.token !== this.context.token) {
            if (this.context.token !== keycloak.token) {
                const user = jwt.decode(keycloak.token);
                this.context.setToken(keycloak.token);
                this.context.setAuthenticated(keycloak.authenticated);
                this.context.setUser(user);
                setDefaults(keycloak.authenticated);
            }
        }
    }

    componentDidCatch(error) {
        console.error(error);
    }

    render() {
        const { authenticated, token } = this.props.keycloak;
        if (authenticated) {
            return (
                <ModalsProvider>
                    <Layout token={token} />
                    <Modals />
                </ModalsProvider>
            );
        }
        return <NotAuthenticated />;
    }
}

App.propTypes = {
    keycloak: PropTypes.shape({
        token: PropTypes.string,
        authenticated: PropTypes.bool,
        login: PropTypes.func,
    }),
};

App.defaultProps = {
    keycloak: null,
};

export default withKeycloak(App);
