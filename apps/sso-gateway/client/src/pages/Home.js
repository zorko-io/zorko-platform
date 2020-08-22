import React, { useContext } from 'react';
import jwt from 'jsonwebtoken';
import UserContext from '../contextProviders/context/UserContext';

export default function Home() {
    const { token } = useContext(UserContext);
    const user = jwt.decode(token);

    return (
        <div>
            <div>Email: {user.email}</div>
            <div>Username: {user.preferred_username}</div>
            <div>Realm Access: {JSON.stringify(user.realm_access)}</div>
            <div>Resource Access: {JSON.stringify(user.resource_access)}</div>
            <div>SSO Client: {JSON.stringify(user.azp)}</div>
        </div>
    );
}
