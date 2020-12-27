import React, {useEffect} from 'react'
import {Switch, Route, Redirect, useHistory, useLocation} from 'react-router-dom'
import {LoginPage, PrivateRoute} from '../features/auth/containers'
import {useAuth} from '../features/auth/hooks'
import {HomePage} from '../components'
import {ExamplesPage} from '../features/examples/components'

export function AppContainer() {
  const location = useLocation()
  const history = useHistory()
  const {token} = useAuth()

  useEffect(() => {
    // todo: add token validation (place for keycloack)
    if (location.pathname !== '/login' && !token) {
      history.push('/login')
    } else {
      // todo: implement login with token
    }
  })

  return (
    <Switch>
      <PrivateRoute path="/example">
        <ExamplesPage />
      </PrivateRoute>
      <PrivateRoute path="/home">
        <HomePage />
      </PrivateRoute>
      <Route path="/login" render={() => <LoginPage />} />
      <Route path="/" render={() => <Redirect to="/example" />} />
    </Switch>
  )
}

AppContainer.defaultProps = {}

AppContainer.propTypes = {}
