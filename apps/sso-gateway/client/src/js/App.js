import React from 'react';
import { withKeycloak } from '@react-keycloak/web'

class App extends React.Component {
    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('this.props.keycloak ', this.props.keycloak);
        console.log('this.props.keycloakInitialized ', this.props.keycloakInitialized);
    }

    render() {
        return (
            <div>
                <div>{`User is ${
                    !this.props.keycloak.authenticated ? 'NOT ' : ''
                }authenticated`}</div>


                {!!this.props.keycloak.authenticated && (
                    <button type="button" onClick={() => this.props.keycloak.logout()}>
                        Logout
                    </button>
                )}
                {!this.props.keycloak.authenticated && (
                    <button type="button" onClick={() => this.props.keycloak.login()}>
                        Login
                    </button>
                )}
            </div>
        );
    }
}

export default withKeycloak(App);
