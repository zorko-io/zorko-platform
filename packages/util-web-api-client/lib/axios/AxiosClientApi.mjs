/* eslint-disable no-unused-vars */
import {ClientApi} from '../core'

export class AxiosClientApi extends ClientApi {
  #auth = null

  /**
   * @param config - axios config
   */
  constructor(config) {
    super()
  }

  get auth() {
    return this.#auth
  }
}
