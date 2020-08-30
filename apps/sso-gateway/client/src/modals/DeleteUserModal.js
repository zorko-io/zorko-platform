import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import withModalStyle from './withModalStyle';
import { userDelete } from '../actions/user';
import UsersContext from '../contextProviders/context/UsersContext';


function DeleteUserForm(props) {
    const { user, submit, submitted, cancel } = props;
    return (
        <div>
            <h2>Delete User: {user && user.email}</h2>
            <button onClick={submit} disabled={submitted}>
                {submitted && <div style={{ position: 'relative', top: '12px' }} className="spinner" />}
                Ok
            </button>
            <button onClick={cancel}>Cancel</button>
        </div>
    );
}

DeleteUserForm.propTypes = {
    user: PropTypes.string,
    submitted: PropTypes.bool,
    cancel: PropTypes.func,
    submit: PropTypes.func,
};

DeleteUserForm.defaultProps = {
    user: null,
    submitted: false,
    cancel: () => {},
    submit: () => {},
};


function DeleteUserModal(props) {
    const { removeUser } = useContext(UsersContext);
    const [submitted, setSubmitted] = useState(false);

    const submit = () => {
        setSubmitted(true);
        userDelete(props.user.id).then(() => {
            removeUser(props.user.id);
            setSubmitted(false);
            props.close();
        });
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
                    submitted={submitted}
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
    user: PropTypes.shape({
        id: PropTypes.string,
    }),
};

export default withModalStyle(DeleteUserModal);
