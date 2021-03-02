import {useEffect} from 'react'
import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import {useAuth} from '../features/auth/hooks'
import {appPersistentStorage} from '../utils'

export function AppRouter(props) {
  const location = useLocation()
  const {checkSession} = useAuth()
  useEffect(() => {
    appPersistentStorage.writeLastRoutePath(location.pathname)
  }, [location.pathname])

  useEffect(() => {
    checkSession()
  }, [])

  return props.children
}

AppRouter.propTypes = {
  children: PropTypes.shape({}),
}

AppRouter.defaultProps = {
  children: null,
}
