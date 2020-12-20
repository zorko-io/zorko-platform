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

  /*   useEffect(() => {
    // todo: add token validation (place for keycloack)
    if (location.pathname !== '/login' && !token) {
      history.push('/login')
    } else {
      // todo: implement login with token
    }
  }) */

  return (
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/example" />} />
      <Route path="/example" exact render={() => <ExamplesPage />} />
      <Route path="/login" exact render={() => <LoginPage />} />
      <Route path="/home" exact render={() => <HomePage />} />
    </Switch>
  )
}

AppContainer.defaultProps = {}

AppContainer.propTypes = {}
