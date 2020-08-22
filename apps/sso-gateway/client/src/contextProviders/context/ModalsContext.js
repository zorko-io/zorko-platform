import React from 'react';


const ModalsContext = React.createContext({
    profile: {
        open: false,
        user: null,
        openProfileModal: () => {},
        closeProfileModal: () => {},
    },
});

export default ModalsContext;
