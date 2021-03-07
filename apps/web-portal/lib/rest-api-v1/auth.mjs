import {AuthLogin} from '../use-cases/auth'
import {AuthLoginToken} from '../use-cases/auth'

export default ({makeRunner}) => {
  return {
    login: makeRunner(AuthLogin, {
      toParams: (req) => ({...req.body}),
    }),
    loginWithToken: makeRunner(AuthLoginToken, {
      toParams: (req) => ({...req.body}),
    }),
  }
}
