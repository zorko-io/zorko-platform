import {useContext, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {error, logging, login, logout} from '../slices'
import {AppContext} from '../../../context'
import {selectAuthError, selectAuthToken, selectLoginState} from '../selectors'

export function useAuth() {
  const dispatch = useDispatch()
  const {api, logger} = useContext(AppContext)

  return {
    login: useCallback(() => {
      dispatch(logging())
      api.auth
        .login()
        .then((result) => {
          logger.info('INFO')
          dispatch(login(result))
        })
        .catch((err) => {
          dispatch(error(err))
        })
    }, [dispatch]),
    logout: useCallback(() => {
      dispatch(logout())
    }, [dispatch]),
    isLogginInProgress: useSelector(selectLoginState),
    error: useSelector(selectAuthError),
    hasToken: Boolean(useSelector(selectAuthToken)),
  }
}
