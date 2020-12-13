import React, {useEffect} from 'react'
import {Switch, Route, Redirect, useHistory, useLocation} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {LoginPage} from '@web-portal-client/features/auth/containers/LoginPage'
import {selectAuthToken} from '@web-portal-client/features/auth/selectors'
import {HomePage} from '../components/HomePage'
import {App} from './App'

export function AppContainer() {
  const location = useLocation()
  const history = useHistory()
  const token = useSelector(selectAuthToken)

  useEffect(() => {
    if (location.pathname !== '/login' && !token) {
      history.push('/login')
    } else {
      // todo: implement login with token
    }
  })

  return (
    <Switch>
      <Route path="/" exact render={() => <Redirect to="/example" />} />
      <Route path="/example" exact render={() => <App />} />
      <Route path="/login" exact render={() => <LoginPage />} />
      <Route path="/home" exact render={() => <HomePage />} />
    </Switch>
  )
}

AppContainer.defaultProps = {}

AppContainer.propTypes = {}
