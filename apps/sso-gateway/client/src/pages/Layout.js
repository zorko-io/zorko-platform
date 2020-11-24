import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import Menu from './Menu';
import UsersTab from './admin/users/UsersTab';
import HomeTab from './admin/home/HomeTab';


export default function Layout(props) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        if (!user && props.token) {
            setUser(jwt.decode(props.token));
        }
    });
    if (!user) return null;

    return (
        <div>
            <Menu />
            <div className="page-content">
                <Switch>
                    <Route exact path="/" component={HomeTab} />
                    <Route path="/users" component={UsersTab} />
                </Switch>
            </div>
        </div>
    );
}

Layout.defaultProps = {
    token: null,
};

Layout.propTypes = {
    token: PropTypes.string,
};
