import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from '../hooks'

export function PrivateRoute({children, ...rest}) {
  const {hasToken} = useAuth()
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({location}) => {
        console.log('hasToken ', hasToken)
        return hasToken ? children : <Redirect to={{pathname: '/login', state: {from: location}}} />
      }}
    />
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.shape({}),
}

PrivateRoute.defaultProps = {
  children: null,
}
