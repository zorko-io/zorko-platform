/* eslint-disable no-unused-vars */
import {AuthApi} from '../core'

export class AxiosAuthApi extends AuthApi {
  /**
   * @param http - Axios instance
   */
  constructor(http) {
    super()
  }

  async login(params) {
    super.login(params)
  }
}
