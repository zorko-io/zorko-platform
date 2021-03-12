import {NotYetImplementedError} from '@zorko-io/util-error'

export class Space {

  /**
   * @typedef SpaceDescription
   * @property {String} id
   * @property {String} owner
   * @property {String} name
   *
   * @return {Promise<SpaceDescription>}
   */
  async describe() {
    throw new NotYetImplementedError()
  }

}