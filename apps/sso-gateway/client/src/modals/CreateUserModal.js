import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import withModalStyle from './withModalStyle';


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


function CreateUserModal(props) {
    const submit = () => {
        props.close();
    };

    const cancel = () => {
        props.close();
    };

    return (
        <div>
            <Modal
                isOpen={props.opened}
                onRequestClose={props.close}
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
    opened: false,
    close: () => {},
};

CreateUserModal.propTypes = {
    style: PropTypes.shape({}),
    opened: PropTypes.bool,
    close: PropTypes.func,
};

export default withModalStyle(CreateUserModal);
