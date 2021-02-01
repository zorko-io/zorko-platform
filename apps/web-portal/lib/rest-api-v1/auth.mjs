import {AuthLogin} from '../use-cases/auth'

export default ({makeRunner}) => {
  return {
    login: makeRunner(AuthLogin, {
      toParams: (req) => ({...req.body}),
    }),
  }
}
