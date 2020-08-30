import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UsersContext from './context/UsersContext';


export default function UsersProvider(props) {
    const [users, setUsers] = useState([]);
    const addUser = (user) => {
        setUsers([...users, user]);
    };
    const removeUser = (userId) => {
        const newUsers = users.filter((u) => u.id !== userId);
        setUsers([...newUsers]);
    };

    return (
        <UsersContext.Provider value={{ users, setUsers, addUser, removeUser }}>
            {props.children}
        </UsersContext.Provider>
    );
}

UsersProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.shape({})),
};

UsersProvider.defaultProps = {
    children: null,
};
