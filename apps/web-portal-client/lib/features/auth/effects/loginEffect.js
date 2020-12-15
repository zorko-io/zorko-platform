import api from '../../../../api'
import {logging, login, error} from '../slices'

export const userLogin = (params) => async (dispatch) => {
  try {
    dispatch(logging())
    const result = await api.auth.login(params)
    dispatch(login(result))
  } catch (err) {
    dispatch(error(err))
  }
}
