import {PreviewList, PreviewById} from '../use-cases/preview'

export default ({makeRunner}) => {
  return {
    list: makeRunner(PreviewList, {
      toParams: (req) => ({...req.query}),
    }),
    read: makeRunner(PreviewById, {
      toParams: (req) => ({...req.params}),
    }),
  }
}
