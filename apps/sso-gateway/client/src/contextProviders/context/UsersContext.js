import React from 'react';


const UsersContext = React.createContext({
    users: [],
    setUsers: () => {},
    addUser: () => {},
    removeUser: () => {},
});

export default UsersContext;
