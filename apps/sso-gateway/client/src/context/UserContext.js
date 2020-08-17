import React from 'react';


const user = null

const UserContext = React.createContext({
        user,
        setUser: () => {}
    }
);

export default UserContext;
