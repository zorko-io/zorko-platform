/* eslint-disable no-unused-vars */
import {AuthApi} from '../core'

export class AxiosAuthApi extends AuthApi {
  /**
   * // TODO: gh-53 provide axios implementation
   * @param http - Axios instance
   */
  constructor(http) {
    super()
  }

  async createToken(params) {
    super.createToken(params)
  }
}
