import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';


export default function Layout(props) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!user && props.token) {
            setUser(jwt.decode(props.token));
        }
    });
    if (!user) return null;

    return <div>
        User is Authenticated.
        {JSON.stringify(user)}
    </div>
}

Layout.defaultProps = {
    token: null
}

Layout.defaultProps = {
    token: PropTypes.shape({})
}
