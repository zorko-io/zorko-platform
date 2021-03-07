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
    let response;
    try {
      if (params.token) {
        response = await this.#http.post('/api/v1/auth/login/token', params)
      } else {
        response = await this.#http.post('/api/v1/auth/login', params)
      }
    } catch(err) {
      response = null;
    }
    return response ? response.data : {status: 1}
  }
}
