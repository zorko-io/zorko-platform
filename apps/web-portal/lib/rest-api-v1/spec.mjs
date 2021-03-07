import {SpecList, SpecById} from '../use-cases/spec'

export default ({makeRunner}) => {
  return {
    list: makeRunner(SpecList, {
      toParams: (req) => ({...req.query}),
    }),
    findById: makeRunner(SpecById, {
      toParams: (req) => ({...req.params}),
    }),
  }
}
