import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import Menu from './Menu';
import Users from './admin/Users';
import Home from './Home';


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
                    <Route exact path="/" component={Home} />
                    <Route path="/users" component={Users} />
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
