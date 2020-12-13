import * as api from '@web-portal-client/api'
import {logging, login, logout, error} from './authSlice'

export const userLogin = (params) => async (dispatch) => {
  try {
    dispatch(logging())
    const result = await api.login(params)
    dispatch(login(result))
  } catch (err) {
    dispatch(error(err))
  }
}

export const userLogout = () => (dispatch) => {
  dispatch(logout())
}
