import * as api from '@web-portal-client/api'
import {logging, login, error} from '@web-portal-client/features/auth/slices'

export const userLogin = (params) => async (dispatch) => {
  try {
    dispatch(logging())
    console.log('logging')
    const result = await api.login(params)
    console.log('result')
    console.log(result)
    dispatch(login(result))
  } catch (err) {
    dispatch(error(err))
  }
}
