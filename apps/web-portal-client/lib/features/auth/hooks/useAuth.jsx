import {useContext, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {BrowserKeys, BrowserStorage} from '../../../utils'
import {error, logging, login, logout} from '../slices'
import {AppContext} from '../../../context'
import {selectAuthError, selectAuthToken, selectLoginState} from '../selectors'

export function useAuth() {
  const dispatch = useDispatch()
  const {api} = useContext(AppContext)

  return {
    login: (params) => {
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
    },
    logout: useCallback(() => {
      BrowserStorage.removeLocalStorageValue(BrowserKeys.UserToken)
      dispatch(logout())
    }, [dispatch]),
    isLogginInProgress: useSelector(selectLoginState),
    error: useSelector(selectAuthError),
    hasToken: Boolean(useSelector(selectAuthToken)),
  }
}
