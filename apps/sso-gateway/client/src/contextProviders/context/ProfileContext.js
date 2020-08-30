import React from 'react';


const ProfileContext = React.createContext({
    user: null,
    token: null,
    authenticated: false,
    setUser: () => {},
    setToken: () => {},
    setAuthenticated: () => {},
});

export default ProfileContext;
