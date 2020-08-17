import React from 'react';
import { withKeycloak } from '@react-keycloak/web'
import { setDefaults } from '../api';
import Layout from './Layout';
import NotAuthenticated from './NotAuthenticated';
import UserContext from '../context/UserContext';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidCatch(error, errorInfo) {
        console.error(error);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('this.props.keycloak ', this.props.keycloak);
        console.log('this.props.keycloakInitialized ', this.props.keycloakInitialized);
        if (this.props.keycloak && !this.props.keycloak.authenticated) {
            this.props.keycloak.login();
        } else if (this.props.keycloak && this.props.keycloak.authenticated) {
            setDefaults(this.props.keycloak.authenticated);
        }
    }

    render() {
        if (this.props.keycloak.authenticated) {
            return (
                <UserContext.Provider value={ { user: this.props.keycloak.token }}>
                    <Layout
                        token={this.props.keycloak.token}
                    />
                </UserContext.Provider>
                )
        }
        return <NotAuthenticated />
    }
}

export default withKeycloak(App);
