import React from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { withKeycloak } from '@react-keycloak/web';
import { setDefaults } from '../api';
import Layout from './Layout';
import NotAuthenticated from './NotAuthenticated';
import UserContext from '../contextProviders/context/UserContext';
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
                setDefaults(keycloak.token);
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
                <Layout token={token} />
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
