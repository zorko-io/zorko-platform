import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalsContext from './context/ModalsContext';


export default function ModalsProvider(props) {
    const [profile, setProfile] = useState({ open: false });
    const openProfileModal = (user) => setProfile({ open: true, user });
    const closeProfileModal = () => setProfile({ open: false });

    return (
        <ModalsContext.Provider value={{ profile, openProfileModal, closeProfileModal }}>
            {props.children}
        </ModalsContext.Provider>
    );
}

ModalsProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.shape({})),
};

ModalsProvider.defaultProps = {
    children: null,
};
