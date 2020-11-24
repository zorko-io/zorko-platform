import React from 'react';


export default function withModalStyle(WrappedComponent) {
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

    return (props) => {
        return <WrappedComponent style={style} { ...props } />;
    };
}
