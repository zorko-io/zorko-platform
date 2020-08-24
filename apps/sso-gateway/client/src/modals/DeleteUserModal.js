import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import ModalsContext from '../contextProviders/context/ModalsContext';


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


export default function DeleteUserModal(props) {
    const { deleteUser, closeDeleteUserModal } = useContext(ModalsContext);

    const submit = () => {
        closeDeleteUserModal();
    };

    const cancel = () => {
        closeDeleteUserModal();
    };

    return (
        <div>
            <Modal
                isOpen={deleteUser.open}
                onRequestClose={closeDeleteUserModal}
                ariaHideApp={false}
                style={props.style}
                contentLabel="Example Modal"
            >
                <DeleteUserForm
                    user={deleteUser}
                    submit={submit}
                    cancel={cancel}
                />
            </Modal>
        </div>
    );
}

DeleteUserModal.defaultProps = {
    style: null,
};

DeleteUserModal.propTypes = {
    style: PropTypes.shape({}),
};
