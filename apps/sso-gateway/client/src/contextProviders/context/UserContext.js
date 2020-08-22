import React from 'react';


const UserContext = React.createContext({
    token: null,
    authenticated: false,
    setToken: () => {},
    setAuthenticated: () => {},
});

export default UserContext;
