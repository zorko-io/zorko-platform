import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ModalsContext from '../contextProviders/context/ModalsContext';


function ProfileForm(props) {
    const { user } = props;
    if (!user) return null;
    
    return (
        <div>
            <h2>{user.name}</h2>
            <div>Email: {user.email}</div>
            <div>Username: {user.preferred_username}</div>
            <div>Realm access: {user.realm_access.roles.join(', ')}</div>
            <div>Resource access: {user.resource_access.account.roles.join(', ')}</div>
            <button onClick={props.closeProfileModal}>Close</button>
        </div>
    );
}

ProfileForm.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        preferred_username: PropTypes.string,
        realm_access: PropTypes.shape({
            roles: PropTypes.arrayOf(PropTypes.string),
        }),
        resource_access: PropTypes.shape({
            account: PropTypes.shape({
                roles: PropTypes.arrayOf(PropTypes.string),
            }),
        }),
    }),
    closeProfileModal: PropTypes.func,
};

ProfileForm.defaultProps = {
    user: {
        name: '',
        email: '',
        preferred_username: '',
        realm_access: {
            roles: [],
        },
        resource_access: {
            account: {
                roles: [],
            },
        },
    },
    closeProfileModal: () => {},
};


export default function ProfileModal(props) {
    const { profile, closeProfileModal } = useContext(ModalsContext);
    return (
        <div>
            <Modal
                isOpen={profile.open}
                onRequestClose={closeProfileModal}
                ariaHideApp={false}
                style={props.style}
                contentLabel="Example Modal"
            >
                <ProfileForm
                    user={profile.user}
                    closeProfileModal={closeProfileModal}
                />
            </Modal>
        </div>
    );
}

ProfileModal.defaultProps = {
    style: null,
};

ProfileModal.propTypes = {
    style: PropTypes.shape({}),
};
