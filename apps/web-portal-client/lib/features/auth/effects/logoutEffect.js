import {logout} from '../slices'

export const userLogout = () => (dispatch) => {
  dispatch(logout())
}
