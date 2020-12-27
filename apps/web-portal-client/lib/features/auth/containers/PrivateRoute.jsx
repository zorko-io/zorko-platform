import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {selectAuthToken} from '../selectors'

export function PrivateRoute({children, ...rest}) {
  const token = useSelector(selectAuthToken)
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({location}) => {
        return token ? children : <Redirect to={{pathname: '/login', state: {from: location}}} />
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
