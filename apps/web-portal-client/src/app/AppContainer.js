import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import App from './App';

export default class AppConntainer extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error(error);
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/example" />} />
        <Route path="/example" exact render={() => <App />} />
      </Switch>
    );
  }
}

App.propTypes = {};

App.defaultProps = {};
