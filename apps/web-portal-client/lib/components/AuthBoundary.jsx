import {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useAuth} from '../features/auth/hooks'

export function AuthBoundary(props) {
  const {checkSession} = useAuth()

  useEffect(() => {
    checkSession()
  }, [])

  return props.children
}

AuthBoundary.propTypes = {
  children: PropTypes.shape({}),
}

AuthBoundary.defaultProps = {
  children: null,
}
