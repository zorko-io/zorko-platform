import React from 'react';


export default class App extends React.Component {
    componentDidCatch(error, errorInfo) {
        console.error(error);
    }

    render() {
        return <div>Hello</div>;
    }
}

App.propTypes = {
};

App.defaultProps = {
};
