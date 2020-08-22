import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import Nav from './Nav';
import Users from './Users';
import Home from './Home';
import '../styles/AppStyles.scss';

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
            <Nav />
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

Layout.defaultProps = {
    token: PropTypes.shape({}),
};
