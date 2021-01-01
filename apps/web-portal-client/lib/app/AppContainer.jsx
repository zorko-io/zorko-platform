import React, {useEffect} from 'react'
import {Switch, Route, Redirect, useHistory, useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {LoginPage} from '../features/auth/containers'
import {selectAuthToken} from '../features/auth/selectors'
import {HomePage} from '../components'
import {ExamplesPage} from '../features/examples/components'

export function AppContainer() {
  const location = useLocation()
  const history = useHistory()
  const token = useSelector(selectAuthToken)

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
      <Route path="/example" render={() => <ExamplesPage />} />
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
