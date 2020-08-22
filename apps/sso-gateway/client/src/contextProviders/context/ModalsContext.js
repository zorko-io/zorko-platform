import React from 'react';


const ModalsContext = React.createContext({
    profile: {
        open: false,
        openProfileModal: () => {},
        closeProfileModal: () => {},
    },
});

export default ModalsContext;
