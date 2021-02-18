import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import {AppContext} from '../context'
import {App} from './App'
import {LoginPage, PrivateRoute} from '../features/auth/containers'

export class AppContainer extends Component {
  componentDidCatch(error) {
    const {logger} = this.context
    logger.error({message: error.message, stack: JSON.stringify(error.stack)})
  }

  render() {
    return (
      <Switch>
        <Route path="/login" render={() => <LoginPage />} />
        <PrivateRoute path="/">
          <App />
        </PrivateRoute>
      </Switch>
    )
  }
}

AppContainer.contextType = AppContext

AppContainer.defaultProps = {}

AppContainer.propTypes = {}
