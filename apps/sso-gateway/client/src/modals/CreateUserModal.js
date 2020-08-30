import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import withModalStyle from './withModalStyle';
import { userCreate } from '../actions/user';


function CreateUserForm(props) {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmed] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const valid = email && firstName && lastName && username && password && (password === confirmedPassword);
    const handleSubmit = (e) => {
        const user = { email, firstName, lastName, username, password };
        setSubmitted(true);
        props.submit(user);
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="text" value={email} onChange={(event) => { setEmail(event.target.value); }} />
            </label>
            <label>
                First Name:
                <input type="text" value={firstName} onChange={(event) => { setFirstName(event.target.value); }} />
            </label>
            <label>
                Last Name:
                <input type="text" value={lastName} onChange={(event) => { setLastName(event.target.value); }} />
            </label>
            <label>
                Username:
                <input type="text" value={username} onChange={(event) => { setUsername(event.target.value); }} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(event) => { setPassword(event.target.value); }} />
            </label>
            <label>
                Confirm Password:
                <input type="password" value={confirmedPassword} onChange={(event) => { setConfirmed(event.target.value); }} />
            </label>
            <div>
                <button type="submit" disabled={!valid || submitted}>
                    {submitted && <div style={{ position: 'relative', top: '12px' }} className="spinner" />}
                    Submit
                </button>
                <button type="button" disabled={submitted} onClick={props.cancel}>Cancel</button>
            </div>
        </form>
    );
}

CreateUserForm.propTypes = {
    cancel: PropTypes.func,
    submit: PropTypes.func,
};

CreateUserForm.defaultProps = {
    cancel: () => {
    },
    submit: () => {
    },
};

function CreateUserModal(props) {
    const submit = (user) => {
        userCreate(user).then(() => {
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
                <h2>Create User</h2>
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
    close: () => {
    },
};

CreateUserModal.propTypes = {
    style: PropTypes.shape({}),
    opened: PropTypes.bool,
    close: PropTypes.func,
};

export default withModalStyle(CreateUserModal);
