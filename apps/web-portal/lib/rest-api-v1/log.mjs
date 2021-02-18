import {LogSave} from '../use-cases/log'

export default ({makeRunner}) => {
  return {
    save: makeRunner(LogSave, {
      toParams: (req) => ({...req.body}),
    }),
  }
}
