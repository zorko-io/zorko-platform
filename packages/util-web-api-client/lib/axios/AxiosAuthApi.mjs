import {AuthApi} from '../core/AuthApi'

export class AxiosAuthApi extends AuthApi {
  /**
   * // TODO: gh-53 provide axios implementation
   * @param http - Axios instance
   */

  // eslint-disable-next-line no-unused-vars
  constructor(http) {
    super()
  }

  async createToken(params) {
    super.createToken(params)
  }
}
