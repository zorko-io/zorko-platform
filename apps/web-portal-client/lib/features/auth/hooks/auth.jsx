import {useContext} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {error, logging, login, logout} from '../slices'
import {AppContext} from '../../../context'
import {selectAuthError, selectAuthToken, selectLoginState} from '../selectors'

export function useAuth() {
  const dispatch = useDispatch()
  const {api} = useContext(AppContext)

  return {
    login: () => {
      dispatch(logging())
      api.auth
        .login()
        .then((result) => {
          dispatch(login(result))
        })
        .catch((err) => {
          dispatch(error(err))
        })
    },
    logout: () => {
      dispatch(logout())
    },
    inProcess: useSelector(selectLoginState),
    error: useSelector(selectAuthError),
    loggedIn: useSelector(selectAuthToken),
  }
}
