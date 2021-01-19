/* eslint-disable no-unused-vars */
import {AuthApi} from '../core'

export class AxiosAuthApi extends AuthApi {
  #http = null

  /**
   * @param http - Axios instance
   */
  constructor(http) {
    super()
    this.#http = http
  }

  async login(params) {
    this.#http.post(params)
  }
}
