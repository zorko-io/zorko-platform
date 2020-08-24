import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalsContext from './context/ModalsContext';


export default function ModalsProvider(props) {
    const [profile, setProfile] = useState({ open: false });
    const [createUser, setCreateUser] = useState({ open: false });
    const [deleteUser, setDeleteUser] = useState({ open: false });
    const openProfileModal = (user) => setProfile({ open: true, user });
    const closeProfileModal = () => setProfile({ open: false });
    const openCreateUserModal = () => setCreateUser({ open: true });
    const closeCreateUserModal = () => setCreateUser({ open: false });
    const openDeleteUserModal = () => setDeleteUser({ open: true });
    const closeDeleteUserModal = () => setDeleteUser({ open: false });

    return (
        <ModalsContext.Provider
            value={{
                profile,
                openProfileModal,
                closeProfileModal,
                createUser,
                openCreateUserModal,
                closeCreateUserModal,
                deleteUser,
                openDeleteUserModal,
                closeDeleteUserModal,
            }}
        >
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
