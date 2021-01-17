import React from 'react'
import {Switch, Route} from 'react-router-dom'

import {App} from './App'
import {LoginPage, PrivateRoute} from '../features/auth/containers'

export function AppContainer() {
  return (
    <Switch>
      <Route path="/login" render={() => <LoginPage />} />
      <PrivateRoute path="/">
        <App />
      </PrivateRoute>
    </Switch>
  )
}

AppContainer.defaultProps = {}

AppContainer.propTypes = {}
