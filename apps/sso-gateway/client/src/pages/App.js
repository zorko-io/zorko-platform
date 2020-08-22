import React from 'react';
import PropTypes from 'prop-types';
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
        if (this.props.keycloak && !this.props.keycloak.authenticated) {
            this.props.keycloak.login();
        } else if (this.props.keycloak && this.props.keycloak.authenticated) {
            this.context.setToken(this.props.keycloak.token);
            this.context.setAuthenticated(this.props.keycloak.authenticated);
            setDefaults(this.props.keycloak.authenticated);
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
