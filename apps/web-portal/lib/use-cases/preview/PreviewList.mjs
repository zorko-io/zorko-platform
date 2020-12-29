import {UseCase} from '@zorko-io/util-use-case'

// TODO: Provide implementation for PreviewList
// label: enhancement
export class PreviewList extends UseCase {

  async run(params) {
    return {
      data: { message : 'some data', params}
    }
  }
}
