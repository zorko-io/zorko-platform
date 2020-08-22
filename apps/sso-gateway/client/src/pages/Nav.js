import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <div className="nav-bar">
            <div>
                <Link to="/">Profile</Link>
            </div>
            <div>
                <Link to="/users">Users</Link>
            </div>
        </div>
    );
}
