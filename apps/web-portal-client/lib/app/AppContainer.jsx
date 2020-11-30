import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import HomePage from '../components/HomePage.jsx'
import LoginPage from '../components/LoginPage.jsx'
import {App} from './App'

export class AppContainer extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error({
      error,
      errorInfo,
    })
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/example" />} />
        <Route path="/example" exact render={() => <App />} />
        <Route path="/login" exact render={() => <LoginPage />} />
        <Route path="/home" exact render={() => <HomePage />} />
      </Switch>
    )
  }
}
