import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LoginPage, PrivateRoute} from '../features/auth/containers'
import {HomePage} from '../components'
import {ExamplesPage} from '../features/examples/components'

export function AppContainer() {
  return (
    <Route path="/" render={() => <ExamplesPage />} />

    /*     <Switch>
      <PrivateRoute path="/example">
        <ExamplesPage />
      </PrivateRoute>
      <PrivateRoute path="/home">
        <HomePage />
      </PrivateRoute>
      <Route path="/login" render={() => <LoginPage />} />
      <Route path="/" render={() => <Redirect to="/login" />} />
    </Switch> */
  )
}

AppContainer.defaultProps = {}

AppContainer.propTypes = {}
