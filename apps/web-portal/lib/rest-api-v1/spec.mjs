import {SpecList, SpecRead} from '../use-cases/spec'

export default ({makeRunner}) => {
  return {
    list: makeRunner(SpecList, {
      toParams: (req) => ({...req.query}),
    }),
    read: makeRunner(SpecRead, {
      toParams: (req) => ({...req.params}),
    }),
  }
}
