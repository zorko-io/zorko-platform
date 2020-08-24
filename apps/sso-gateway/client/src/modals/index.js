import React from 'react';
import ProfileModal from './ProfileModal';
import CreateUserModal from './CreateUserModal';
import DeleteUserModal from './DeleteUserModal';


const style = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        zIndex: '1000',
        overflow: 'visible',
    },
    content: {
        width: '500px',
        height: 'auto',
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0px 0px 37px 5px rgba(189,183,189,1)',
        overflow: 'visible',
    },
};

export default function Modals() {
    return (
        <div>
            <ProfileModal style={style} />
            <CreateUserModal style={style} />
            <DeleteUserModal style={style} />
        </div>
    );
}
