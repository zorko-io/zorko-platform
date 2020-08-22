import React, { useContext } from 'react';
import Modal from 'react-modal';
import ModalsContext from '../contextProviders/context/ModalsContext';


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
                <h2>Hello</h2>
                <button onClick={closeProfileModal}>close</button>
            </Modal>
        </div>
    );
}
