import {useEffect, useContext} from 'react'
import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import {useAuth} from '../features/auth/hooks'
import {AppContext} from '../context'

export function AppRouter(props) {
  const location = useLocation()
  const {appPersistentStorage} = useContext(AppContext)
  const {checkSession} = useAuth()
  useEffect(() => {
    appPersistentStorage.lastRoutePath = location.pathname
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
