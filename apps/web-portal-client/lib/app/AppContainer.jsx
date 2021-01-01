import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LoginPage, PrivateRoute} from '../features/auth/containers'
import {HomePage} from '../components'
import {ExamplesPage} from '../features/examples/components'

export function AppContainer() {
  return (
    <Switch>
      <PrivateRoute path="/example">
        <ExamplesPage />
      </PrivateRoute>
      <PrivateRoute path="/home">
        <HomePage />
      </PrivateRoute>
      <Route path="/login" render={() => <LoginPage />} />
      <Route path="/home" render={() => <HomePage />} />
      <Route path="/team" render={() => <HomePage />} />
      <Route path="/contacts" render={() => <HomePage />} />
      <Route path="/" render={() => <Redirect to="/example" />} />
    </Switch>
  )
}

AppContainer.defaultProps = {}

AppContainer.propTypes = {}
