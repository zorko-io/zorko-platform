import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import withModalStyle from './withModalStyle';


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


function ProfileModal(props) {
    return (
        <div>
            <Modal
                isOpen={props.opened}
                onRequestClose={props.close}
                ariaHideApp={false}
                style={props.style}
                contentLabel="Example Modal"
            >
                <ProfileForm
                    user={props.user}
                    closeProfileModal={props.close}
                />
            </Modal>
        </div>
    );
}

ProfileModal.defaultProps = {
    style: null,
    opened: false,
    close: () => {},
    user: null,
};

ProfileModal.propTypes = {
    style: PropTypes.shape({}),
    opened: PropTypes.bool,
    close: () => {},
    user: PropTypes.shape({}),
};

export default withModalStyle(ProfileModal);
