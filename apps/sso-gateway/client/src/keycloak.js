import Keycloak from 'keycloak-js';


const config = {
    url: 'http://localhost:8080/auth/',
    realm: 'zorko',
    clientId: 'frontend',
};
// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak(config);

export const keycloakAdminUrl = `${config.url}admin/realms/${config.realm}`;

export default keycloak;
