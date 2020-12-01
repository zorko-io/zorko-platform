import {ClientApi} from '../core/ClientApi'

export class AxiosClientApi extends ClientApi {

  #auth = null

  /**
   * // TODO: gh-53 provide axios implementation
   * @param config - axios config
   */

  // eslint-disable-next-line no-unused-vars
  constructor(config) {
    super();
  }


  get auth() {
    return this.#auth
  }
}
