import {PreviewList} from './PreviewList.mjs'

export function makePreview ({makeRunner}) {
   return {
     list: makeRunner(PreviewList, {
       toParams: (req) => ({...req.query})
     })
   }
}
