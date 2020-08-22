import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './context/UserContext';


export default function UserProvider(props) {
    const [token, setToken] = useState(null);
    const [authenticated, setAuthenticated] = useState(null);
    return (
        <UserContext.Provider value={{ token, authenticated, setToken, setAuthenticated }}>
            {props.children}
        </UserContext.Provider>
    );
}

UserProvider.propTypes = {
    children: PropTypes.shape({}),
};

UserProvider.defaultProps = {
    children: null,
};
