import React, {useContext} from 'react';
import UserContext from '../context/UserContext';
import {Link} from 'react-router-dom';


export default function Nav() {
    const { user, setUser } = useContext(UserContext);
    console.log('Navigation user', user);
    return (<div className='nav-bar'>
        <button onClick={() => setUser('adadasdfasfasdfasdfasf')}>Context</button>
        <div>
            <Link to="/">Profile</Link>
        </div>
        <div>
            <Link to="/users">Users</Link>
        </div>
    </div>)
}
