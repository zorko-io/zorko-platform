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
      render={(props) => {
        return hasToken ? (
          React.Children.map(children, (child) => React.cloneElement(child, props))
        ) : (
          <Redirect to={{pathname: '/login', state: {from: props.location}}} />
        )
      }}
    />
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.shape({}),
  location: PropTypes.object,
}

PrivateRoute.defaultProps = {
  children: null,
}
