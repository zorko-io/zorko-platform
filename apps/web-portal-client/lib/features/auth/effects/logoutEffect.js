import {logout} from '@web-portal-client/features/auth/slices'

export const userLogout = () => (dispatch) => {
  dispatch(logout())
}
