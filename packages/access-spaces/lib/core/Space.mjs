import {NotYetImplementedError} from '@zorko-io/util-error/lib/index.mjs'

export class Space {

  /**
   * @typedef SpaceDescription
   * @property {String} name
   *
   * @return {Promise<SpaceDescription>}
   */
  async describe() {
    throw new NotYetImplementedError()
  }

}