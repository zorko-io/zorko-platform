import React from 'react';


const UserContext = React.createContext({
    user: null,
    token: null,
    authenticated: false,
    setUser: () => {},
    setToken: () => {},
    setAuthenticated: () => {},
});

export default UserContext;
