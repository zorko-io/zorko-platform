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
    let response
    if (params.token) {
      response = await this.#http.post('/api/v1/auth/login/token', params)
    } else {
      response = await this.#http.post('/api/v1/auth/login', params)
    }
    return response ? response.data : {status: 1}
  }
}
