import React from 'react';
import { withKeycloak } from '@react-keycloak/web';
import { setDefaults } from '../api';
import Layout from './Layout';
import NotAuthenticated from './NotAuthenticated';
import UserContext from '../context/UserContext';

class App extends React.Component {
    componentDidUpdate() {
        if (this.props.keycloak && !this.props.keycloak.authenticated) {
            this.props.keycloak.login();
        } else if (this.props.keycloak && this.props.keycloak.authenticated) {
            setDefaults(this.props.keycloak.authenticated);
        }
    }

    componentDidCatch(error) {
        console.error(error);
    }

    render() {
        if (this.props.keycloak.authenticated) {
            return (
                <UserContext.Provider value={{ token: this.props.keycloak.token }}>
                    <Layout
                        token={this.props.keycloak.token}
                    />
                </UserContext.Provider>
            );
        }
        return <NotAuthenticated />;
    }
}

export default withKeycloak(App);
