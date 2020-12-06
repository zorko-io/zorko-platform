/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import {NotYetImplementedError} from '@zorko-io/util-error'

export class ClientApi {
  /**
   * @property {AuthApi}
   */
  get auth() {
    throw new NotYetImplementedError()
  }

  /**
   * @property {PreviewApi}
   */
  get preview() {
    throw new NotYetImplementedError()
  }
}
