import * as api from '@web-portal-client/api'
import {logging, login, error} from '@web-portal-client/features/auth/slices'

export const userLogin = (params) => async (dispatch) => {
  try {
    dispatch(logging())
    const result = await api.login(params)
    dispatch(login(result))
  } catch (err) {
    dispatch(error(err))
  }
}
