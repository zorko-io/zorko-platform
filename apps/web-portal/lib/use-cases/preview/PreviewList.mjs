import {UseCase} from '@zorko-io/util-use-case'

export class PreviewList extends UseCase {
  // TODO: gh-80 - provide an implementation

  async run(params) {
    return {
      data: { message : 'some data', params}
    }
  }
}
