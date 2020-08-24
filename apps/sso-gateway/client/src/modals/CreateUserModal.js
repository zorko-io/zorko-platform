import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ModalsContext from '../contextProviders/context/ModalsContext';


function CreateUserForm(props) {
    return (
        <div>
            <h2>Create User</h2>
            <div>Email:</div>
            <div>Username:</div>
            <div>First name:</div>
            <div>Last name:</div>
            <div>Role:</div>
            <button onClick={props.submit}>Ok</button>
            <button onClick={props.cancel}>Cancel</button>
        </div>
    );
}

CreateUserForm.propTypes = {
    cancel: PropTypes.func,
    submit: PropTypes.func,
};

CreateUserForm.defaultProps = {
    cancel: () => {},
    submit: () => {},
};


export default function CreateUserModal(props) {
    const { createUser, closeCreateUserModal } = useContext(ModalsContext);

    const submit = () => {
        closeCreateUserModal();
    };

    const cancel = () => {
        closeCreateUserModal();
    };

    return (
        <div>
            <Modal
                isOpen={createUser.open}
                onRequestClose={closeCreateUserModal}
                ariaHideApp={false}
                style={props.style}
                contentLabel="Example Modal"
            >
                <CreateUserForm
                    submit={submit}
                    cancel={cancel}
                />
            </Modal>
        </div>
    );
}

CreateUserModal.defaultProps = {
    style: null,
};

CreateUserModal.propTypes = {
    style: PropTypes.shape({}),
};
