import {logging, login, error} from '../slices'

export const userLogin = (params, api) => async (dispatch) => {
  try {
    dispatch(logging())
    const result = await api.auth.login(params)
    dispatch(login(result))
  } catch (err) {
    dispatch(error(err))
  }
}
