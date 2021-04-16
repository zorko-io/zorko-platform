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
    const response = await this.#http.post('/api/v1/auth/login', { credentials: { ...params } })
    return response ? response.data : {status: 1}
  }
}
