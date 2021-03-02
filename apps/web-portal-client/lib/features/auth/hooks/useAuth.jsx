import {useContext, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {appPersistentStorage} from '../../../utils'
import * as Auth from '../slices'
import {AppContext} from '../../../context'
import {selectAuthError, selectAuthToken, selectLoginState} from '../selectors'

export function useAuth() {
  const dispatch = useDispatch()
  const {api} = useContext(AppContext)
  const history = useHistory()

  const login = (params) => {
    dispatch(Auth.logging())
    return api.auth
      .login(params)
      .then((result) => {
        appPersistentStorage.writeApiToken(result.token)
        dispatch(Auth.login(result))
      })
      .catch((err) => {
        appPersistentStorage.cleanApiToken()
        dispatch(Auth.error(err))
      })
  }
  const logout = useCallback(() => {
    appPersistentStorage.cleanApiToken()
    dispatch(Auth.logout())
  }, [dispatch])

  const checkSession = () => {
    const lastPath = appPersistentStorage.readLastRoutePath()
    const token = appPersistentStorage.readApiToken()

    if (token) {
      login({token}).then(() => {
        history.push(lastPath)
      })
    }
  }

  return {
    login,
    logout,
    checkSession,
    isLogginInProgress: useSelector(selectLoginState),
    error: useSelector(selectAuthError),
    hasToken: Boolean(useSelector(selectAuthToken)),
  }
}
