import React from 'react'
import {Switch, Redirect} from 'react-router-dom'
import {PrivateRoute} from '../features/auth/containers'
import {HomePage} from '../features/homepage/components'
import {ExamplesPage} from '../features/examples/components'
import {Viewer} from '../features/viewer'
import {Header} from '../components/layout'

export function App() {
  return (
    <>
      <Header />
      <Switch>
        <PrivateRoute path="/example">
          <ExamplesPage />
        </PrivateRoute>
        <PrivateRoute path="/home">
          <HomePage />
        </PrivateRoute>
        <PrivateRoute path="/viewer/:id">
          <Viewer />
        </PrivateRoute>
        <Redirect path="/" exact to="/home" />
      </Switch>
    </>
  )
}
App.defaultProps = {}

App.propTypes = {}
