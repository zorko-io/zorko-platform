import {useContext, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {BrowserKeys, BrowserStorage} from '../../../utils'
import {error, logging, login, logout} from '../slices'
import {AppContext} from '../../../context'
import {selectAuthError, selectAuthToken, selectLoginState} from '../selectors'

export function useAuth() {
  const dispatch = useDispatch()
  const {api} = useContext(AppContext)
  const history = useHistory()

  const userLogin = (params) => {
    dispatch(logging())
    return api.auth
      .login(params)
      .then((result) => {
        BrowserStorage.setLocalStorageValue(BrowserKeys.UserToken, result.token)
        dispatch(login(result))
      })
      .catch((err) => {
        BrowserStorage.removeLocalStorageValue(BrowserKeys.UserToken)
        dispatch(error(err))
      })
  }
  const userLogout = useCallback(() => {
    BrowserStorage.removeLocalStorageValue(BrowserKeys.UserToken)
    dispatch(logout())
  }, [dispatch])

  const checkSession = () => {
    const lastPath = BrowserStorage.getLocalStorageValue(BrowserKeys.LastPath)
    const token = BrowserStorage.getLocalStorageValue(BrowserKeys.UserToken)

    if (token) {
      userLogin({token}).then(() => {
        history.push(lastPath)
      })
    }
  }

  return {
    userLogin,
    userLogout,
    checkSession,
    isLogginInProgress: useSelector(selectLoginState),
    error: useSelector(selectAuthError),
    hasToken: Boolean(useSelector(selectAuthToken)),
  }
}
