import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProfileContext from './context/ProfileContext';


export default function ProfileProvider(props) {
    const [token, setToken] = useState(null);
    const [authenticated, setAuthenticated] = useState(null);
    const [user, setUser] = useState(null);
    return (
        <ProfileContext.Provider value={{ token, authenticated, setToken, setAuthenticated, user, setUser }}>
            {props.children}
        </ProfileContext.Provider>
    );
}

ProfileProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.shape({})),
};

ProfileProvider.defaultProps = {
    children: null,
};
