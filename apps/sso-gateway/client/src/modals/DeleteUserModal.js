import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import withModalStyle from './withModalStyle';


function DeleteUserForm(props) {
    return (
        <div>
            <h2>Delete User: {props.user && props.user.name}</h2>
            <button onClick={props.submit}>Ok</button>
            <button onClick={props.cancel}>Cancel</button>
        </div>
    );
}

DeleteUserForm.propTypes = {
    user: PropTypes.string,
    cancel: PropTypes.func,
    submit: PropTypes.func,
};

DeleteUserForm.defaultProps = {
    user: null,
    cancel: () => {},
    submit: () => {},
};


function DeleteUserModal(props) {
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
                <DeleteUserForm
                    user={props.user}
                    submit={submit}
                    cancel={cancel}
                />
            </Modal>
        </div>
    );
}

DeleteUserModal.defaultProps = {
    style: null,
    opened: false,
    close: () => {},
    user: null,
};

DeleteUserModal.propTypes = {
    style: PropTypes.shape({}),
    opened: PropTypes.bool,
    close: PropTypes.func,
    user: PropTypes.shape({}),
};

export default withModalStyle(DeleteUserModal);
