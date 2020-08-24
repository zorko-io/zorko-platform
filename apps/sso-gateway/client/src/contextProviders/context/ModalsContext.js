import React from 'react';


const ModalsContext = React.createContext({
    profile: {
        open: false,
        user: null,
        openProfileModal: () => {},
        closeProfileModal: () => {},
    },
    createUser: {
        open: false,
        user: null,
        openCreateUserModal: () => {},
        closeCreateUserModal: () => {},
    },
    deleteUser: {
        open: false,
        user: null,
        openDeleteUserModal: () => {},
        closeDeleteUserModal: () => {},
    },
});

export default ModalsContext;
