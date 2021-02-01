import {PreviewList} from '../use-cases/preview'

export default ({makeRunner}) => {
  return {
    list: makeRunner(PreviewList, {
      toParams: (req) => ({...req.query}),
    }),
  }
}
