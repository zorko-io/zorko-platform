import React, { useEffect, useState } from 'react';
import * as api from '../../api';


export default function Users() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        api.getUsers().then((data) => {
            setUsers(data);
        });
    }, []);
    if (!users) return null;

    return (<div>{JSON.stringify(users)}</div>);
}
