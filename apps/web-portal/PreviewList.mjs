import {UseCase} from '@zorko-io/util-use-case'

export class PreviewList extends UseCase {

  async run(params) {
    return {
      data: { message : 'some data', params}
    }
  }
}
