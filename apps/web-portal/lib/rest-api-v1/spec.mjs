import {SpecList, SpecById} from '../use-cases/spec'

export default ({makeRunner}) => {
  return {
    list: makeRunner(SpecList, {
      toParams: (req) => ({...req.query}),
    }),
    read: makeRunner(SpecById, {
      toParams: (req) => ({...req.params}),
    }),
  }
}
