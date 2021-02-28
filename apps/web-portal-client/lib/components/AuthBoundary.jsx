import {useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types'
import {useAuth} from '../features/auth/hooks'
import {BrowserKeys, BrowserStorage} from '../utils'

export function AuthBoundary(props) {
  const history = useHistory()
  const {login} = useAuth()

  useEffect(() => {
    const lastPath = BrowserStorage.getLocalStorageValue(BrowserKeys.LastPath)
    const token = BrowserStorage.getLocalStorageValue(BrowserKeys.UserToken)

    if (token) {
      login({token}).then(() => {
        history.push(lastPath)
      })
    }
  }, [])

  return props.children
}

AuthBoundary.propTypes = {
  children: PropTypes.shape({}),
}

AuthBoundary.defaultProps = {
  children: null,
}
