# sso-gateway
Authentication and Identity Management service based on OpenId connect technology.

The service should provide next functionality:
 - creating, updating, retrieving, removing the users;
 - provide OAuth 2.0 authentication/authorization flow. Should support JWT;
 - provide user-to-service authentication;
 - provide service-to-service authentication;
 - provide login UI;
 - server should send an invitation email on user creation;
 - setting the password should be implemented through the temporary link;
 - social apps authentication;
 
 
 Keycloak authentication plans
 Backend services:
 For the all backend services that are exposing the API will be using the "bearer-only" access type.
 These clients will never initiates the login and the keyckloak adapter will check the Authorization header in requests
 and protected API based on users permissions.
 
 Frontend clients/apps:
  For all the frontend clients that are represented by browser applications will be using the "public" access type.
  In this case the keyckoak service will provide the out of box login page.