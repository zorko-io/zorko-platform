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
 These clients will never initiates the login, and the keyckloak adapter will check the Authorization header in requests
 and protected API based on users permissions.

 Frontend clients/apps:
  For all the frontend clients that are represented by browser applications will be using the "public" access type.
  In this case the keyckoak service will provide the out of box login page.

Configuration Client Side SSO

1. run the keycloak server and mysql server
    ```sudo docker-compose -f docker-compose.yaml up```
1. Navigating in a browser to localhost:8080. By default the username: admin, password: admin.
    - create realm with the name "zorko" (could be any but currently it is hardcoded in client side)
    - create a client with clientId "frontend" (could be any but currently it is hardcoded in client side)
    - chose the Login Theme
    - choose access-type as "public"
    - set Root Url as "http://localhost:8086/" (host of a webpack dev server)
    - set Valid Redirect URIs as "http://localhost:8086/*"
    - set Web Origins as "*"
    - save
    - Go to Users section
    - Create User  with login Joe
    - Set Password `qwerty`
1. Install all client libraries
    - navigate to folder /sso-gateway/client/
    - run ```npm i```
1. Start the client
    - run ```npm run start```
1. Try to login as `joe/joe`
