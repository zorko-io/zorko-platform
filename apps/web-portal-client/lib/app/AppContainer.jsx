import React from 'react'
import {Switch, Route, Router, Redirect} from 'react-router-dom'
import {LoginPage, PrivateRoute} from '../features/auth/containers'
import {App, HomePage} from '../components'
import {ExamplesPage} from '../features/examples/components'

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
